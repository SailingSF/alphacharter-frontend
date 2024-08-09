import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardActionArea, Container, Grid, Typography, Box, useMediaQuery } from '@mui/material';
import { MessageItem, MessageList } from './MessageComponents';
import autocomapny from '../images/autocompanies_2022.png';
import chipcompanies from '../images/chipcompanies_ps_2022.png';
import manufactoring_evebitda from '../images/manufacturing_evebitda.png';
import manufacturing_debtequity from '../images/manufacturing_debtequity.png';
import cruise_debtequity_img from '../images/cruise_debtequity.png';
import cruise_interestcoverage from '../images/cruise_interestcoverage.png';
import manuf_screen_stock_perf from '../images/manuf_screen_stock_perf.png';

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
    manuf_screen: {
      title: 'Screen for Manufacturing Companies',
      messages: [
          { owner: 'user', text: "I want to compare the most profitable manufacturing companies over $50M market cap. Let's see their stock performance over the past 6 years."},
          { owner: 'assistant', text: "Hi Max! To compare the most profitable manufacturing companies with a market cap over $50 million, we'll follow these steps:<br><br><strong>Screen for the Most Profitable Manufacturing Companies:</strong> We'll use net income as our metric for profitability.<br><strong>Generate Stock Performance Chart:</strong> We'll then generate a stock performance chart for the top companies over the last 6 years.<br><br>Let's start by screening for the most profitable manufacturing companies. I'll set the minimum market cap to $50 million.<br><br>I'll proceed with that and get back to you shortly.", },
          { owner: 'assistant', text: "We have screened the top 5 most profitable manufacturing companies with a market capitalization above $50 million. Here are the companies:<br><br><strong>NVIDIA Corporation (NVDA)</strong>: Net income of $29.75 billion<br><strong>Stellantis N.V. (STLA)</strong>: Net income of $25.42 billion<br><strong>Tesla, Inc. (TSLA)</strong>: Net income of $13.61 billion<br><strong>The Coca-Cola Company (KO)</strong>: Net income of $10.78 billion<br><strong>Emerson Electric Co. (EMR)</strong>: Net income of $10.74 billion<br><br>Now, we'll generate a stock performance chart for these companies over the past 6 years to see how their stock prices have performed.", imageUrl: manuf_screen_stock_perf},
          { owner: 'assistant', text: "<h3>Observations:</h3><strong>NVIDIA Corporation (NVDA)</strong> has shown spectacular growth, especially from mid-2023 onwards. Its stock price saw an explosive increase.<br><strong>Stellantis N.V. (STLA)</strong> had a more fluctuating pattern but has regained and surpassed its initial value in the last few months.<br><strong>Tesla, Inc. (TSLA)</strong> witnessed massive growth starting around late 2019 and peaking by the end of 2021. However, it saw some significant drops afterward but remains far above its 2018 value.<br><strong>The Coca-Cola Company (KO)</strong> displayed relatively steady growth with some fluctuations, maintaining a stable appreciation over the years.<br><strong>Emerson Electric Co. (EMR)</strong> experienced moderate growth with some noticeable peaks around 2021-2022 and maintains a gradual upward trend.<br><br>This visualization highlights the substantial volatility in the tech-oriented stocks like NVDA and TSLA, compared to the more stable growth seen in companies like KO and EMR. Let me know if you need any further analysis or other data!"}
      ]
  },
    industrials_debt: {
        title: 'Industrial EV/EBITDA',
        messages: [
            { owner: 'user', text: 'Help me value industrial/manufacturing companies like GE who have a lot of debt. I want to see how that affects their valuations.'},
            { owner: 'assistant', text: "I made a chart showing the <strong>EV to EBITDA Ratio</strong> for some more indebted manufactring companies", imageUrl: manufactoring_evebitda },
            { owner: 'user', text: "Can you tell me about what EV/EBITDA represents?"},
            { owner: 'assistant', text: "Understanding EV/EBITDA: <br>EV/EBITDA stands for Enterprise Value to Earnings Before Interest, Taxes, Depreciation, and Amortization. This financial metric is used to evaluate the valuation of a company relative to its core profit generation ability, excluding the effects of its capital structure and non-cash depreciation expenses. Essentially, it measures how much investors are willing to pay for a dollar of a company's earnings, accounting for its debt and cash levels.<br>Enterprise Value (EV) represents the total value of a company, combining its market capitalization, debt, and subtracting any cash. It reflects the theoretical takeover price if a company were to be bought.<br>EBITDA provides an approximation of a company's current operational profitability and is used because it avoids the distortions from varying capital structures, taxation, and non-cash accounting practices like depreciation.<br><br>Evaluating EV/EBITDA:<br>A lower EV/EBITDA value generally suggests a company might be undervalued relative to its earnings potential, making it a potentially attractive investment.<br>Conversely, a higher EV/EBITDA value indicates the market may be placing a premium on the company, possibly due to expected growth in profitability or efficiency."},
            { owner: 'user', text: "How else could I value these indebted companies?"},
            { owner: 'assistant', text: "Here is the Debt to Equity of these selected companies to understand just how indebted they are.", imageUrl: manufacturing_debtequity }
        ]
    },
    cruise_debtequity: {
        title: 'Cruise Companies Debt',
        messages: [
            { owner: 'user', text: "I've been thinking about companies that had to take on a lot of debt with no revenue during covid, specifically cruise companies like Royal Caribbean and Carnival how can I visualize how much debt these companies have and their ability to pay it back?"},
            { owner: 'assistant', text: "We have generated two charts that provide insight into the leverages and debt servicing capabilities of Royal Caribbean (RCL) and Carnival (CCL) over recent years, covering the COVID-19 period and beyond.<br></br><h3>Debt to Equity Comparison</h3>", imageUrl: cruise_debtequity_img },
            { owner: 'assistant', text: "<h3>Interest Coverage Ratio</h3>", imageUrl: cruise_interestcoverage},
            { owner: 'assistant', text: "The <strong>Interest Coverage Ratios</strong> chart showcases the ability of both companies to pay off their interest expenses from their earnings. The negative values observed during certain periods indicate that earnings were not sufficient to cover interest expenses, primarily resulting from the significant disruptions in operations due to COVID-19. Over time, as the ratios improve and enter positive territory, it indicates a recovery in the companies' abilities to service their debt from operational earnings.<br></br><strong>Key Takeaways:</strong><br></br>Both RCL and CCL have experienced significant increases in their Debt-to-Equity Ratios during the COVID-19 pandemic, reflecting higher levels of debt relative to their equity.<br></br>Interest Coverage Ratios depicted severe pressures on their ability to service debt during the early stages of the pandemic, with noticeable improvements observed as the companies began to recover.<br></br>These charts help visualize the financial challenges faced by RCL and CCL due to COVID-19 and their pathways to financial recovery. However, the elevated Debt-to-Equity Ratios suggest ongoing financial management attention is necessary to ensure long-term sustainability."}
        ]
    }
};


