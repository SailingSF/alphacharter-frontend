import React, { useState } from 'react';
import { Container, Grid, Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './AboutSection/AboutSideBar';
import IntroductionSection from './AboutSection/IntroductionSection';
import AlphaAISection from './AboutSection/AlphaAISection';
import WhatIsAlphaCharter from './AboutSection/WhatIsAlphaCharter';
import FAQSection from './AboutSection/FAQSection';

const AboutPage = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Container maxWidth="lg" sx={{ width:'100%', px:{ xs: 1, sm: 2, md: 3 }}} disableGutters>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' }, position: { md: 'fixed' }, height: '100%' }}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} md={9} sx={{ ml: { md: '25%' } }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { md: 'none' }, mb: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                        }}
                    >
                        <Sidebar />
                    </Drawer>
                    <Box id="introduction" sx={{ maxWidth: '1000px', margin: 'auto', padding: { xs: 1, md: 2 } }}>
                        <IntroductionSection/>
                    </Box>
                    <Box id="features" sx={{ maxWidth: '1000px', margin: 'auto', padding: { xs: 1, md: 2 } }}>
                        <WhatIsAlphaCharter />
                    </Box>
                    <Box id="how-to-use" sx={{ maxWidth: '1000px', margin: 'auto', padding: { xs: 1, md: 2 } }}>
                        <AlphaAISection />
                    </Box>
                    <Box id="faq" sx={{ maxWidth: '1000px', margin: 'auto', padding: { xs: 1, md: 2 } }}>
                        <FAQSection />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AboutPage;