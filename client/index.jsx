import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import AppProviders from './context/index';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3005/api/';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.querySelector('#root')
);
