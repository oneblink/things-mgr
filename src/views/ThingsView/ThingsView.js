import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import classnames from 'classnames';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/lib/table';

import classes from './ThingsView.css';

const sampleData = [
  { id: 'a123', type: 'asset', name: 'Elder Wand' },
  { id: 'a456', type: 'asset', name: 'Resurrection Stone' },
  { id: 'a789', type: 'asset', name: 'Cloak of Invisibility' },
  { id: 'l123', type: 'location', name: 'Hogwarts Castle' },
  { id: 'l456', type: 'location', name: 'Cupboard Under The Stairs' },
  { id: 'l789', type: 'location', name: 'Diagon Alley' },
  { id: 'p123', type: 'person', name: 'Harry Potter' },
  { id: 'p456', type: 'person', name: 'Hermione Granger' },
  { id: 'p789', type: 'person', name: 'Ronald Weasley' }
];

export class ThingsView extends React.Component {
  static propTypes = {
    things: PropTypes.instanceOf(Set)
  }

  render () {
    return (
      <div className={classnames([classes.self])}>
        <Table multiSelectable>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((thing) => (
              <TableRow key={thing.id}>
                <TableRowColumn>{thing.id}</TableRowColumn>
                <TableRowColumn>{thing.name}</TableRowColumn>
                <TableRowColumn>{thing.type}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <FloatingActionButton className={classes.add}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  things: state.get('things')
});
export default connect((mapStateToProps), {})(ThingsView);
