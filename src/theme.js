import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F4511E', //deep orange 600
      mainVariant: '#D84315', //deep orange 800
    },
    secondary: {
      main: '#e31855',
    },
    background: {
        default: '#616161',
        surface: '#9E9E9E',
        header: '#424242', //gray 800
        dark: '#161516',
        light: '#F5F5F5', // gray 100
        medium: '#bdbdbd',
    },
    text: {
        primary: '#f5f5f5', //white
        header: '#FFA000', //amber 700
        dark: '#161516',
        light: '#F5F5F5', //grey 100
    },

  },
  typography: {
    fontFamily: '"Bookman", "URW Bookman L", "serif"',
    h1: {
      fontFamily: 'Libre Baskerville, serif',
      fontWeight: 700
    },
    h2: {
      fontFamily: 'Libre Baskerville, serif',
      fontWeight: 400
    },
    h3: {
      fontFamily: 'Libre Baskerville, serif',
      fontWeight: 400
    },
    h4: {
      fontFamily: 'Libre Baskerville, serif',
      fontWeight: 400
    },
    h5: {
      fontFamily: 'Libre Baskerville, serif',
      fontWeight: 400
    },
    button: {
      fontFamily: 'Libre Baskerville, serif',
      fontWeight: 400,
      letterSpacing: 0.5
    }
  },
  shape: {
    borderRadius: '10px'
  }
  // Add more theme customization here
});

export default theme;
