import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
        default: '#616161',
        surface: '#9E9E9E',
    },
    text: {
        primary: '#f5f5f5',
    }

  },
  typography: {
    fontFamily: '"Bookman", "URW Bookman L", "serif"'
  }
  // Add more theme customization here
});

export default theme;
