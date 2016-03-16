import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';

import makeRoutes from './routes';
import Root from './containers/Root';

import { browserHistory, store } from './redux/store';

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

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: createRouterStateSelector()
});

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
const routes = makeRoutes(store);

// required for Material UI components
injectTapEventPlugin();

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
