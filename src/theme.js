import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      mainVariant: '#1976D2',
    },
    secondary: {
      main: '#FF4081',
      mainVariant: '#17a63a',
    },
    background: {
      default: '#E8EAF6',
      surface: '#F5F7FF',
      header: '#3F51B5',
      dark: '#303F9F',
      light: '#F5F7FF',
      medium: '#C5CAE9',
      paper: '#FFFFFF',
      chat: '#1E1E1E',  // Dark background for chat interface
    },
    text: {
      primary: '#212121',
      secondary: '#455A64',
      header: '#FFFFFF',
      dark: '#263238',
      light: '#546E7A',
      paper: '#424242',
      white: '#FFFFFF',
    },
    chat: {
      user: '#2C2C2C',    // Dark gray for user messages
      assistant: '#323232' // Slightly lighter gray for assistant messages
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: '1.25rem',
    },
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      letterSpacing: 0.5,
      textTransform: 'none',
    }
  },
  shape: {
    borderRadius: 8
  },
});

export default theme;