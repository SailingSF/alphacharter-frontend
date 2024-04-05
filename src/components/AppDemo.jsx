import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

function AppDemo() {
    const theme = useTheme();
    
    return (
        <Container maxWidth="xl" style={{ backgroundColor:theme.palette.background.dark, padding: '40px 0', textAlign: 'center' }}>
        <Typography variant="h2" component="h1" style={{ color: theme.palette.text.primary }}gutterBottom>
            Demo of App
        </Typography>
        </Container>
    );
}

export default AppDemo;