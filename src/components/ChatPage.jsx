import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, TextareaAutosize, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { MessageItem, MessageList } from './MessageComponents';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { styled } from '@mui/system';
import { marked } from 'marked';
import DOMPurify from 'dompurify'; 

marked.setOptions({
  breaks: true, // Converts single line breaks to <br>
});
// Styled components
const ChatContainer = styled('div')(({ theme }) => ({
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.chat,
  padding: theme.spacing(2),
  overflow: 'hidden', // Hide overflow on the container
}));

const MessagesArea = styled('div')({
  flexGrow: 1,
  overflowY: 'auto', // Allow vertical scrolling
  display: 'flex',
  flexDirection: 'column',
});

const InputArea = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'flex-end',
  marginTop: 'auto',
  padding: '10px 0',
  gap: theme.spacing(1)
  
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  padding: '18.5px 14px',
  fontSize: '1rem',
  fontFamily: theme.typography.fontFamily,
  boxSizing: 'border-box',
  borderRadius: 4,
  border: '1px solid #ccc',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.dark,
  resize: 'none',
  overflowY: 'auto',
  maxHeight: '100px',
  transition: 'border-color 0.2s ease-in-out',
  '&:focus': {
    borderColor: theme.palette.primary.main,
    outline: 'none'
  }
}));

const axiosInstance = axios.create({
  baseURL: 'https://financeassistant-01-7c9325856268.herokuapp.com/',
  headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
});

function Chat() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [prompt, setPrompt] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [threadTimestamp, setThreadTimestamp] = useState('');
  const [messages, setMessages] = useState([]);
  const [authError, setAuthError] = useState('');
  const [usageError, setUsageError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [threads, setThreads] = useState([]);


   const fetchThreads = async () => {
    try {
      const response = await axiosInstance.get('api/get_threads/');
      setThreads(response.data.threads);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  useEffect(() => {
    axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    fetchThreads();
  }, [accessToken]);

  const messagesEndRef = useRef(null);
  const messagesAreaRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleThreadChange = async (event) => {
    const timestamp = event.target.value;
    setThreadTimestamp(timestamp);
    if (timestamp) {
      await fetchMessages(timestamp);
    }
    // This function will be extended to load messages later
  };

  const fetchMessages = async (timestamp) => {
    try {
      const response = await axiosInstance.get(`/api/get_thread_messages/`, {
        params: { created_at: timestamp }
      });
      const thread_id = response.data.thread_id;
      setThreadId(thread_id);
      const fetchedMessages = response.data.messages.map((msg, index) => {
        if (index === 0) { // Check if it's the first message
          const firstCutIndex = msg.text.indexOf('\n\n');
          if (firstCutIndex !== -1) {
            const secondCutIndex = msg.text.indexOf('\n\n', firstCutIndex + 2);
            if (secondCutIndex !== -1) {
              return { ...msg, text: msg.text.slice(secondCutIndex + 2) };
            }
          }
          return msg;  
        }
        return msg;
      });
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setGeneralError('Failed to fetch messages.');
    }
  };


  const handleSubmit = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    if (!prompt.trim()) return; // Prevent sending empty messages

    const payload = {
      prompt: prompt,
      ...(threadId && { thread_id: threadId }),
    };
  
    try {
      const response = await axiosInstance.post('api/submit_prompt/', payload);
      const { job_id, thread_id } = response.data;
      setThreadId(thread_id);

      const renderedHtml = DOMPurify.sanitize(marked(prompt));  // protect html

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { text: prompt, html: renderedHtml, owner: 'user' }];
        return updatedMessages;
      });
      setPrompt(''); // clear prompt after submit
      checkJobStatus(job_id); // call checking job for status and response
      setAuthError(''); // clear errors
      setUsageError('');
    } catch (error) {
      if (error.response && error.response.data.code === "token_not_valid") { 
        setAuthError("You are not logged in or your session has expired, please log in."); // send error if not logged in
      }
      if (error.response) {
        setUsageError(error.response.data.error) // set error as API error if not invalid token error
      }
      console.error(error);
    }
  };

  const checkJobStatus = async (jobId) => {
    const statusUrl = `/api/get_job_status/?job_id=${jobId}`;
  
    try {
      const response = await axiosInstance.get(statusUrl);
      setAuthError('');
      if (response.data.status === 'complete') {
        const resultMessages = response.data.result.map((item) => {
          const renderer = new marked.Renderer();
          const originalImageRenderer = renderer.image;

          renderer.image = (href, title, text) => {
            // You can customize how images are rendered here, for example, to set a class or style
            return originalImageRenderer.call(renderer, href, title, text);
          };

          // Convert markdown to HTML
          const sanitizedHtml = DOMPurify.sanitize(marked(item.text || ''));

          return {
            html: sanitizedHtml,
            imageUrl: '', // If needed, another format for message URLs
            owner: 'assistant',
          };
        });
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, ...resultMessages];
          return updatedMessages;
        });

      } else if (response.data.status === 'error') {
        setGeneralError(response.data.message || 'An error occured during the execution of the prompt');
        return
      } else {
        // Poll the API again after a delay if the job is not complete
        setTimeout(() => checkJobStatus(jobId), 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.code === "token_not_valid") {
        setAuthError("Your session has expired. Please log in again.");
      } else {
      console.error(error);
    }
  }
  };
  const handleNewConversation = () => {
    setThreadId(null);
    setMessages([]);
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };
  
  const theme = useTheme();  

  return (
    <Container>
    {authError && <Typography variant="h5" color="error" style={{backgroundColor: theme.palette.background.surface, textAlign: 'center'}}>{authError}</Typography>}
    {usageError && <Typography variant="h5" color="error" style={{backgroundColor: theme.palette.background.surface, textAlign: 'center'}}>{usageError}</Typography>}
    {generalError && <Typography variant="h5" color="error" style={{backgroundColor: theme.palette.background.surface, textAlign: 'center'}}>{generalError}</Typography>}
    <ChatContainer>
      <MessagesArea ref={messagesAreaRef}>
        <MessageList>
          {messages.map((message, index) => (
            <MessageItem key={index} owner={message.owner}>
              <Typography dangerouslySetInnerHTML={{ __html: message.html || marked(message.text) }} />
              {message.imageUrl && <img src={message.imageUrl} alt="chart" style={{ maxWidth: '100%', marginTop: '10px', alignItems: 'center' }}/>}
            </MessageItem>
          ))}
        </MessageList>
        <div ref={messagesEndRef} />
      </MessagesArea>
      <form onSubmit={handleSubmit}>
        <InputArea>
          <StyledTextarea
            minRows={1}
            style={{ 
              flex: 1,
              minHeight: '20px',
            }}
            placeholder="Type a message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button type="submit" 
            variant="contained" 
            color="primary" 
            style={{
              maxHeight: '100px',
              marginLeft: '8px',
            }}
          >
            Send
          </Button>
        </InputArea>
      </form>
    </ChatContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2, mb: '2rem' }}>
        <Button onClick={handleNewConversation} variant='contained' color='secondary' sx={{ minHeight: '20px'}}>Start New Conversation</Button>
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 280, align: 'right' }}>
          <InputLabel id="thread-select-label">Previous Threads</InputLabel>
          <Select
            labelId="thread-select-label"
            id="thread-select"
            value={threadTimestamp}
            onChange={handleThreadChange}
            label="Previous Threads"
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {threads.map((thread, index) => (
              <MenuItem key={index} value={thread}>{new Date(thread).toLocaleString()}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}

export default Chat;
