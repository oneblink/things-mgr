import { List, fromJS } from 'immutable';

import { getEventsAndDispatch } from '../../lib/api';
import { nearbySetBeacons, nearbySetWifi } from './nearby';

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
export const eventsRequestSuccess = (events) => (dispatch, getState) => {
  dispatch({ type: EVENTS_REQUEST_SUCCESS, payload: events });
  const beacon = events.filter(({ tags: { type } }) => type === 'beacon')[0];
  if (beacon) {
    dispatch(nearbySetBeacons(beacon.tags.payload || []));
  }
  const wifi = events.filter(({ tags: { type } }) => type === 'wifi')[0];
  if (wifi) {
    dispatch(nearbySetWifi(wifi.tags.payload || []));
  }
};

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
