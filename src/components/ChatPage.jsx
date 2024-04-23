import React, { useState } from 'react';
import { Container, TextareaAutosize, Button, Paper, Typography } from '@mui/material';
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
const ChatContainer = styled(Paper)(({ theme }) => ({
  maxHeight: '80vh',
  minHeight: '80vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#060606',
  padding: theme.spacing(2),
}));


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


function Chat() {
  const [prompt, setPrompt] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [authError, setAuthError] = useState('');
  const [usageError, setUsageError] = useState('');

  const axiosInstance = axios.create({
    baseURL: 'https://financeassistant-01-7c9325856268.herokuapp.com/',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
});

  const handleSubmit = async (event) => {
    event.preventDefault();
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

      setMessages([...messages, { text: prompt, html: renderedHtml, owner: 'user' }]);
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
            imageUrl: '', // If needed, you can extract image URLs here
            owner: 'assistant',
          };
        });
        setMessages((prevMessages) => [...prevMessages, ...resultMessages]);
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
  
  // In your UI, you can have a button or link to start a new conversation:
  
  const theme = useTheme();  

  return (
    <Container>
      {authError && <Typography variant="h5" color="error" style={{backgroundColor: theme.palette.background.surface, textAlign: 'center'}}>{authError}</Typography>}
      {usageError && <Typography variant="h5" color="error" style={{backgroundColor: theme.palette.background.surface, textAlign: 'center'}}>{usageError}</Typography>}
      <ChatContainer sx={{ marginBlock: '1rem' }}>
        <MessageList>
            {messages.map((message, index) => (
            <MessageItem key={index} owner={message.owner} >
                <Typography dangerouslySetInnerHTML={{ __html: message.html || marked(message.text) }} />
                {message.imageUrl && <img src={message.imageUrl} alt="chart" style={{ maxWidth: '100%', marginTop: '10px', alignItems: 'center' }}/>}
            </MessageItem>
            ))}
        </MessageList>
        <form onSubmit={handleSubmit}>
            <InputArea>
            <StyledTextarea
              minRows={1}
              style={{ 
                flex: 1, // Take remaining space
                minHeight: '20px', // Set a minimum height
              }}
              placeholder="Type a message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
                <Button type="submit" 
                variant="contained" 
                color="primary" 
                style={{
                  maxHeight: '100px', // Adjust this based on your TextareaAutosize height
                  marginLeft: '8px', // Optional: adds some space between text area and button
                }}
                >Send</Button>
            </InputArea>
        </form>
      </ChatContainer>
      <Button onClick={handleNewConversation} variant='contained' color='secondary' sx={{ marginBottom: '2rem'}}>Start New Conversation</Button>
    </Container>
  );
}

export default Chat;
