import { Map } from 'immutable';
import { createSelector } from 'reselect';

export const BUSMQ_SET_CONFIG = 'BUSMQ_SET_CONFIG';
export const busmqSetConfig = (config) => ({
  type: BUSMQ_SET_CONFIG,
  payload: config
});

export const BUSMQ_SET_LAST_MESSAGE_DATE = 'BUSMQ_SET_LAST_MESSAGE_DATE';
export const busmqSetLastMessageDate = (config) => ({
  type: BUSMQ_SET_LAST_MESSAGE_DATE
});

export const BUSMQ_SET_STATUS = 'BUSMQ_SET_STATUS';
export const busmqSetStatus = (status) => ({
  type: BUSMQ_SET_STATUS,
  payload: status
});

const ACTION_HANDLERS = {

  [BUSMQ_SET_CONFIG]: (state, action) => state.merge(action.payload),

  [BUSMQ_SET_LAST_MESSAGE_DATE]: (state, action) => state.set('lastMessageDate', (new Date()).toISOString()),

  [BUSMQ_SET_STATUS]: (state, action) => state.set('status', action.payload)

};

export const busmqReducer = (state = new Map(), action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export const getBusmq = (state) => state.get('busmq');

export const getBusmqLastMessageDate = createSelector(
  [getBusmq],
  (busmq) => busmq.get('lastMessageDate')
);

export const getBusmqStatus = createSelector(
  [getBusmq],
  (busmq) => busmq.get('status')
);
