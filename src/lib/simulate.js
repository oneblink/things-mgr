import { getReaders } from '../redux/modules/readers';
import { getTags, tagsEdit } from '../redux/modules/tags';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomListIndex = (list) => {
  if (!list.size) {
    return -1;
  }
  return randomInt(0, list.size - 1);
};

const randomListId = (list) => {
  const index = randomListIndex(list);
  if (index >= 0) {
    return list.getIn([index, 'id']);
  }
  return null;
};

const randomiseReader = (store) => {
  let state = store.getState();
  const tagIndex = randomListIndex(getTags(state));
  const reader = randomListId(getReaders(state));
  if (tagIndex >= 0) {
    store.dispatch(tagsEdit(tagIndex, { readers: reader }));
  }
};

export const attachSimulation = (store) => {
  setInterval(() => randomiseReader(store), 2e3);
};
