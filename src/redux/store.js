import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';

import configureStore from './configureStore';

// Configure history for react-router
export const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
});

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.__INITIAL_STATE__;
export const store = configureStore(initialState, browserHistory);
