import selectOwnStore from './selectOwnStore';
import selectConfigValue, { selectIsLoading } from './selectConfigValue';


const subscribeValue = (configs) => (state, props) => {
  if (!configs) return () => undefined;

  let value = {};

  if (configs.name && !configs.manuallySubscribe) {
    value = { ...selectOwnStore(configs)(state, props) };
  }

  if (typeof configs.isLoading === 'object') {
    value = { ...value, ...selectIsLoading(configs.isLoading)(state, props) };
  }

  if (typeof configs.value === 'object') {
    value = { ...value, ...selectConfigValue(configs.value)(state, props) };
  }

  return value;
};

export default subscribeValue;
