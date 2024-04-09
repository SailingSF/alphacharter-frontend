import React from 'react';
import { Box, Typography, useTheme, Icon } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Assuming you're using Material-UI icons

function AttentionSection({title, text }) {
  const theme = useTheme();

  return (
    <Box sx={{
      p: 3,
      backgroundColor: theme.palette.background.surface,
      color: theme.palette.warning.contrastText,
      display: 'flex',
      alignItems: 'center',
      mb: 2,
      mt: 2,
      borderRadius: theme.shape.borderRadius,
      border: '1.5px solid white'
    }}>
      <Icon component={WarningAmberIcon} sx={{ mr: 2 }} />
      <div>
        <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography component="span" sx={{ ml: 1 }}>
          {text}
        </Typography>
      </div>
    </Box>
  );
}

export default AttentionSection;
