import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import ReactDataGrid from 'react-data-grid/addons';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentSave from 'material-ui/lib/svg-icons/content/save';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import {
  getTags, tagsEdit, tagsNew, tagsRequest, tagsSubmit
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

  componentDidMount () {
    // automatically refresh listing
    this.props.tagsRequest();
  }

  render () {
    const {
      tags, tagsEdit, tagsNew, tagsSubmit
    } = this.props;

    const gridProps = {
      columns: [
        { key: 'id', name: 'ID', editable: true },
        { key: 'users', name: 'Person', editable: true },
        { key: 'readers', name: 'Reader', editable: true }
      ],
      enableCellSelect: true,
      minHeight: document.documentElement.clientHeight - 120,
      rowGetter: (index) => {
        const { id, links: { users, readers } } = tags.get(index).toJS();
        return { id, users, readers };
      },
      rowsCount: tags.size,
      onRowUpdated: ({ rowIdx, updated }) => tagsEdit(rowIdx, updated)
    };

    return (
      <div className={classnames([classes.self])}>
        <ReactDataGrid {...gridProps} />

        <FloatingActionButton className={classes.save} onMouseUp={tagsSubmit} secondary>
          <ContentSave />
        </FloatingActionButton>

        <FloatingActionButton className={classes.add} onMouseUp={tagsNew}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tags: getTags(state)
});
export default connect((mapStateToProps), {
  tagsEdit,
  tagsNew,
  tagsRequest,
  tagsSubmit
})(TagsView);
