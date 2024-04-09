import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardActionArea, Container, Grid, Typography } from '@mui/material';
import { MessageItem, MessageList } from './MessageComponents';
import autocomapny from '../images/autocompanies_2022.png';
import chipcompanies from '../images/chipcompanies_ps_2022.png';
import debtequity_industrials from '../images/debtequity_industrials.png';
import interestcoverage_industrials from '../images/interestcoverage_industrials.png';

const demoChats = {
    automotive: { title: "Auto Company Stock Performance",
        messages: [
      { owner: 'user', text: "I want to compare the stock performance of automotive companies Ford, Tesla, GM, and Chrysler (I think the stock is called something different) since 2022?"},
      { owner: 'assistant', text: "Sure, here's the price return for automotive companies Ford (F), GM (GM), Tesla (TSLA), and Stellantis (STLA)", imageUrl: autocomapny  },
      { owner: 'user', text: "That's interesting, why has Stellantis outperformed so much?" },
      { owner: 'assistant', text: "Stellantis' outperformance in the stock market, as observed from the recent trends, can be attributed to several key factors that differentiate it from its competitors:<br></br>Merger Benefits: Stellantis was formed through the merger of Fiat Chrysler Automobiles (FCA) and the PSA Group in January 2021. The merger synergies, including cost savings, efficiencies in production, and a more robust product lineup, have likely started to bear fruit, positively impacting investor sentiment and the stock performance.<br></br>Diversified Portfolio: Stellantis possesses a diverse brand portfolio, including Jeep, Ram, Peugeot, and Citroën, among others. This diversity allows it to cater to various market segments, from luxury to mainstream and commercial vehicles, providing a hedge against market volatility and regional economic downturns." },
      // Add more messages as needed
    ]},
    chipDesign: { title: "Chip Companies Price to Sales Ratio",
        messages: [
      { owner: 'user', text: "I'm curious as to how various chip companies like Nvdia and AMD are valued based on how much revenue they make." },
      { owner: 'assistant', text: 'Here is the combined chart showing the Price to Sales (P/S) ratio for Nvidia (NVDA), AMD, Intel (INTC), and Qualcomm (QCOM) since 2022:', imageUrl: chipcompanies },
      { owner: 'assistant', text: "This chart visually represents the valuation of these companies based on their sales revenue, where the P/S ratio is a comparison of a company's stock price to its revenue per share.<br></br>A few insights from this chart:<br></br><strong>Nvidia (NVDA)</strong> shows a notably higher P/S ratio compared to the others, which indicates the market is willing to pay more for each dollar of NVDA's sales. This could be due to expectations of higher growth or better profit margins. <strong>AMD</strong> also shows a relatively high P/S ratio though not as high as Nvidia, suggesting the market also has high expectations for AMD's growth and profitability. <strong>Intel (INTC)</strong>, being a more established and mature company, shows the lowest P/S ratio among the four. This suggests the market views INTC as a more stable, less growth-intensive investment. <strong>Qualcomm (QCOM)</strong>'s P/S ratio is generally higher than Intel's but lower than those of AMD and NVDA, placing it in a middle ground in terms of market valuation relative to sales. The trends observed here reflect market perceptions about each company's growth potential, profitability, and risk. Higher P/S ratios for Nvidia and AMD indicate stronger growth expectations, while the lower ratio for Intel reflects its established presence and possibly lower growth outlook. Qualcomm's position suggests it strikes a balance between growth expectations and stability." },
      // Add more messages as needed
    ]},
    industrials_debt: {
        title: 'Industrial Company Debt Valuation',
        messages: [
            { owner: 'user', text: 'Help me value industrial companies like GE who have a lot of debt. I want to see how that affects their valuations.'},
            { owner: 'assistant', text: "I made two charts I showing the <strong>Debt to Equity Ratio</strong> and the <strong>Interest Coverage Ratio</strong> for four industrial companies GE (GE), Honeywell (HON), 3M (MMM), and Caterpillar (CAT)", imageUrl: debtequity_industrials },
            { owner: 'assistant', text: "Here's the Interest Coverage Ratio:", imageUrl: interestcoverage_industrials},
            { owner: 'user', text: "Thank you, can you tell me more about the interest coverage ratio?"},
            { owner: 'assistant', text: "ICR is calculated as Earnings Before Interest and Taxes (EBIT) divided by Interest Expense. This ratio measures a company's ability to meet its interest obligations from its operating income, which is crucial for understanding how debt might influence a company's financial health."},
            { owner: 'user', text: "Could you give me a summary of some analysis based on these charts?"},
            { owner: 'assistant', text: "Certainly, here's an Analysis Summary:<br></br>GE has shown volatility in its Debt to Equity Ratio, although it tends to have a higher ratio compared to its peers, indicating relatively higher debt levels. Its Interest Coverage Ratio has improved significantly in recent years, suggesting better earnings relative to its interest obligations.<br></br>HON maintains lower Debt to Equity Ratios, indicating prudent leverage usage. Its Interest Coverage Ratio has experienced fluctuations but generally indicates a strong ability to cover interest expenses.<br></br>MMM displayed a spike in the Debt to Equity Ratio during mid-2023, which requires a closer look at their financial decisions in that period. The Interest Coverage ratio has varied wildly in the same period, suggesting significant financial changes or events.<br></br>CAT consistently shows lower Debt to Equity Ratios, implying modest leverage. Its Interest Coverage Ratio has been strong, indicating sound financial health in managing debt.<br></br>For detailed analysis, we should explore these metrics in the context of their respective sectors' averages, recent business developments, and broader economic conditions. Would you like to delve deeper into any particular company or explore additional financial metrics?"}
        ]
    }
};


function DemoSection() {
    const theme = useTheme();
    const [activeChat, setActiveChat] = useState(demoChats.automotive);
  
    return (
        <Container maxWidth='xl'>
        <Typography variant='h4' align='center' gutterBottom>
            How to Use The AlphaCharter Assistant
        </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} md={4} padding={'20px'}>
          {Object.keys(demoChats).map((key) => (
            <Card key={key} style={{ padding: '20px', backgroundColor: theme.palette.background.surface, marginBottom: '20px' }} onClick={() => setActiveChat(demoChats[key])}>
              <CardActionArea>
                <Typography variant="h5">
                  {demoChats[key].title}
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={8} style={{ backgroundColor: theme.palette.background.dark}}>
          <MessageList height={'600px'}>
            {activeChat.messages.map((message, index) => (
              <MessageItem key={index} owner={message.owner}>
                <Typography variant='body1' dangerouslySetInnerHTML={{ __html: message.text }} />
                {message.imageUrl && <img src={message.imageUrl} alt="chart" />}
              </MessageItem>
            ))}
          </MessageList>
        </Grid>
      </Grid>
      </Container>
    );
  }
  
export default DemoSection;