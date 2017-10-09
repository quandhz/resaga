
const getValue = (key, internalProps, notSetValue) => {
  const { values } = internalProps;
  return values ? values.get(key, notSetValue) : null;
};

export default getValue;
