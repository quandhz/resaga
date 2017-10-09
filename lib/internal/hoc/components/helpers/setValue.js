
const setValueHelper = (key, valueOrFunction, internalProps) => {
  const { setValue, setValueWithFunc } = internalProps;

  if (typeof valueOrFunction === 'function') {
    return setValueWithFunc(key, valueOrFunction);
  }

  return setValue(key, valueOrFunction);
};

export default setValueHelper;
