import { combineReducers } from 'redux-immutable';

export const DISCHARGE_SET_RECIPIENT = 'DISCHARGE_SET_RECIPIENT';
export const dischargeSetRecipient = (email) => ({
  type: DISCHARGE_SET_RECIPIENT,
  payload: email
});

export const DISCHARGE_SET_USER = 'DISCHARGE_SET_USER';
export const dischargeSetUser = (user) => ({
  type: DISCHARGE_SET_USER,
  payload: user
});

export const DISCHARGE_SUBMIT = 'DISCHARGE_SUBMIT';
export const dischargeSubmit = () => ({ type: DISCHARGE_SUBMIT });

const recipientReducer = (state = '', action) => {
  if (action.type === DISCHARGE_SET_RECIPIENT) {
    return action.payload;
  }
  return state;
};

const userReducer = (state = '', action) => {
  if (action.type === DISCHARGE_SET_USER) {
    return action.payload;
  }
  return state;
};

export const dischargeReducer = combineReducers({
  recipient: recipientReducer,
  user: userReducer
});

export const getRecipient = (state) => state.getIn(['discharge', 'recipient']);

export const getUser = (state) => state.getIn(['discharge', 'user']);
