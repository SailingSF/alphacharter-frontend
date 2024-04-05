import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function FeatureCards() {
    const theme = useTheme();
    
    const features = [
        { title: 'Chat with an AI Assistant', description: 'Chat with the most powerful AI models about how to research and invaluate stocks.' },
        { title: 'Create Data Visualizations', description: 'Your AI assistant can generate data charts to help visualize stock comparisons.' },
        { title: 'Feature 3', description: 'Description of Feature 3' }
    ];

    return (
        <Grid container spacing={4} style={{ padding: '20px' }}>
        {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ backgroundColor: theme.palette.background.surface }}>
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
