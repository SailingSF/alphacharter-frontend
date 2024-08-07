import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import 'katex/dist/katex.min.css';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import ChatPage from './components/ChatPage';
import SignUpForm from './components/SignUpForm';
import Layout from './components/Layout';
import TeamPage from './components/TeamPage';
import AboutPage from './components/AboutPage';
import ChartMakerApp from './components/ChartMakerPage';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/chartmaker" element={<ChartMakerApp />} />
        </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
