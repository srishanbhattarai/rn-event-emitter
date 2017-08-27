const Event = require('../lib/eventemitter');

describe('functional tests', () => {

  let counter = 0;

  afterEach(() => {
    counter = 0;
  });

  it('should emit events without data', () => {
    const mockFn = jest.fn();
    Event.subscribe('data', mockFn);

    Event.emit('data');

    expect(mockFn).toHaveBeenCalled();
  });

  it('should emit events with data', () => {
    Event.subscribe('data', ({ incrementValue }) => {
      counter += incrementValue;
    });

    Event.emit('data', { incrementValue: 10 })

    expect(counter).toEqual(10);
  });

  it('emit event to all subscribed listeners.', () => {

    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();

    Event.subscribe('data', mockFn1);
    Event.subscribe('data', mockFn2);

    Event.emit('data', { incrementValue: 10 })

    expect(mockFn1).toHaveBeenCalled();
    expect(mockFn2).toHaveBeenCalled();
  });

  it('emit event to only the remaining subscribers after one or more subscribers unsubscribe.', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = ({ incrementValue }) => {
      counter += incrementValue;
    };

    Event.subscribe('data', mockFn1);
    const unsub2 = Event.subscribe('data', mockFn2);

    unsub2();

    Event.emit('data', { incrementValue: 10 })

    expect(mockFn1).toHaveBeenCalled();
    expect(counter).toEqual(0); // no change in counter value.
  });
});