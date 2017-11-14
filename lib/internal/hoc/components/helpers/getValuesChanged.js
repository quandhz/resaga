import { isEqual } from 'lodash';
import helpers from './index';


const isValueChanged = (currentValue, nextValue, compare) => {
  if (typeof compare === 'function') {
    return compare(currentValue, nextValue);
  }

  if (typeof currentValue !== 'object') {
    return currentValue !== nextValue;
  }

  return !isEqual(currentValue, nextValue);
};


const getValuesChanged = (currentValues, nextProps) => {
  const nextValues = helpers.exportValues(nextProps, true);
  if (!currentValues) return nextValues;

  const changes = {};

  const { internalProps } = nextProps;
  const { configs = { value: false, optimiseComparison: false } } = internalProps;

  const { value: valueConfigs, optimiseComparison } = configs;
  if (!optimiseComparison) return nextValues;

  const keys = Object.keys(nextValues);
  let hasChanges = false;

  keys.forEach((key) => {
    const changed = isValueChanged(
      currentValues[key],
      nextValues[key],
      valueConfigs && valueConfigs[key] && valueConfigs[key].isEqual
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
