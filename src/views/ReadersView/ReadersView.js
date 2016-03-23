import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import ReactDataGrid from 'react-data-grid/addons';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentSave from 'material-ui/lib/svg-icons/content/save';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import {
  getReaders, readersEdit, readersNew, readersRequest, readersSubmit
} from '../../redux/modules/readers';

import classes from './ReadersView.css';

export class ReadersView extends React.Component {
  static propTypes = {
    readers: PropTypes.instanceOf(List),
    readersEdit: PropTypes.func.isRequired,
    readersNew: PropTypes.func.isRequired,
    readersRequest: PropTypes.func.isRequired,
    readersSubmit: PropTypes.func.isRequired
  };

  componentDidMount () {
    // automatically refresh listing
    this.props.readersRequest();
  }

  render () {
    const {
      readers, readersEdit, readersNew, readersSubmit
    } = this.props;

    const gridProps = {
      columns: [
        { key: 'id', name: 'ID', editable: true },
        { key: 'name', name: 'Name', editable: true }
      ],
      enableCellSelect: true,
      minHeight: document.documentElement.clientHeight - 120,
      rowGetter: (index) => readers.get(index),
      rowsCount: readers.size,
      onRowUpdated: ({ rowIdx, updated }) => readersEdit(rowIdx, updated)
    };

    return (
      <div className={classnames([classes.self])}>
        <ReactDataGrid {...gridProps} />

        <FloatingActionButton className={classes.save} onMouseUp={readersSubmit} secondary>
          <ContentSave />
        </FloatingActionButton>

        <FloatingActionButton className={classes.add} onMouseUp={readersNew}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readers: getReaders(state)
});
export default connect((mapStateToProps), {
  readersEdit,
  readersNew,
  readersRequest,
  readersSubmit
})(ReadersView);
