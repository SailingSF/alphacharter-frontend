import React from 'react';
import { Typography, Paper } from '@mui/material';

const WhatIsAlphaCharter = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 2, borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        What is AlphaCharter?
      </Typography>
      <Typography paragraph>
      AlphaCharter harnesses a vast financial database encompassing over 15 years of quarterly earnings reports and daily price data for all U.S.-listed stocks. This powerful resource, combined with our cutting-edge analytical tools, enables users to make informed investment decisions and conduct in-depth financial research in a fraction of the time traditionally required.
      <br></br><br></br>Our premier offering, AlphaAI, transforms the user experience by providing a chat interface where you can interact with a sophisticated language model trained on our comprehensive financial dataset. Imagine having a personal quantitative analyst with the equivalent of a Bloomberg terminal at your fingertips. AlphaAI can generate detailed charts and visualizations for any financial metric you query, effectively bringing complex data to life.
      <br></br><br></br>At just $15 per month, AlphaCharter provides the analytical power of tools and personell costing upwards of $30,000 per month, making professional-grade financial analysis accessible to everyone. Whether you're a seasoned professional or just starting out, AlphaCharter adapts to your expertise level, answering your queries and expanding your financial acumen with each interaction.
      </Typography>
    </Paper>
  );
};

export default WhatIsAlphaCharter;
