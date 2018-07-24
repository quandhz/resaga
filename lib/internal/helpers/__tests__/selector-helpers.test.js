import { SELECTOR_UTILS, SELECTOR_HELPERS } from '../selectorHelpers';
import helpers from '../analyseConfig';

describe('selectorHelpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('SELECTOR_UTILS', () => {
    describe('isKeyPath()', () => {
      it('should return false', () => {
        expect(SELECTOR_UTILS.isKeyPath()).toBe(false);
        expect(SELECTOR_UTILS.isKeyPath(false)).toBe(false);
        expect(SELECTOR_UTILS.isKeyPath(null)).toBe(false);
        expect(SELECTOR_UTILS.isKeyPath('some invalid keyPath')).toBe(false);
      });

      it('should return true', () => {
        expect(SELECTOR_UTILS.isKeyPath(['path', 'to', 'prop'])).toBe(true);
        expect(SELECTOR_UTILS.isKeyPath(() => ['path', 'to', 'prop'])).toBe(true);
      });
    });

    describe('isInvalidKeyPath()', () => {
      it('should return false', () => {
        SELECTOR_UTILS.isKeyPath = jest.fn(() => true);
        expect(SELECTOR_UTILS.isInvalidKeyPath()).toBe(false);
      });

      it('should return true', () => {
        SELECTOR_UTILS.isKeyPath = jest.fn(() => false);
        expect(SELECTOR_UTILS.isInvalidKeyPath()).toBe(true);
      });
    });

    describe('isGetter()', () => {
      it('should return true', () => {
        SELECTOR_UTILS.isInvalidKeyPath = jest.fn(() => true);
        expect(SELECTOR_UTILS.isGetter({ getter: jest.fn() })).toBe(true);
      });

      it('should return false', () => {
        SELECTOR_UTILS.isInvalidKeyPath = jest.fn(() => true);
        expect(SELECTOR_UTILS.isGetter({ getter: 'not a valid getter' })).toBe(false);
      });
    });

    describe('isCacheKey()', () => {
      it('should return true', () => {
        expect(SELECTOR_UTILS.isCacheKey(jest.fn())).toBe(true);
        expect(SELECTOR_UTILS.isCacheKey('cacheKey')).toBe(true);
        expect(SELECTOR_UTILS.isCacheKey(123)).toBe(true);
      });

      it('should return false', () => {
        expect(SELECTOR_UTILS.isCacheKey(undefined)).toBe(false);
        expect(SELECTOR_UTILS.isCacheKey(null)).toBe(false);
        expect(SELECTOR_UTILS.isCacheKey(0)).toBe(false);
      });
    });

    describe('isInvalidCacheKey()', () => {
      it('should return false', () => {
        SELECTOR_UTILS.isCacheKey = jest.fn(() => true);
        expect(SELECTOR_UTILS.isInvalidCacheKey()).toBe(false);
      });

      it('should return true', () => {
        SELECTOR_UTILS.isCacheKey = jest.fn(() => false);
        expect(SELECTOR_UTILS.isInvalidCacheKey()).toBe(true);
      });
    });

    describe('isPropSelector()', () => {
      it('should return false', () => {
        expect(SELECTOR_UTILS.isPropSelector()).toBe(false);
        expect(SELECTOR_UTILS.isPropSelector(null)).toBe(false);
        expect(SELECTOR_UTILS.isPropSelector(123)).toBe(false);
        expect(SELECTOR_UTILS.isPropSelector('some prop')).toBe(false);
      });

      it('should return true', () => {
        expect(SELECTOR_UTILS.isPropSelector(() => 123)).toBe(true);
        expect(SELECTOR_UTILS.isPropSelector([() => 123, () => 456])).toBe(true);
      });
    });

    describe('isArrayOfKeyPaths()', () => {
      it('should return false', () => {
        SELECTOR_UTILS.isKeyPath = jest.fn(() => true);
        expect(SELECTOR_UTILS.isArrayOfKeyPaths()).toBe(false);
        expect(SELECTOR_UTILS.isArrayOfKeyPaths(null)).toBe(false);
        expect(SELECTOR_UTILS.isArrayOfKeyPaths(123)).toBe(false);
      });

      it('should return true', () => {
        SELECTOR_UTILS.isKeyPath = jest.fn(() => true);
        expect(SELECTOR_UTILS.isArrayOfKeyPaths(['a', 'b', 123])).toBe(true);
      });
    });

    describe('isInvalid()', () => {
      it('should return false', () => {
        SELECTOR_UTILS.isInvalidKeyPath = jest.fn(() => false);
        SELECTOR_UTILS.isInvalidCacheKey = jest.fn(() => false);

        expect(SELECTOR_UTILS.isInvalid({})).toBe(false);
      });

      it('should return true', () => {
        SELECTOR_UTILS.isInvalidKeyPath = jest.fn(() => true);
        SELECTOR_UTILS.isInvalidCacheKey = jest.fn(() => true);

        expect(SELECTOR_UTILS.isInvalid()).toBe(true);
        expect(SELECTOR_UTILS.isInvalid(null)).toBe(true);
        expect(SELECTOR_UTILS.isInvalid(123)).toBe(true);
        expect(SELECTOR_UTILS.isInvalid({})).toBe(true);
      });
    });

    describe('selectKeyPath()', () => {
      it('keyPath static isResagaStore false isLoading false', () => {
        const state = { getIn: jest.fn(() => ({ 3: 'getIn' })) };
        const props = {};
        helpers.isResagaStore = jest.fn(() => false);

        expect(SELECTOR_UTILS.selectKeyPath(
          { keyPath: [1, 2, 3], notSetValue: 2233 }, false
        )(state, props)).toBe('getIn');
      });

      it('keyPath static isResagaStore true isLoading false !rest', () => {
        const state = { getIn: jest.fn(() => ({ 3: 'getIn' })) };
        const props = {};
        helpers.isResagaStore = jest.fn(() => true);

        expect(SELECTOR_UTILS.selectKeyPath(
          { keyPath: [1, 2], notSetValue: 2233 }, false
        )(state, props)).toEqual({ 3: 'getIn' });
      });

      it('keyPath function isResagaStore false isLoading true', () => {
        const state = { getIn: jest.fn(() => ({ 3: 'getIn' })) };
        const props = { id: 1 };
        helpers.isResagaStore = jest.fn(() => false);

        expect(SELECTOR_UTILS.selectKeyPath(
          { keyPath: ({ id }) => [id, 2], notSetValue: 2233 }, true
        )(state, props)).toEqual(true);
      });
    });

    describe('makeStateSelectors()', () => {
      it('should return selectKeyPath', () => {
        SELECTOR_UTILS.selectKeyPath = jest.fn(() => 'selectKeyPath');

        expect(SELECTOR_UTILS.makeStateSelectors()([], 123)).toEqual(['selectKeyPath']);
      });
    });

    describe('normaliseKeyPath()', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should return undefined', () => {
        expect(SELECTOR_UTILS.normaliseKeyPath()).toBe(undefined);
      });

      it('should return makeStateSelectors keyPath single', () => {
        SELECTOR_UTILS.makeStateSelectors = jest.fn(() => () => 'makeStateSelectors');

        expect(SELECTOR_UTILS.normaliseKeyPath({ keyPath: [1] })).toBe('makeStateSelectors');
      });

      it('should return makeStateSelectors keyPath array', () => {
        SELECTOR_UTILS.makeStateSelectors = jest.fn(() => () => 'makeStateSelectors');

        expect(SELECTOR_UTILS.normaliseKeyPath({ keyPath: [[1]] })).toBe('makeStateSelectors');
      });

      it('should return makeStateSelectors keyPath function', () => {
        SELECTOR_UTILS.makeStateSelectors = jest.fn(() => () => 'makeStateSelectors');

        expect(SELECTOR_UTILS.normaliseKeyPath({ keyPath: () => [1] })).toBe('makeStateSelectors');
      });
    });

    describe('selectEmptyProps()', () => {
      it('should return undefined', () => {
        expect(SELECTOR_UTILS.selectEmptyProps[0]()).toBe(undefined);
      });
    });

    describe('selectAllProps()', () => {
      it('should return props', () => {
        expect(SELECTOR_UTILS.selectAllProps[0](1, 222)).toBe(222);
      });
    });

    describe('customSelectProp()', () => {
      it('should return props', () => {
        expect(SELECTOR_UTILS.customSelectProp((props) => props)(1, 222)).toBe(222);
        expect(SELECTOR_UTILS.customSelectProp('abc')(1, 222)).toBe(undefined);
      });
    });

    describe('customSelectProps()', () => {
      it('should return customSelectProp array', () => {
        SELECTOR_UTILS.customSelectProp = jest.fn(() => 'customSelectProp');

        expect(SELECTOR_UTILS.customSelectProps([() => 1, () => 2])).toEqual(['customSelectProp', 'customSelectProp']);
      });

      it('should return customSelectProp function', () => {
        SELECTOR_UTILS.customSelectProp = jest.fn(() => 'customSelectProp');

        expect(SELECTOR_UTILS.customSelectProps(() => 1)).toEqual(['customSelectProp']);
      });

      it('should return undefined', () => {
        expect(SELECTOR_UTILS.customSelectProps(1123)).toEqual(undefined);
      });
    });

    describe('normaliseProps()', () => {
      it('should return selectAllProps', () => {
        SELECTOR_UTILS.selectAllProps = jest.fn();

        expect(SELECTOR_UTILS.normaliseProps({ getter: jest.fn() })).toBe(SELECTOR_UTILS.selectAllProps);
      });

      it('should return customSelectProps', () => {
        SELECTOR_UTILS.isPropSelector = jest.fn(() => true);
        SELECTOR_UTILS.customSelectProps = jest.fn(() => 'customSelectProps');

        expect(SELECTOR_UTILS.normaliseProps({ props: 1 })).toBe('customSelectProps');
      });

      it('should return selectEmptyProps', () => {
        SELECTOR_UTILS.isPropSelector = jest.fn(() => false);
        SELECTOR_UTILS.selectEmptyProps = jest.fn();

        expect(SELECTOR_UTILS.normaliseProps({ props: 1 })).toBe(SELECTOR_UTILS.selectEmptyProps);
      });
    });

    describe('normaliseGetter()', () => {
      it('should return getter function', () => {
        expect(SELECTOR_UTILS.normaliseGetter(jest.fn(() => 'getter'))()).toBe('getter');
      });

      it('should return first result', () => {
        expect(SELECTOR_UTILS.normaliseGetter()(32321)).toBe(32321);
      });
    });

    describe('defaultCacheKey()', () => {
      it('should return empty', () => {
        expect(SELECTOR_UTILS.defaultCacheKey()).toBe('');
      });
    });

    describe('customCacheKey()', () => {
      it('should return cacheKey function', () => {
        expect(SELECTOR_UTILS.customCacheKey(jest.fn(() => 'cacheKey'))()).toBe('cacheKey');
      });

      it('should return cacheKey string', () => {
        expect(SELECTOR_UTILS.customCacheKey('cacheKeyString')()).toBe('cacheKeyString');
      });
    });

    describe('normaliseCacheKey()', () => {
      it('should return customCacheKey', () => {
        SELECTOR_UTILS.customCacheKey = jest.fn(() => 'customCacheKey');

        expect(SELECTOR_UTILS.normaliseCacheKey(123)).toBe('customCacheKey');
      });

      it('should return defaultCacheKey', () => {
        SELECTOR_UTILS.defaultCacheKey = jest.fn();

        expect(SELECTOR_UTILS.normaliseCacheKey()).toBe(SELECTOR_UTILS.defaultCacheKey);
      });
    });

    describe('normaliseOptions()', () => {
      it('should return cacheKey', () => {
        expect(SELECTOR_UTILS.normaliseOptions({ cacheKey: 123 })).toMatchSnapshot();
      });

      it('should return options', () => {
        expect(SELECTOR_UTILS.normaliseOptions({ options: 123 })).toBe(123);
      });
    });
  });

  describe('SELECTOR_HELPERS', () => {
    describe('normalise()', () => {
      beforeEach(() => {
        SELECTOR_UTILS.normaliseKeyPath = jest.fn(() => 'normaliseKeyPath');
        SELECTOR_UTILS.normaliseProps = jest.fn(() => 'normaliseProps');
        SELECTOR_UTILS.normaliseGetter = jest.fn(() => 'normaliseGetter');
        SELECTOR_UTILS.normaliseCacheKey = jest.fn(() => 'normaliseCacheKey');
        SELECTOR_UTILS.normaliseOptions = jest.fn(() => 'normaliseOptions');
      });

      it('should return selector function', () => {
        expect(SELECTOR_HELPERS.normalise(() => [1, 2, 3])).toMatchSnapshot();
      });

      it('should return selector array', () => {
        expect(SELECTOR_HELPERS.normalise([1, 2, 3])).toMatchSnapshot();
      });

      it('should return selector cacheKey string', () => {
        expect(SELECTOR_HELPERS.normalise('cacheKey')).toMatchSnapshot();
      });

      it('should return selector cacheKey number', () => {
        expect(SELECTOR_HELPERS.normalise(123)).toMatchSnapshot();
      });

      it('should return getter undefined', () => {
        expect(SELECTOR_HELPERS.normalise()).toBe(undefined);
        expect(SELECTOR_HELPERS.normalise({ getter: () => 123 })).toBe(undefined);
      });
    });

    describe('select()', () => {
      it('should return createCachedSelector', () => {
        expect(SELECTOR_HELPERS.select({
          keyPath: [[1, 2, 3]],
          props: [() => 123],
          getter: jest.fn(),
          cacheKey: jest.fn(),
        })).toMatchSnapshot();
      });

      it('should return createCachedSelector no keyPath no props', () => {
        expect(SELECTOR_HELPERS.select({
          keyPath: null,
          props: null,
          getter: jest.fn(),
          cacheKey: jest.fn(),
        })).toMatchSnapshot();
      });
    });

    describe('mapKey()', () => {
      it('should wrap with key', () => {
        expect(SELECTOR_HELPERS.mapKey(false, 'id', 123)).toEqual({ id: 123 });
        expect(SELECTOR_HELPERS.mapKey(false, 'id', { some: 'object' })).toEqual({ id: { some: 'object' } });
        expect(SELECTOR_HELPERS.mapKey(true, 'id', 123)).toEqual({ id: 123 });
      });

      it('should spread', () => {
        expect(SELECTOR_HELPERS.mapKey(true, 'id', { some: 'object' })).toEqual({ some: 'object' });
      });
    });
  });
});
