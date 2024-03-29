import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://financeassistant-01-7c9325856268.herokuapp.com/api/token/', {
        username,
        password
      });
      console.log(response.data);
      localStorage.setItem('accessToken', response.data.access);
      setSuccessMessage('Login successful!'); // Add this line
      setError(''); // Clear any previous errors
      // Handle successful login (e.g., redirect to dashboard)
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

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
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
    </Container>
  );
}

export default LoginPage;
