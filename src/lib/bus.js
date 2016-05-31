// https://github.com/blinkmobile/no-polling-example/blob/master/www/bus.js

import busmq from 'busmq/busmq.js';

import { getBusmq, busmqSetLastMessageDate } from '../redux/modules/busmq.js';
import { eventsRequestSuccess } from '../redux/modules/events.js';

const TOPIC = 'ipx.event';

let bus;
let pubsub;

function onChange (store, { SECRET, WSS_URL }) {
  if (SECRET && WSS_URL && !bus) {
    console.log('syncBusWithStore -> onChange', WSS_URL, 'opening...');
    // open the bus
    bus = busmq(WSS_URL, SECRET);
    bus.pubsub(TOPIC, (err, ps) => {
      if (err) {
        console.error(`unable setup "${TOPIC}" bus via ${WSS_URL}`);
        console.error(err);
        return;
      }
      pubsub = ps;

      [
        'ready', 'subscribed', 'unsubscribed'
      ].forEach((event) => {
        pubsub.on(event, () => console.log(`pubsub [${TOPIC}]: event = ${event}`));
      });

      [
        'reconnecting', 'reconnected'
      ].forEach((event) => {
        pubsub.fed.on(event, () => console.log(`pubsub.fed [${TOPIC}]: event = ${event}`));
      });

      pubsub.on('message', (msg) => console.log(`pubsub [${TOPIC}]: msg = ${msg}`));
      pubsub.on('error', (err) => console.error(`pubsub [${TOPIC}]: err = ${err}`));

      pubsub.on('message', (msg) => {
        store.dispatch(busmqSetLastMessageDate());
        try {
          msg = JSON.parse(msg);
        } catch (err) {
          console.error(`unable to parse "${TOPIC}" message`);
          console.error(err);
        }
        if (msg && Array.isArray(msg.events)) {
          store.dispatch(eventsRequestSuccess(msg.events));
        }
      });

      pubsub.subscribe();
    });
  }
  if (bus && !(SECRET && WSS_URL)) {
    // TODO: close the bus
  }
}

let currentValue;
const makeHandler = (store) => () => {
  let previousValue = currentValue;
  currentValue = getBusmq(store.getState());
  if (previousValue !== currentValue) {
    onChange(store, currentValue.toJS());
  }
};

export function syncBusWithStore (store) {
  const handler = makeHandler(store);
  store.subscribe(handler);
  handler();
}
