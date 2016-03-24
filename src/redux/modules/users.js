import { List, fromJS } from 'immutable';
import { createSelector } from 'reselect';

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

export const USERS_TYPE_ASSET = 'asset';
export const USERS_TYPE_PATIENT = 'patient';
export const USERS_TYPE_STAFF = 'staff';
export const USERS_TYPES = [
  USERS_TYPE_ASSET, USERS_TYPE_PATIENT, USERS_TYPE_STAFF
];

const INFO_KEYS = ['address', 'email', 'photo', 'type'];

const initialState = new List();

export const usersReducer = (state = initialState, action) => {
  if (action.type === USERS_EDIT) {
    const { index, changes } = action.payload;
    const resourceChanges = { info: {} };
    Object.keys(changes).forEach((key) => {
      if (INFO_KEYS.includes(key)) {
        resourceChanges.info[key] = changes[key];
      } else {
        resourceChanges[key] = changes[key];
      }
    });
    return state.mergeDeepIn([index], resourceChanges);
  }
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
        photo: '',
        type: USERS_TYPE_ASSET
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

export const getUsers = (state) => state.get('users');

export const getUsersMap = createSelector(
  [getUsers],
  (users) => users.reduce((map, user) => {
    const name = `${user.get('firstname')} ${user.get('lastname')}`.trim();
    return map.set(user.get('id'), name);
  }, new Map())
);

export const getFlatUsers = createSelector(
  [getUsers],
  (users) => users.map((user) => user.delete('info').merge(user.get('info')))
);

export const countUsersByType = createSelector(
  [getFlatUsers],
  (users) => users.countBy((user) => user.get('type'))
);

export const countUsersAssets = createSelector(
  [countUsersByType],
  (counts) => counts.get('asset') || 0
);

export const countUsersStaff = createSelector(
  [countUsersByType],
  (counts) => counts.get('staff') || 0
);

export const countUsersPatients = createSelector(
  [countUsersByType],
  (counts) => counts.get('patient') || 0
);
