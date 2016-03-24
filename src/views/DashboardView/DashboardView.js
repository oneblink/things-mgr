import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Paper from 'material-ui/lib/paper';

import { readersRequest } from '../../redux/modules/readers';
import { tagsRequest } from '../../redux/modules/tags';
import {
  countUsersAssets, countUsersStaff, countUsersPatients,
  usersRequest
} from '../../redux/modules/users';

import classes from './DashboardView.css';

export class DashboardView extends React.Component {
  static propTypes = {
    numAssets: PropTypes.number,
    numPatients: PropTypes.number,
    numStaff: PropTypes.number,
    readersRequest: PropTypes.func.isRequired,
    tagsRequest: PropTypes.func.isRequired,
    usersRequest: PropTypes.func.isRequired
  };

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
      }, 15e3)
    });
  }

  componentWillUnmount () {
    clearTimeout((this.state || {}).timer);
  }

  render () {
    const { numAssets, numPatients, numStaff } = this.props;

    return (
      <div className={classnames([classes.self])}>
        <div className={classes.indicators}>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Assets<br />on-site</label>
            <label className={classes.indicatorValue}>{numAssets}</label>
          </Paper>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Patients<br />on-site</label>
            <label className={classes.indicatorValue}>{numPatients}</label>
          </Paper>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Staff<br />on-site</label>
            <label className={classes.indicatorValue}>{numStaff}</label>
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

const mapStateToProps = (state) => ({
  numAssets: countUsersAssets(state),
  numStaff: countUsersStaff(state),
  numPatients: countUsersPatients(state)
});
export default connect((mapStateToProps), {
  readersRequest,
  tagsRequest,
  usersRequest
})(DashboardView);
