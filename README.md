# React Native Event Emitter [![Build Status](https://travis-ci.org/srishanbhattarai/rn-event-emitter.svg?branch=master)](https://travis-ci.org/srishanbhattarai/rn-event-emitter)

> This is in no way coupled to React Native, but it is what I end up using this most for.

An ES6 based, lightweight event emitter created for, but not limited to, React Native.

## Installation
```
npm i --save rn-event-emitter
```
Or, if you prefer yarn:
```
yarn add rn-event-emitter
```

## Usage
The `Event` object is a utility class with `static` methods for emitting and subscribing to events.
```
import Event from 'rn-event-emitter';
```

## API

### Event.emit
```
Event.emit('data'); // simple emissions
Event.emit('data', { additional: 'data' }); // emissions with data
```
---

### Event.subscribe
```
const unsubscribe = Event.subscribe('data', (eventData) => {
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
