import { combineReducers } from 'redux-immutable';

import counter from './modules/counter';
import { loginReducer as login } from './modules/login';
import { routerReducer as router } from './modules/router';
import { thingsReducer as things } from './modules/things';

export default combineReducers({
  counter,
  login,
  router,
  things
});
