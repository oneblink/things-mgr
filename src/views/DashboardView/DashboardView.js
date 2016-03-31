import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { List } from 'immutable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  countBeacons, countWifi, countWifiDwellers, eventsRequest, getEvents
} from '../../redux/modules/events';
import { readersRequest } from '../../redux/modules/readers';
import { tagsRequest } from '../../redux/modules/tags';
import {
  countUsersAssets, countUsersStaff, countUsersPatients,
  usersRequest
} from '../../redux/modules/users';

import Event from '../../components/Event/Event';
import { Indicator } from '../../components/Indicator/Indicator';

import classes from './DashboardView.css';

const filterEvents = (event) => {
  const { name, tags: { messages, type } } = event;
  return type !== 'wifi' &&
    !(name === 'rfid-scan' && Array.isArray(messages) && !messages.length) &&
    name !== 'beacon-scan';
};

const TRANSITION_PROPS = {
  transitionEnterTimeout: 1000,
  transitionLeave: false,
  transitionName: {
    enter: classes.eventEnter,
    enterActive: classes.eventEnterActive
  }
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
    numWifiDwellers: PropTypes.number,
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
      events, numAssets, numBeacons, numPatients, numStaff,
      numWifi, numWifiDwellers
    } = this.props;

    return (
      <div className={classnames([classes.self])}>
        <div className={classes.indicators}>
          <Indicator className={classes.indicator} value={numAssets}>
            Assets<br />on-site
          </Indicator>
          <Indicator className={classes.indicator} value={numPatients}>
            Patients<br />registered
          </Indicator>
          <Indicator className={classes.indicator} value={numStaff}>
            Staff<br />on-site
          </Indicator>
        </div>
        <div className={classes.logs}>
          <h1 className={classes.logHeading}>Recent Events</h1>
          <ReactCSSTransitionGroup {...TRANSITION_PROPS}>
            {events.toJS().filter(filterEvents).map((event) => (
              <Event key={event._id} event={event} />
            ))}
          </ReactCSSTransitionGroup>
        </div>
        <div className={classes.indicators}>
          <Indicator className={classes.indicator} value={numBeacons}>
            Staff<br />nearby
          </Indicator>
          <Indicator className={classes.indicator} value={numWifi}>
            WiFi Devices<br />nearby
          </Indicator>
          <Indicator className={classes.indicator} value={numWifiDwellers}>
            WiFi Devices<br />dwelling
          </Indicator>
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
  numWifi: countWifi(state),
  numWifiDwellers: countWifiDwellers(state)
});
export default connect((mapStateToProps), {
  eventsRequest,
  readersRequest,
  tagsRequest,
  usersRequest
})(DashboardView);
