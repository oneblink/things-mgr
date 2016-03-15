import { combineReducers } from 'redux-immutable';

import counter from './modules/counter';
import { loginReducer as login } from './modules/login';
import { readersReducer as readers } from './modules/readers';
import { routerReducer as router } from './modules/router';
import { thingsReducer as things } from './modules/things';

export default combineReducers({
  counter,
  login,
  readers,
  router,
  things
});
