import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Typography, Button } from '@mui/material';

function HeroSection() {
    const theme = useTheme();
    
    return (
        <Container maxWidth="xl" style={{ padding: '40px 0', textAlign: 'center' }}>
        <Typography variant="h2" component="h1" style={{ color: theme.palette.text.primary }}gutterBottom>
            Welcome to Alpha Charter
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
            Your on-demand junior quant researcher.
        </Typography>
        <Button variant="contained" color="primary" href="/login">
            Log In / Sign Up
        </Button>
        </Container>
    );
}

export default HeroSection;
