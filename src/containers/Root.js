import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

// override the theme here if necessary
// https://github.com/callemall/material-ui/blob/master/examples/webpack-example/src/app/Main.jsx
const muiTheme = getMuiTheme({});

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  };

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    );
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../redux/utils/createDevToolsWindow').default(this.props.store);
        } else {
          window.devToolsExtension.open();
        }
      } else if (!window.devToolsExtension) {
        const DevTools = require('containers/DevTools').default;
        return <DevTools />;
      }
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={{ minHeight: '100vh' }}>
            {this.content}
            {this.devTools}
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
