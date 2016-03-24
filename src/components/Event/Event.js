import React, { PropTypes } from 'react';
import timeAgo from 'damals';

import classes from './Event.css';

export const Event = ({ event }) => {
  const { tags: { devices, host, type } } = event;
  let msg = '';
  msg = `detected ${devices} ${type} device(s)`;
  if (type === 'RFID' && host) {
    msg = `reader ${host} scanned ${devices} tags`;
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
  event: PropTypes.object
};
