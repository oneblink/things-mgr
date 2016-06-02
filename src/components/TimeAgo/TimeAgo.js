import React, { PropTypes } from 'react';
import classnames from 'classnames';
import timeAgo from 'damals';

import classes from './TimeAgo.css';

const SECOND = 1e3;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const ELAPSED_MIN = MINUTE;
const ELAPSED_MAX = HOUR / 3;

export class TimeAgo extends React.Component {
  componentDidMount () {
    // automatically re-render every 30 seconds
    this.setState({
      timer: setInterval(() => {
        this.forceUpdate();
      }, 30e3)
    });
  }

  componentWillUnmount () {
    clearTimeout((this.state || {}).timer);
  }

  render () {
    const { className, value } = this.props;
    const date = new Date(value);
    const elapsed = (new Date()) - date;
    // clamp elapsed between 1 minute and 1 hour
    const clampedElapsed = Math.max(Math.min(elapsed, ELAPSED_MAX), ELAPSED_MIN);
    const timeProps = {
      className: classnames(classes.self, className),
      dateTime: value,
      style: {
        opacity: Math.max(0.2, 1 - (clampedElapsed / ELAPSED_MAX))
      }
    };

    return (
      <time {...timeProps}>{timeAgo(date)}</time>
    );
  }
}

TimeAgo.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired
};
