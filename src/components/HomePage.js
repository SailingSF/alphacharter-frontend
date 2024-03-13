import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function HomePage() {
  const theme = useTheme();

  return (
    <div>
      <Container maxWidth="sm" style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary}}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Alpha Charter
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Your on demand junior quant researcher.
      </Typography>
      <Button variant="contained" color="primary" href="/login" gutterBottom>
        Log In
      </Button>
      </Container>
      <Container maxWidth="sm" style={{ backgroundColor: theme.palette.background.surface, color: theme.palette.text.primary}}>
      <Typography variant="h2" align='center'>
        More text
      </Typography>
      </Container>
    </div>
  );
}

export default HomePage;