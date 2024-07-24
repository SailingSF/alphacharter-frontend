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
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: "1.25rem",
    },
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      letterSpacing: 0.5,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
