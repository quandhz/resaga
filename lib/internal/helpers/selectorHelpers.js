import { memo } from 'react';
import { first, get, memoize } from 'lodash';
import createCachedSelector, { FlatObjectCache } from 're-reselect';
import { VARIABLES } from '../constants';
import helpers from './analyseConfig';

const cacheObject = new FlatObjectCache();

const isKeyPath = (keyPath) => Array.isArray(keyPath) || typeof keyPath === 'function';

const isInvalidKeyPath = (keyPath) => !SELECTOR_UTILS.isKeyPath(keyPath);

const isGetter = ({ keyPath, getter }) => SELECTOR_UTILS.isInvalidKeyPath(keyPath)
  && typeof getter === 'function';

const isGetterSelector = (selector) => {
  if (typeof selector !== 'object') return false;

  const { keyPath, getter } = selector;

  return SELECTOR_UTILS.isKeyPath(keyPath)
  && typeof getter === 'function';
};

const isCacheKey = (cacheKey) => typeof cacheKey === 'function' || Boolean(cacheKey);

const isInvalidCacheKey = (keyPath) => !SELECTOR_UTILS.isCacheKey(keyPath);

// TODO: check all elements
const isPropSelector = (props) => (Array.isArray(props) && isPropSelector(first(props))) || typeof props === 'function';

// TODO: check all elements
const isArrayOfKeyPaths = (keyPath) => Array.isArray(keyPath) && SELECTOR_UTILS.isKeyPath(first(keyPath));

// validate selector
const isInvalid = (selector) => {
  if (!selector || typeof selector !== 'object') return true;

  // invalid if keyPath and cacheKey are both invalid
  return SELECTOR_UTILS.isInvalidKeyPath(selector.keyPath) && SELECTOR_UTILS.isInvalidCacheKey(selector.cacheKey);
};

const selectKeyPath = ({ keyPath, notSetValue }, isLoading) => (state, props) => {
  let path = keyPath;
  if (typeof path === 'function') path = path(props);

  const [name, key, ...rest] = path;
  let value;

  // immutable js
  if (helpers.isResagaStore(name) && !isLoading) {
    value = state.getIn([name, VARIABLES, key], notSetValue);
  } else {
    value = state.getIn([name, key], notSetValue);

    if (isLoading) return Boolean(value);
  }

  if (!rest.length) return value;

  // normal js
  return get(value, rest, notSetValue);
};

const makeStateSelectors = (notSetValue, isLoading) => (accumulate, keyPath) => accumulate.concat(
  SELECTOR_UTILS.selectKeyPath({ keyPath, notSetValue }, isLoading)
);

// always return array of keyPaths if valid
const normaliseKeyPath = ({ keyPath, notSetValue } = {}, props, isLoading) => {
  if (!keyPath) return undefined;

  // array of keyPaths
  if (SELECTOR_UTILS.isArrayOfKeyPaths(keyPath)) {
    // convert keyPath to actual state selector functions
    return keyPath.reduce(SELECTOR_UTILS.makeStateSelectors(notSetValue, isLoading), []);
  }

  // it either returns a keyPath or an array of keyPaths
  if (typeof keyPath === 'function') {
    return normaliseKeyPath({ keyPath: keyPath(props), notSetValue }, props, isLoading);
  }

  // just one keyPath, wrap with array
  return normaliseKeyPath({ keyPath: [keyPath], notSetValue }, props, isLoading);
};

const selectEmptyProps = [() => undefined];
const selectAllProps = [(state, props) => props]; // TODO: should throw warning, bad practice

const customSelectProp = (func) => (_, props) => typeof func === 'function' ? func(props) : undefined;

// only accept array and function props
const customSelectProps = (props) => {
  if (Array.isArray(props)) {
    return props.map(SELECTOR_UTILS.customSelectProp);
  }

  if (typeof props === 'function') {
    return customSelectProps([props]);
  }

  return undefined;
};

