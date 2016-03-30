import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/lib/table';
import TextField from 'material-ui/lib/text-field';

import {
  SORT_ASCENDING, SORT_DESCENDING, SORT_NONE,
  getFilter, getFilterType, getFilteredRows,
  searchSetFilter, searchSetFilterType, searchSetSortColumn, searchSetSortDirection
} from '../../redux/modules/search';
import { readersRequest } from '../../redux/modules/readers';
import { tagsRequest } from '../../redux/modules/tags';
import { USERS_TYPES, usersRequest } from '../../redux/modules/users';

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
    fontSize: '18px'
  }
};
const TD_PROPS = {
  style: {
    fontSize: '18px'
  }
};

export class SearchView extends React.Component {
  static propTypes = {
    filter: PropTypes.string,
    filterType: PropTypes.string,
    readersRequest: PropTypes.func.isRequired,
    rows: PropTypes.instanceOf(List),
    searchSetFilter: PropTypes.func.isRequired,
    searchSetFilterType: PropTypes.func.isRequired,
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
    clearTimeout((this.state || {}).timer);
  }

  handleFilterChange () {}

  handleGridSort (column, direction) {
    this.props.searchSetSortColumn(column);
    this.props.searchSetSortDirection(DIRECTION[direction]);
  }

  render () {
    const {
      filter, filterType, rows, searchSetFilter, searchSetFilterType
    } = this.props;

    const filterProps = {
      className: classes.filter,
      type: 'search',
      name: 'search',
      onChange: () => searchSetFilter(this.refs.search.getValue()),
      ref: 'search',
      value: filter
    };

    const typeProps = {
      onChange: (event, index, value) => searchSetFilterType(value),
      value: filterType
    };

    return (
      <div className={classnames([classes.self])}>
        <div className={classes.filters}>
          <label>Search for</label>
          <TextField {...filterProps} />
          <DropDownMenu {...typeProps}>
            {USERS_TYPES.map((type) => (
              <MenuItem key={type} primaryText={type} value={type} />
            ))}
          </DropDownMenu>
        </div>

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
  filter: getFilter(state),
  filterType: getFilterType(state),
  rows: getFilteredRows(state)
});
export default connect((mapStateToProps), {
  readersRequest,
  searchSetFilter,
  searchSetFilterType,
  searchSetSortColumn,
  searchSetSortDirection,
  tagsRequest,
  usersRequest
})(SearchView);
