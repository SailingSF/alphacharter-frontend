import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function FeatureCards() {
    const theme = useTheme();
    
    const features = [
        { title: 'Talk Finance with an AI Assistant', description: 'Chat with the most powerful AI models about how to research and evaluate stocks.' },
        { title: 'Create Data Visualizations', description: 'Your AI assistant can generate charts to help visualize data for stock analysis.' },
        { title: 'Utilize a Massive Finance Database', description: 'AlphaCharter is built on a massive database containing prices and earnings data of all US listed stocks.' },
    ];

    return (
        <Grid container spacing={2} style={{ padding: '20px'}}>
        {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ 
                backgroundColor: theme.palette.background.surface,
                width: '100%',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
            }} elevation={3}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
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
    );
}

export default FeatureCards;
