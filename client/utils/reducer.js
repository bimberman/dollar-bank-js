export default function reducer(state = [], action) {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return [...state, action.payload];
    case 'GET_CUSTOMERS':
      return [...state, action.payload];
    default: return state;
  }
}
