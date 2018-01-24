/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { makeCallback } from '../makeCallback';


describe('makeCallback()', () => {
  it('should exists', () => {
    expect(makeCallback);
  });

  it('should not crash with empty param', () => {
    const callbacks = makeCallback();
    expect(callbacks.length).toBe(0);
  });

  it('should contain default callback', () => {
    const data = { type: 'USER_FETCH_SUCCEEDED' };
    const defaultCallback = () => data;
    const callbacks = makeCallback(defaultCallback);
    expect(callbacks[0]).toEqual(put(data));
  });

  it('should contain all callbacks', () => {
    const data = { type: 'USER_FETCH_SUCCEEDED' };
    const data2 = { type: 'USER_FETCH_SUCCEEDED_2' };
    const defaultCallback = () => data;
    const callback2 = () => data2;
    const callback3 = () => data2;
    const callbacks = makeCallback(defaultCallback, [callback2, callback3]);
    expect(callbacks[0]).toEqual(put(data));
    expect(callbacks[1]).toEqual(put(data2));
    expect(callbacks[2]).toEqual(put(data2));
  });

  it('should throw error for invalid callback', () => {
    let error;
    const defaultCallback = () => 234;
    const callback2 = 123;

    try {
      makeCallback(defaultCallback, [callback2]);
    } catch (err) {
      error = err;
    }

    expect(error).toMatchSnapshot();
  });
});
