import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import 'normalize.css';
import 'react-data-grid/themes/react-data-grid.css';

import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

import '../../styles/core.css';
import classes from './CoreLayout.css';

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  const appProps = {
    className: classes.appbar,
    iconElementRight: <Link to='/login'><FlatButton label='Login' /></Link>,
    showMenuIconButton: false,
    title: 'Royal Western Hospital'
  };

  if (process.env.USE_CASE === 'app') {
    return (
      <div className={classes.self}>
        <AppBar {...appProps} />
        <Link to='/register'><FlatButton label='Register' /></Link>
        <Link to='/subscription'><FlatButton label='Subscription' /></Link>
        <Link to='/search'><FlatButton label='Search' /></Link>
        <div className={classes.view}>
          {children}
        </div>
      </div>
    );
  }
  if (process.env.USE_CASE === 'manager') {
    return (
      <div className={classes.self}>
        <AppBar {...appProps} />
        <Link to='/register'><FlatButton label='Register' /></Link>
        <Link to='/things/tags'><FlatButton label='Tags' /></Link>
        <Link to='/things/people'><FlatButton label='People' /></Link>
        <Link to='/things/readers'><FlatButton label='Readers' /></Link>
        <Link to='/subscription'><FlatButton label='Subscription' /></Link>
        <Link to='/search'><FlatButton label='Search' /></Link>
        <div className={classes.view}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className={classes.self}>
      <AppBar {...appProps} />
      <div className={classes.view}>
        {children}
      </div>
    </div>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.element
};

export default CoreLayout;
