import helpers from './index';

const getValue = (props, key, notSetValue) => {
  const values = helpers.getValuesFromProps(props);

  if (!values) return notSetValue;

  return values.get(key, notSetValue);
};

export default getValue;
