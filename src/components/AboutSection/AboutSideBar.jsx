import React from 'react';
import { Box, List, ListItemButton, ListItemText, useTheme } from '@mui/material';




const Sidebar = () => {
    const theme = useTheme();

    return (
      <Box sx={{ width: { xs: '100%', sm: 240 }, height: '100%',  overflow: 'auto', bgcolor: theme.palette.background.surface}}>
        <List component="nav">
          <ListItemButton component="a" href="#introduction">
            <ListItemText primary="Introduction" />
          </ListItemButton>
          <ListItemButton component="a" href="#what-is">
            <ListItemText primary="What Is AlphaCharter" />
          </ListItemButton>
          <ListItemButton component="a" href="#alphaai">
            <ListItemText primary="AlphaAI" />
          </ListItemButton>
          <ListItemButton component="a" href="#faq">
            <ListItemText primary="FAQ" />
          </ListItemButton>
          <ListItemButton component="a" href="./team">
            <ListItemText primary="Team" />
          </ListItemButton>
        </List>
      </Box>
    );
}

export default Sidebar;