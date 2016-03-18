import { combineReducers } from 'redux-immutable';

export const REGISTER_SET_TAG = 'REGISTER_SET_TAG';
export const registerSetTag = (tag) => ({
  type: REGISTER_SET_TAG,
  payload: tag
});

export const REGISTER_SET_USER = 'REGISTER_SET_USER';
export const registerSetUser = (id, name) => ({
  type: REGISTER_SET_USER,
  payload: { id, name }
});

const tagReducer = (state = '', action) => {
  if (action.type === REGISTER_SET_TAG) {
    return action.payload;
  }
  return state;
};

const userIdReducer = (state = '', action) => {
  if (action.type === REGISTER_SET_USER) {
    return action.payload.id;
  }
  return state;
};

const userNameReducer = (state = '', action) => {
  if (action.type === REGISTER_SET_USER) {
    return action.payload.name;
  }
  return state;
};

export const userReducer = combineReducers({
  id: userIdReducer,
  name: userNameReducer
});

export const registerReducer = combineReducers({
  tag: tagReducer,
  user: userReducer
});
