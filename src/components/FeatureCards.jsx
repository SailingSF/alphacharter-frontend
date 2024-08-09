import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, Card, CardContent, Typography, useMediaQuery } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';

function FeatureCards() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    
    const features = [
        { 
            title: 'Create Advanced Charts', 
            description: 'Leverage AI to make charts for you, using the latest financial data so that you can have a visual reference of any concept you want to see. Look beyond price to compare valueation ratios for stocks in specific industries and understand their financials.',
            icon: <BarChartIcon fontSize="large" />
        },
        { 
            title: 'Chat with an AI Quant', 
            description: "Explore financial data with visualizations and data from public companies powered by the most powerful AI models. Learn how to research and evaluate stocks if you'e a beginner, source and visualize data in 1/10th of the time if you're a pro.",
            icon: <ChatIcon fontSize="large" />
        },
        { 
            title: 'Screen and Research Stocks', 
            description: "Use AlphaCharter's chat tool to screen and visualize stocks with up-to-date data so that you can make informed investing decisions without digging through financial reports or creating spreadsheets.",
            icon: <SearchIcon fontSize="large" />
        },
    ];

    return (
        <Container maxWidth='xl' sx={{ my: 8 }}>
            <Typography variant='h4' component="h2" sx={{ mb: 4, textAlign: 'center' }}>What We Offer</Typography>
            <Grid container spacing={4} direction={isMobile ? 'column' : 'row'}>
                {features.map((feature, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            p: 3,
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: 'none',
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                        }}>
                            <Box sx={{
                                backgroundColor: theme.palette.primary.light,
                                borderRadius: '50%',
                                p: 2,
                                mb: 2,
                                mt: 2,
                            }}>
                                {feature.icon}
                            </Box>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default FeatureCards;