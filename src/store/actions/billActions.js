import { ADD_BILL, EDIT_BILL, REMOVE_BILL, SET_FILTER, SET_BUDGET } from './types';

export const addBill = (bill) => ({
  type: ADD_BILL,
  payload: bill,
});

export const editBill = (bill) => ({
  type: EDIT_BILL,
  payload: bill,
});

export const removeBill = (id) => ({
  type: REMOVE_BILL,
  payload: id,
});

export const setFilter = (category) => ({
  type: SET_FILTER,
  payload: category,
});

export const setBudget = (budget) => ({
  type: SET_BUDGET,
  payload: budget,
});

