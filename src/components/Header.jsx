import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function Header() {
    const theme = useTheme();

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
        <AppBar position='static'>
            <Toolbar style={{backgroundColor: theme.palette.background.header, color: theme.palette.text.header}}>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>AlphaCharter</Link>
                </Typography>
                <Button component={Link} to="/" color="inherit">Home</Button>
                <Button component={Link} to="/chat" sx={chatButtonStyle}>AlphaAI</Button>
                {/* <Button component={Link} to="/about" color="inherit">About</Button> */}
                <Button component={Link} to="/login" color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
