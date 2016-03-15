import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import RaisedButton from 'material-ui/lib/raised-button';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/lib/table';
import Paper from 'material-ui/lib/paper';

import { usersRequest } from '../../redux/modules/users';

import classes from './UsersView.css';

export class UsersView extends React.Component {
  static propTypes = {
    users: PropTypes.instanceOf(List),
    usersRequest: PropTypes.func.isRequired
  };

  render () {
    const { users, usersRequest } = this.props;
    return (
      <Paper className={classnames([classes.self])}>
        <RaisedButton label='Refresh' onMouseUp={usersRequest} />
        <Table multiSelectable>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.get('id')}>
                <TableRowColumn>{item.get('id')}</TableRowColumn>
                <TableRowColumn>{item.get('name')}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <FloatingActionButton className={classes.add}>
          <ContentAdd />
        </FloatingActionButton>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.get('users')
});
export default connect((mapStateToProps), {
  usersRequest
})(UsersView);
