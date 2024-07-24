import React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Button } from "@mui/material";
import AnimatedAlpha from "./AnimatedAlphaLower";
import { trackEvent } from "../analytics";

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
    <Container
      maxWidth="xl"
      style={{ padding: "40px 0", textAlign: "center", position: "relative" }}
    >
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
    </Container>
  );
}

export default HeroSection;
