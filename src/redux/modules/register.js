import { combineReducers } from 'redux-immutable';

import { usersEdit, usersNew, usersSubmit } from './users';
import { tagsEdit, tagsNew, tagsSubmit } from './tags';

export const REGISTER_CLEAR = 'REGISTER_CLEAR';
export const registerClear = () => ({ type: REGISTER_CLEAR });

export const REGISTER_SET_TAG = 'REGISTER_SET_TAG';
export const registerSetTag = (tag) => ({
  type: REGISTER_SET_TAG,
  payload: tag
});

export const REGISTER_SET_FIRSTNAME = 'REGISTER_SET_FIRSTNAME';
export const registerSetFirstname = (firstname) => ({
  type: REGISTER_SET_FIRSTNAME,
  payload: firstname
});

export const REGISTER_SET_LASTNAME = 'REGISTER_SET_LASTNAME';
export const registerSetLastname = (lastname) => ({
  type: REGISTER_SET_LASTNAME,
  payload: lastname
});

export const REGISTER_SUBMIT = 'REGISTER_SUBMIT';
export const registerSubmit = () => (dispatch, getState) => {
  dispatch({ type: REGISTER_SUBMIT });
  let user = getState().getIn(['register', 'user']);
  // ensure the user record exists locally
  let existingUser = getState().get('users').find((u) => {
    return ['firstname', 'lastname'].every((key) => u.get(key) === user.get(key));
  });
  if (!existingUser) {
    dispatch(usersNew());
    dispatch(usersEdit(getState().get('users').size - 1, {
      firstname: user.get('firstname'),
      lastname: user.get('lastname')
    }));
    user = getState().get('users').last();
  } else {
    user = existingUser;
  }
  // submit it to the service
  return usersSubmit()(dispatch, getState)
    .then(() => {
      // ensure an accurate tag record exists locally
      const tagId = getState().getIn(['register', 'tag']);
      const tag = getState().get('tags').find((t) => t.get('id') === tagId);
      let tagIndex;
      if (!tag) {
        dispatch(tagsNew());
        tagIndex = getState().get('tags').size - 1;
      }
      tagIndex = getState().get('tags').indexOf(tag);
      dispatch(tagsEdit(tagIndex, {
        id: tagId,
        users: user.get('id')
      }));
    })
    // submit it to the service
    .then(() => tagsSubmit()(dispatch, getState))
    .then(() => dispatch(registerClear()));
};

export const REGISTER_SUBMIT_SUCCESS = 'REGISTER_SUBMIT_SUCCESS';
export const registerSubmitSuccess = (readers) => ({
  type: REGISTER_SUBMIT_SUCCESS,
  payload: readers
});

export const REGISTER_SUBMIT_ERROR = 'REGISTER_SUBMIT_ERROR';
export const registerSubmitError = (error) => ({
  type: REGISTER_SUBMIT_ERROR,
  payload: error,
  error: true
});

const tagReducer = (state = '', action) => {
  if (action.type === REGISTER_CLEAR) {
    return '';
  }
  if (action.type === REGISTER_SET_TAG) {
    return action.payload;
  }
  return state;
};

const firstNameReducer = (state = '', action) => {
  if (action.type === REGISTER_CLEAR) {
    return '';
  }
  if (action.type === REGISTER_SET_FIRSTNAME) {
    return action.payload;
  }
  return state;
};

const lastNameReducer = (state = '', action) => {
  if (action.type === REGISTER_CLEAR) {
    return '';
  }
  if (action.type === REGISTER_SET_LASTNAME) {
    return action.payload;
  }
  return state;
};

export const userReducer = combineReducers({
  firstname: firstNameReducer,
  lastname: lastNameReducer
});

export const registerReducer = combineReducers({
  tag: tagReducer,
  user: userReducer
});
