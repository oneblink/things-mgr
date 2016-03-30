import { combineReducers } from 'redux-immutable';

import { getTags, tagsRequest } from './tags';
import { postDischarge } from '../../lib/api';

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
export const dischargeSubmit = () => (dispatch, getState) => {
  dispatch({ type: DISCHARGE_SUBMIT });
  const userId = getUser(getState());
  const tags = getTags(getState());
  const tag = tags.find((t) => t.getIn(['links', 'users']) === userId);
  if (userId && tag) {
    postDischarge(tag.get('id'))
      .then(() => dispatch(tagsRequest()));
  }
};

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
