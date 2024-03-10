import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function HomePage() {
  const theme = useTheme();

  return (
    <Container maxWidth="sm" style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary}}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Alpha Charter
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Your financial chart assistant.
      </Typography>
      <Button variant="contained" color="primary" href="/login">
        Log In
      </Button>
    </Container>
  );
}

export default HomePage;