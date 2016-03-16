import React, { } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Paper from 'material-ui/lib/paper';

import classes from './SubscriptionsView.css';

export class LoginView extends React.Component {
  static propTypes = {};

  render () {
    return (
      <Paper className={classnames([classes.self])}>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect((mapStateToProps), {})(LoginView);
