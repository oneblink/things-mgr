import { combineReducers } from 'redux-immutable';

import counter from './modules/counter';
import { routerReducer as router } from './modules/router';

export default combineReducers({
  counter,
  router
});
