import { createStore } from 'redux';
import users from './reducer';

const store = createStore(users);

export default store;
