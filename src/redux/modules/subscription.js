import { List } from 'immutable';
import { combineReducers } from 'redux-immutable';

export const SUBSCRIPTION_SET_SUBJECT = 'SUBSCRIPTION_SET_SUBJECT';
export const subscriptionSetSubject = (user) => ({
  type: SUBSCRIPTION_SET_SUBJECT,
  payload: user
});

export const SUBSCRIPTION_NEW_RECIPIENT = 'SUBSCRIPTION_NEW_RECIPIENT';
export const subscriptionNewRecipient = () => ({
  type: SUBSCRIPTION_NEW_RECIPIENT
});

export const SUBSCRIPTION_EDIT_RECIPIENT = 'SUBSCRIPTION_EDIT_RECIPIENT';
export const subscriptionEditRecipient = (index, recipient) => ({
  type: SUBSCRIPTION_EDIT_RECIPIENT,
  payload: { index, recipient }
});

export const SUBSCRIPTION_TRIM_RECIPIENTS = 'SUBSCRIPTION_TRIM_RECIPIENTS';
export const subscriptionTrimRecipients = () => ({
  type: SUBSCRIPTION_TRIM_RECIPIENTS
});

const recipientsReducer = (state = new List(), action) => {
  if (action.type === SUBSCRIPTION_EDIT_RECIPIENT) {
    const { index, recipient } = action.payload;
    return state.set(index, recipient.trim());
  }
  if (action.type === SUBSCRIPTION_NEW_RECIPIENT) {
    return state.push('');
  }
  if (action.type === SUBSCRIPTION_TRIM_RECIPIENTS) {
    return state.filter((recipient) => !!recipient.trim());
  }
  return state;
};

const subjectReducer = (state = '', action) => {
  if (action.type === SUBSCRIPTION_SET_SUBJECT) {
    return action.payload;
  }
  return state;
};

export const subscriptionReducer = combineReducers({
  recipients: recipientsReducer,
  subject: subjectReducer
});
