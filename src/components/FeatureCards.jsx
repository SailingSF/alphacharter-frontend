import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, Card, CardContent, Typography } from '@mui/material';

function FeatureCards() {
    const theme = useTheme();
    
    const features = [
        { title: 'Talk Finance with an AI Assistant', description: 'Chat with the most powerful AI models about how to research and evaluate stocks.' },
        { title: 'Create Data Visualizations', description: 'Your AI assistant can generate charts to help visualize data for stock analysis.' },
        { title: 'Screen and Research Stocks', description: "Use AlphaCharter's tool to screen and visualize stocks. Using up to data data, the AlphaAI assistant will screen and discover companies and allow you to visualize their fundamental and price data." },
    ];

    return (
        <Container maxWidth='xl'>
            <Typography variant='h4'>Features</Typography>
            <Box sx={{ 
                marginBottom: '1rem', 
                marginTop: '1rem', 
                outline: `1px solid ${theme.palette.primary.main}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>

            <Grid container spacing={2} style={{ padding: '20px'}}>
            {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                <Card style={{ 
                    backgroundColor: theme.palette.background.surface,
                    width: '100%',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }} elevation={3}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)' }}>
                        {feature.title}
                    </Typography>
                    <Typography variant="body2">
                        {feature.description}
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
            ))}
            </Grid>
            </Box>
        </Container>
    );
}

export default FeatureCards;
