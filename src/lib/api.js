import md5 from 'md5';

import { store } from '../redux/store';

// register environment variables in config/_base.js
const getUrl = process.env.ENTITY_HTTP_GET_API;
// const postUrl = process.env.ENTITY_HTTP_POST_API;

const getAuthorisation = () => {
  const login = store.getState().get('login');
  const username = login.get('username');
  const password = login.get('password');

  return `bearer ${username} ${md5(password)}`;
};

export const getEntities = (type) => {
  return fetch(`${getUrl}?entity=${type}`, {
    headers: {
      Authorisation: getAuthorisation()
    },
    method: 'GET',
    mode: 'cors'
  })
    .then((res) => res.json());
};

export const getEntitiesAndDispatch = ({ actionSuccess, actionError, dispatch, type }) => {
  return getEntities(type)
    .then((data) => {
      if (data.error || data.errors) {
        dispatch(actionError(new Error(data.error || data.errors)));
        return;
      }
      dispatch(actionSuccess(data[type]));
    })
    .catch((err) => dispatch(actionError(err)));
};
