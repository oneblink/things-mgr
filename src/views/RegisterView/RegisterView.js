import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import AutoComplete from 'material-ui/lib/auto-complete';
import FlatButton from 'material-ui/lib/flat-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';

import {
  registerSetFirstname, registerSetLastname,
  registerSetTag, registerSubmit
} from '../../redux/modules/register';
import { getUsers, usersRequest } from '../../redux/modules/users';

import classes from './RegisterView.css';

export class RegisterView extends React.Component {
  static propTypes = {
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    registerSetFirstname: PropTypes.func.isRequired,
    registerSetLastname: PropTypes.func.isRequired,
    registerSetTag: PropTypes.func.isRequired,
    registerSubmit: PropTypes.func.isRequired,
    tag: PropTypes.string,
    users: PropTypes.instanceOf(List),
    usersRequest: PropTypes.func.isRequired
  };

  static filterIgnoreCase (search, key) {
    return search !== '' && key.toLowerCase().includes(search.toLowerCase());
  }

  componentDidMount () {
    // automatically refresh user listing
    this.props.usersRequest();
  }

  render () {
    const {
      registerSetFirstname, registerSetLastname,
      registerSetTag, registerSubmit,
      firstname, lastname, tag, users
    } = this.props;

    const tagProps = {
      floatingLabelText: 'Tag ID',
      fullWidth: true,
      onChange: () => registerSetTag(this.refs.tag.getValue()),
      ref: 'tag',
      value: tag
    };
    const personProps = {
      filter: RegisterView.filterIgnoreCase,
      fullWidth: true,
      onNewRequest: (value, index) => {
        const user = users.get(index);
        registerSetFirstname(user.get('firstname'));
        registerSetLastname(user.get('lastname'));
      }
    };
    const firstnameProps = {
      dataSource: users.toJS().map((user) => ({
        text: user.firstname,
        value: <MenuItem primaryText={user.firstname} value={user.id} />
      })),
      floatingLabelText: 'First Name',
      onUpdateInput: (value) => registerSetFirstname(value),
      searchText: firstname
    };
    const lastnameProps = {
      dataSource: users.toJS().map((user) => ({
        text: user.lastname,
        value: <MenuItem primaryText={user.lastname} value={user.id} />
      })),
      floatingLabelText: 'Surname',
      onUpdateInput: (value) => registerSetLastname(value),
      searchText: lastname
    };

    return (
      <Paper className={classnames([classes.self])}>
        <TextField {...tagProps} />
        <br />
        <AutoComplete {...firstnameProps} {...personProps} />
        <br />
        <AutoComplete {...lastnameProps} {...personProps} />
        <br />
        <div className={classes.buttons}>
          <FlatButton className={classes.register} label='Register' onMouseUp={registerSubmit} primary />
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  tag: state.getIn(['register', 'tag']),
  firstname: state.getIn(['register', 'user', 'firstname']),
  lastname: state.getIn(['register', 'user', 'lastname']),
  users: getUsers(state)
});
export default connect((mapStateToProps), {
  registerSetFirstname,
  registerSetLastname,
  registerSetTag,
  registerSubmit,
  usersRequest
})(RegisterView);