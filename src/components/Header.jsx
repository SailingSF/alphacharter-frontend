import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { trackEvent } from '../analytics';
import UserMenu from './UserMenu';
import FeatureMenu from './FeatureMenu';

function Header() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLoginClick = () => {
        trackEvent('Button', 'Click', 'Header Login Button Click');
        navigate('/login');
    };

    const handleAboutClick = () => {
        trackEvent('Button', 'Click', 'Header About Button Click');
        navigate('/about');
    };

    return (
        <AppBar position='static' sx={{ top: 0}}>
            <Toolbar style={{backgroundColor: theme.palette.background.header, color: theme.palette.text.header}}>
                <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
                    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>AlphaCharter</Link>
                </Typography>
                <Button onClick={handleAboutClick} color="inherit">About</Button>
                <FeatureMenu />
                {user ? (
                    <UserMenu firstName={user.first_name} />
                ) : (
                    <Button onClick={handleLoginClick} color="inherit">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
