import React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Button, Box, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import AnimatedAlpha from "./AnimatedAlphaLower";
import { trackEvent } from '../analytics';

const HeroContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  padding: theme.spacing(4),
  maxWidth: '100%',
  boxSizing: 'border-box',
  width: '100vw', // Ensure it takes full viewport width
}));

const GradientShape = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `radial-gradient(ellipse at left, ${theme.palette.primary.mainVariant} 10%, rgba(255,255,255,0) 40%), radial-gradient(ellipse at right, ${theme.palette.primary.mainVariant} 10%, rgba(255,255,255,0) 40%)`,
  opacity: 0.75,
  zIndex: -1,
}));

function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLoginClick = () => {
    trackEvent("Button", "Click", "Hero Login Button Click");
    window.location.href = "/login";
  };

  return (
    <HeroContainer maxWidth={false}>
      <GradientShape />
      <AnimatedAlpha
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 0,
          width: isMobile ? '50px' : '100px',
          maxWidth: '20%', // Ensure it doesn't get too large on any screen
        }}
      />
      <Typography
        variant={isMobile ? "h3" : "h2"}
        component="h1"
        style={{ color: theme.palette.text.primary }}
        gutterBottom
      >
        Welcome to AlphaCharter
      </Typography>
      <Typography variant={isMobile ? "body1" : "h5"} component="p" gutterBottom sx={{ margin: { xs: 2, sm: 5 } }}>
        Your on-demand quantitative researcher.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLoginClick} sx={{ mt: 2 }}>
        Get Started
      </Button>
    </HeroContainer>
  );
}

export default HeroSection;