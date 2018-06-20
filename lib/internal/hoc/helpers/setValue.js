/**
 * setValue({ something: 'hi' }, callback);
 * setValue('something', 'hi', callback);
 */
import { get } from 'lodash';


const getKeyPath = (props, key, extraProps) => {
  const { internalProps: { configs }, ownProps } = props;

  const setValue = get(configs, `setValue.${key}`);

  if (typeof setValue === 'function') {
    return setValue(ownProps, extraProps);
  } else if (setValue) {
    return setValue;
  }

  return [configs.name, key];
};


const setValueWithFunctionHelper = (props, key, func, extraProps) => {
  const { internalProps: { setValueWithFunc } } = props;

  return setValueWithFunc(getKeyPath(props, key, extraProps), func);
};


const setValueWithValueHelper = (props, key, value, extraProps) => {
  const { internalProps: { setValue } } = props;

  return setValue(getKeyPath(props, key, extraProps), value);
};


const setValueWithObjectHelper = (props, object, extraProps) => {
  const keys = Object.keys(object);

  return keys.forEach((key) =>
    setValueHelper(props, key, object[key], extraProps));
};

// ({ internalProps, ownProps }, key, valueOrFunction, extraProps)
const setValueHelper = (...params) => {
  if (typeof params[1] === 'object') {
    return setValueWithObjectHelper(...params);
  }

  if (typeof params[2] === 'function') {
    return setValueWithFunctionHelper(...params);
  }

  return setValueWithValueHelper(...params);
};

export default setValueHelper;
