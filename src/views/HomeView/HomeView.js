/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import RaisedButton from 'material-ui/lib/raised-button';

import { increment, doubleAsync } from '../../redux/modules/counter';

import DuckImage from './Duck.jpg';
import classes from './HomeView.css';

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-2 col-xs-offset-5'>
            <img className={classes.duck}
              src={DuckImage}
              alt='This is a duck, because Redux.' />
          </div>
        </div>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>
          Sample Counter:
          {' '}
          <span className={classnames([classes.counter, classes.green])}>{this.props.counter}</span>
        </h2>
        <RaisedButton label='Increment' onClick={this.props.increment} primary />
        {' '}
        <RaisedButton label='Double (Async)' onClick={this.props.doubleAsync} primary />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
});
export default connect((mapStateToProps), {
  increment: () => increment(1),
  doubleAsync
})(HomeView);
