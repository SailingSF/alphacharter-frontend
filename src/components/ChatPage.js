import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import axios from 'axios';

function Chat() {
  const [prompt, setPrompt] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = 'https://financeassistant-01-7c9325856268.herokuapp.com/api/submit_prompt/';
    const payload = {
      prompt: prompt,
      ...(threadId && { thread_id: threadId }),
    };
  
    try {
      const response = await axios.post(apiUrl, payload, { withCredentials: true });
      const { job_id, thread_id } = response.data;
      setThreadId(thread_id);
      setMessages([...messages, { text: prompt, type: 'user' }]);
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
        const resultMessages = response.data.result.map((item) => ({
            text: item.text || '',
            imageUrl: item.image_url || '',
            type: 'response',
          }));
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
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.text}</p>
            {message.imageUrl && <img src={message.imageUrl} alt="Response" />}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
      <Button onClick={handleNewConversation} variant='contained' color='secondary'>Start New Conversation</Button>
    </Container>
  );
}

export default Chat;