function DemoSection() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const [activeChat, setActiveChat] = useState(demoChats.automotive);
  
    return (
      <Container maxWidth='xl' sx={{ my: 8 }}>
          <Typography variant='h2' component="h2" align='center' gutterBottom sx={{ mb: 6 }}>
              Chat Examples
          </Typography>
          <Typography variant='h5' align='center' gutterBottom sx={{ mb: 4 }}>
              Take a look at our examples to see what AlphaAI can do for you.
          </Typography>
          <Grid container spacing={2} direction={isMobile ? 'column' : 'row'}>
              <Grid item xs={12} md={4}>
                  <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                  }}>
                  {Object.keys(demoChats).map((key) => (
                      <Card key={key} 
                          onClick={() => setActiveChat(demoChats[key])}
                          sx={{
                              backgroundColor: theme.palette.background.paper,
                              boxShadow: 'none',
                              border: `1px solid ${theme.palette.divider}`,
                              borderRadius: 2,
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                  backgroundColor: theme.palette.action.hover,
                                  transform: 'translateY(-5px)',
                                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                              }
                          }}
                      >
                          <CardActionArea sx={{ p: 2 }}>
                              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                                  {demoChats[key].title}
                              </Typography>
                          </CardActionArea>
                      </Card>
                  ))}
                  </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                  <Box sx={{ 
                      backgroundColor: theme.palette.background.chat,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      p: 3,
                  }}>
                      <MessageList height={'600px'}>
                          {activeChat.messages.map((message, index) => (
                              <MessageItem key={index} owner={message.owner}>
                                  <Typography variant='body1' dangerouslySetInnerHTML={{ __html: message.text }} />
                                  {message.imageUrl && <img src={message.imageUrl} alt="chart" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', marginTop: '16px' }} />}
                              </MessageItem>
                          ))}
                      </MessageList>
                  </Box>
              </Grid>
          </Grid>
      </Container>
  );
}

export default DemoSection;