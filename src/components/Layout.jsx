// src/components/Layout.js
import React, { useEffect } from 'react';
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
    <>
        <Header />
        <main>{children}</main>
        <Footer />
    </>
  );
};

export default Layout;
