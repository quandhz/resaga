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


/**
 * select ['BookDataStore', 'books', 1]
 * @param keyPath
 * @param notSetValue
 * @returns {function(*=)}
 */
const selectKeyPath = ({ keyPath, notSetValue }) =>
  (state, props) => {
    if (typeof state === 'undefined') return notSetValue;

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
  if (typeof selector.keyPath === 'undefined') return undefined;

  // set default getter function
  const normalise = { getter: (a) => a, ...selector };

  return createCachedSelector(
    selectKeyPath(normalise),
    selectProps,
    (...params) => {
      const value = normalise.getter(...params);
      if (!normalise.spreadObject) return { [key]: value };

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
      return analyseObject(key, { keyPath: selector });


    /**
     * A selector object
     */
    case 'object':
      /**
       * { keyPath: ..., getter: ..., ... }
       */
      if (!Array.isArray(selector)) return analyseObject(key, selector);

      /**
       * getIn ['a', 'b', 'c'] || (props) => ['a', 'b', props.id, 'c']
       */
      if (typeof last(selector) !== 'function') return analyseObject(key, { keyPath: selector });


      /**
       * type selector [a, b, (a, b) => {...}]
       */
      return analyseObject(key, { keyPath: selector.slice(-1), getter: last(selector) });


    /**
     * invalid selector type
     */
    default:
      return undefined;
  }
};

const selectConfigValue = (configValue, value) => (state, props) => {
  const keys = Object.keys(configValue);
  if (!keys || !keys.length) return undefined;

  return keys.reduce(
    (reduction, key) =>
      ({ ...reduction, ...analyse(key, configValue[key])(state, props) }),
    value
  );
};

export default selectConfigValue;
