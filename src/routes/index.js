import React from 'react';
import { Route, IndexRedirect } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import DashboardView from 'views/DashboardView/DashboardView';
import LoginView from 'views/LoginView/LoginView';
import ReadersView from 'views/ReadersView/ReadersView';
import RegisterView from 'views/RegisterView/RegisterView';
import SearchView from 'views/SearchView/SearchView';
import SubscriptionView from 'views/SubscriptionView/SubscriptionView';
import TagsView from 'views/TagsView/TagsView';
import UsersView from 'views/UsersView/UsersView';

export default (store) => {
  if (process.env.USE_CASE === 'app') {
    return (
      <Route path='/' component={CoreLayout}>
        <IndexRedirect to='/login' />
        <Route path='login' component={LoginView} />
        <Route path='register' component={RegisterView} />
        <Route path='search' component={SearchView} />
        <Route path='subscription' component={SubscriptionView} />
      </Route>
    );
  }
  if (process.env.USE_CASE === 'dashboard') {
    return (
      <Route path='/' component={CoreLayout}>
        <IndexRedirect to='/login' />
        <Route path='login' component={LoginView} />
        <Route path='dashboard' component={DashboardView} />
      </Route>
    );
  }
  if (process.env.USE_CASE === 'manager') {
    return (
      <Route path='/' component={CoreLayout}>
        <IndexRedirect to='/login' />
        <Route path='login' component={LoginView} />
        <Route path='things'>
          <IndexRedirect to='/things/tags' />
          <Route path='tags' component={TagsView} />
          <Route path='people' component={UsersView} />
          <Route path='readers' component={ReadersView} />
        </Route>
        <Route path='register' component={RegisterView} />
        <Route path='search' component={SearchView} />
        <Route path='subscription' component={SubscriptionView} />
      </Route>
    );
  }
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRedirect to='/login' />
      <Route path='login' component={LoginView} />
    </Route>
  );
};
