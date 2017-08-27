/**
 * Small implementation of an event emitter.
 */

const events = {};

class Event {

  /**
   * Listener for an event.
   *
   * @static
   * @param {string} eventName - which event name to listen to
   * @param {function} cb - When the event is emitted, the function to call
   * @returns {function} - the unsubscribe function
   */
  static subscribe(eventName, cb) {
    if (!eventName) throw 'Event name cannot be empty or null';
    if (!cb) throw 'A callback must be registered for subscription';

    const uuid = Event._generateGuid()

    if (events.hasOwnProperty(eventName)) {
      // event registered, register a cb with the listener ID

      // ignoring the rare case where the generateGuid function gives a duplicate id
      events[eventName][uuid] = cb;
    } else {
      // event not registered, register it, then register the cb
      events[eventName] = {};
      events[eventName][uuid] = cb;
    }

    return () => Event._unsubscribe(eventName, uuid);
  }

  /**
   * Create a random pseudo-unique string to identify each listener.
   *
   * @static
   * @returns {string}
   */
  static _generateGuid() {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  /**
   * Emit an event.
   *
   * @static
   * @param {string} eventName Name of event to be emitted.
   * @param {Object} data={} Optional data to be provided by the eventj
   * @returns {boolean} indication if the emission worked
   */
  static emit(eventName, data = {}) {
    if (!eventName) throw 'An event name is required for emission.';
    // The callbacks for eventName are registered listener Id keys under events[eventName]
    const registeredListeners = events[eventName];

    try {
      for (let uuid of Object.keys(registeredListeners)) {
        registeredListeners[uuid](data);
      }
    } catch (x) {
      // errors when no listeners are initialized, safe to ignore
    }

    return true;
  }

  /**
   * Unsubscribe an event listener from an event.
   *
   * @static
   * @param {string} eventName - the event to unsub from
   * @param {string} uuid - the single listener to be unsubbed
   */
  static _unsubscribe(eventName, uuid) {
    delete events[eventName][uuid];
  }

  /**
   * Remove the event and all registered listeners.
   *
   * @static
   * @param {String} eventName - event name to destroy
   */
  static destroy(eventName) {
    delete events[eventName];
  }

}

export default Event;
