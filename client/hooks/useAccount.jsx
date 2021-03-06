import axios from 'axios';
import store from '../utils/store';

export default async function useGetAccounts() {
  return store.dispatch({
    type: 'GET_ACCOUNTS',
    payload: await getAccounts()
  });
}

export async function useGetAccountsByUserId(userId) {
  return store.dispatch({
    type: 'GET_ACCOUNTS_BY_USER_ID',
    payload: await getAccountsByUserId(userId)
  });
}

export function useGetAccountById(accountId) {
  return store.dispatch({
    type: 'GET_ACCOUNT_BY_ID',
    payload: getAccountById(accountId)
  });
}

export function usePostNewAccount(props) {
  return store.dispatch({
    type: 'POST_NEW_ACCOUNT',
    payload: postNewAccount(props)
  });
}

const getAccounts = async accountId => {
  const { data } = await axios.get('accounts/');
  return data;
};

const getAccountsByUserId = async userId => {
  const { data } = await axios.get(`accounts/${userId}/`);
  return data;
};

const getAccountById = async accountId => {
  const { data } = await axios.get(`accounts/${accountId}/`);
  return data;
};

const postNewAccount = async props => {
  const {
    amount,
    label,
    accountId
  } = props;
  const { data } = await axios.post('accounts/new-account/', { amount, label, accountId });
  // eslint-disable-next-line no-console
  console.log(data);
  return data;
};
