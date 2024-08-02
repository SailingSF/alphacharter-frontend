import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import AttentionSection from './AttentionSection';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://financeassistant-01-7c9325856268.herokuapp.com/api/token/', {
        username,
        password
      });
      console.log(response.data);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh)
      setSuccessMessage('Login successful!'); // Add this line
      setError(''); // Clear any previous errors
      // Handle successful login (e.g., redirect to dashboard)
      navigate('/chat')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    console.log('Access key removed');

    // Optionally remove the refresh token as well
};

const warningComponent = { title: "Attention:", text: "Create an account first to gain access to all AlphaCharter features."}

  return (
    <Container maxWidth="sm" sx={{ marginBottom: '4rem' }}>
      <AttentionSection title={warningComponent.title} text={warningComponent.text}></AttentionSection>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          autoFocus
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Log In
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography color="primary">{successMessage}</Typography>}
      </form>
      <Button onClick={handleLogout} variant='contained' color='secondary' fullWidth sx={{mt: 1}}>Log Out</Button>
      <Typography variant='h5' component='h4' gutterBottom>
       <br></br>Don't have an account?
      </Typography>
      <Button variant='contained' color='primary' href='/signup' fullWidth>Sign Up</Button>
    </Container>
  );
}

export default LoginPage;
