export default function users(state = {}, action) {
  switch (action.type) {
    case 'GET_CUSTOMERS':
      return { ...state, users: { ...action.payload } };
    case 'GET_TRANSACTIONS_BY_USER_ID':
      return { ...state, transactions: [...action.payload] };
    case 'GET_ACCOUNTS_BY_USER_ID':
      return { ...state, accounts: [...action.payload] };
    case 'POST_NEW_USER':
      return { ...state, user: { ...action.payload } };
    case 'POST_USER_AUTH_BY_ID':
      return { ...state, user: { ...action.payload } };
    case 'PUT_UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    default: return state;
  }
}
