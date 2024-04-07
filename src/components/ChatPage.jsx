import React, { useState } from 'react';
import { Container, TextField, Button, Paper, Typography } from '@mui/material';
import { MessageItem, MessageList } from './MessageComponents';
import axios from 'axios';
import { styled } from '@mui/system';
import { marked } from 'marked';

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
  marginTop: 'auto',
  padding: '10px 0',
  gap: theme.spacing(1)
  
}));



function Chat() {
  const [prompt, setPrompt] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [messages, setMessages] = useState([]);

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
      setMessages([...messages, { text: prompt, owner: 'user' }]);
      setPrompt('');
      checkJobStatus(job_id);
    } catch (error) {
      console.error(error);
    }
  };

  const checkJobStatus = async (jobId) => {
    const statusUrl = `https://financeassistant-01-7c9325856268.herokuapp.com/api/get_job_status/?job_id=${jobId}`;
  
    try {
      const response = await axios.get(statusUrl);
      if (response.data.status === 'complete') {
        const resultMessages = response.data.result.map((item) => {
          const renderer = new marked.Renderer();
          const originalImageRenderer = renderer.image;

          renderer.image = (href, title, text) => {
            // You can customize how images are rendered here, for example, to set a class or style
            return originalImageRenderer.call(renderer, href, title, text);
          };

          // Convert markdown to HTML
          const html = marked(item.text || '', { renderer });

          return {
            html,
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
      console.error(error);
    }
  };
  const handleNewConversation = () => {
    setThreadId(null);
    setMessages([]);
  };
  
  // In your UI, you can have a button or link to start a new conversation:
  
  

  return (
    <Container>
      <ChatContainer>
        <MessageList>
            {messages.map((message, index) => (
            <MessageItem key={index} owner={message.owner} >
                <Typography variant='body1' dangerouslySetInnerHTML={{ __html: message.html || message.text}} />
                {message.imageUrl && <img src={message.imageUrl} alt="chart" style={{ maxWidth: '100%', marginTop: '10px', alignItems: 'center' }}/>}
            </MessageItem>
            ))}
        </MessageList>
        <form onSubmit={handleSubmit}>
            <InputArea>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">Send</Button>
            </InputArea>
        </form>
      </ChatContainer>
      <Button onClick={handleNewConversation} variant='contained' color='secondary'>Start New Conversation</Button>
    </Container>
  );
}

export default Chat;
