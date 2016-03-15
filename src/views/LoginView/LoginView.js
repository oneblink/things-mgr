import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import classnames from 'classnames';

import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';

import { loginSetUsername, loginSetPassword } from '../../redux/modules/login';

import classes from './LoginView.css';

export class LoginView extends React.Component {
  static propTypes = {
    login: PropTypes.instanceOf(Map),
    loginSetUsername: PropTypes.func.isRequired,
    loginSetPassword: PropTypes.func.isRequired
  };

  render () {
    const { login, loginSetUsername, loginSetPassword } = this.props;

    const usernameProps = {
      floatingLabelText: 'Username',
      onChange: () => loginSetUsername(this.refs.username.getValue()),
      ref: 'username',
      value: login.get('username')
    };
    const passwordProps = {
      floatingLabelText: 'Password',
      onChange: () => loginSetPassword(this.refs.password.getValue()),
      ref: 'password',
      type: 'password',
      value: login.get('password')
    };

    return (
      <Paper className={classnames([classes.self])}>
        <TextField {...usernameProps} />
        <Divider />
        <TextField {...passwordProps} />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.get('login')
});
export default connect((mapStateToProps), {
  loginSetUsername,
  loginSetPassword
})(LoginView);
