
const getValue = (internalProps, key, notSetValue) => {
  const { values } = internalProps;

  const value = values.get(key);
  if (!value) return notSetValue;

  return value.value;
};

export default getValue;
