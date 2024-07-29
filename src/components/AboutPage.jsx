import React, { useState } from 'react';
import { Box, Drawer, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './AboutSection/AboutSideBar';
import IntroductionSection from './AboutSection/IntroductionSection';
import AlphaAISection from './AboutSection/AlphaAISection';
import WhatIsAlphaCharter from './AboutSection/WhatIsAlphaCharter';
import FAQSection from './AboutSection/FAQSection';

const AboutPage = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const sidebarWidth = 240;

    return (
        <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
            <Box
                component="nav"
                sx={{
                    width: { md: sidebarWidth },
                    flexShrink: { md: 0 },
                    mt: { xs: '64px', md: 0 }, // Adjusting margin to accommodate header
                }}
            >
                {isMobile ? (
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            '& .MuiDrawer-paper': { 
                                boxSizing: 'border-box', 
                                width: sidebarWidth,
                                backgroundColor: theme.palette.background.default,
                            },
                        }}
                    >
                        <Sidebar />
                    </Drawer>
                ) : (
                    <Drawer
                        variant="permanent"
                        sx={{
                            '& .MuiDrawer-paper': { 
                                boxSizing: 'border-box', 
                                width: sidebarWidth,
                                backgroundColor: theme.palette.background.default,
                                borderRight: 'none',
                                top: '64px', // Adjusting position to respect header
                                height: 'calc(100vh - 120px)', // Height to respect both header and footer
                            },
                        }}
                        open
                    >
                        <Sidebar />
                    </Drawer>
                )}
            </Box>
            
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${sidebarWidth}px)` },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: { xs: '64px', md: 0 }, // Adjusting margin to accommodate header
                    mb: { xs: '64px', md: 0 }, // Adjusting margin to accommodate footer
                }}
            >
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ alignSelf: 'flex-start', mb: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                
                <Box sx={{ maxWidth: '800px', width: '100%' }}>
                    <Box id="introduction" sx={{ mb: 6 }}>
                        <IntroductionSection />
                    </Box>
                    <Box id="what-is" sx={{ mb: 6 }}>
                        <WhatIsAlphaCharter />
                    </Box>
                    <Box id="alphaai" sx={{ mb: 6 }}>
                        <AlphaAISection />
                    </Box>
                    <Box id="faq" sx={{ mb: 6 }}>
                        <FAQSection />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default AboutPage;