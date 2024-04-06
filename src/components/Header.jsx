import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function Header() {
    const theme = useTheme();

    return (
        <AppBar position='static'>
            <Toolbar style={{backgroundColor: theme.palette.background.header, color: theme.palette.text.header}}>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>AlphaCharter</Link>
                </Typography>
                <Button component={Link} to="/" color="inherit">Home</Button>
                <Button component={Link} to="/chat" color="inherit">Chat</Button>
                {/* <Button component={Link} to="/about" color="inherit">About</Button> */}
                <Button component={Link} to="/login" color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
