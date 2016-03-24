import React, { } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Paper from 'material-ui/lib/paper';

import classes from './DashboardView.css';

export class DashboardView extends React.Component {
  static propTypes = {};

  render () {
    return (
      <div className={classnames([classes.self])}>
        <div className={classes.indicators}>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Assets<br />on-site</label>
            <label className={classes.indicatorValue}>1</label>
          </Paper>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Patients<br />on-site</label>
            <label className={classes.indicatorValue}>1</label>
          </Paper>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Staff<br />on-site</label>
            <label className={classes.indicatorValue}>1</label>
          </Paper>
        </div>
        <div className={classes.logs}>
          <p>logs</p>
          <p>and logs</p>
          <p>and more logs</p>
        </div>
        <div className={classes.indicators}>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Beacons<br />detected</label>
            <label className={classes.indicatorValue}>1</label>
          </Paper>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>WiFi Devices<br />detected</label>
            <label className={classes.indicatorValue}>1</label>
          </Paper>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>WiFi Devices<br />dwelling</label>
            <label className={classes.indicatorValue}>1</label>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect((mapStateToProps), {})(DashboardView);
