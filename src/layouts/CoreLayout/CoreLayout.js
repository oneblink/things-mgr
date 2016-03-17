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
  return (
    <div className={classes.self}>
      <AppBar title='Things Manager' showMenuIconButton={false} />
      <Link to='/things/tags'><FlatButton label='Tags' /></Link>
      <Link to='/things/people'><FlatButton label='People' /></Link>
      <Link to='/things/readers'><FlatButton label='Readers' /></Link>
      <Link to='/subscription'><FlatButton label='Subscription' /></Link>
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
