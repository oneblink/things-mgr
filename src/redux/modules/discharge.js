import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';

import { getTags, tagsRequest } from './tags';
import { getPDFReport, postDischarge } from '../../lib/api';

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
  const tag = getUserTag(getState());
  if (tag) {
    postDischarge(tag.get('id'))
      .then(() => dispatch(tagsRequest()));
  }
};

export const DISCHARGE_REPORT = 'DISCHARGE_REPORT';
export const dischargeReport = () => (dispatch, getState) => {
  dispatch({ type: DISCHARGE_REPORT });
  const userId = getUser(getState());
  const email = getRecipient(getState());
  if (userId && email) {
    getPDFReport(userId, email);
    dispatch(dischargeSetRecipient(''));
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

export const getUserTag = createSelector(
  [getUser, getTags],
  (userId, tags) => {
    const tag = tags.find((t) => t.getIn(['links', 'users']) === userId);
    return (userId && tag) ? tag : null;
  }
);

export const getReader = createSelector(
  [getUserTag],
  (tag) => tag ? tag.getIn(['links', 'readers']) : null
);
