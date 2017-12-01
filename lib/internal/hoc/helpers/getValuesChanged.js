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


const getValuesChangedWithTime = (currentValues, nextProps) => {
  const name = get(nextProps, 'internalProps.Component.name', 'n/a');
  const id = get(nextProps, 'id', '');
  console.log(`\n--START----${name}[${id}].getValuesChanged`);
  console.time(`--FINISH---${name}[${id}].getValuesChanged`);

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
      get(valueConfigs, `${key}.isEqual`, undefined),
      optimiseComparison,
    );
    if (changed) {
      changes[key] = nextValues[key];
      hasChanges = true;
    }
  });

  console.log('> hasChanges', hasChanges, Object.keys(changes));
  console.timeEnd(`--FINISH---${name}[${id}].getValuesChanged`);
  if (!hasChanges) return false;

  return changes;
};

const getValuesChanged = (currentValues, nextProps, internalProps) => {
  const { configs = { value: false, optimiseComparison: false } } = internalProps;

  const nextValues = helpers.exportValues({ props: nextProps, configs }, true);
  if (typeof currentValues !== 'object') return nextValues;

  const changes = {};
  let hasChanges = false;
  const { value: valueConfigs, optimiseComparison } = configs;

  Object.keys(nextValues).forEach((key) => {
    const changed = isValueChanged(
      currentValues[key],
      nextValues[key],
      get(valueConfigs, `${key}.isEqual`, undefined),
      optimiseComparison,
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
