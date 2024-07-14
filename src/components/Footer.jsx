import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Footer() {
    const theme = useTheme();
  return (
    <Box component="footer" sx={{ backgroundColor: theme.palette.background.dark, color: theme.palette.text.white, padding: '15px 0', bottom: 0}}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              AlphaCharter
            </Typography>
            <Typography>
              Making financial analysis easy and accessible.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/team" display="block">Our Team</Link>
              <Link href="/about" display="block">About</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box>
              <Link href="/terms" display="block">Terms of Use</Link>
              <Link href="/privacy" display="block">Privacy Policy</Link>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ marginTop: '20px', textAlign: 'center' }}>
          © {new Date().getFullYear()} AlphaCharter. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
