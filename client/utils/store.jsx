import { createStore } from 'redux';
import customers, { accounts, transactions } from './reducer';

const store = createStore(customers);

export default store;
