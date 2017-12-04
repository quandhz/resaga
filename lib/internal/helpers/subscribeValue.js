import helpers from './index';


const subscribeValue = (configs) => (state, props) => {
  if (!configs) return () => undefined;

  let value = {};

  if (configs.name && !configs.manuallySubscribe) {
    value = { ...helpers.selectOwnStore(configs)(state, props) };
  }

  if (typeof configs.value !== 'object') return value;

  return { ...value, ...helpers.selectConfigValue(configs.value)(state, props) };
};

export default subscribeValue;
