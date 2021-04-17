import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './AuthContext';

const brandTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      100: '#461220',
      200: '#8c2f39',
      300: '#b23a48',
      400: '#fcb9b2',
      500: '#fcb9b2',
      600: '#fed0bb'
    }
  }
};

export default function AppProviders({ children }) {
  return (
    <Router>
      <ChakraProvider theme={brandTheme}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </Router>
  );
}
