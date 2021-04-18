export default function users(state = {}, action) {
  switch (action.type) {
    case 'GET_CUSTOMERS':
      // the payload is a list of customers that needs to be destructured
      return { ...state, users: { ...action.payload } };
    case 'GET_TRANSACTION_BY_USER_ID':
      return { ...state, transactions: [...action.payload] };
    case 'POST_NEW_USER':
      return { ...state, user: { ...action.payload } };
    case 'POST_USER_AUTH_BY_ID':
      return { ...state, user: { ...action.payload } };
    case 'PUT_UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    default: return state;
  }
}
