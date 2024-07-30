// src/components/Layout.js
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import Header from './Header';
import Footer from './Footer';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const tagManagerArgs = {
      dataLayer: {
        event: 'pageview',
        page: {
          path: location.pathname,
          search: location.search,
          title: document.title,
        },
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }, [location]);
};

const Layout = ({ children }) => {
  usePageTracking();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, display: 'flex' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
