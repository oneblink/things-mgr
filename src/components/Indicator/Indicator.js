import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Paper from 'material-ui/lib/paper';

import classes from './Indicator.css';

const TRANSITION_PROPS = {
  transitionEnterTimeout: 1000,
  transitionLeave: false,
  transitionName: {
    enter: classes.valueEnter,
    enterActive: classes.valueEnterActive
  }
};

export const Indicator = ({ children, value }) => (
  <Paper className={classes.self}>
    <label className={classes.title}>{children}</label>
    <ReactCSSTransitionGroup {...TRANSITION_PROPS}>
      <label key={value} className={classes.value}>{value}</label>
    </ReactCSSTransitionGroup>
  </Paper>
);

Indicator.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number
};
