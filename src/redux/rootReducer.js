import { combineReducers } from 'redux-immutable';

import counter from './modules/counter';
import { loginReducer as login } from './modules/login';
import { readersReducer as readers } from './modules/readers';
import { registerReducer as register } from './modules/register';
import { routerReducer as router } from './modules/router';
import { subscriptionReducer as subscription } from './modules/subscription';
import { tagsReducer as tags } from './modules/tags';
import { usersReducer as users } from './modules/users';

export default combineReducers({
  counter,
  login,
  readers,
  register,
  router,
  subscription,
  tags,
  users
});
