import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { List, Map } from 'immutable';

import Divider from 'material-ui/lib/divider';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import {
  dischargeReport, dischargeSetRecipient, dischargeSetUser, dischargeSubmit,
  getReader, getRecipient, getUser, getUserTag
} from '../../redux/modules/discharge';
import { getSortedUsersPatients } from '../../redux/modules/users';
import { refreshTags } from '../../lib/api.js';

import classes from './DischargeView.css';

const DIVIDER_STYLE = {
  marginBottom: '1em',
  marginTop: '1em'
};

export class SubscriptionView extends React.Component {
  static propTypes = {
    dischargeReport: PropTypes.func.isRequired,
    dischargeSetRecipient: PropTypes.func.isRequired,
    dischargeSetUser: PropTypes.func.isRequired,
    dischargeSubmit: PropTypes.func.isRequired,
    reader: PropTypes.string,
    recipient: PropTypes.string,
    user: PropTypes.string,
    userTag: PropTypes.instanceOf(Map),
    users: PropTypes.instanceOf(List)
  };

  componentDidMount () {
    // automatically refresh listings
    refreshTags();
  }

  render () {
    const {
      dischargeReport, dischargeSetRecipient, dischargeSetUser, dischargeSubmit,
      reader, recipient, user, userTag, users
    } = this.props;

    const pickerProps = {
      onChange: (event, index, value) => dischargeSetUser(value),
      ref: 'subject',
      value: user
    };

    const dischargeProps = {
      disabled: !user || reader === 'D3',
      label: 'Discharge',
      onMouseUp: () => dischargeSubmit(),
      primary: true
    };

    const emailProps = {
      hintText: 'report recipient email address',
      onChange: (event) => dischargeSetRecipient(event.target.value),
      type: 'email',
      value: recipient
    };

    const reportProps = {
      disabled: !recipient || !user,
      label: 'Send Report',
      onMouseUp: () => dischargeReport(),
      primary: true
    };

    let dischargeMessage = 'Patient discharge has been approved?';
    if (user && !userTag) {
      dischargeMessage = 'Patient not associated with a tag';
    }
    if (user && reader === 'D3') {
      dischargeMessage = 'Patient has been discharged';
    }

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

          <p>{dischargeMessage}</p>
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
  reader: getReader(state),
  recipient: getRecipient(state),
  user: getUser(state),
  userTag: getUserTag(state),
  users: getSortedUsersPatients(state)
});
export default connect((mapStateToProps), {
  dischargeReport,
  dischargeSetRecipient,
  dischargeSetUser,
  dischargeSubmit
})(SubscriptionView);
