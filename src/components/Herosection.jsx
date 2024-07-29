import React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import AnimatedAlpha from "./AnimatedAlphaLower";
import { trackEvent } from "../analytics";

const HeroContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
}));

const GradientShape = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  background: `radial-gradient(ellipse at left, ${theme.palette.primary.mainVariant} 30%, rgba(255,255,255,0) 60%), radial-gradient(ellipse at right, ${theme.palette.primary.mainVariant} 30%, rgba(255,255,255,0) 60%)`,
  opacity: 0.6,
  zIndex: -1,
}));

function HeroSection() {
  const theme = useTheme();

  const handleLoginClick = () => {
    trackEvent("Button", "Click", "Hero Login Button Click");
    // Navigate to the href
    window.location.href = "/login";
  };

  // const handleAlphaaiClick = () => {
  //     trackEvent('Button', 'Click', 'Hero AlphaAI Button Click');
  //     // Navigate to the href
  //     window.location.href = '/chat';
  // };

  return (
    <HeroContainer maxWidth={false}>
      <GradientShape />
      <AnimatedAlpha
        style={{ position: "absolute", top: "10px", left: "10px", zIndex: 0 }}
      />
      <Typography
        variant="h2"
        component="h1"
        style={{ color: theme.palette.text.primary }}
        gutterBottom
      >
        Welcome to AlphaCharter
      </Typography>
      <Typography variant="h5" component="p" gutterBottom sx={{ margin: 5 }}>
        Your on-demand quantitative researcher.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLoginClick}>
        Get Started
      </Button>
      {/* <Button variant='contained' color='secondary' sx={{ textTransform:'none', marginLeft: 5 }} onClick={handleAlphaaiClick}>
                GO TO &nbsp; <strong>AlphaAI</strong>
            </Button> */}
    </HeroContainer>
  );
}

export default HeroSection;
