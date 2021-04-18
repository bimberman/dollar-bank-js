import React from 'react';
import Routes from './routes';
import store from '../utils/store';

const App = props => {
  store.subscribe(() => {
    console.log('store changed!', store.getState());
  });

  return (
    <Routes>
    </Routes>
  );
};

export default App;
