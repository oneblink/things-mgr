import { combineReducers } from 'redux-immutable';

import counter from './modules/counter';
import { busmqReducer as busmq } from './modules/busmq.js';
import { dischargeReducer as discharge } from './modules/discharge';
import { eventsReducer as events } from './modules/events';
import { loginReducer as login } from './modules/login';
import { readersReducer as readers } from './modules/readers';
import { registerReducer as register } from './modules/register';
import { routerReducer as router } from './modules/router';
import { searchReducer as search } from './modules/search';
import { subscriptionReducer as subscription } from './modules/subscription';
import { tagsReducer as tags } from './modules/tags';
import { usersReducer as users } from './modules/users';

export default combineReducers({
  busmq,
  counter,
  discharge,
  events,
  login,
  readers,
  register,
  router,
  search,
  subscription,
  tags,
  users
});
