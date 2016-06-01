import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import classnames from 'classnames';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';

import { getTags } from '../../redux/modules/tags';
import { getUsersMap } from '../../redux/modules/users';
import { refreshTags } from '../../lib/api.js';

import classes from './TagsView.css';

const TABLE_PROPS = {
  className: classes.table,
  selectable: false
};

const TH_PROPS = {
  style: {
    fontSize: '18px'
  }
};
const TD_PROPS = {
  style: {
    fontSize: '18px'
  }
};

export class TagsView extends React.Component {
  static propTypes = {
    tags: PropTypes.instanceOf(List),
    usersMap: PropTypes.instanceOf(Map)
  };

  componentDidMount () {
    // automatically refresh listing
    refreshTags();
    // automatically refresh listing every 15 seconds
    this.setState({
      timer: setInterval(() => {
        refreshTags();
      }, 15e3)
    });
  }

  componentWillUnmount () {
    clearTimeout((this.state || {}).timer);
  }

  render () {
    const { tags, usersMap } = this.props;

    return (
      <div className={classnames([classes.self])}>
        <Table {...TABLE_PROPS}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn {...TH_PROPS}>Tag</TableHeaderColumn>
              <TableHeaderColumn {...TH_PROPS}>Thing</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {tags.map((tag) => {
              const id = tag.get('id');
              const name = usersMap.get(tag.getIn(['links', 'users'])) || '';
              return (
                <TableRow key={id}>
                  <TableRowColumn {...TD_PROPS}>{id}</TableRowColumn>
                  <TableRowColumn {...TD_PROPS}>{name}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tags: getTags(state),
  usersMap: getUsersMap(state)
});
export default connect((mapStateToProps), {})(TagsView);
