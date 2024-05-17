import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { trackEvent } from '../analytics';

function Header() {
    const theme = useTheme();

    const handleLoginClick = () => {
        trackEvent('Button', 'Click', 'Header Login Button Click');
        // Navigate to the href
        window.location.href = '/login';
    };

    const handleAlphaaiClick = () => {
        trackEvent('Button', 'Click', 'Header AlphaAI Button Click');
        // Navigate to the href
        window.location.href = '/chat';
    };

    const handleAboutClick = () => {
        trackEvent('Button', 'Click', 'Header About Button Click');
        // Navigate to the href
        window.location.href = '/about';
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
        <AppBar position='static' sx={{ top: 0}}>
            <Toolbar style={{backgroundColor: theme.palette.background.header, color: theme.palette.text.header}}>
                <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
                    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>AlphaCharter</Link>
                </Typography>
                <Button onClick={handleAboutClick} color="inherit">About</Button>
                <Button onClick={handleAlphaaiClick} sx={chatButtonStyle}>AlphaAI</Button>
                {/* <Button component={Link} to="/about" color="inherit">About</Button> */}
                <Button onClick={handleLoginClick} color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
