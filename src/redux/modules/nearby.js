import { List, fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';

export const NEARBY_SET_BEACONS = 'NEARBY_SET_BEACONS';
export const nearbySetBeacons = (beacons) => ({
  type: NEARBY_SET_BEACONS,
  payload: beacons
});

export const NEARBY_SET_WIFI = 'NEARBY_SET_WIFI';
export const nearbySetWifi = (wifi) => ({
  type: NEARBY_SET_WIFI,
  payload: wifi
});

const beaconsReducer = (state = new List(), action) => {
  if (action.type === NEARBY_SET_BEACONS) {
    return fromJS(action.payload);
  }
  return state;
};

const wifiReducer = (state = new List(), action) => {
  if (action.type === NEARBY_SET_WIFI) {
    return fromJS(action.payload);
  }
  return state;
};

export const nearbyReducer = combineReducers({
  beacons: beaconsReducer,
  wifi: wifiReducer
});

export const getBeacons = (state) => state.getIn(['nearby', 'beacons']);

export const getWifi = (state) => state.getIn(['nearby', 'wifi']);

export const countBeacons = createSelector(
  [getBeacons],
  (beacons) => beacons.count()
);

export const countWifi = createSelector(
  [getWifi],
  (wifi) => wifi.count()
);
