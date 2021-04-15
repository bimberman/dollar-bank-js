import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/';

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
