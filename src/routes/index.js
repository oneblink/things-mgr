import React from 'react';
import { Route, IndexRedirect } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import LoginView from 'views/LoginView/LoginView';
import ReadersView from 'views/ReadersView/ReadersView';
import ThingsView from 'views/ThingsView/ThingsView';

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRedirect to='/things' />
    <Route path='login' component={LoginView} />
    <Route path='things'>
      <IndexRedirect to='/things/assets' />
      <Route path='assets' component={ThingsView} />
      <Route path='people' component={ThingsView} />
      <Route path='readers' component={ReadersView} />
    </Route>
  </Route>
);
