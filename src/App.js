import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your theme
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AppPage from './components/AppPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/app" element={<AppPage />} />
        </Routes>
    </Router>
    </ThemeProvider>
    
  );
}

export default App;
