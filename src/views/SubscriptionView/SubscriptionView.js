import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { List } from 'immutable';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Divider from 'material-ui/lib/divider';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import { List as MDList, ListItem } from 'material-ui/lib/lists';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';

import {
  subscriptionNewRecipient,
  subscriptionEditRecipient,
  subscriptionSetSubject,
  subscriptionTrimRecipients
} from '../../redux/modules/subscription';
import { usersRequest } from '../../redux/modules/users';

import classes from './SubscriptionView.css';

export class SubscriptionView extends React.Component {
  static propTypes = {
    recipients: PropTypes.instanceOf(List),
    subject: PropTypes.string,
    subscriptionNewRecipient: PropTypes.func.isRequired,
    subscriptionEditRecipient: PropTypes.func.isRequired,
    subscriptionSetSubject: PropTypes.func.isRequired,
    subscriptionTrimRecipients: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    usersRequest: PropTypes.func.isRequired
  };

  constructor () {
    super();
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleReceipientChange = this.handleReceipientChange.bind(this);
  }

  handleReceipientChange (event, index) {
    this.props.subscriptionEditRecipient(index, event.target.value);
  }

  handleSubjectChange (event, index, value) {
    this.props.subscriptionSetSubject(value);
  }

  componentDidMount () {
    // automatically refresh user listing
    this.props.usersRequest();
  }

  render () {
    const {
      recipients, subject, users,
      subscriptionNewRecipient, subscriptionTrimRecipients
    } = this.props;

    return (
      <Paper className={classnames([classes.self])}>
        <label>Subject</label>
        <DropDownMenu ref='subject' onChange={this.handleSubjectChange} value={subject}>
          <MenuItem value='' primaryText='Pick someone' />
          {users.map((item) => {
            const id = item.get('id');
            const name = item.get('name');
            return <MenuItem key={id} value={id} primaryText={name} />;
          })}
        </DropDownMenu>

        <Divider />

        <MDList>
          {recipients.map((recipient, index) => {
            const onChange = (event) => this.handleReceipientChange(event, index);
            return (
              <ListItem key={index}>
                <TextField fullWidth hintText='recipient phone or email' value={recipient} onChange={onChange} />
              </ListItem>
            );
          })}
        </MDList>

        {(() => {
          if (subject && recipients.size) {
            return (
              <FloatingActionButton className={classes.send} onMouseUp={subscriptionTrimRecipients} secondary>
                <ContentSend />
              </FloatingActionButton>
            );
          }
          if (!recipients.size) {
            return <p>Add recipients, they will be invited to subscribe</p>;
          }
        })()}

        <FloatingActionButton className={classes.add} onMouseUp={subscriptionNewRecipient}>
          <ContentAdd />
        </FloatingActionButton>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  recipients: state.getIn(['subscription', 'recipients']),
  subject: state.getIn(['subscription', 'subject']),
  users: state.get('users')
});
export default connect((mapStateToProps), {
  subscriptionNewRecipient,
  subscriptionEditRecipient,
  subscriptionTrimRecipients,
  subscriptionSetSubject,
  usersRequest
})(SubscriptionView);
