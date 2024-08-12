// UserMenu.js
import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserMenu({ firstName, onLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        {firstName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); navigate('/how-to-use'); }}>How do I use AlphaAI?</MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/edit-account'); }}>Edit Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;