import { get, difference } from 'lodash';
import { getKeyPath } from '../../helpers/subscribeValue';
import helpers from './index';

const shouldWrapValue = (configs, isRoot) => !!(configs && configs.wrapValue) === isRoot;


const exportValues = ({ props, internalProps }, isRoot = true) => {
  let values = {};

  // strip down internal props
  const { resaga, ...ownProps } = props;
  if (!internalProps) return values;

  const { configs = {} } = internalProps;
  if (shouldWrapValue(configs, isRoot)) {
    return values;
  }

  // strip down Component props
  const { [configs.name]: Component, ...componentProps } = ownProps;

  const internalPropsValues = helpers.getValuesFromProps(internalProps, props);

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
        const mergeProps = { ...otherProps, ...reduction };

        const config = configs.value[key];
        const keyPathArray = getKeyPath(config, componentProps);

        let value;

        // if keypath is defined in config.value, that will be the init value
        if (keyPathArray) {
          const trimKeyPath = getKeyPath(config, componentProps, true);

          if (trimKeyPath.length !== keyPathArray.length) {
            value = mergeProps[trimKeyPath];
            const newKeyPath = getKeyPath(config, mergeProps);
            value = get(value, difference(newKeyPath, trimKeyPath));
          } else {
            value = mergeProps[keyPathArray];
          }
        }


        // if user provide a getter function, we will call and return the result of it
        if (typeof config.getter === 'function') {
          if (keyPathArray) {
            // call getter(value, mergeProps)
            value = config.getter(value, mergeProps);
          } else {
            // call getter(mergeProps)
            value = config.getter(mergeProps);
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
