import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4C82A9", // steel blue
      mainVariant: "#C7D9E6", // colombia blue
    },
    secondary: {
      main: "#A167A5", // pomp and power
      mainVariant: "#BB7E8C",  // puce
    },
    background: {
      default: "#F5F3F5", // white smoke
      surface: "#F5F7FF",
      header: "#190933", // russian violet
      dark: "#190933", // russian violet
      light: "#F5F7FF",
      medium: "#C7D9E6", // colombia blue
      paper: "#FFFFFF",
      chat: "#1E1E1E", // Dark background for chat interface
    },
    text: {
      primary: "#212121",
      secondary: "#455A64",
      header: "#FFFFFF",
      dark: "#263238",
      light: "#546E7A",
      paper: "#424242",
      white: "#FFFFFF",
    },
    chat: {
      user: "#47507f", // east bay
      assistant: "#303752", // martinique
      scroll: "#263238",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      fontSize: { xs: '2.5rem', md: '3rem' },
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: { xs: '2rem', md: '2.5rem' },
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: "2rem",
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
      fontSize: "1.75rem",
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
    button: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      letterSpacing: 0.5,
      textTransform: "none",
    },
  },
  spacing: 8,
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
  ],
  shape: {
    borderRadius: 8,
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

export default theme;
