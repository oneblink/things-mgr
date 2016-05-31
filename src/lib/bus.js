// https://github.com/blinkmobile/no-polling-example/blob/master/www/bus.js

import busmq from 'busmq/busmq.js';

import {
  busmqSetStatus, busmqSetLastMessageDate,
  getBusmq
} from '../redux/modules/busmq.js';
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
        'ready', 'subscribed', 'unsubscribed',
        'message', 'error'
      ].forEach((event) => {
        pubsub.on(event, () => store.dispatch(busmqSetStatus(event)));
      });

      [
        'reconnecting', 'reconnected'
      ].forEach((event) => {
        pubsub.fed.on(event, () => store.dispatch(busmqSetStatus(event)));
      });

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

    // basic "marco" -> "polo" heartbeat every 45 seconds
    bus.pubsub('system.marco.polo', (err, ps) => {
      if (err) {
        console.error(`unable setup "system.marco.polo" bus via ${WSS_URL}`);
        console.error(err);
        return;
      }

      ps.on('message', (msg) => {
        store.dispatch(busmqSetLastMessageDate());
        if (msg === 'marco') {
          ps.publish('polo');
        }
      });

      ps.subscribe();

      setInterval(() => {
        ps.publish('marco');
      }, 45e3);
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
