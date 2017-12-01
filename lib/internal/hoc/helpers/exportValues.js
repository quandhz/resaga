import { get, difference } from 'lodash';
import { getKeyPath } from '../../helpers/subscribeValue';
import helpers from './index';

const shouldWrapValue = (configs, isRoot) => !!(configs && configs.wrapValue) === isRoot;

/**
 * must be object
 * must not has keyPath
 * getter must be function
 * @param config
 * @returns {boolean}
 */
const isGetter = (config) => {
  if (typeof config !== 'object') return false;
  if (Array.isArray(config)) return false;

  return typeof config.keyPath === 'undefined'
    && typeof config.getter === 'function';
};

const exportValues = ({ props, configs }, isRoot = true) => {
  if (!configs) return {};
  if (shouldWrapValue(configs, isRoot)) return {};
  if (typeof configs.value !== 'object') return {};

  return Object.keys(configs.value).reduce(
    (reduction, key) => {
      const mergeProps = { ...props, ...reduction };

      const config = configs.value[key];
      if (!isGetter(config)) return reduction;

      let value = config.getter(mergeProps);

      // if value is undefined, set value to config.notSetValue
      if (typeof value === 'undefined') {
        value = config.notSetValue;
      }

      // spread to root if CONFIG.spreadObject is true
      if (config.spreadObject && typeof value === 'object') {
        return ({ ...reduction, ...value }); // spread value
      }

      // otherwise return value
      return ({ ...reduction, [key]: value });
    },
    {}
  );
};

export default exportValues;
