import helpers from './index';
import selectors from '../selectors';


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


const subscribeValue = (configs) => {
  if (!configs || !configs.value || typeof configs.value !== 'object') return () => null;

  return (state, props) => {
    const keys = Object.keys(configs.value);
    if (!keys || !keys.length) return () => null;

    // only subscribe keyPath
    return helpers.reselect(keys.reduce(
      (reduction, key) => {
        const keyPath = getKeyPath(configs.value[key], props, true);

        if (keyPath) {
          if (typeof configs.value[key] === 'object' && configs.value[key].selector) {
            return { ...reduction, [keyPath]: selectors.selectOtherValues({ ...configs.value[key], keyPath }) };
          }

          return { ...reduction, [keyPath]: selectors.selectOtherValues(keyPath) };
        }
        return reduction;
      },
      {}
    ))(state, props);
  };
};

export default subscribeValue;
