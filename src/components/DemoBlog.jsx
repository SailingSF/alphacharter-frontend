import React from 'react';
import { Paper } from '@mui/material';
import { htmlContent } from '../html_content/blog_agent';

const HTMLPaperComponent = () => {
  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </Paper>
  );
};

export default HTMLPaperComponent;