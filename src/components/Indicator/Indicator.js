import React, { PropTypes } from 'react';

import Paper from 'material-ui/lib/paper';

import classes from './Indicator.css';

export const Indicator = ({ children, value }) => (
  <Paper className={classes.self}>
    <label className={classes.title}>{children}</label>
    <label className={classes.value}>{value}</label>
  </Paper>
);

Indicator.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number
};
