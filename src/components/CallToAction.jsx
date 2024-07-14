import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { trackEvent } from '../analytics';
import './DrawLine.css';
import sp500_path from '../images/sp500_path.txt'

function CallToAction({ text, href }) {
    const theme = useTheme();
    const [svgPath, setSvgPath] = useState('')

    useEffect(() => {
        fetch(sp500_path)
          .then((response) => response.text())
          .then((data) => {
            setSvgPath(data);
          });
      }, []);

    const handleButtonClick = () => {
    trackEvent('Button', 'Click', 'Call to Action Buttom');
    // Navigate to the href
    window.location.href = href;
    };
    return (
        <Box style={{ backgroundColor: theme.palette.background.dark, width: '100%' }}>
            <Box textAlign="center" p={4}>
                <Box className="svg-container">
                    <svg width="100%" height="200px" viewBox="0 0 250 100">
                        <path
                            d={svgPath}
                            stroke={theme.palette.secondary.mainVariant}
                            transform="scale(2.5,-1) translate(0,-100)"
                            strokeWidth="0.5"
                            fill="none"
                            className="draw-line"
                        />
                    </svg>
                </Box>
                <Typography variant="h4" style={{ color: theme.palette.text.white }} gutterBottom>
                    Sign up to get your virtual quant
                </Typography>
                <Button variant="contained" color="primary" onClick={handleButtonClick}>
                    {text} 
                </Button>
            </Box>
        </Box>
    );
}
export default CallToAction;
