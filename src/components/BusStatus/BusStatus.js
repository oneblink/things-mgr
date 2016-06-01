import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import FlatButton from 'material-ui/FlatButton';

import { getBusmqLastMessageDate } from '../../redux/modules/busmq.js';

import classes from './BusStatus.css';

function secondsSinceDate (dateString) {
  if (!dateString) {
    return Infinity;
  }
  const then = new Date(dateString);
  const now = new Date();
  return Math.floor((now - then) / 1000);
}

export class BusStatus extends React.Component {
  componentDidMount () {
    // automatically re-render every second
    this.setState({
      timer: setInterval(() => {
        this.forceUpdate();
      }, 1e3)
    });
  }

  componentWillUnmount () {
    clearTimeout((this.state || {}).timer);
  }

  render () {
    const { className, lastMessageDate } = this.props;
    const secondsAgo = secondsSinceDate(lastMessageDate);
    const props = {
      className: classnames(classes.self, className),
      disabled: true,
      label: 'Event Bus',
      labelStyle: { color: secondsAgo <= 45 ? 'green' : 'red' }
    };
    return (
      <FlatButton {...props} />
    );
  }
}

BusStatus.propTypes = {
  className: PropTypes.string,
  lastMessageDate: PropTypes.string
};

const mapStateToProps = (state) => ({
  lastMessageDate: getBusmqLastMessageDate(state)
});
export default connect((mapStateToProps), {})(BusStatus);
