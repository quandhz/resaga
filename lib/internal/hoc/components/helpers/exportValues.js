import helpers from './index';

const shouldWrapValue = (configs, isRoot) => !!(configs && configs.wrapValue) === isRoot;


const exportValues = (props, isRoot) => {
  let values = {};

  const { internalProps } = props;
  if (!internalProps) return values;

  const { configs } = internalProps;

  if (shouldWrapValue(configs, isRoot)) {
    return values;
  }

  const internalPropsValues = helpers.getValuesFromProps(props);

  if (internalPropsValues) {
    values = internalPropsValues.reduce((reduction, { key, value } = {}) =>
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
