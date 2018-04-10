import { get } from 'lodash';

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

const exportValue = (props, configValue) => (reduction, key) => {
  const mergeProps = { ...props, ...reduction };

  const config = configValue[key];
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
};

const exportValues = ({ props, configs }) => {
  const value = { ...get(configs, 'value', {}), ...get(configs, 'isLoading', {}) };
  return Object.keys(value).reduce(exportValue(props, value), {});
};

export default exportValues;