// must return array of prop selectors
const normaliseProps = ({ props, getter }) => {
  // if props undefined and getter defined, can be optimised, but subscribe to all props for now
  if (typeof props === 'undefined' && typeof getter === 'function') {
    return SELECTOR_UTILS.selectAllProps;
  }

  if (SELECTOR_UTILS.isPropSelector(props)) {
    return SELECTOR_UTILS.customSelectProps(props);
  }

  return SELECTOR_UTILS.selectEmptyProps;
};

const normaliseGetter = (getter) => {
  const getterFn = typeof getter === 'function' ? getter : getter;

  return (...results) => {
    if (typeof getterFn === 'function') {
      return getterFn(...results);
    }

    // if no getter function, value will be set to first inputSelectors result
    return first(results);
  };
};

// no cache for un-optimised selectors
const defaultCacheKey = () => '';

const customCacheKey = (cacheKey) => (state, props) => {
  if (typeof cacheKey === 'function') {
    return cacheKey(props);
  }

  return cacheKey;
};

const normaliseCacheKey = (cacheKey) => cacheKey ? SELECTOR_UTILS.customCacheKey(cacheKey) : SELECTOR_UTILS.defaultCacheKey;

// no cache for un-optimised selectors
const normaliseOptions = ({ cacheKey, options = {} }) => cacheKey ? ({ cacheObject, ...options }) : options;

export const SELECTOR_UTILS = {
  isKeyPath,
  isInvalid,
  isInvalidKeyPath,
  isInvalidCacheKey,
  isCacheKey,
  makeStateSelectors,
  selectKeyPath,
  isGetter,
  isGetterSelector,
  selectAllProps,
  selectEmptyProps,
  customSelectProp,
  customSelectProps,
  isPropSelector,
  isArrayOfKeyPaths,
  customCacheKey,
  defaultCacheKey,
  normaliseKeyPath,
  normaliseProps,
  normaliseGetter,
  normaliseCacheKey,
  normaliseOptions,
};

// normalise selector
const normalise = (selector, ...rest) => {
  switch (typeof selector) {
    case 'function':
      // (props) => [...] to { keyPath: (props) => [...] }
      return normalise({ keyPath: selector }, ...rest);

    case 'object':
      // ['a', 'b', 'c'] to { keyPath: ['a', 'b', 'c'] }
      if (Array.isArray(selector)) {
        return normalise({ keyPath: selector }, ...rest);
      }

      // getter selector, do nothing
      if (SELECTOR_UTILS.isGetter(selector)) {
        return undefined;
      }

      return {
        ...selector,
        keyPath: SELECTOR_UTILS.normaliseKeyPath(selector, ...rest),
        props: SELECTOR_UTILS.normaliseProps(selector),
        getter: SELECTOR_UTILS.normaliseGetter(selector.getter),
        cacheKey: SELECTOR_UTILS.normaliseCacheKey(selector.cacheKey),
        options: SELECTOR_UTILS.normaliseOptions(selector),
      };

    case 'string':
    case 'number':
      return normalise({ cacheKey: selector }); // cacheKey only, only work with hard-code string

    default:
      return undefined; // invalid selector type
  }
};

const select = ({
  keyPath, props, cacheKey, options, getter,
}) => {
  let inputSelectors = [];

  if (Array.isArray(keyPath)) {
    inputSelectors = inputSelectors.concat(keyPath);
  }
  if (Array.isArray(props)) {
    inputSelectors = inputSelectors.concat(props);
  }

  return createCachedSelector(inputSelectors, getter)(() => '', options);
};

const mapKey = (spreadObject, key, value) => {
  // return with key if not spread
  if (!spreadObject || typeof value !== 'object') {
    return { [key]: value };
  }

  return value;
};


export const SELECTOR_HELPERS = {
  normalise,
  isInvalid,
  select,
  mapKey,
};
