import React from 'react';
import { Typography, Paper } from '@mui/material';

const IntroductionSection = () => {
  return (
    <Paper elevation={3} sx={{ marginTop: 2, borderRadius: 2, padding: 3 }}>
      <Typography variant="h3" align='center' gutterBottom>
        About
      </Typography>
      <Typography variant="subtitle1" paragraph>
        What is AlphaCharter?
      </Typography>
      <Typography variant="h4" gutterBottom>
        Background
      </Typography>
      <Typography paragraph>
      AlphaCharter transforms the complex world of financial analysis, making it accessible to everyone—from beginners to seasoned investors. With an intuitive platform that leverages sophisticated charting and AI-driven insights, AlphaCharter democratizes financial data, enabling users to harness the analytical power traditionally reserved for quantitative analysts.
      <br></br><br></br>Founded and developed by Max, a passionate advocate for equitable access to financial markets, AlphaCharter was born from a desire to streamline and enhance the way we interact with financial data. Frustrated by the limitations of conventional tools and one-off charts for financial research, Max created AlphaCharter as a comprehensive, user-friendly solution. This platform not only simplifies complex data into visually engaging charts but also empowers users to make informed financial decisions more effortlessly.
      <br></br><br></br>Reach out to Max at <a href="mailto:max@alphacharter.xyz">max@alphacharter.xyz</a> for more insights or opportunities to collaborate.
      <br></br><br></br>See our <a href='/team'>Team Page</a>.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Mission and Vision
      </Typography>
      <Typography paragraph>
        <strong>Mission</strong>:
      </Typography>
      <Typography paragraph align='center'>
        <em>"Empower every individual with advanced financial analytics, making sophisticated investment insights accessible and understandable, regardless of one's financial expertise."</em>
      </Typography>
      <Typography paragraph>
        <strong>Vision</strong>:
      </Typography>
      <Typography paragraph align='center'>
        <em>"To revolutionize financial decision-making globally by delivering intuitive, data-driven tools that democratize access to financial markets, fostering informed investing and financial literacy for all."</em>
      </Typography>
    </Paper>
  );
};

export default IntroductionSection;
