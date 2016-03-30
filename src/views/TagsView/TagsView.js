import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import classnames from 'classnames';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/lib/table';

import { getTagsMap, tagsRequest } from '../../redux/modules/tags';
import { usersRequest } from '../../redux/modules/users';

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
    tagsMap: PropTypes.instanceOf(Map),
    tagsRequest: PropTypes.func.isRequired,
    usersRequest: PropTypes.func.isRequired
  };

  componentDidMount () {
    // automatically refresh listing
    this.props.tagsRequest();
    this.props.usersRequest();
    // automatically refresh listing every 30 seconds
    this.setState({
      timer: setInterval(() => {
        this.props.tagsRequest();
        this.props.usersRequest();
      }, 30e3)
    });
  }

  componentWillUnmount () {
    clearTimeout((this.state || {}).timer);
  }

  render () {
    const { tagsMap } = this.props;

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
            {tagsMap.map((name, id) => (
              <TableRow key={id}>
                <TableRowColumn {...TD_PROPS}>{id}</TableRowColumn>
                <TableRowColumn {...TD_PROPS}>{name}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tagsMap: getTagsMap(state)
});
export default connect((mapStateToProps), {
  tagsRequest,
  usersRequest
})(TagsView);
