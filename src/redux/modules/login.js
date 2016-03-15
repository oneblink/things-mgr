import Immutable from 'immutable';

export const LOGIN_SET_USERNAME = 'LOGIN_SET_USERNAME';
export const loginSetUsername = (username) => ({
  type: LOGIN_SET_USERNAME,
  payload: username
});

export const LOGIN_SET_PASSWORD = 'LOGIN_SET_PASSWORD';
export const loginSetPassword = (password) => ({
  type: LOGIN_SET_PASSWORD,
  payload: password
});

const initialState = Immutable.fromJS({
  username: '',
  password: ''
});

// custom immutable-friendly reducer: https://github.com/gajus/redux-immutable
export const loginReducer = (state = initialState, action) => {
  if (action.type === LOGIN_SET_USERNAME) {
    return state.set('username', action.payload);
  }
  if (action.type === LOGIN_SET_PASSWORD) {
    return state.set('password', action.payload);
  }
  return state;
};
