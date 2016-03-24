import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import timeAgo from 'damals';

import { getReadersMap } from '../../redux/modules/readers';

import classes from './Event.css';

export const Event = ({ event, readersMap }) => {
  const { tags: { devices, host, type } } = event;
  let msg = '';
  msg = `detected ${devices} ${type} device(s)`;
  if (type === 'RFID' && host) {
    msg = `reader ${host} scanned ${devices} tags`;
    const readerName = readersMap.get(host);
    if (readerName) {
      msg = `${devices} tags scanned at ${readerName}`;
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
  readersMap: PropTypes.instanceOf(Map)
};

const mapStateToProps = (state) => ({
  readersMap: getReadersMap(state)
});
export default connect((mapStateToProps), {})(Event);
