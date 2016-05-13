import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { firstMatch, potentialIds } from '../../redux/modules/events.js';
import { getReadersMap } from '../../redux/modules/readers';
import { getTagsMap } from '../../redux/modules/tags';
import { getUsersMap } from '../../redux/modules/users';

import { TimeAgo } from '../TimeAgo/TimeAgo.js';

import classes from './Event.css';

const TYPES = {
  beacon: 'Beacons',
  RFID: 'RFID tags',
  wifi: 'WiFi devices'
};

export const Event = ({ event, readersMap, tagsMap, usersMap }) => {
  const { name, tags: { devices, host, messages, payload, tag, type, user } } = event;
  let msg = '';
  msg = `found ${devices} ${TYPES[type]} nearby`;
  if (name === 'rfid-scan' && Array.isArray(messages) && messages.length) {
    msg = `${messages.length} notifications triggered by RFID scan`;
    const thing = tagsMap.get(tag);
    if (thing) {
      msg = `${messages.length} notifications sent on behalf of ${thing}`;
    }
  } else if (type === 'RFID' || type === 'beacon' && host) {
    msg = `reader ${host} scanned ${devices} tags`;
    const readerName = readersMap.get(host);
    if (readerName) {
      msg = `${devices} tags in ${readerName}`;
    }
    const things = (payload || [])
      .map((p) => firstMatch(tagsMap, potentialIds(p)))
      .filter((x) => !!x)
      .join(', ');
    if (things) {
      msg = `${things} in ${readerName}`;
    }
  }
  if (name === 'subscription-invite') {
    msg = `${type} invitation to monitor a tag`;
    const thing = usersMap.get(user);
    if (thing) {
      msg = `${type} invitation to monitor ${thing}`;
    }
  }
  if (name === 'subscribed' && type) {
    msg = `confirmed ${type} subscription to monitor a tag`;
    const thing = usersMap.get(user);
    if (thing) {
      msg = `confirmed ${type} subscription to monitor ${thing}`;
    }
  }

  const timeProps = {
    className: classes.time,
    value: event.date
  };

  return (
    <div className={classes.self} title={JSON.stringify(event)}>
      <span>{msg}</span>
      {' '}
      <TimeAgo {...timeProps} />
      <div className={classes.clearfix}></div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object,
  readersMap: PropTypes.instanceOf(Map),
  tagsMap: PropTypes.instanceOf(Map),
  usersMap: PropTypes.instanceOf(Map)
};

const mapStateToProps = (state) => ({
  readersMap: getReadersMap(state),
  tagsMap: getTagsMap(state),
  usersMap: getUsersMap(state)
});
export default connect((mapStateToProps), {})(Event);
