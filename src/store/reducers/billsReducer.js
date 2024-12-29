import { ADD_BILL, EDIT_BILL, REMOVE_BILL, SET_FILTER, SET_BUDGET } from '../actions/types';

const initialState = {
  bills: [],
  filter: 'all',
  budget: 50000,
};

const billsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BILL:
      return {
        ...state,
        bills: [...state.bills, action.payload],
      };
    case EDIT_BILL:
      return {
        ...state,
        bills: state.bills.map(bill =>
          bill.id === action.payload.id ? action.payload : bill
        ),
      };
    case REMOVE_BILL:
      return {
        ...state,
        bills: state.bills.filter(bill => bill.id !== action.payload),
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case SET_BUDGET:
      return {
        ...state,
        budget: action.payload,
      };
    default:
      return state;
  }
};

export default billsReducer;

