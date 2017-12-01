import helpers from './index';
import selectors from './selectors';


export const trim = (keyPath) => {
  const someUndefined = keyPath.indexOf(undefined);

  if (someUndefined !== -1) {
    return keyPath.slice(0, someUndefined);
  }

  return keyPath;
};


export const getKeyPath = (config = {}, props, shouldTrim) => {
  let { keyPath } = config;

  if (Array.isArray(config) || typeof config === 'function') {
    keyPath = config;
  }

  if (typeof keyPath === 'undefined') return keyPath;

  if (typeof keyPath === 'function') {
    keyPath = keyPath(props);
  }

  if (shouldTrim) return (trim(keyPath));

  return keyPath;
};


const subscribeValue = (configs) => (state, props) => {
  if (!configs) return () => undefined;

  let value = {};

  if (configs.name && !configs.manuallySubscribe) {
    value = { ...helpers.selectOwnStore(configs)(state, props) };
  }

  if (!configs.value || typeof configs.value !== 'object') return value;


  return { ...value, ...helpers.selectConfigValue(configs.value)(state, props) };
};

export default subscribeValue;
