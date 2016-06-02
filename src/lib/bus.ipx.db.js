import { readersInsertUpdate } from '../redux/modules/readers.js';
import { tagsInsertUpdate } from '../redux/modules/tags.js';
import { usersInsertUpdate } from '../redux/modules/users.js';

function parseBind (bind) {
  const id = bind[':id'];
  const resource = {};
  for (let [key, value] of Object.entries(bind)) {
    key = key.replace(/^:(update_)?/, '');
    if (/_id$/.test(key)) {
      resource.links = resource.links || {};
      key = key.replace(/_id$/, 's');
      resource.links[key] = value;
    } else {
      resource[key] = value;
    }
  }
  if (resource.info && typeof resource.info === 'string') {
    resource.info = JSON.parse(resource.info);
  }
  return { id, resource };
}

const actionCreators = {
  reader: readersInsertUpdate,
  tag: tagsInsertUpdate,
  user: usersInsertUpdate
};

const DELETE_REGEXP = /^DELETE FROM (\w+) /;
function handleIfDelete (store, { sql, bind }) {
  const matches = sql.match(DELETE_REGEXP);
  if (!matches) {
    return;
  }
  console.log('ipx.db', 'delete', matches[1], parseBind(bind));
}

const INSERT_REGEXP = /^INSERT INTO (\w+) /;
function handleIfInsert (store, { sql, bind }) {
  const matches = sql.match(INSERT_REGEXP);
  if (!matches || !bind[':id']) {
    return;
  }
  const { id, resource } = parseBind(bind);
  store.dispatch(actionCreators[matches[1]](id, resource));
}

const UPDATE_REGEXP = /^UPDATE (\w+) /;
function handleIfUpdate (store, { sql, bind }) {
  const matches = sql.match(UPDATE_REGEXP);
  if (!matches || !bind[':id']) {
    return;
  }
  const { id, resource } = parseBind(bind);
  store.dispatch(actionCreators[matches[1]](id, resource));
}

// handleIpxDb (store: ReduxStore, msg: Object)
export function handleIpxDb (store, msg) {
  if (msg.sql && msg.bind) {
    handleIfDelete(store, msg);
    handleIfInsert(store, msg);
    handleIfUpdate(store, msg);
  }
}
