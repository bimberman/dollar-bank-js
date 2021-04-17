export default function customers(state = [], action) {
  switch (action.type) {
    case 'GET_CUSTOMERS':
      // the payload is a list of customers that needs to be destructured
      return [...state, ...action.payload];
    default: return state;
  }
}

export function accounts(state = [], action) {
  switch (action.type) {
    case 'GET_ACCOUNTS':
      return [...state, ...action.payload];
    default: return state;
  }
}

export function transactions(state = [], action) {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return [...state, ...action.payload];
    default: return state;
  }
}
