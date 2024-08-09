// UserMenu.js
import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { trackEvent } from '../analytics';

function FeatureMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    trackEvent('Button', 'Click', 'Header AlphaAI Button Click');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const chatButtonStyle = {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    margin: '0 12px',
    borderRadius: theme.shape.borderRadius,
    padding: '6px 16px',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: 16,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    }
};

  return (
    <>
      <Button color="inherit" onClick={handleClick} sx={ chatButtonStyle }>
        AlphaAI
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); navigate('/chat'); }}>Chat</MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/chartmaker'); }}>Chart Maker</MenuItem>
      </Menu>
    </>
  );
}

export default FeatureMenu;