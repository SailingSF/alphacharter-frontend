import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
    return (
        <Box style={{ backgroundColor: theme.palette.background.dark, width: '100%' }}>
            <Box textAlign="center" p={4}>
                <Box className="svg-container">
                    <svg width="100%" height="200px" viewBox="0 0 250 100" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d={svgPath}
                            stroke={theme.palette.primary.main}
                            transform="scale(2.5,-1) translate(0,-100)"
                            strokeWidth="0.5"
                            fill="none"
                            className="draw-line"
                        />
                    </svg>
                </Box>
                <Typography variant="h4" gutterBottom>
                    Get your virtual quant now!
                </Typography>
                <Button variant="contained" color="primary" href={href}>
                    {text} 
                </Button>
            </Box>
        </Box>
    );
}
export default CallToAction;
