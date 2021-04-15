import React, { useEffect, useState } from 'react';
import store from '../utils/store';
import useGetCustomers from '../hooks/useCustomer';
import useGetAccounts from '../hooks/useAccount';
import getHealthCheck from '../hooks/useHealthCheck';

const App = props => {

  const [message, setMessage] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    const data = await getHealthCheck();
    if (data) {
      setMessage(data.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    useGetCustomers();
    store.subscribe(() => {
      // eslint-disable-next-line no-console
      console.log('store changed!', store.getState());
    });
  }, []);

  return (
      <>
      {
        isLoading
          ? <h1>Loading...</h1>
          : <h1>{ message.toUpperCase() }</h1>
      }
      </>
  );
};

export default App;
