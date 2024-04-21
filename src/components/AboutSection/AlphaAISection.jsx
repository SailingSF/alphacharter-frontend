import React from 'react';
import { Typography, Paper } from '@mui/material';

const AlphaAISection = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 2, borderRadius: 2 }}>
      <Typography variant="h4" align='center' gutterBottom>
        AlphaAI
      </Typography>
      <Typography paragraph>
      AlphaAI is the flagship product of AlphaCharter, designed to demystify financial data through a conversational AI-powered chatbot. This tool puts the expertise of a financial analyst right at your fingertips, requiring nothing more from you than simple conversation skills. Whether you're curious about specific companies or broad market trends, AlphaAI is equipped to handle your queries with ease.
      <br></br><br></br>Using AlphaAI is as simple as having a chat. You don't need to know stock symbols, understand how to compute financial metrics like free cash flow, or even know what those metrics mean. Just ask AlphaAI what you're interested in—for instance, "Tell me about the recent performance of Tesla," or "How does Apple's revenue growth compare to Microsoft's?" AlphaAI will not only provide the answers but also explain the underlying financial concepts if you need.
      <br></br><br></br>AlphaAI excels in comparative analysis, whether you're looking at stock performance or fundamental valuations. Questions like, "Please compare the stock performance of Coke versus Pepsi over the past four years," or, "How have American oil companies like Exxon been valued compared to their profit over the past five years?" are perfect for getting started. As you explore, you can dive deeper into any topic, request more detailed analyses, or ask the AI to clarify complex financial terms and their significance.
      </Typography>
    </Paper>
  );
};

export default AlphaAISection;
