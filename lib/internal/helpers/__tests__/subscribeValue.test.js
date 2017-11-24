/* eslint-disable no-console */
import helpers from '../index';
import selectors from '../../selectors';
import subscribeValue, { getKeyPath } from '../subscribeValue';

describe('subscribeValue helper', () => {
  describe('getKeyPath()', () => {
    it('default value', () => {
      expect(getKeyPath()).toEqual(undefined);
    });

    it('array object', () => {
      expect(getKeyPath(['page', 'name'])).toEqual(['page', 'name']);
    });

    it('keyPath object', () => {
      expect(getKeyPath({ keyPath: ['page', 'name'] })).toEqual(['page', 'name']);
    });

    it('keyPath undefined', () => {
      expect(getKeyPath({ getter: () => true })).toEqual(undefined);
    });
  });


  describe('subscribeValue()', () => {
    beforeEach(() => {
      selectors.selectOtherValues = jest.fn((p) => p);
      helpers.reselect = jest.fn((p) => p);
    });

    it('to be defined', () => {
      expect(subscribeValue).toBeDefined();
    });

    it('configs not defined properly', () => {
      expect(subscribeValue()()).toBe(null);
      expect(subscribeValue({ hi: 'ho' })()).toBe(null);
    });

    it('configs.value not defined properly', () => {
      expect(subscribeValue()()).toBe(null);
      expect(subscribeValue({ value: true })()).toBe(null);
      expect(subscribeValue({ value: null })()).toBe(null);
      expect(subscribeValue({ value: {} })()).toBe(null);
    });

    it('configs.value array', () => {
      const test = ['page', 'key'];

      expect(subscribeValue({ value: { test } })).toEqual({ [test]: test });

      expect(selectors.selectOtherValues).toBeCalledWith(test);
      expect(helpers.reselect).toBeCalledWith({ [test]: test });
    });

    it('configs.value is object with keyPath', () => {
      const test = {
        keyPath: ['page', 'key'],
      };

      expect(subscribeValue({ value: { test } })).toEqual({ [test.keyPath]: test.keyPath });

      expect(selectors.selectOtherValues).toBeCalledWith(test.keyPath);
      expect(helpers.reselect).toBeCalledWith({ [test.keyPath]: test.keyPath });
    });

    it('configs.value is object without keyPath', () => {
      const test = {
        getter: () => true,
      };

      expect(subscribeValue({ value: { test } })).toEqual({});

      expect(helpers.reselect).toBeCalledWith({});
    });
  });
});
