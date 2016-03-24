import { List, fromJS } from 'immutable';
import { createSelector } from 'reselect';

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

export const getEventsByTagsType = createSelector(
  [getEvents],
  (events) => events.groupBy((event) => event.getIn(['tags', 'type']))
);

export const getBeaconEvents = createSelector(
  [getEventsByTagsType],
  (eventGroups) => eventGroups.get('beacon') || new List()
);

export const getWifiEvents = createSelector(
  [getEventsByTagsType],
  (eventGroups) => eventGroups.get('wifi') || new List()
);

export const getRecentBeaconEvent = createSelector(
  [getBeaconEvents],
  (events) => {
    const event = events.first();
    if (event) {
      const date = new Date(event.get('date'));
      const now = new Date();
      if (date > now - 1 * 60 * 1e3) {
        return event;
      }
    }
    return null;
  }
);

export const getRecentWifiEvent = createSelector(
  [getWifiEvents],
  (events) => {
    const event = events.first();
    if (event) {
      const date = new Date(event.get('date'));
      const now = new Date();
      if (date > now - 5 * 60 * 1e3) {
        return event;
      }
    }
    return null;
  }
);

export const countBeacons = createSelector(
  [getRecentBeaconEvent],
  (event) => event ? event.getIn(['tags', 'payload']).count() : 0
);

export const countWifi = createSelector(
  [getRecentWifiEvent],
  (event) => event ? event.getIn(['tags', 'payload']).count() : 0
);
