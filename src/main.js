import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './containers/Root';

import { history, routes, store } from './redux/store';
import { syncBusWithStore } from './lib/bus.js';
import { syncLoginWithStorage } from './lib/storage';

// keep login details persisted to storage
syncLoginWithStorage(store);

// connect to BusMQ once we have details
syncBusWithStore(store);

// required for Material UI components
injectTapEventPlugin();

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
