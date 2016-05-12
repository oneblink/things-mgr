import localforage from 'localforage';
import debounce from 'lodash.debounce';

import { refreshEvents } from './api.js';
import { loginSetPassword, loginSetUsername } from '../redux/modules/login';

const storage = localforage.createInstance({ name: 'login' });

const fromStorage = (store) => {
  return storage.getItem('username')
    .then((username) => store.dispatch(loginSetUsername(username)))
    .then(() => storage.getItem('password'))
    .then((password) => store.dispatch(loginSetPassword(password)))
    .then(refreshEvents);
};

const toStorage = debounce((store, login) => {
  storage.setItem('username', login.get('username'));
  storage.setItem('password', login.get('password'));
}, 500);

// http://redux.js.org/docs/api/Store.html

const select = (state) => state.get('login');

let currentValue;

const makeHandler = (store) => () => {
  let previousValue = currentValue;
  currentValue = select(store.getState());
  if (previousValue !== currentValue) {
    toStorage(store, currentValue);
  }
};

export const syncLoginWithStorage = (store) => {
  const handler = makeHandler(store);
  fromStorage(store)
    .then(() => {
      store.subscribe(handler);
      handler();
    });
};
