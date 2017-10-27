/* eslint-disable no-console */
import helpers from '../index';
import selectors from '../../selectors';
import subscribeValue from '../subscribeValue';

describe('subscribeValue()', () => {
  it('to be defined', () => {
    expect(subscribeValue).toBeDefined();
  });

  it('configs not defined properly', () => {
    expect(subscribeValue()()).toBe(null);
    expect(subscribeValue({ hi: 'ho' })()).toBe(null);
  });

  it('configs.value not defined properly', () => {
    expect(subscribeValue({ value: {} })()).toBe(null);
  });

  it('configs.value defined properly', () => {
    const test = ['page', 'key'];
    const props = { hi: 'ho' };

    selectors.selectOtherValues = jest.fn((p) => p);
    helpers.reselect = jest.fn((p) => p);

    expect(subscribeValue({ value: { test } }, props)).toEqual({ test });
    expect(selectors.selectOtherValues).toBeCalledWith(test, props);
    expect(helpers.reselect).toBeCalledWith({ test });
  });
});
