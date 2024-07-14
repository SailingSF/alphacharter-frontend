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
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, px: { xs: 1, sm: 2, md: 3 }, minHeight: '100vh' }} disableGutters>
            <Box sx={{ width: { md: 240 }, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
                <Sidebar />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
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
            <Box sx={{ flexGrow: 1, padding: { xs: 1, md: 3 } }}>
                <Box id="introduction" sx={{ maxWidth: '1000px', margin: 'auto', padding: { xs: 1, md: 2 } }}>
                    <IntroductionSection/>
                </Box>
                <Box id="what-is" sx={{ maxWidth: '1000px', margin: 'auto', padding: { xs: 1, md: 2 } }}>
                    <WhatIsAlphaCharter />
                </Box>
                <Box id="alphaai" sx={{ maxWidth: '1000px', margin: 'auto', padding: { xs: 1, md: 2 } }}>
                    <AlphaAISection />
                </Box>
                <Box id="faq" sx={{ maxWidth: '1000px', margin: 'auto', padding: { xs: 1, md: 2 } }}>
                    <FAQSection />
                </Box>
            </Box>
        </Container>
    );
}

export default AboutPage;