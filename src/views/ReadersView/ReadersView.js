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

import { readersRequest } from '../../redux/modules/readers';

import classes from './ReadersView.css';

export class ReadersView extends React.Component {
  static propTypes = {
    readers: PropTypes.instanceOf(List),
    readersRequest: PropTypes.func.isRequired
  };

  render () {
    const { readers, readersRequest } = this.props;
    return (
      <Paper className={classnames([classes.self])}>
        <RaisedButton label='Refresh' onMouseUp={readersRequest} />
        <Table multiSelectable>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readers.map((item) => (
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
  readers: state.get('readers')
});
export default connect((mapStateToProps), {
  readersRequest
})(ReadersView);
