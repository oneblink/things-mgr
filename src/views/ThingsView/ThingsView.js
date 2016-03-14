import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import classes from './ThingsView.css';

export class ThingsView extends React.Component {
  render () {
    return (
      <div className={classnames([classes.self])}>
        <p>Things!</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect((mapStateToProps), {})(ThingsView);
