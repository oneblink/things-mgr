import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Map } from 'immutable';
import classnames from 'classnames';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

import {
  LOGIN_STATE_CHECKING, LOGIN_STATE_IN,
  loginClear, loginSetUsername, loginSetPassword, loginSubmit
} from '../../redux/modules/login';

import classes from './LoginView.css';

export class LoginView extends React.Component {
  static propTypes = {
    login: PropTypes.instanceOf(Map),
    loginClear: PropTypes.func.isRequired,
    loginSetUsername: PropTypes.func.isRequired,
    loginSetPassword: PropTypes.func.isRequired,
    loginSubmit: PropTypes.func.isRequired
  };

  render () {
    const {
      login, loginClear, loginSetUsername, loginSetPassword, loginSubmit
    } = this.props;
    const { error, username, password, state } = login.toJS();

    if (login.get('state') === LOGIN_STATE_IN) {
      return (
        <Paper className={classnames([classes.self])}>
          <p>You are logged in as {username}</p>
          <br />
          <div className={classes.buttons}>
            <FlatButton className={classes.logout} label='Logout' onMouseUp={loginClear} primary />
            {(() => {
              if (process.env.USE_CASE === 'dashboard') {
                return <Link to='/dashboard'><FlatButton label='Dashboard' /></Link>;
              }
            })()}
          </div>
        </Paper>
      );
    }

    const isChecking = state === LOGIN_STATE_CHECKING;

    const usernameProps = {
      disabled: isChecking,
      floatingLabelText: 'Username',
      fullWidth: true,
      onChange: () => loginSetUsername(this.refs.username.getValue()),
      ref: 'username',
      value: username
    };
    const passwordProps = {
      disabled: isChecking,
      floatingLabelText: 'Password',
      fullWidth: true,
      onChange: () => loginSetPassword(this.refs.password.getValue()),
      ref: 'password',
      type: 'password',
      value: password
    };

    // don't do anything for now
    const onSnackbarClose = () => {};

    return (
      <Paper className={classnames([classes.self])}>
        <TextField {...usernameProps} />
        <br />
        <TextField {...passwordProps} />
        <br />
        <div className={classes.buttons}>
          <FlatButton className={classes.login} label='Login' onMouseUp={loginSubmit} primary disabled={isChecking} />
        </div>
        {(() => {
          if (error) {
            return <Snackbar message={error} open onRequestClose={onSnackbarClose} />;
          }
        })()}
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.get('login')
});
export default connect((mapStateToProps), {
  loginClear,
  loginSetUsername,
  loginSetPassword,
  loginSubmit
})(LoginView);
