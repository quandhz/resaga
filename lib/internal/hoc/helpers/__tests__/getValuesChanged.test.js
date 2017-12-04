import helpers from '../index';
import getValuesChanged, { isValueChanged } from '../getValuesChanged';

describe('getValuesChanged()', () => {
  it('to be defined', () => {
    expect(getValuesChanged).toBeDefined();
    expect(typeof getValuesChanged).toBe('function');
    expect(isValueChanged).toBeDefined();
    expect(typeof isValueChanged).toBe('function');
  });

  describe('isValueChanged()', () => {
    it('isEqual given', () => {
      expect(isValueChanged(1, 2, jest.fn(() => true))).toBe(false);
      expect(isValueChanged(1, 2, jest.fn(() => false))).toBe(true);
    });

    it('compare primitive values', () => {
      expect(isValueChanged(1, 1)).toBe(false);
      expect(isValueChanged(1, 2)).toBe(true);
      expect(isValueChanged('hi', 'hi')).toBe(false);
      expect(isValueChanged('hi', 'hello')).toBe(true);
    });

    it('compare object - strict equal', () => {
      const a = { hi: 'hello' };
      expect(isValueChanged(a, a)).toBe(false);
      expect(isValueChanged(a, { hi: 'hello' })).toBe(true);
    });

    it('compare object - isEqual', () => {
      const a = { hi: 'hello' };
      expect(isValueChanged(a, a, false, true)).toBe(false);
      expect(isValueChanged(a, { hi: 'hello' }, false, true)).toBe(false);
      expect(isValueChanged(a, { hi: 'hello', ho: 'hehe' }, false, true)).toBe(true);
      expect(isValueChanged(a, { ho: 'hehe' }, false, true)).toBe(true);
      expect(isValueChanged({ ho: 'hehe', hi: 123 }, { ho: 'hehe' }, false, true)).toBe(true);
      expect(isValueChanged({}, { ho: 'hehe' }, false, true)).toBe(true);
    });
  });

  describe('getValuesChanged()', () => {
    const props = { hi: 'hello' };

    beforeEach(() => {
      helpers.exportValues = jest.fn(({ props: p }) => p);
    });
    afterEach(() => jest.clearAllMocks());

    it('no current values', () => {
      expect(getValuesChanged(false, props)).toEqual(props);
    });

    it('no changes - primitive values', () => {
      const currentProps = { hi: 1, hello: 2 };
      expect(getValuesChanged(currentProps, currentProps)).toBe(false);
    });

    it('no changes - object', () => {
      expect(getValuesChanged(props, props)).toBe(false);
    });

    it('no changes - mix', () => {
      const currentProps = { hi: 1, hello: 'world' };
      expect(getValuesChanged(currentProps, currentProps)).toBe(false);
    });

    it('some changes - primitive values', () => {
      const currentProps = { hi: 1, hello: 2 };
      const nextProps = { hi: 1, hello: 3 };
      expect(getValuesChanged(currentProps, nextProps)).toEqual({ hello: 3 });
    });

    it('some changes - object', () => {
      const currentProps = { hi: 'hii' };
      const nextProps = { hi: 'hello' };
      expect(getValuesChanged(currentProps, nextProps)).toEqual({ hi: 'hello' });
    });

    it('some changes - mix', () => {
      const currentProps = { nochange: 1, hi: 'hii', hello: 2 };
      const nextProps = { nochange: 1, hi: 'hello', hello: 3 };
      expect(getValuesChanged(currentProps, nextProps)).toEqual({ hi: 'hello', hello: 3 });
    });

    it('own compare function - isEqual false', () => {
      const currentProps = { hi: 'hello' };
      const nextProps = {
        hi: 'hello',
      };
      const internalProps = {
        configs: { value: { hi: { isEqual: () => false } } },
      };
      expect(getValuesChanged(currentProps, nextProps, internalProps)).toEqual({ hi: 'hello' });
    });

    it('own compare function - isEqual true', () => {
      const currentProps = { hi: 'hello' };
      const nextProps = {
        hi: 'hellooooo',
      };
      const internalProps = {
        configs: { value: { hi: { isEqual: () => true } } },
      };
      expect(getValuesChanged(currentProps, nextProps, internalProps)).toEqual(false);
    });
  });
});
