import { SELECTOR_HELPERS as SH } from './selectorHelpers';

const reduceConfig = (state, props, configValue, isLoading) => (accumulate, key) => {
  // normalise config.value[key]
  const selector = SH.normalise(configValue[key], props, isLoading);

  // do nothing if not a valid selector
  if (SH.isInvalid(selector)) return accumulate;

  const value = SH.select(selector)(state, props);

  return { ...accumulate, ...SH.mapKey(selector.spreadObject, key, value) };
};

const selectors = (isLoading) => (configValue = {}, value = {}) => (state, props) => Object.keys(configValue).reduce(
  reduceConfig(state, props, configValue, isLoading),
  value
);

const selectConfigValue = selectors();
export const selectIsLoading = selectors(true);

export default selectConfigValue;
