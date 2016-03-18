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
  registerSetTag, registerSetUser, registerSubmit
} from '../../redux/modules/register';
import { usersRequest } from '../../redux/modules/users';

import classes from './RegisterView.css';

export class RegisterView extends React.Component {
  static propTypes = {
    registerSetTag: PropTypes.func.isRequired,
    registerSetUser: PropTypes.func.isRequired,
    registerSubmit: PropTypes.func.isRequired,
    tag: PropTypes.string,
    userName: PropTypes.string,
    users: PropTypes.instanceOf(List),
    usersRequest: PropTypes.func.isRequired
  };

  componentDidMount () {
    // automatically refresh user listing
    this.props.usersRequest();
  }

  render () {
    const {
      registerSetTag, registerSetUser, registerSubmit,
      tag, userName, users
    } = this.props;

    const tagProps = {
      floatingLabelText: 'Tag ID',
      fullWidth: true,
      onChange: () => registerSetTag(this.refs.tag.getValue()),
      ref: 'tag',
      value: tag
    };
    const personProps = {
      dataSource: users.toJS().map((user) => ({
        text: user.name,
        value: <MenuItem primaryText={user.name} value={user.id} />
      })),
      filter: (search, key) => {
        return search !== '' && key.toLowerCase().includes(search.toLowerCase());
      },
      floatingLabelText: 'Person',
      fullWidth: true,
      onNewRequest: (value, index) => {
        registerSetUser(users.get(index).get('id'), value);
      },
      onUpdateInput: (value) => registerSetUser('', value),
      ref: 'person',
      searchText: userName
    };

    return (
      <Paper className={classnames([classes.self])}>
        <TextField {...tagProps} />
        <br />
        <AutoComplete {...personProps} />
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
  userName: state.getIn(['register', 'user', 'name']),
  users: state.get('users')
});
export default connect((mapStateToProps), {
  registerSetTag,
  registerSetUser,
  registerSubmit,
  usersRequest
})(RegisterView);
