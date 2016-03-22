import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import ReactDataGrid from 'react-data-grid/addons';

import {
  SORT_ASCENDING, SORT_DESCENDING, SORT_NONE,
  getFilteredSortedRows, searchSetSortColumn, searchSetSortDirection
} from '../../redux/modules/search';

import classes from './SearchView.css';

// map ReactDataGrid's internal direction to our constants
const DIRECTION = {
  ASC: SORT_ASCENDING,
  DESC: SORT_DESCENDING,
  NONE: SORT_NONE
};

export class SearchView extends React.Component {
  static propTypes = {
    rows: PropTypes.instanceOf(List),
    searchSetSortColumn: PropTypes.func.isRequired,
    searchSetSortDirection: PropTypes.func.isRequired
  };

  constructor () {
    super();
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
  }

  handleFilterChange () {}

  handleGridSort (column, direction) {
    this.props.searchSetSortColumn(column);
    this.props.searchSetSortDirection(DIRECTION[direction]);
  }

  render () {
    const { rows } = this.props;

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
      minHeight: document.documentElement.clientHeight - 150,
      onAddFilter: this.handleFilterChange,
      onGridSort: this.handleGridSort,
      rowGetter: (index) => rows.get(index),
      rowsCount: rows.size
    };

    return (
      <div className={classnames([classes.self])}>
        <ReactDataGrid {...gridProps} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rows: getFilteredSortedRows(state)
});
export default connect((mapStateToProps), {
  searchSetSortColumn,
  searchSetSortDirection
})(SearchView);
