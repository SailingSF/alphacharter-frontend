import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import Sidebar from './AboutSection/AboutSideBar';
import IntroductionSection from './AboutSection/IntroductionSection';
import AlphaAISection from './AboutSection/AlphaAISection';
import WhatIsAlphaCharter from './AboutSection/WhatIsAlphaCharter';
import FAQSection from './AboutSection/FAQSection';


const AboutPage = () => {

    return (
        <Container maxWidth={false} sx={{ width:'100%', pr:'240px'}} disableGutters>
        <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
            <Sidebar />
            </Grid>
            <Grid item xs={12} md={9}>
            <Box id="introduction" sx={{ maxWidth: '1000px', margin: 'auto', padding: 2 }}>
                <IntroductionSection/>
            </Box>
            <Box id="features" sx={{ maxWidth: '1000px', margin: 'auto', padding: 2 }}>
                <WhatIsAlphaCharter />
            </Box>
            <Box id="how-to-use" sx={{ maxWidth: '1000px', margin: 'auto', padding: 2 }}>
                <AlphaAISection />
            </Box>
            <Box id="faq" sx={{ maxWidth: '1000px', margin: 'auto', padding: 2 }}>
                <FAQSection />
            </Box>
            </Grid>
        </Grid>
        </Container>
    );
}

export default AboutPage;
