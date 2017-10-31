
const exportValues = (internalProps, isRoot) => {
  let values = {};
  if (internalProps.configs && !!internalProps.configs.wrapValue === isRoot) {
    return values;
  }

  if (internalProps.values) {
    values = internalProps.values.reduce((reduction, { key, value }) =>
      ({ ...reduction, [key]: value }), {});
  }

  if (internalProps.otherValues) {
    const keys = Object.keys(internalProps.otherValues);
    if (keys && keys.length) {
      return keys.reduce((reduction, key) => {
        const object = internalProps.otherValues[key] || {};
        return ({ ...reduction, [key]: object.value });
      }, values);
    }
  }

  return values;
};

export default exportValues;
