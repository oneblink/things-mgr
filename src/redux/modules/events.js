import { List, fromJS } from 'immutable';

import { getEventsAndDispatch } from '../../lib/api';

export const EVENTS_REQUEST = 'EVENTS_REQUEST';
export const eventsRequest = () => (dispatch, getState) => {
  dispatch({ type: EVENTS_REQUEST });
  return getEventsAndDispatch({
    actionError: eventsRequestError,
    actionSuccess: eventsRequestSuccess,
    dispatch
  });
};

export const EVENTS_REQUEST_SUCCESS = 'EVENTS_REQUEST_SUCCESS';
export const eventsRequestSuccess = (events) => ({
  type: EVENTS_REQUEST_SUCCESS,
  payload: events
});

export const EVENTS_REQUEST_ERROR = 'EVENTS_REQUEST_ERROR';
export const eventsRequestError = (error) => ({
  type: EVENTS_REQUEST_ERROR,
  payload: error,
  error: true
});

export const eventsReducer = (state = new List(), action) => {
  if (action.type === EVENTS_REQUEST_SUCCESS) {
    return fromJS(action.payload);
  }
  if (action.type === EVENTS_REQUEST_ERROR) {
    console.log(action.type, action.payload);
  }
  return state;
};

export const getEvents = (state) => state.get('events');
