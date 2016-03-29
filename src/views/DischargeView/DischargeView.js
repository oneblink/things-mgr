import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { List } from 'immutable';

import Divider from 'material-ui/lib/divider';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import {
  dischargeSetRecipient, dischargeSetUser, getRecipient, getUser
} from '../../redux/modules/discharge';
import { getUsersPatients, usersRequest } from '../../redux/modules/users';

import classes from './DischargeView.css';

const DIVIDER_STYLE = {
  marginBottom: '1em',
  marginTop: '1em'
};

export class SubscriptionView extends React.Component {
  static propTypes = {
    dischargeSetRecipient: PropTypes.func.isRequired,
    dischargeSetUser: PropTypes.func.isRequired,
    recipient: PropTypes.string,
    user: PropTypes.string,
    users: PropTypes.instanceOf(List),
    usersRequest: PropTypes.func.isRequired
  };

  componentDidMount () {
    // automatically refresh user listing
    this.props.usersRequest();
  }

  render () {
    const {
      recipient, user, users
    } = this.props;

    const pickerProps = {
      onChange: (event, index, value) => this.props.dischargeSetUser(value),
      ref: 'subject',
      value: user
    };

    const dischargeProps = {
      label: 'Discharge',
      primary: true
    };

    const emailProps = {
      hintText: 'report recipient email address',
      onChange: (event) => this.props.dischargeSetRecipient(event.target.value),
      type: 'email',
      value: recipient
    };

    const reportProps = {
      label: 'Send Report',
      primary: true
    };

    return (
      <div>
        <Paper className={classnames([classes.self])}>
          <label>Patient to discharge</label>
          <DropDownMenu {...pickerProps}>
            <MenuItem value='' primaryText='Pick someone' />
            {users.map((item) => {
              const id = item.get('id');
              const name = `${item.get('lastname')}, ${item.get('firstname')}`;
              return <MenuItem key={id} value={id} primaryText={name} />;
            })}
          </DropDownMenu>

          <Divider style={DIVIDER_STYLE} />

          <p>Patient discharge has been approved?</p>
          <div className={classes.buttons}>
            <RaisedButton {...dischargeProps} />
          </div>

          <p>Create a report of patient's stay</p>
          <TextField {...emailProps} />
          <div className={classes.buttons}>
            <RaisedButton {...reportProps} />
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipient: getRecipient(state),
  user: getUser(state),
  users: getUsersPatients(state)
});
export default connect((mapStateToProps), {
  dischargeSetRecipient,
  dischargeSetUser,
  usersRequest
})(SubscriptionView);