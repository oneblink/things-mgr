import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

let initialState;

initialState = Immutable.fromJS({
  locationBeforeTransitions: null
});

// custom immutable-friendly reducer: https://github.com/gajus/redux-immutable
export const routerReducer = (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload
    });
  }
  return state;
};
