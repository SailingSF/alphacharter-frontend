import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, Box, TextareaAutosize, Typography, 
  MenuItem, Select, FormControl, Paper, 
  IconButton, Tooltip, Snackbar, Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { MessageItem, MessageList } from './MessageComponents';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { styled } from '@mui/system';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import katex from 'katex';
import 'katex/dist/katex.min.css';

marked.setOptions({
  breaks: true, // Converts single line breaks to <br>
});
// Styled components
const ChatContainer = styled(Paper)(({ theme }) => ({
  height: 'calc(100vh - 100px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const InputArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  fontFamily: theme.typography.fontFamily,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  resize: 'none',
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
  }
}));

const axiosInstance = axios.create({
  baseURL: 'https://financeassistant-01-7c9325856268.herokuapp.com/',
  headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
});

// Interceptor for token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${access}`;
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout user)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Redirect to login page or show login modal
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });


  useEffect(() => {
    const renderer = new marked.Renderer();
    renderer.paragraph = (text) => {
      const regex = /\$\$(.*?)\$\$|\$(.*?)\$/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (lastIndex !== match.index) {
          parts.push(text.slice(lastIndex, match.index));
        }
        const latex = match[1] || match[2];
        const html = katex.renderToString(latex, { displayMode: !!match[1] });
        parts.push(html);
        lastIndex = regex.lastIndex;
      }

      if (lastIndex !== text.length) {
        parts.push(text.slice(lastIndex));
      }

      return `<p>${parts.join('')}</p>`;
    };

    marked.setOptions({ renderer });
  }, []);


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

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
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
      if (error.response && error.response.status === 401) {
        // Token refresh handled automatically by the interceptor
        // If 401, refresh has failed
        setAuthError("Your session has expired. Please log in again.");
        showSnackbar('Your session has expired. Please log in again.', 'error');
      } else if (error.response) {
        setUsageError(error.response.data.error) // set error as API error if not invalid token error
        showSnackbar(error.response.data.error, 'error');
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
  
  const theme = useTheme();  

  return (
    <Container maxWidth="lg">
    {authError && <Typography variant="h5" color="error" style={{backgroundColor: theme.palette.background.surface, textAlign: 'center'}}>{authError}</Typography>}
    {usageError && <Typography variant="h5" color="error" style={{backgroundColor: theme.palette.background.surface, textAlign: 'center'}}>{usageError}</Typography>}
    {generalError && <Typography variant="h5" color="error" style={{backgroundColor: theme.palette.background.surface, textAlign: 'center'}}>{generalError}</Typography>}
    <ChatContainer>
    <ChatHeader>
          <Typography variant="h6">AlphaAI Chat</Typography>
          <Box>
            <Tooltip title="New Conversation">
              <IconButton onClick={handleNewConversation} color="primary">
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Previous Threads">
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120, ml: 1 }}>
                <Select
                  value={threadTimestamp}
                  onChange={handleThreadChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>Prev. Threads</em>
                  </MenuItem>
                  {threads.map((thread, index) => (
                    <MenuItem key={index} value={thread}>
                      {new Date(thread).toLocaleString()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Tooltip>
          </Box>
        </ChatHeader>
      <MessageList ref={messagesAreaRef}>

          {messages.map((message, index) => (
            <MessageItem key={index} owner={message.owner} elevation={1}>
              <Typography component="div" dangerouslySetInnerHTML={{ __html: message.html || marked(message.text) }} />
              {message.imageUrl && (
                  <Box mt={2} display="flex" justifyContent="center">
                    <img src={message.imageUrl} alt="chart" />
                  </Box>
                )}
            </MessageItem>
          ))}

      </MessageList>
        <InputArea component="form" onSubmit={handleSubmit}>
          <StyledTextarea
            minRows={1}
            maxRows={4}
            placeholder="Type a message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
          />
          <Tooltip title="Send Message">
            <IconButton type="submit" color="primary" sx={{ ml: 1 }}>
              <SendIcon />
            </IconButton>
          </Tooltip>
        </InputArea>
    </ChatContainer>
    <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Chat;
