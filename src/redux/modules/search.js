import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';

import { getReaders } from './readers';
import { getTags } from './tags';
import { USERS_TYPE_PATIENT, getUsers } from './users';

export const SEARCH_SET_SORT_COLUMN = 'SEARCH_SET_SORT_COLUMN';
export const searchSetSortColumn = (column) => ({
  type: SEARCH_SET_SORT_COLUMN,
  payload: column
});

export const SEARCH_SET_SORT_DIRECTION = 'SEARCH_SET_SORT_DIRECTION';
export const searchSetSortDirection = (direction) => ({
  type: SEARCH_SET_SORT_DIRECTION,
  payload: direction
});

export const SEARCH_SET_FILTER = 'SEARCH_SET_FILTER';
export const searchSetFilter = (filter) => ({
  type: SEARCH_SET_FILTER,
  payload: filter
});

export const SEARCH_SET_FILTER_TYPE = 'SEARCH_SET_FILTER_TYPE';
export const searchSetFilterType = (type) => ({
  type: SEARCH_SET_FILTER_TYPE,
  payload: type
});

const columnReducer = (state = '', action) => {
  if (action.type === SEARCH_SET_SORT_COLUMN) {
    return action.payload;
  }
  return state;
};

export const SORT_ASCENDING = 'SORT_ASCENDING';
export const SORT_DESCENDING = 'SORT_DESCENDING';
export const SORT_NONE = 'SORT_NONE';

const directionReducer = (state = SORT_NONE, action) => {
  if (action.type === SEARCH_SET_SORT_DIRECTION) {
    return action.payload;
  }
  return state;
};

const filterReducer = (state = '', action) => {
  if (action.type === SEARCH_SET_FILTER) {
    return action.payload;
  }
  return state;
};

const filterTypeReducer = (state = USERS_TYPE_PATIENT, action) => {
  if (action.type === SEARCH_SET_FILTER_TYPE) {
    return action.payload;
  }
  return state;
};

const sortReducer = combineReducers({
  column: columnReducer,
  direction: directionReducer
});

export const searchReducer = combineReducers({
  filter: filterReducer,
  filterType: filterTypeReducer,
  sort: sortReducer
});

export const getFilter = (state) => state.getIn(['search', 'filter']);

export const getFilterType = (state) => state.getIn(['search', 'filterType']);

export const getSortColumn = (state) => state.getIn(['search', 'sort', 'column']);

export const getSortDirection = (state) => state.getIn(['search', 'sort', 'direction']);

// combine tags and readers data with users
export const getRows = createSelector(
  [getReaders, getTags, getUsers],
  (readers, tags, users) => users.map((user) => {
    const tag = tags.find((t) => t.getIn(['links', 'users']) === user.get('id'));
    let reader;
    if (tag) {
      const readerId = tag.getIn(['links', 'readers']);
      if (readerId) {
        reader = readers.find((r) => r.get('id') === readerId);
      }
    }
    if (!reader) {
      return user;
    }
    return user.set('location', reader.get('name'));
  })
);

// http://adazzle.github.io/react-data-grid/examples.html#/filterable-sortable
const makeComparer = (column, direction) => (a, b) => {
  if (direction === SORT_ASCENDING) {
    return (a.get(column) > b.get(column)) ? 1 : -1;
  } else if (direction === SORT_DESCENDING) {
    return (a.get(column) < b.get(column)) ? 1 : -1;
  } else {
    return 0;
  }
};

const FILTER_COLUMNS = ['firstname', 'lastname', 'location'];

export const getFilteredRows = createSelector(
  [getFilter, getFilterType, getRows],
  (filter, type, rows) => {
    const typeMatches = rows.filter((row) => row.getIn(['info', 'type']) === type);
    if (filter.trim() === '') {
      return typeMatches;
    }
    return typeMatches.filter((row) => row.some((value, key) => {
      if (!FILTER_COLUMNS.includes(key)) {
        return false; // skip columns that we don't use
      }
      return value.toLowerCase().includes(filter.toLowerCase());
    }));
  }
);

export const getFilteredSortedRows = createSelector(
  [getSortColumn, getSortDirection, getFilteredRows],
  (column, direction, rows) => {
    if (direction === SORT_ASCENDING || direction === SORT_DESCENDING) {
      return rows.sort(makeComparer(column, direction));
    }
    return rows;
  }
);

