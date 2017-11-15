import { isEqual as loIsEqual } from 'lodash';
import helpers from './index';


export const isValueChanged = (currentValue, nextValue, isEqual, optimiseComparison) => {
  if (typeof isEqual === 'function') {
    return !isEqual(currentValue, nextValue);
  }

  if (typeof currentValue !== 'object') {
    return currentValue !== nextValue;
  }

  return optimiseComparison
    ? !loIsEqual(currentValue, nextValue)
    : currentValue !== nextValue;
};


const getValuesChanged = (currentValues, nextProps) => {
  const nextValues = helpers.exportValues(nextProps, true);
  if (typeof currentValues !== 'object') return nextValues;

  const changes = {};

  const { internalProps } = nextProps;
  const { configs = { value: false, optimiseComparison: false } } = internalProps;

  const { value: valueConfigs, optimiseComparison } = configs;

  const keys = Object.keys(nextValues);
  let hasChanges = false;

  keys.forEach((key) => {
    const changed = isValueChanged(
      currentValues[key],
      nextValues[key],
      valueConfigs && valueConfigs[key] && valueConfigs[key].isEqual,
      optimiseComparison
    );
    if (changed) {
      changes[key] = nextValues[key];
      hasChanges = true;
    }
  });

  if (!hasChanges) return false;

  return changes;
};

export default getValuesChanged;
