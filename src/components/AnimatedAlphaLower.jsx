import React from 'react';
import { useTheme } from '@mui/material/styles';
import './DrawLine.css'; // Assuming you have a CSS file for the animation

function AnimatedAlpha() {
    const theme = useTheme();
    return (
        <div style={{ textAlign: 'center' }}>
            <svg width="200" height="200" viewBox="155 0 100 300">
                <path
                    d="m239.84 120.88h31.498l-19.084 85.787q-5.5604 24.458-7.5968 30.016 7.4117 34.093 21.493 34.093 16.676 0 17.232-22.975h6.6701q-0.5282 21.493-7.9671 34.834-7.2262 13.155-19.084 13.155-9.8203 0-14.637-7.9673-4.8147-7.9673-10.376-32.61-19.27 40.578-62.997 40.578-29.831 0-47.433-23.161-17.602-23.346-17.602-66.702 0-42.616 19.27-66.332 19.269-23.716 46.321-23.716 19.084 0 31.313 13.526 12.229 13.526 21.679 44.098zm-16.305 72.632q-8.7082-29.831-19.455-46.507-10.746-16.861-25.755-16.861-33.907 0-33.907 79.302 0 75.226 32.425 75.226 28.163 0 41.689-66.332z"
                    fill="none"
                    stroke={theme.palette.primary.main}
                    strokeWidth="4"
                    className="draw-line"
                />
            </svg>
        </div>
    );
}

export default AnimatedAlpha;


