import helpers from './index';

const getValue = (props, key, notSetValue) => {
  const values = helpers.getValuesFromProps(props);

  if (!values) return notSetValue;

  const value = values.get(key);
  if (!value) return notSetValue;

  return value.value;
};

export default getValue;
