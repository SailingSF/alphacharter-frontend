import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardActionArea, Container, Grid, Typography, Box, useMediaQuery } from '@mui/material';
import { marked } from 'marked';
import chartmaker_performance_comparison from '../images/chartmaker/performance_comparison.png';
import chartmaker_price_sales_semis from '../images/chartmaker/price_sales_semis.png';
import chartmaker_cash_flow_oil from '../images/chartmaker/cash_flow_oil.png';

marked.setOptions({
    breaks: true, // Converts single line breaks to <br>
  });

const examples = {
    "performance_comparison":
        {
            "name": "Performance Comparison",
            "prompt": "Compare Nvidia, Tesla, and Meta stock since 2018",
            "image": chartmaker_performance_comparison,
            "analysis": "The chart illustrates the stock performance of **Nvidia (NVDA), Tesla (TSLA), and Meta (META)** from January 2018 to July 2024, setting each value at $100 at the beginning of the chart.\n\nFrom the data, we can see that Nvidia has experienced the most significant growth over this period, especially from 2020 onwards, where its stock value surged over 10 times. This dramatic increase reflects Nvidia's strong position in the semiconductor industry, particularly in graphics processing units (GPUs) and artificial intelligence applications.\n\nTesla's stock also shows a remarkable upward trend, particularly during the pandemic and in the subsequent years, peaking at over $1,600 in late 2021 before experiencing some volatility. Tesla's growth can be attributed to its leadership in the electric vehicle market and increasing production capacity.\n\nMeta's performance has been more subdued in comparison. Although it has seen some recovery since 2022, its stock price has not reached the highs seen in 2021, reflecting challenges such as regulatory scrutiny and changing market dynamics.\n\nInvestors looking at these three stocks should consider Nvidia's robust growth potential in tech advancements, Tesla's innovative edge in automotive technology, and Meta's strategic pivots in social media and virtual reality. Overall, Nvidia appears to be the strongest performer in this comparison, while Tesla and Meta present different risk and growth profiles."
        },
    "price_sales_ratio":
        {
            "name": "Price to Sales Valuation",
            "prompt": "Show me the recent price to sales ratios of semiconductor companies.",
            "image": chartmaker_price_sales_semis,
            "analysis": "The chart displays the recent Price to Sales (P/S) ratios of major semiconductor companies including Intel (INTC), AMD (AMD), NVIDIA (NVDA), Texas Instruments (TXN), and Silicon Labs (SLAB) from January 2023 to August 2024.\n\n### Analysis: \n\n - **Silicon Labs (SLAB)** shows significant fluctuations in its P/S ratio, peaking around early 2024, indicating a volatile market perception of its sales relative to its market cap.\n\n - **Texas Instruments (TXN)** consistently maintains a high P/S ratio, reflecting strong market confidence in its sales performance, which could suggest stability and investor trust in its business model.\n\n - **NVIDIA (NVDA)** displays a very high P/S ratio, particularly in 2023, which suggests that the market has high expectations for its future sales growth, likely driven by its advancements in AI and gaming technologies.\n\n - **AMD** also shows an upward trend in its P/S ratio, especially in early 2024, indicating growing investor confidence as it competes with NVIDIA in the graphics and computing sectors.\n\n - **Intel (INTC)** has the lowest P/S ratio among the group, suggesting a more cautious market perception, possibly due to recent challenges in maintaining its competitive edge in the semiconductor industry.\n\n  Overall, the P/S ratio is a crucial metric for evaluating how much investors are willing to pay for a company's sales, and these trends can help guide investment decisions in the semiconductor sector."
        },
    "cash_flow_oil": {
        "name": "Cash Flow for Oil Companies",
        "prompt": "Show me recent cash flow for oil companies like Exxon",
        "image": chartmaker_cash_flow_oil,
        "analysis": "### Recent Free Cash Flow of Major Oil Companies\n\nThe chart above illustrates the free cash flow for major oil companies, specifically ExxonMobil (XOM) and Chevron (CVX), from Q3 2021 to Q1 2024. Free cash flow is calculated as operating cash flow minus capital expenditures, providing insight into the cash available for distribution among investors, debt repayment, and reinvestment.\n\n#### Key Observations:\n- **ExxonMobil (XOM)** shows a significant increase in free cash flow, particularly in mid-2022, peaking at approximately $19.5 billion in Q3 2022. However, there is a notable decline in Q2 2023, with free cash flow dropping to $4.02 billion, before recovering again in the following quarters.\n- **Chevron (CVX)** experienced fluctuations in free cash flow, with a peak of around $12.27 billion in Q3 2022. The free cash flow has been relatively lower in recent quarters, indicating potential operational challenges or increased capital expenditures.\n\n### Investment Implications:\n- The strong free cash flow figures for ExxonMobil indicate robust operational efficiency and the ability to fund dividends, share buybacks, and debt reduction. This could make XOM an attractive option for investors seeking stability and income.\n- Chevron's fluctuating free cash flow may raise concerns about its ability to sustain dividend payments or reinvest in growth opportunities, making it less appealing compared to ExxonMobil if trends continue.\n\nOverall, investors should monitor these trends closely, as free cash flow is a critical indicator of a company's financial health and operational performance."
    }
    
};

function ChartMakerDemo() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeExample, setActiveExample] = useState(examples.performance_comparison);

    return (
        <Container maxWidth='xl' sx={{ my: 8 }}>
          <Typography variant='h2' component="h2" align='center' gutterBottom sx={{ mb: 6 }}>
              Chart Maker Examples
          </Typography>
          <Typography variant='h5' align='center' gutterBottom sx={{ mb: 4 }}>
              Have AI make charts with a simple prompt.
          </Typography>
          <Grid container spacing={2} direction={isMobile ? 'row' : 'column'}>
              <Grid item xs={12} md={4}>
                  <Box sx={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: 3,
                  }}>
                  {Object.keys(examples).map((key) => (
                      <Card key={key} 
                          onClick={() => setActiveExample(examples[key])}
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
                              },
                              margin: isMobile ? '10px 0' : '0 auto',
                          }}
                      >
                          <CardActionArea sx={{ p: 2 }}>
                              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                                  {examples[key].name}
                              </Typography>
                          </CardActionArea>
                      </Card>
                  ))}
                  </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                  <Box sx={{ 
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      p: 3,
                      width: isMobile ? '100%' : 'auto',
                  }}>
                        <Typography variant='h5'>
                          <strong>Prompt: </strong>{activeExample.prompt}<br/>
                        </Typography>
                        <hr style={{ margin: '20px 0', border: 'none', borderBottom: '1px solid #ccc' }} />
                        <img 
                            src={activeExample.image} 
                            alt={`Financial Chart ${activeExample.name}`} 
                            style={{ 
                            width: '100%', 
                            maxHeight: isMobile ? '300px' : '500px',
                            objectFit: 'contain'
                            }} 
                        />
                        <Typography variant='body1' dangerouslySetInnerHTML={{ __html: marked(activeExample.analysis) }} />
                  </Box>
              </Grid>
          </Grid>
        </Container>
    );
}

export default ChartMakerDemo

