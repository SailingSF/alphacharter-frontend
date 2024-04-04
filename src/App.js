import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your theme
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import ChatPage from './components/ChatPage';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
