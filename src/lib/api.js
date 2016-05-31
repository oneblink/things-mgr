import md5 from 'md5';

import { store } from '../redux/store';
import { eventsRequest } from '../redux/modules/events.js';
import { hasCredentials } from '../redux/modules/login.js';
import { getReaders, readersRequest } from '../redux/modules/readers.js';
import { tagsRequest } from '../redux/modules/tags.js';
import { usersRequest } from '../redux/modules/users.js';
import { isTelephone } from './string';

// register environment variables in config/_base.js
const {
  BUSMQ_HTTP_GET_API,
  ENTITY_HTTP_GET_API, ENTITY_HTTP_POST_API,
  EVENTS_HTTP_GET_API, EVENT_HTTP_POST_API,
  PDF_HTTP_GET_API,
  SUBSCRIBE_HTTP_POST_API
} = process.env;

// getAuthorisation () => String
const getAuthorisation = () => {
  const login = store.getState().get('login');
  const username = login.get('username') || '';
  const password = login.get('password') || '';

  return `bearer ${username} ${md5(password)}`;
};

const assignFetchDefaults = (options = {}) => Object.assign({}, {
  headers: {
    Authorisation: getAuthorisation()
  },
  method: 'GET',
  mode: 'cors'
}, options);

// getEvents () => Promise
export const getEvents = () => {
  return fetch(EVENTS_HTTP_GET_API, assignFetchDefaults({}))
    .then((res) => res.json());
};

/*
interface GetEventsDispatchOptions {
  actionError: Function,
  actionSuccess: Function,
  dispatch: Function
}
*/
// getEventsAndDispatch (options: GetEventsDispatchOptions) => Promise
export const getEventsAndDispatch = ({ actionSuccess, actionError, dispatch }) => {
  return getEvents()
    .then((data) => {
      if (data.error || data.errors) {
        dispatch(actionError(new Error(data.error || data.errors)));
        return;
      }
      dispatch(actionSuccess(data.activities));
    })
    .catch((err) => dispatch(actionError(err)));
};

// getEntities (type: String) => Promise
export const getEntities = (type) => {
  return fetch(`${ENTITY_HTTP_GET_API}?entity=${type}`, assignFetchDefaults({}))
    .then((res) => res.json());
};

/*
interface GetDispatchOptions {
  type: String,
  ...GetEventsDispatchOptions
}
*/
// getEntitiesAndDispatch (options: GetDispatchOptions) => Promise
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

// postEntities (type: String, data: Object[]) => Promise
export const postEntities = (type, data) => {
  const formData = new FormData();
  formData.append('args', JSON.stringify({ [type]: data }));
  return fetch(`${ENTITY_HTTP_POST_API}?entity=${type}`, assignFetchDefaults({
    body: formData,
    method: 'POST'
  }))
    .then((res) => res.json());
};

/*
interface PostDispatchOptions {
  data: Object[],
  ...GetDispatchOptions
}
*/
// postEntitiesAndDispatch (options: PostDispatchOptions) => Promise
export const postEntitiesAndDispatch = ({ actionSuccess, actionError, data, dispatch, type }) => {
  return postEntities(type, data)
    .then((data) => {
      if (data.error || data.errors) {
        dispatch(actionError(new Error(data.error || data.errors)));
        return;
      }
      dispatch(actionSuccess(data[type]));
    })
    .catch((err) => dispatch(actionError(err)));
};

/*
interface SubscriptionsData {
  subject: String,
  recipients: String[]
}
*/
// postSubscriptions (data: SubscriptionsData) => Promise
export const postSubscriptions = (data) => {
  const TYPE = 'subscriptions';
  if (!Array.isArray(data.recipients) || !data.recipients.length) {
    return Promise.resolve({});
  }
  const resources = {
    [TYPE]: data.recipients.map((recipient) => ({
      type: isTelephone(recipient) ? 'SMS' : 'EMAIL',
      address: recipient,
      links: {
        users: data.subject
      }
    }))
  };
  const formData = new FormData();
  formData.append('args', JSON.stringify(resources));
  return fetch(`${SUBSCRIBE_HTTP_POST_API}?`, assignFetchDefaults({
    body: formData,
    method: 'POST'
  }))
    .then((res) => res.json());
};

/*
interface PostSubscriptionOptions {
  actionError: Function,
  actionSuccess: Function,
  data: SubscriptionsData,
  dispatch: Function
}
*/
// postSubscriptionsAndDispatch (options: PostSubscriptionOptions) => Promise
export const postSubscriptionsAndDispatch = ({ actionSuccess, actionError, data, dispatch }) => {
  return postSubscriptions(data)
    .then((data) => {
      // if (data.error || data.errors) {
      //   dispatch(actionError(new Error(data.error || data.errors)));
      //   return;
      // }
      dispatch(actionSuccess(data.subscriptions));
    })
    .catch((err) => dispatch(actionError(err)));
};

// postDischarge (rfid: String) => Promise
export const postDischarge = (rfid) => {
  const data = {
    host: 'D3',
    key: '6281ABC1-6108-49FE-B58A-16E53C01D0D6',
    uuid: 'rfid',
    type: 'rfid',
    subtype: 'scan',
    action: 'store',
    visit: '300',
    payload: JSON.stringify([{
      deviceid: '',
      data: JSON.stringify({
        ant: 'D3',
        tid: rfid
      })
    }]),
    latitude: '-33.427380',
    longitude: '151.342950'
  };
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return fetch(EVENT_HTTP_POST_API, assignFetchDefaults({
    body: formData,
    method: 'POST'
  }));
};

// getPDFReport (userId: String, email: String) => Promise
export const getPDFReport = (userId, email) => {
  return fetch(`${PDF_HTTP_GET_API}?userid=${userId}&email=${email}`, assignFetchDefaults({}));
};

// getBusMQConfig () => Promise
export const getBusMQConfig = () => {
  return fetch(BUSMQ_HTTP_GET_API, assignFetchDefaults({}))
    .then((res) => res.json());
};

const decorateWithLoginGuard = (fn) => (...args) => {
  if (!hasCredentials(store.getState())) {
    return Promise.resolve();
  }
  return fn(...args);
};

// only make network request for readers when we have none
// populateReaders (dispatch: Function, getState: Function) => Promise
const populateReaders = decorateWithLoginGuard((dispatch, getState) => {
  const readersCount = getReaders(getState()).size;
  return readersCount ? Promise.resolve() : readersRequest()(dispatch, getState);
});

// refreshUsers () => Promise
export const refreshUsers = decorateWithLoginGuard(() => {
  const { dispatch, getState } = store;
  return usersRequest()(dispatch, getState);
});

// refreshTags () => Promise
export const refreshTags = decorateWithLoginGuard(() => {
  const { dispatch, getState } = store;
  // tags link to readers and users, so get them first
  return Promise.all([
    populateReaders(dispatch, getState),
    refreshUsers()
  ])
    .then(() => tagsRequest()(dispatch, getState));
});

// refreshEvents () => Promise
export const refreshEvents = decorateWithLoginGuard(() => {
  const { dispatch, getState } = store;
  // events link to tags, so get them first
  return refreshTags()
    .then(() => eventsRequest()(dispatch, getState));
});
