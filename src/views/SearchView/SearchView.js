import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import ReactDataGrid from 'react-data-grid/addons';
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

    const columnProps = {
      filterable: true,
      sortable: true
    };

    const gridProps = {
      columns: [
        Object.assign({ key: 'firstname', name: 'First Name' }, columnProps),
        Object.assign({ key: 'lastname', name: 'Surname' }, columnProps),
        Object.assign({ key: 'location', name: 'Location' }, columnProps)
      ],
      enableCellSelect: true,
      minHeight: document.documentElement.clientHeight - 220,
      onGridSort: this.handleGridSort,
      rowGetter: (index) => rows.get(index),
      rowsCount: rows.size
    };

    const filterProps = {
      className: classes.filter,
      floatingLabelText: 'Filter',
      type: 'search',
      onChange: () => searchSetFilter(this.refs.search.getValue()),
      ref: 'search',
      value: filter
    };

    return (
      <div className={classnames([classes.self])}>
        <TextField {...filterProps} />
        <ReactDataGrid {...gridProps} />
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
