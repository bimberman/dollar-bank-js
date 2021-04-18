import axios from 'axios';
import store from '../utils/store';

export default async function useGetUsers() {
  return store.dispatch({
    type: 'GET_USERS',
    payload: await getUsers()
  });
}

export function useGetUserById(userId) {
  return store.dispatch({
    type: 'GET_USERS_BY_ID',
    payload: getUserById(userId)
  });
}

export async function usePostUserAuthById(userId, password) {
  return store.dispatch({
    type: 'POST_USER_AUTH_BY_ID',
    payload: await postUserAuthById(userId, password)
  });
}

export async function usePostNewUser(user) {
  return store.dispatch({
    type: 'POST_NEW_USER',
    payload: await postNewUser(user)
  });
}

export async function usePutUpdateUser(user) {
  return store.dispatch({
    type: 'PUT_UPDATE_USER',
    payload: await putUpdateUser(user)
  });
}

const getUsers = async userId => {
  const { data } = await axios.get('users/');
  return data;
};

const getUserById = async userId => {
  const { data } = await axios.get(`users/${userId}/`);
  return data;
};

const postUserAuthById = async (userId, password) => {
  const { data } = await axios.post('users/auth/', { userId, password });
  return data;
};

const postNewUser = async user => {
  const {
    fName,
    lName,
    address,
    phone,
    userId,
    password,
    amount
  } = user;
  const { data } = await axios.post('users/new-user/', {
    fName,
    lName,
    address,
    phone,
    userId,
    password,
    amount
  });

  return data;
};

const putUpdateUser = async user => {
  console.log(user);
  const {
    fName,
    lName,
    address,
    phone,
    userId,
    password
  } = user;
  const { data } = await axios.put(`users/update-user/${user.id}`, {
    fName,
    lName,
    address,
    phone,
    userId,
    password
  });
  return data;
};
