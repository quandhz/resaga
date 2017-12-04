import { get, last } from 'lodash';
import createCachedSelector from 're-reselect';
import helpers from './analyseConfig';
import { VARIABLES, SEPARATOR } from '../constants';

/**
 * select props
 * @param state
 * @param props
 * @returns {*}
 */
const selectProps = (state, props) => props;

export const isGetter = (config) => {
  if (typeof config !== 'object') return false;
  if (Array.isArray(config)) return false;

  return typeof config.keyPath === 'undefined'
    && typeof config.getter === 'function';
};

const isKeyPath = (keyPath) =>
  Array.isArray(keyPath) || typeof keyPath === 'function';

/**
 * select ['BookDataStore', 'books', 1]
 * @param keyPath
 * @param notSetValue
 * @returns {function(*=)}
 */
const selectKeyPath = ({ keyPath, notSetValue }) =>
  (state, props) => {
    let path = keyPath;
    if (typeof keyPath === 'function') path = keyPath(props);

    const [name, key, ...rest] = path;
    let value;

    if (helpers.isResagaStore(name)) {
      value = state.getIn([name, VARIABLES, key], notSetValue);
    } else {
      value = state.getIn([name, key], notSetValue);
    }

    if (!rest.length) return value;

    if (value === notSetValue) return value;

    return get(value, rest, notSetValue);
  };


/**
 * object selector { keyPath: [1], getter: (1, props) => value; }
 * @param key
 * @param selector
 */
const analyseObject = (key, selector) => (state, props) => {
  if (isGetter(selector)) return undefined;
  if (!isKeyPath(selector.keyPath)) {
    if (!selector.spreadObject || typeof selector.notSetValue !== 'object') return { [key]: selector.notSetValue };

    return selector.notSetValue;
  }

  let keyPath;
  let normalise;

  // contain array of selectors
  if (Array.isArray(selector.keyPath) && isKeyPath(selector.keyPath[0])) {
    normalise = { getter: (a) => a, ...selector, keyPath: selector.keyPath[0] };
    keyPath = selector.keyPath.reduce(
      (result, eachSelector) =>
        result.concat(selectKeyPath({ keyPath: eachSelector })),
      []
    );
  } else {
    // set default getter function
    normalise = { getter: (a) => a, ...selector };
    keyPath = [selectKeyPath(normalise)];
  }

  return createCachedSelector(
    ...keyPath,
    selectProps,
    (...params) => {
      const value = normalise.getter(...params);
      if (!normalise.spreadObject || typeof value !== 'object') return { [key]: value };

      return value;
    }, // call getter with (value, props)
  )(() => `${key}${SEPARATOR}${normalise.keyPath.toString()}`)(state, props);
};

const analyse = (key, selector) => {
  const type = typeof selector;

  switch (type) {
    /**
     * Generate selector based on props
     * (props) => [...]
     */
    case 'function':
      // transform (props) => [...]
      // to { keyPath: (props) => [...] }
      return analyse(key, { keyPath: selector });


    /**
     * A selector object
     */
    case 'object':
      if (Array.isArray(selector)) {
        // ['a', 'b', (a, b, props) => value]
        // to { keyPath: ['a', 'b'], getter: (a, b, props) => value }
        if (typeof last(selector) === 'function') {
          const keyPath = selector.slice(0, -1);
          return analyse(key, { keyPath, getter: last(selector) });
        }

        // ['a', 'b', 'c']
        // to { keyPath: ['a', 'b', 'c'] }
        return analyse(key, { keyPath: selector });
      }


      // normalised selector
      return analyseObject(key, selector);


    // invalid selector type
    default:
      return () => undefined;
  }
};

const selectConfigValue = (configValue = {}, value = {}) => (state = {}, props = {}) => Object.keys(configValue).reduce(
  (reduction, key) =>
    ({ ...reduction, ...analyse(key, configValue[key])(state, props) }),
  value
);

export default selectConfigValue;
