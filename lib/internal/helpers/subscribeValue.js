import helpers from './index';


const subscribeValue = (configs) => (state, props) => {
  if (!configs) return () => undefined;

  let value = {};

  if (configs.name && !configs.manuallySubscribe) {
    value = { ...helpers.selectOwnStore(configs)(state, props) };
  }

  if (typeof configs.isLoading === 'object') {
    value = { ...value, ...helpers.selectIsLoading(configs.isLoading)(state, props) };
  }

  if (typeof configs.value === 'object') {
    value = { ...value, ...helpers.selectConfigValue(configs.value)(state, props) };
  }

  return value;
};

export default subscribeValue;
