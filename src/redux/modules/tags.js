import { List, fromJS } from 'immutable';

export const TAGS_REQUEST = 'TAGS_REQUEST';
export const tagsRequest = () => (dispatch, getState) => {
  dispatch({ type: TAGS_REQUEST });
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch(tagsRequestSuccess([
        {
          'id': 'UNIQ_ID_1',
          'type': 'RFID',
          'links': {
            'users': '',
            'readers': ''
          },
          'status': 'inactive'
        },
        {
          'id': 'UNIQ_ID_2',
          'type': 'RFID',
          'links': {
            'users': '',
            'readers': ''
          },
          'status': 'inactive'
        },
        {
          'id': 'UNIQ_ID_3',
          'type': 'RFID',
          'links': {
            'users': '',
            'readers': ''
          },
          'status': 'inactive'
        },
        {
          'id': 'UNIQ_ID_4',
          'type': 'RFID',
          'links': {
            'users': '',
            'readers': ''
          },
          'status': 'inactive'
        },
        {
          'id': 'UNIQ_ID_5',
          'type': 'RFID',
          'links': {
            'users': '',
            'readers': ''
          },
          'status': 'inactive'
        },
        {
          'id': 'UNIQ_ID_6',
          'type': 'RFID',
          'links': {
            'users': '',
            'readers': ''
          },
          'status': 'inactive'
        }
      ]));
    }, 0);
  });
};

export const TAGS_REQUEST_SUCCESS = 'TAGS_REQUEST_SUCCESS';
export const tagsRequestSuccess = (tags) => ({
  type: TAGS_REQUEST_SUCCESS,
  payload: tags
});

export const TAGS_REQUEST_ERROR = 'TAGS_REQUEST_ERROR';
export const tagsRequestError = (error) => ({
  type: TAGS_REQUEST_ERROR,
  payload: error,
  error: true
});

export const TAGS_SUBMIT = 'TAGS_SUBMIT';
export const tagsSubmit = () => ({
  type: TAGS_SUBMIT
});

export const TAGS_SUBMIT_SUCCESS = 'TAGS_SUBMIT_SUCCESS';
export const tagsSubmitSuccess = (tags) => ({
  type: TAGS_SUBMIT_SUCCESS,
  payload: tags
});

export const TAGS_SUBMIT_ERROR = 'TAGS_SUBMIT_ERROR';
export const tagsSubmitError = (error) => ({
  type: TAGS_SUBMIT_ERROR,
  payload: error,
  error: true
});

const initialState = new List();

export const tagsReducer = (state = initialState, action) => {
  if (action.type === TAGS_REQUEST_SUCCESS) {
    return fromJS(action.payload);
  }
  if (action.type === TAGS_REQUEST_ERROR) {
    console.log(action.type, action.payload);
  }
  return state;
};
