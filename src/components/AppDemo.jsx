import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardActionArea, Grid, Typography } from '@mui/material';
import { MessageItem, MessageList } from './MessageComponents';
import autocomapny from '../images/autocompanies_2022.png'

const demoChats = {
    automotive: { title: "Auto Company Stock Performance",
        messages: [
      { owner: 'user', text: "I want to compare the stock performance of automotive companies Ford, Tesla, GM, and Chrysler (I think the stock is called something different) since 2022?"},
      { owner: 'assistant', text: "Sure, here's the price return for automotive companies Ford (F), GM (GM), Tesla (TSLA), and Stellantis (STLA)", imageUrl: autocomapny  },
      { owner: 'user', text: "That's interesting, why has Stellantis outperformed so much?" },
      { owner: 'assistant', text: "Stellantis' outperformance in the stock market, as observed from the recent trends, can be attributed to several key factors that differentiate it from its competitors:<br></br>Merger Benefits: Stellantis was formed through the merger of Fiat Chrysler Automobiles (FCA) and the PSA Group in January 2021. The merger synergies, including cost savings, efficiencies in production, and a more robust product lineup, have likely started to bear fruit, positively impacting investor sentiment and the stock performance.<br></br>Diversified Portfolio: Stellantis possesses a diverse brand portfolio, including Jeep, Ram, Peugeot, and Citroën, among others. This diversity allows it to cater to various market segments, from luxury to mainstream and commercial vehicles, providing a hedge against market volatility and regional economic downturns." },
      // Add more messages as needed
    ]},
    chipDesign: { title: "Chip Companies P/S",
        messages: [
      { owner: 'assistant', text: "Let's look at the Price to Sales ratio for chip design companies." },
      { owner: 'user', text: 'Please show the details.' },
      { owner: 'assistant', text: 'Here are the details:', imageUrl: '/path/to/chip/design/graph.png' },
      // Add more messages as needed
    ]},
};


function DemoSection() {
    const theme = useTheme();
    const [activeChat, setActiveChat] = useState(demoChats.automotive);
  
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {Object.keys(demoChats).map((key) => (
            <Card key={key} style={{ padding: '20px', backgroundColor: theme.palette.background.surface }} onClick={() => setActiveChat(demoChats[key])}>
              <CardActionArea>
                <Typography variant="h5">
                  {demoChats[key].title}
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={8} style={{ backgroundColor: theme.palette.background.dark}}>
          <MessageList>
            {activeChat.messages.map((message, index) => (
              <MessageItem key={index} owner={message.owner}>
                <Typography variant='body1' dangerouslySetInnerHTML={{ __html: message.text }} />
                {message.imageUrl && <img src={message.imageUrl} alt="chart" />}
              </MessageItem>
            ))}
          </MessageList>
        </Grid>
      </Grid>
    );
  }
  
export default DemoSection;