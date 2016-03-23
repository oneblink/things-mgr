import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Map } from 'immutable';

import { Tab, Tabs } from 'material-ui/lib/tabs';

import classes from './NavTabs.css';

export class LoginView extends React.Component {
  static propTypes = {
    location: PropTypes.instanceOf(Map),
    push: PropTypes.func.isRequired
  };

  render () {
    const { push, location } = this.props;
    const { basename, pathname } = location.toJS();

    const tabsProps = {
      className: classes.self,
      onChange: (value) => push(basename + value),
      value: pathname
    };

    if (process.env.USE_CASE === 'app') {
      return (
        <Tabs {...tabsProps}>
          <Tab label='Register' value='register' />
          <Tab label='Subscription' value='subscription' />
          <Tab label='Search' value='search' />
        </Tabs>
      );
    }
    if (process.env.USE_CASE === 'manager') {
      return (
        <Tabs {...tabsProps}>
          <Tab label='Register' value='register' />
          <Tab label='Tags' value='things/tags' />
          <Tab label='People' value='things/people' />
          <Tab label='Readers' value='things/readers' />
          <Tab label='Subscription' value='subscription' />
          <Tab label='Search' value='search' />
        </Tabs>
      );
    }
    return <Tabs {...tabsProps} />;
  }
}

const mapStateToProps = (state) => ({
  // this is not recommended, but I just need a quick hack for now
  location: state.getIn(['router', 'locationBeforeTransitions'])
});
export default connect((mapStateToProps), {
  push
})(LoginView);
