import { List, fromJS } from 'immutable';
// import md5 from 'md5';

// const apiUrl = process.env.ENTITY_HTTP_API;

export const READERS_REQUEST = 'READERS_REQUEST';
// export const readersRequest = () => (dispatch, getState) => {
//   dispatch({ type: READERS_REQUEST });
//   const login = getState().get('login');
//   const username = login.get('username');
//   const password = login.get('password');

//   return fetch(`${apiUrl}?ENTITY=readers`, {
//     body: `args=${JSON.stringify({})}`,
//     headers: {
//       Authorisation: `bearer ${username} ${md5(password)}`
//     },
//     method: 'POST',
//     mode: 'cors'
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.errors) {
//         dispatch(readersRequestError(new Error(data.errors)));
//         return;
//       }
//       dispatch(readersRequestSuccess(data));
//     })
//     .catch((err) => dispatch(readersRequestError(err)));
// };
export const readersRequest = () => (dispatch, getState) => {
  dispatch({ type: READERS_REQUEST });
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch(readersRequestSuccess([
        { id: 'ipx.reader', name: 'WARD A' },
        { id: 'ipx.reader1', name: 'EXIT' },
        { id: 'l123', name: 'Hogwarts Castle' },
        { id: 'l456', name: 'Cupboard Under The Stairs' },
        { id: 'l789', name: 'Diagon Alley' }
      ]));
    }, 0);
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
export const readersSubmit = () => ({
  type: READERS_SUBMIT
});

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
  if (action.type === READERS_REQUEST_SUCCESS) {
    return fromJS(action.payload);
  }
  if (action.type === READERS_REQUEST_ERROR) {
    console.log(action.type, action.payload);
  }
  return state;
};
