import axios from 'axios';
import store from '../utils/store';

export default async function useGetCustomers() {
  return store.dispatch({
    type: 'GET_CUSTOMERS',
    payload: await getCustomers()
  });
}

export function useGetCustomerById(customerId) {
  return store.dispatch({
    type: 'GET_CUSTOMER_BY_ID',
    payload: getCustomerById(customerId)
  });
}

export function usePostCustomerAuthById(customerId, password) {
  return store.dispatch({
    type: 'POST_CUSTOMER_AUTH_BY_ID',
    payload: postCustomerAuthById(customerId, password)
  });
}

export function usePostNewCustomer(props) {
  return store.dispatch({
    type: 'POST_NEW_CUSTOMER',
    payload: postNewCustomer(props)
  });
}

const getCustomers = async customerId => {
  const { data } = await axios.get('customers/');
  return data;
};

const getCustomerById = async customerId => {
  const { data } = await axios.get(`customers/${customerId}/`);
  return data;
};

const postCustomerAuthById = async (customerId, password) => {
  const { data } = await axios.post('customers/auth/', { customerId, password });
  return data;
};

const postNewCustomer = async props => {
  const {
    amount,
    label,
    accountId,
    customerId
  } = props;
  const { data } = await axios.post('customers/new-customer/', { amount, label, accountId, customerId });
  // eslint-disable-next-line no-console
  console.log(data);
  return data;
};
