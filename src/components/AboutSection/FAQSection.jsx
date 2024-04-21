import React from 'react';
import { Typography, Paper } from '@mui/material';

const FAQSection = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 2, borderRadius: 2 }}>
      <Typography variant="h4" align='center' gutterBottom>
        FAQ
      </Typography>
      <Typography paragraph>
        <ul>
          <li>What data can AlphaCharter access?
            <ul>
              <li>AlphaCharter's products can access all public US company quarterly earnings reports for the past 15 years as well as the daily stock prices for the same period.</li>
            </ul>
          </li>
          <li>How do I suggest a feature?
            <ul>
              <li>Email <a href='mailto:max@alphacharter.xyz'>max@alphacharter.xyz</a>!</li>
            </ul>
          </li>
          <li>Can I save any graph AlphaCharter makes for me?
            <ul>
              <li>Yes right clicking any plot returned by AlphaAI will allow you to save it. The data for these images is kept by AlphaCharter for 30 days before deletion.</li>
            </ul>
          </li>
          <li>Can AlphaAI predict stock prices?
            <ul>
              <li>Absolutely not, no on can. What AlphaAI can do is give you much better information about companies and stocks allowing you to make more educated decisions, AlphaCharter is designed to help you research and learn and works best when given those sorts of tasks.</li>
            </ul>
          </li>
          <li>How accurate is the data provided by AlphaCharter?
            <ul>
              <li>Very accurate, the data has been both cleaned by a vendor and our own system. That doesn’t mean there are zero mistakes however. Should you find a mistake, the first thing you should do is ask AlphaAI about it. Often numbers can look odd but upon investigation they can still be accurate. For example spikes in data could be due to things like the Covid-19 pandemic, or accounting changes for quarterly data. If you still think there's a mistake please email <a href='mailto:support@alphacharter.xyz'>support@alphacharter.xyz</a>.</li>
            </ul>
          </li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default FAQSection;
