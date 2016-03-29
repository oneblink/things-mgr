import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { List } from 'immutable';

import Paper from 'material-ui/lib/paper';

import {
  countBeacons, countWifi, eventsRequest, getEvents
} from '../../redux/modules/events';
import { readersRequest } from '../../redux/modules/readers';
import { tagsRequest } from '../../redux/modules/tags';
import {
  countUsersAssets, countUsersStaff, countUsersPatients,
  usersRequest
} from '../../redux/modules/users';

import Event from '../../components/Event/Event';

import classes from './DashboardView.css';

const filterEvents = (event) => {
  const { name, tags: { messages, type } } = event;
  return type !== 'wifi' && !(name === 'rfid-scan' && Array.isArray(messages) && !messages.length);
};

export class DashboardView extends React.Component {
  static propTypes = {
    events: PropTypes.instanceOf(List),
    eventsRequest: PropTypes.func.isRequired,
    numAssets: PropTypes.number,
    numBeacons: PropTypes.number,
    numPatients: PropTypes.number,
    numStaff: PropTypes.number,
    numWifi: PropTypes.number,
    readersRequest: PropTypes.func.isRequired,
    tagsRequest: PropTypes.func.isRequired,
    usersRequest: PropTypes.func.isRequired
  };

  componentDidMount () {
    // automatically refresh user listing
    this.props.eventsRequest();
    this.props.readersRequest();
    this.props.tagsRequest();
    this.props.usersRequest();
    // automatically refresh user listing every 30 seconds
    this.setState({
      timer: setInterval(() => {
        this.props.eventsRequest();
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
    const {
      events, numAssets, numBeacons, numPatients, numStaff, numWifi
    } = this.props;

    return (
      <div className={classnames([classes.self])}>
        <div className={classes.indicators}>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Assets<br />on-site</label>
            <label className={classes.indicatorValue}>{numAssets}</label>
          </Paper>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Patients<br />registered</label>
            <label className={classes.indicatorValue}>{numPatients}</label>
          </Paper>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Staff<br />on-site</label>
            <label className={classes.indicatorValue}>{numStaff}</label>
          </Paper>
        </div>
        <div className={classes.logs}>
          <h1 className={classes.logHeading}>Recent Events</h1>
          {events.toJS().filter(filterEvents).map((event) => (
            <Event key={event._id} event={event} />
          ))}
        </div>
        <div className={classes.indicators}>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>Staff<br />nearby</label>
            <label className={classes.indicatorValue}>{numBeacons}</label>
          </Paper>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>WiFi Devices<br />nearby</label>
            <label className={classes.indicatorValue}>{numWifi}</label>
          </Paper>
          <Paper className={classes.indicator}>
            <label className={classes.indicatorName}>WiFi Devices<br />dwelling</label>
            <label className={classes.indicatorValue}>{numWifi}</label>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: getEvents(state),
  numAssets: countUsersAssets(state),
  numBeacons: countBeacons(state),
  numStaff: countUsersStaff(state),
  numPatients: countUsersPatients(state),
  numWifi: countWifi(state)
});
export default connect((mapStateToProps), {
  eventsRequest,
  readersRequest,
  tagsRequest,
  usersRequest
})(DashboardView);
