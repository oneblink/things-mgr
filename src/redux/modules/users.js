import { List, fromJS } from 'immutable';

import { getEntitiesAndDispatch, postEntitiesAndDispatch } from '../../lib/api';

export const USERS_EDIT = 'USERS_EDIT';
export const usersEdit = (index, changes) => ({
  type: USERS_EDIT,
  payload: { index, changes }
});

export const USERS_NEW = 'USERS_NEW';
export const usersNew = () => ({ type: USERS_NEW });

export const USERS_REQUEST = 'USERS_REQUEST';
export const usersRequest = () => (dispatch, getState) => {
  dispatch({ type: USERS_REQUEST });
  return getEntitiesAndDispatch({
    actionError: usersRequestError,
    actionSuccess: usersRequestSuccess,
    dispatch,
    type: 'users'
  });
};

export const USERS_REQUEST_SUCCESS = 'USERS_REQUEST_SUCCESS';
export const usersRequestSuccess = (users) => ({
  type: USERS_REQUEST_SUCCESS,
  payload: users
});

export const USERS_REQUEST_ERROR = 'USERS_REQUEST_ERROR';
export const usersRequestError = (error) => ({
  type: USERS_REQUEST_ERROR,
  payload: error,
  error: true
});

export const USERS_SUBMIT = 'USERS_SUBMIT';
export const usersSubmit = () => (dispatch, getState) => {
  dispatch({ type: USERS_SUBMIT });
  return postEntitiesAndDispatch({
    actionError: usersSubmitError,
    actionSuccess: usersSubmitSuccess,
    data: getState().get('users').toJS(),
    dispatch,
    type: 'users'
  });
};

export const USERS_SUBMIT_SUCCESS = 'USERS_SUBMIT_SUCCESS';
export const usersSubmitSuccess = (users) => ({
  type: USERS_SUBMIT_SUCCESS,
  payload: users
});

export const USERS_SUBMIT_ERROR = 'USERS_SUBMIT_ERROR';
export const usersSubmitError = (error) => ({
  type: USERS_SUBMIT_ERROR,
  payload: error,
  error: true
});

const initialState = new List();

export const usersReducer = (state = initialState, action) => {
  if (action.type === USERS_EDIT) {
    const { index, changes } = action.payload;
    return state.mergeIn([index], changes);
  }
  if (action.type === USERS_NEW) {
    return state.push(fromJS({
      id: `u${state.size}`,
      firstname: '',
      lastname: '',
      info: {
        address: '',
        email: '',
        photo: ''
      }
    }));
  }
  if (action.type === USERS_REQUEST_SUCCESS) {
    return fromJS(action.payload);
  }
  if (action.type === USERS_REQUEST_ERROR) {
    console.log(action.type, action.payload);
  }
  return state;
};
