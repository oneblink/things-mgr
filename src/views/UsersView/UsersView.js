import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import ReactDataGrid from 'react-data-grid/addons';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentSave from 'material-ui/lib/svg-icons/content/save';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import {
  getUsers, usersEdit, usersNew, usersRequest, usersSubmit
} from '../../redux/modules/users';

import classes from './UsersView.css';

export class UsersView extends React.Component {
  static propTypes = {
    users: PropTypes.instanceOf(List),
    usersEdit: PropTypes.func.isRequired,
    usersNew: PropTypes.func.isRequired,
    usersRequest: PropTypes.func.isRequired,
    usersSubmit: PropTypes.func.isRequired
  };

  componentDidMount () {
    // automatically refresh listing
    this.props.usersRequest();
  }

  render () {
    const {
      users, usersEdit, usersNew, usersSubmit
    } = this.props;

    const gridProps = {
      columns: [
        { key: 'id', name: 'ID', editable: true },
        { key: 'firstname', name: 'First Name', editable: true },
        { key: 'lastname', name: 'Surname', editable: true }
      ],
      enableCellSelect: true,
      minHeight: document.documentElement.clientHeight - 120,
      rowGetter: (index) => users.get(index),
      rowsCount: users.size,
      onRowUpdated: ({ rowIdx, updated }) => usersEdit(rowIdx, updated)
    };

    return (
      <div className={classnames([classes.self])}>
        <ReactDataGrid {...gridProps} />

        <FloatingActionButton className={classes.save} onMouseUp={usersSubmit} secondary>
          <ContentSave />
        </FloatingActionButton>

        <FloatingActionButton className={classes.add} onMouseUp={usersNew}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: getUsers(state)
});
export default connect((mapStateToProps), {
  usersEdit,
  usersNew,
  usersRequest,
  usersSubmit
})(UsersView);
