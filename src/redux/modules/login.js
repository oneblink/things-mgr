import Immutable from 'immutable';

import { getEntities } from '../../lib/api';

export const LOGIN_CLEAR = 'LOGIN_CLEAR';
export const loginClear = () => ({ type: LOGIN_CLEAR });

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

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const loginSubmit = () => (dispatch, getState) => {
  dispatch({ type: LOGIN_SUBMIT });
  return getEntities('readers')
    .then((data) => {
      const err = data.error || data.errors;
      if (err && err.includes('password')) {
        dispatch(loginSubmitError(new Error('Login failed')));
        return;
      }
      dispatch(loginSubmitSuccess());
    })
    .catch((err) => loginSubmitError(err));
};

export const LOGIN_SUBMIT_SUCCESS = 'LOGIN_SUBMIT_SUCCESS';
export const loginSubmitSuccess = () => ({
  type: LOGIN_SUBMIT_SUCCESS
});

export const LOGIN_SUBMIT_ERROR = 'LOGIN_SUBMIT_ERROR';
export const loginSubmitError = (error) => ({
  type: LOGIN_SUBMIT_ERROR,
  payload: error,
  error: true
});

export const LOGIN_STATE_CHECKING = 'LOGIN_STATE_CHECKING';
export const LOGIN_STATE_ERROR = 'LOGIN_STATE_ERROR';
export const LOGIN_STATE_IN = 'LOGIN_STATE_IN';
export const LOGIN_STATE_OUT = 'LOGIN_STATE_OUT';

const initialState = Immutable.fromJS({
  error: '',
  username: '',
  password: '',
  state: LOGIN_STATE_OUT
});

// custom immutable-friendly reducer: https://github.com/gajus/redux-immutable
export const loginReducer = (state = initialState, action) => {
  if (action.type === LOGIN_CLEAR) {
    return initialState;
  }
  if (action.type === LOGIN_SET_USERNAME) {
    return state.set('username', action.payload);
  }
  if (action.type === LOGIN_SET_PASSWORD) {
    return state.set('password', action.payload);
  }
  if (action.type === LOGIN_SUBMIT) {
    return state.merge({ error: '', state: LOGIN_STATE_CHECKING });
  }
  if (action.type === LOGIN_SUBMIT_SUCCESS) {
    return state.merge({ error: '', state: LOGIN_STATE_IN });
  }
  if (action.type === LOGIN_SUBMIT_ERROR) {
    return state.merge({ error: action.payload.message, state: LOGIN_STATE_ERROR });
  }
  return state;
};
