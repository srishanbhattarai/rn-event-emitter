# React Native Event Emitter 
[![Build Status](https://travis-ci.org/srishanbhattarai/rn-event-emitter.svg?branch=master)](https://travis-ci.org/srishanbhattarai/rn-event-emitter)
[![Coverage Status](https://coveralls.io/repos/github/srishanbhattarai/rn-event-emitter/badge.svg?branch=master)](https://coveralls.io/github/srishanbhattarai/rn-event-emitter?branch=master)

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
```js
import Event from 'rn-event-emitter';
```

## API

### Event.emit
```js
Event.emit('data'); // simple emissions
Event.emit('data', { additional: 'data' }); // emissions with data
```
---

### Event.subscribe
```js
const unsubscribe = Event.subscribe('data', (eventData) => {
  console.log('Got data event!', eventData);
});
```

The `subscribe` method returns a unsubscription thunk.

```js
unsubcribe(); // removes this callback from the listener pool for the 'data' event`
```

---

### Event.destroy
```js
Event.destroy('data'); // remove all listeners associated with this event name
```
