import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import timeAgo from 'damals';

import { getReadersMap } from '../../redux/modules/readers';
import { getTagsMap } from '../../redux/modules/tags';
import { getUsersMap } from '../../redux/modules/users';

import classes from './Event.css';

const SECOND = 1e3;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const ELAPSED_MIN = MINUTE;
const ELAPSED_MAX = HOUR;

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
  } else if (type === 'RFID' && host) {
    msg = `reader ${host} scanned ${devices} tags`;
    const readerName = readersMap.get(host);
    if (readerName) {
      msg = `${devices} tags arrived at ${readerName}`;
    }
    const things = (payload || [])
      .map((p) => {
        return tagsMap.get(p.data.toLowerCase()) ||
          tagsMap.get(p.data.toUpperCase()) ||
          tagsMap.get(p.data.toLowerCase().replace(/^3000/, '')) ||
          tagsMap.get(p.data.toUpperCase().replace(/^3000/, ''));
      })
      .filter((x) => !!x)
      .join(', ');
    if (things) {
      msg = `${things} arrived at ${readerName}`;
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

  const date = new Date(event.date);
  const elapsed = (new Date()) - date;
  // clamp elapsed between 1 minute and 1 hour
  const clampedElapsed = Math.max(Math.min(elapsed, ELAPSED_MAX), ELAPSED_MIN);
  const timeProps = {
    className: classes.time,
    dateTime: event.date,
    style: {
      opacity: Math.max(0.2, 1 - (clampedElapsed / ELAPSED_MAX))
    }
  };

  return (
    <div className={classes.self} title={JSON.stringify(event)}>
      <span>{msg}</span>
      {' '}
      <time {...timeProps}>{timeAgo(date)}</time>
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
