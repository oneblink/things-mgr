import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import ReactDataGrid from 'react-data-grid/addons';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import RaisedButton from 'material-ui/lib/raised-button';

import { usersEdit, usersNew, usersRequest } from '../../redux/modules/users';

import classes from './UsersView.css';

export class UsersView extends React.Component {
  static propTypes = {
    users: PropTypes.instanceOf(List),
    usersEdit: PropTypes.func.isRequired,
    usersNew: PropTypes.func.isRequired,
    usersRequest: PropTypes.func.isRequired
  };

  render () {
    const { users, usersEdit, usersNew, usersRequest } = this.props;

    const gridProps = {
      columns: [
        { key: 'id', name: 'ID', editable: true },
        { key: 'name', name: 'Name', editable: true }
      ],
      enableCellSelect: true,
      minHeight: document.documentElement.clientHeight - 150,
      rowGetter: (index) => users.get(index),
      rowsCount: users.size,
      onRowUpdated: ({ rowIdx, updated }) => usersEdit(rowIdx, updated)
    };

    return (
      <div className={classnames([classes.self])}>
        <RaisedButton label='Refresh' onMouseUp={usersRequest} />

        <ReactDataGrid {...gridProps} />

        <FloatingActionButton className={classes.add} onMouseUp={usersNew}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.get('users')
});
export default connect((mapStateToProps), {
  usersEdit,
  usersNew,
  usersRequest
})(UsersView);
