import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/lib/table';
import TextField from 'material-ui/lib/text-field';

import {
  SORT_ASCENDING, SORT_DESCENDING, SORT_NONE,
  getFilter, getFilteredSortedRows,
  searchSetFilter, searchSetSortColumn, searchSetSortDirection
} from '../../redux/modules/search';
import { readersRequest } from '../../redux/modules/readers';
import { tagsRequest } from '../../redux/modules/tags';
import { usersRequest } from '../../redux/modules/users';

import classes from './SearchView.css';

// map ReactDataGrid's internal direction to our constants
const DIRECTION = {
  ASC: SORT_ASCENDING,
  DESC: SORT_DESCENDING,
  NONE: SORT_NONE
};

const TABLE_PROPS = {
  className: classes.table,
  selectable: false
};

const TH_PROPS = {
  style: {
    fontSize: '16px'
  }
};
const TD_PROPS = {
  style: {
    fontSize: '16px'
  }
};


export class SearchView extends React.Component {
  static propTypes = {
    filter: PropTypes.string,
    readersRequest: PropTypes.func.isRequired,
    rows: PropTypes.instanceOf(List),
    searchSetFilter: PropTypes.func.isRequired,
    searchSetSortColumn: PropTypes.func.isRequired,
    searchSetSortDirection: PropTypes.func.isRequired,
    tagsRequest: PropTypes.func.isRequired,
    usersRequest: PropTypes.func.isRequired
  };

  constructor () {
    super();
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
  }

  componentDidMount () {
    // automatically refresh user listing
    this.props.readersRequest();
    this.props.tagsRequest();
    this.props.usersRequest();
    // automatically refresh user listing every 30 seconds
    this.setState({
      timer: setInterval(() => {
        this.props.readersRequest();
        this.props.tagsRequest();
        this.props.usersRequest();
      }, 30e3)
    });
  }

  componentWillUnmount () {
    clearTimeout(this.state.timer);
  }

  handleFilterChange () {}

  handleGridSort (column, direction) {
    this.props.searchSetSortColumn(column);
    this.props.searchSetSortDirection(DIRECTION[direction]);
  }

  render () {
    const { filter, rows, searchSetFilter } = this.props;

    const filterProps = {
      className: classes.filter,
      floatingLabelText: 'Search for',
      type: 'search',
      onChange: () => searchSetFilter(this.refs.search.getValue()),
      ref: 'search',
      value: filter
    };

    return (
      <div className={classnames([classes.self])}>
        <TextField {...filterProps} />

        <Table {...TABLE_PROPS}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn {...TH_PROPS}>Surname</TableHeaderColumn>
              <TableHeaderColumn {...TH_PROPS}>First Name</TableHeaderColumn>
              <TableHeaderColumn {...TH_PROPS}>Location</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {rows.map((row) => (
              <TableRow key={row.get('id')}>
                <TableRowColumn {...TD_PROPS}>{row.get('lastname')}</TableRowColumn>
                <TableRowColumn {...TD_PROPS}>{row.get('firstname')}</TableRowColumn>
                <TableRowColumn {...TD_PROPS}>{row.get('location')}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getFilter: getFilter(state),
  rows: getFilteredSortedRows(state)
});
export default connect((mapStateToProps), {
  readersRequest,
  searchSetFilter,
  searchSetSortColumn,
  searchSetSortDirection,
  tagsRequest,
  usersRequest
})(SearchView);
