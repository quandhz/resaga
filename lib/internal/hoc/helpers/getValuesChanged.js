import { isEqual as loIsEqual, get } from 'lodash';
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


const getValuesChanged = (currentValues, nextProps, internalProps) => {
  const configs = get(internalProps, 'configs', {});

  const nextValues = helpers.exportValues({ props: nextProps, configs });

  if (typeof currentValues !== 'object') return nextValues;

  const changes = {};
  const value = get(configs, 'value', {});
  let hasChanges = false;

  Object.keys(nextValues).forEach((key) => {
    const changed = isValueChanged(
      currentValues[key],
      nextValues[key],
      get(value, `${key}.isEqual`, undefined),
      configs.optimiseComparison,
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
