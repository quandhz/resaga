import helpers from './index';

const getValue = (internalProps, props, key, notSetValue) => {
  const values = helpers.getValuesFromProps(internalProps, props);

  if (typeof values === 'undefined') return notSetValue;

  return values.get(key, notSetValue);
};

export default getValue;
