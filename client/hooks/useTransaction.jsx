import axios from 'axios';
import store from '../utils/store';

export default async function useGetTransactions() {
  return store.dispatch({
    type: 'GET_TRANSACTIONS',
    payload: await getTransactions()
  });
}

export async function useGetTransactionsByUserId(userId) {
  return store.dispatch({
    type: 'GET_TRANSACTIONS_BY_USER_ID',
    payload: await getTransactionsByUserId(userId)
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

const getTransactionsByUserId = async userId => {
  const { data } = await axios.get(`transactions/${userId}/`);
  return data;
};

const postNewTransaction = async props => {
  const {
    amount,
    label,
    accountId,
    userId
  } = props;
  const { data } = await axios.post('transactions/new-transaction/', { amount, label, accountId, userId });
  return data;
};
