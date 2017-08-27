import Event from '../lib/eventemitter';

describe('functional tests', () => {

  let counter = 0;

  afterEach(() => {
    counter = 0;
    Event.destroy('data');
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

    Event.emit('data', { incrementValue: 15 })

    expect(mockFn1).toHaveBeenCalled();
    expect(counter).toEqual(0); // no change in counter value.
  });

  it('should throw an error if event name is absent during subscription', () => {
    expect(() => Event.subscribe()).toThrow();
  });

  it('should throw an error if callback is absent during subscription', () => {
    expect(() => Event.subscribe('data')).toThrow();
  });

  it('should throw an error if event name is absent during emission', () => {
    expect(() => Event.emit()).toThrow();
  });

});
