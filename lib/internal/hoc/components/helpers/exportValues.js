import { getKeyPath } from '../../../helpers/subscribeValue';
import helpers from './index';

const shouldWrapValue = (configs, isRoot) => !!(configs && configs.wrapValue) === isRoot;


const exportValues = (props, isRoot = true) => {
  let values = {};

  // strip down internal props
  const { internalProps, resaga, ...ownProps } = props;
  if (!internalProps) return values;

  const { configs = {} } = internalProps;
  if (shouldWrapValue(configs, isRoot)) {
    return values;
  }

  // strip down Component props
  const { [configs.name]: Component, ...componentProps } = ownProps;

  const internalPropsValues = helpers.getValuesFromProps(props);

  // do not wrap all values in store if manuallySubscribe is true
  if (internalPropsValues && !configs.manuallySubscribe) {
    values = internalPropsValues.reduce((reduction, value, key) =>
      ({ ...reduction, [key]: value }), {});
  }

  // wrap resaga.value
  if (typeof configs.value === 'object') {
    const otherProps = { ...componentProps, ...values };

    // get all the keys in CONFIG.value
    const keys = Object.keys(configs.value);

    return keys.reduce(
      (reduction, key) => {
        const config = configs.value[key];
        const keyPath = getKeyPath(config);

        let value;

        // if keypath is defined in config.value, that will be the init value
        if (keyPath) {
          value = internalProps.otherValues[keyPath];
        }

        // if user provide a getter function, we will call and return the result of it
        if (typeof config.getter === 'function') {
          if (keyPath) {
            // call getter(value, ownProps)
            value = config.getter(value, { ...otherProps, ...reduction });
          } else {
            // call getter(ownProps)
            value = config.getter({ ...otherProps, ...reduction });
          }
        }

        // if value is undefined, set value to config.notSetValue
        if (typeof value === 'undefined') {
          value = config.notSetValue;
        }

        // spread to root if CONFIG.spreadObject is true
        if (config.spreadObject && typeof value === 'object') {
          return ({ ...reduction, ...value }); // spread value
        }

        // otherwise return value
        return ({ ...reduction, [key]: value });
      },
      values
    );
  }

  return values;
};

export default exportValues;
