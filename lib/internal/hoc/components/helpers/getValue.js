
const getValue = (key, internalProps, notSetValue) => {
  const { values } = internalProps;
  const value = values.get(key, notSetValue);
  if (!value) return null;

  return value.value;
};

export default getValue;
