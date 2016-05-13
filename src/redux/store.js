import createHistory from 'history/lib/createHashHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import makeRoutes from '../routes';
import configureStore from './configureStore';

// https://github.com/reactjs/react-router-redux/issues/314#issuecomment-190678756
const createRouterStateSelector = () => {
  let prevState, prevStateJS;
  return (state) => {
    const currState = state.get('router');
    if (typeof prevState === 'undefined' || prevState !== currState) {
      prevState = currState;
      prevStateJS = currState.toJS();
    }
    return prevStateJS;
  };
};

// Configure history for react-router
const browserHistory = useRouterHistory(createHistory)({
  basename: __BASENAME__
});

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.__INITIAL_STATE__;
export const store = configureStore(initialState, browserHistory);
export const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: createRouterStateSelector()
});

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
export const routes = makeRoutes(store);
