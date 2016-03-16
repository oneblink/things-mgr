import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import ReactDataGrid from 'react-data-grid/addons';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import RaisedButton from 'material-ui/lib/raised-button';

import {
  tagsEdit, tagsNew, tagsRequest, tagsSubmit
} from '../../redux/modules/tags';

import classes from './TagsView.css';

export class TagsView extends React.Component {
  static propTypes = {
    tags: PropTypes.instanceOf(List),
    tagsEdit: PropTypes.func.isRequired,
    tagsNew: PropTypes.func.isRequired,
    tagsRequest: PropTypes.func.isRequired,
    tagsSubmit: PropTypes.func.isRequired
  };

  render () {
    const {
      tags, tagsEdit, tagsNew, tagsRequest, tagsSubmit
    } = this.props;

    const gridProps = {
      columns: [
        { key: 'id', name: 'ID', editable: true },
        { key: 'users', name: 'Person', editable: true },
        { key: 'readers', name: 'Reader', editable: true }
      ],
      enableCellSelect: true,
      minHeight: document.documentElement.clientHeight - 150,
      rowGetter: (index) => {
        const { id, links: { users, readers } } = tags.get(index).toJS();
        return { id, users, readers };
      },
      rowsCount: tags.size,
      onRowUpdated: ({ rowIdx, updated }) => tagsEdit(rowIdx, updated)
    };

    return (
      <div className={classnames([classes.self])}>
        <RaisedButton label='Refresh' onMouseUp={tagsRequest} />
        <RaisedButton label='Submit' onMouseUp={tagsSubmit} />

        <ReactDataGrid {...gridProps} />

        <FloatingActionButton className={classes.add} onMouseUp={tagsNew}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tags: state.get('tags')
});
export default connect((mapStateToProps), {
  tagsEdit,
  tagsNew,
  tagsRequest,
  tagsSubmit
})(TagsView);
