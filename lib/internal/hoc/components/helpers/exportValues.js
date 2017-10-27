
const shouldWrapValue = (configs, isRoot) => !!(configs && configs.wrapValue) === isRoot;


const exportValues = (internalProps, isRoot) => {
  let values = {};

  if (shouldWrapValue(internalProps.configs, isRoot)) {
    return values;
  }

  if (internalProps.values) {
    values = internalProps.values.reduce((reduction, { key, value } = {}) =>
      ({ ...reduction, [key]: value }), {});
  }

  if (internalProps.otherValues) {
    const keys = Object.keys(internalProps.otherValues);
    if (keys && keys.length) {
      return keys.reduce(
        (reduction, key) =>
          ({ ...reduction, [key]: internalProps.otherValues[key] }),
        values
      );
    }
  }

  return values;
};

export default exportValues;
