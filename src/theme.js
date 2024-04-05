import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F4511E', //deep orange 600
      mainVariant: '#D84315', //deep orange 800
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
        default: '#616161',
        surface: '#9E9E9E',
        header: '#424242', //gray 800
        dark: '#161516',
    },
    text: {
        primary: '#f5f5f5', //white
        header: '#FFA000', //amber 700
    }

  },
  typography: {
    fontFamily: '"Bookman", "URW Bookman L", "serif"'
  }
  // Add more theme customization here
});

export default theme;
