# React Native Event Emitter [![Build Status](https://travis-ci.org/srishanbhattarai/rn-event-emitter.svg?branch=master)](https://travis-ci.org/srishanbhattarai/rn-event-emitter)

An ES6 based, lightweight event emitter created for, but not limited to, React Native.

The `Event` object is a helper class with `static` methods for emitting and subscribing to events.

## API

### Event.emit
```
Event.emit('data'); // simple emissions
Event.emit('data', { additional: 'data' }); // emissions with data
```
---

### Event.subscribe
```
const unsubscribe = Event.subscribe('data', 'home-page-listener', (eventData) => {
  console.log('Got data event!', eventData);
});
```

The `subscribe` method returns a unsubscription thunk.

```
unsubcribe(); // removes this callback from the listener pool for the 'data' event`
```

---

### Event.destroy
```
Event.destroy('data'); // remove all listeners associated with this event name
```
