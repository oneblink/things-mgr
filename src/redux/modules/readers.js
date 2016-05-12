import { List, Map, fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { getEntitiesAndDispatch, postEntitiesAndDispatch } from '../../lib/api';

export const READERS_EDIT = 'READERS_EDIT';
export const readersEdit = (index, changes) => ({
  type: READERS_EDIT,
  payload: { index, changes }
});

export const READERS_NEW = 'READERS_NEW';
export const readersNew = () => ({ type: READERS_NEW });

export const READERS_REQUEST = 'READERS_REQUEST';
export const readersRequest = () => (dispatch, getState) => {
  dispatch({ type: READERS_REQUEST });
  return getEntitiesAndDispatch({
    actionError: readersRequestError,
    actionSuccess: readersRequestSuccess,
    dispatch,
    type: 'readers'
  });
};

export const READERS_REQUEST_SUCCESS = 'READERS_REQUEST_SUCCESS';
export const readersRequestSuccess = (readers) => ({
  type: READERS_REQUEST_SUCCESS,
  payload: readers
});

export const READERS_REQUEST_ERROR = 'READERS_REQUEST_ERROR';
export const readersRequestError = (error) => ({
  type: READERS_REQUEST_ERROR,
  payload: error,
  error: true
});

export const READERS_SUBMIT = 'READERS_SUBMIT';
export const readersSubmit = () => (dispatch, getState) => {
  dispatch({ type: READERS_SUBMIT });
  return postEntitiesAndDispatch({
    actionError: readersSubmitError,
    actionSuccess: readersSubmitSuccess,
    data: getState().get('readers').toJS(),
    dispatch,
    type: 'readers'
  });
};

export const READERS_SUBMIT_SUCCESS = 'READERS_SUBMIT_SUCCESS';
export const readersSubmitSuccess = (readers) => ({
  type: READERS_SUBMIT_SUCCESS,
  payload: readers
});

export const READERS_SUBMIT_ERROR = 'READERS_SUBMIT_ERROR';
export const readersSubmitError = (error) => ({
  type: READERS_SUBMIT_ERROR,
  payload: error,
  error: true
});

const initialState = new List();

export const readersReducer = (state = initialState, action) => {
  if (action.type === READERS_EDIT) {
    const { index, changes } = action.payload;
    return state.mergeIn([index], changes);
  }
  if (action.type === READERS_NEW) {
    return state.push(fromJS({
      id: `r${state.size}`,
      name: ''
    }));
  }
  if (action.type === READERS_REQUEST_SUCCESS) {
    return fromJS(action.payload);
  }
  if (action.type === READERS_REQUEST_ERROR) {
    console.log(action.type, action.payload);
    console.error(action.payload);
  }
  return state;
};

export const getReaders = (state) => state.get('readers') || new List();

export const getReadersMap = createSelector(
  [getReaders],
  (readers) => readers.reduce((map, reader) => {
    return map.set(reader.get('id'), reader.get('name'));
  }, new Map())
);
