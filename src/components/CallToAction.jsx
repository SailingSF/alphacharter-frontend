import React from 'react';
import { Button } from '@mui/material';

function CallToAction({ text, href }) {
  return (
    <Button variant="contained" color="primary" href={href} style={{ margin: '20px auto', display: 'block' }}>
      {text}
    </Button>
  );
}

export default CallToAction;
