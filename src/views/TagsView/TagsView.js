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

import { tagsNew, tagsRequest } from '../../redux/modules/tags';

import classes from './TagsView.css';

export class TagsView extends React.Component {
  static propTypes = {
    tags: PropTypes.instanceOf(List),
    tagsNew: PropTypes.func.isRequired,
    tagsRequest: PropTypes.func.isRequired
  };

  render () {
    const { tags, tagsNew, tagsRequest } = this.props;
    return (
      <Paper className={classnames([classes.self])}>
        <RaisedButton label='Refresh' onMouseUp={tagsRequest} />
        <Table multiSelectable>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Person</TableHeaderColumn>
              <TableHeaderColumn>Reader</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((item) => (
              <TableRow key={item.get('id')}>
                <TableRowColumn>{item.get('id')}</TableRowColumn>
                <TableRowColumn>{item.getIn(['links', 'person'])}</TableRowColumn>
                <TableRowColumn>{item.getIn(['links', 'reader'])}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <FloatingActionButton className={classes.add} onMouseUp={tagsNew}>
          <ContentAdd />
        </FloatingActionButton>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  tags: state.get('tags')
});
export default connect((mapStateToProps), {
  tagsNew,
  tagsRequest
})(TagsView);
