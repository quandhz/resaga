import helpers from './index';
import selectors from '../selectors';


export const getKeyPath = (config = {}) => {
  if (Array.isArray(config)) {
    return config;
  }

  return config.keyPath;
};


const subscribeValue = (configs) => {
  if (!configs || !configs.value || typeof configs.value !== 'object') return () => null;

  const keys = Object.keys(configs.value);
  if (!keys || !keys.length) return () => null;

  // only subscribe keyPath
  return helpers.reselect(keys.reduce(
    (reduction, key) => {
      const keyPath = getKeyPath(configs.value[key]);
      if (keyPath) {
        return { ...reduction, [keyPath]: selectors.selectOtherValues(keyPath) };
      }
      return reduction;
    },
    {}
  ));
};

export default subscribeValue;
