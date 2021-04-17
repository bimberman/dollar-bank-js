import axios from 'axios';
import store from '../utils/store';

export default async function useGetTransactions() {
  return store.dispatch({
    type: 'GET_TRANSACTIONS',
    payload: await getTransactions()
  });
}

export function useGetTransactionById(transactionId) {
  return store.dispatch({
    type: 'GET_TRANSACTION_BY_ID',
    payload: getTransactionById(transactionId)
  });
}

export function usePostNewTransaction(props) {
  return store.dispatch({
    type: 'POST_NEW_TRANSACTION',
    payload: postNewTransaction(props)
  });
}

const getTransactions = async transactionId => {
  const { data } = await axios.get('transactions/');
  return data;
};

const getTransactionById = async transactionId => {
  const { data } = await axios.get(`transactions/${transactionId}/`);
  return data;
};

const postNewTransaction = async props => {
  const {
    amount,
    label,
    accountId,
    customerId
  } = props;
  const { data } = await axios.post('transactions/new-transaction/', { amount, label, accountId, customerId });
  // eslint-disable-next-line no-console
  console.log(data);
  return data;
};
