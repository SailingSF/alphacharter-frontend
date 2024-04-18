import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import maxheadshot from '../images/max-headshot.jpg'



function TeamPage() {
    const theme = useTheme();

    const bios = [
        {
            name: "Max",
            description: "Making visualizations for financial data was something Max did on his freetime (nerd) and with the help of AI he decided to make that capability into an app so that anyone could make charts to explore financial data as easily as speaking with a chatbot. With strong experience in finance, AI, and crypto as a Product Manager Max built AlphaCharter to be the easiest (and cheapest) way to get the help of a quant in all investing research.",
            contact: 'max@alphacharter.xyz',
            photo: maxheadshot,
        }
    ];

    return (
        <Container maxWidth='lg'>
            <Typography variant='h2' component='h1' align='center' marginTop={3}>Team</Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 4,
                marginBottom: 12,
            }}>
                <Grid container spacing={2} justifyContent='center' style={{ padding: '20px'}}>
                {bios.map(member => (
                <Grid item xs={12} sm={6} md={4} key={member.name}>
                <Card style={{ 
                    backgroundColor: theme.palette.background.surface,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    padding: 2,
                }} elevation={3}>
                    <Avatar 
                        src={member.photo}
                        alt={member.name}
                        sx={{ 
                            width: 192, 
                            height: 240, 
                            marginBottom: 2, 
                            marginTop: 2,
                            borderRadius: '5%' // Adjust this for more/less roundness
                        }}
                    />
                    <CardContent sx={{ 
                        width: '100%', // Ensures CardContent takes full width of the card
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                    }}
                    >
                    <Typography gutterBottom variant="h5" sx={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)' }}>
                        {member.name}
                    </Typography>
                    <Typography variant='body1' align='center' gutterBottom>
                        <a href={`mailto:${member.contact}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                            {member.contact}
                        </a>
                    </Typography>
                    <Typography variant="body2" color={theme.palette.text.dark} sx={{ width: '100%', textAlign: 'left', paddingLeft: 2 }}>
                        {member.description}
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
            ))}
            </Grid>

            </Box>
        </Container>
    )
}

export default TeamPage