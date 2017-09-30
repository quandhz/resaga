
const getValue = (key, internalProps) => {
  const { values } = internalProps;
  return values ? values.get(key) : null;
};

export default getValue;
