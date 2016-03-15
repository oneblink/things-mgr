import { List, fromJS } from 'immutable';

export const USERS_NEW = 'USERS_NEW';
export const usersNew = () => ({ type: USERS_NEW });

export const USERS_REQUEST = 'USERS_REQUEST';
export const usersRequest = () => (dispatch, getState) => {
  dispatch({ type: USERS_REQUEST });
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch(usersRequestSuccess([
        {
          'id': 'A0001',
          'name': 'Homer Simpson',
          'info': {
            'photo': '',
            'address': 'Evergreen Terrace, Springfield',
            'email': 'maxpower@blinkmobile.com.au'
          }
        },
        {
          'id': 'B0020',
          'name': 'Lenny Leonard',
          'info': {
            'photo': '',
            'address': 'Kwik-e-mart',
            'email': 'lenny@blinkmobile.com.au'
          }
        },
        {
          'id': 'C0300',
          'name': 'Carl Carlson',
          'info': {
            'photo': '',
            'address': 'Nuclear Power Plant',
            'email': 'carl@blinkmobile.com.au'
          }
        },
        {
          'id': 'D4000',
          'name': 'Moe Szyslak',
          'info': {
            'photo': '',
            'address': "Moe's Tavern",
            'email': 'moe@blinkmobile.com.au'
          }
        },
        { id: 'p123', name: 'Harry Potter', info: {} },
        { id: 'p456', name: 'Hermione Granger', info: {} },
        { id: 'p789', name: 'Ronald Weasley', info: {} }
      ]));
    }, 0);
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
export const usersSubmit = () => ({
  type: USERS_SUBMIT
});

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
  if (action.type === USERS_NEW) {
    return state.push(fromJS({
      id: `u${state.size}`,
      name: '',
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
