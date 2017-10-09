/**
 * setValue({ something: 'hi' }, callback);
 * setValue('something', 'hi', callback);
 */

const setValueWithFunctionHelper = ({ setValueWithFunc }, key, func, cb) =>
  setValueWithFunc(key, func, cb);


const setValueWithValueHelper = ({ setValue }, key, value, cb) =>
  setValue(key, value, cb);


const setValueWithObjectHelper = (internalProps, object, cb) => {
  const keys = Object.keys(object);
  let results = {};
  let callbackEach;

  if (typeof cb === 'function') {
    callbackEach = (result) => {
      results = { ...results, ...result };
      if (Object.keys(results).length === keys.length) {
        cb(results);
      }
    };
  }

  return keys.forEach((key) =>
    setValueHelper(internalProps, key, object[key], callbackEach));
};

// (internalProps, key, valueOrFunction, callback)
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
