import React from 'react';
import { Container, Typography } from '@mui/material';

function TestimonialsSection() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Hear From Our Users
      </Typography>
      {/* Testimonial cards or quotes go here */}
    </Container>
  );
}

export default TestimonialsSection;
