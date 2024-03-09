import React from 'react';
import { Container, Typography, Button } from '@mui/material';

function HomePage() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Alpha Charter
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Your financial chart assistant.
      </Typography>
      <Button variant="contained" color="primary" href="/login">
        Get Started
      </Button>
    </Container>
  );
}

export default HomePage;