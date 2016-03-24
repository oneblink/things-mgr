import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import timeAgo from 'damals';

import { getReadersMap } from '../../redux/modules/readers';
import { getTagsMap } from '../../redux/modules/tags';

import classes from './Event.css';

const TYPES = {
  beacon: 'Beacon',
  RFID: 'RFID',
  wifi: 'WiFi'
};

export const Event = ({ event, readersMap, tagsMap }) => {
  const { name, tags: { devices, host, messages, payload, tag, type } } = event;
  let msg = '';
  msg = `found ${devices} ${TYPES[type]} devices nearby`;
  if (name === 'rfid-scan' && Array.isArray(messages) && messages.length) {
    msg = `${messages.length} notifications triggered by RFID scan`;
    const thing = tagsMap.get(tag);
    if (thing) {
      msg = `${messages.length} notifications triggered by scanning ${thing}`;
    }
  } else if (type === 'RFID' && host) {
    msg = `reader ${host} scanned ${devices} tags`;
    const readerName = readersMap.get(host);
    if (readerName) {
      msg = `${devices} tags scanned at ${readerName}`;
    }
    const things = (payload || [])
      .map((p) => tagsMap.get(p.data))
      .filter((x) => !!x)
      .join(', ');
    if (things) {
      msg = `${things} scanned at ${readerName}`;
    }
  }
  return (
    <div className={classes.self} title={JSON.stringify(event)}>
      <span>{msg}</span>
      {' '}
      <time className={classes.time} dateTime={event.date}>{timeAgo(new Date(event.date))}</time>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object,
  readersMap: PropTypes.instanceOf(Map),
  tagsMap: PropTypes.instanceOf(Map)
};

const mapStateToProps = (state) => ({
  readersMap: getReadersMap(state),
  tagsMap: getTagsMap(state)
});
export default connect((mapStateToProps), {})(Event);
