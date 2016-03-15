import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import 'normalize.css';

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
  return (
    <div className={classes.self}>
      <AppBar title='Things Manager' showMenuIconButton={false} />
      <Link to='/things/assets'><FlatButton label='Assets' /></Link>
      <Link to='/things/locations'><FlatButton label='Locations' /></Link>
      <Link to='/things/people'><FlatButton label='People' /></Link>
      <Link to='/login'><FlatButton label='Login' /></Link>
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
