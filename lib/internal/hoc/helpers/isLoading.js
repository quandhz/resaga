
const isLoading = (internalProps, props, key) => {
  const { name } = internalProps.configs;
  const store = props[name];
  if (!store || typeof store.get !== 'function') return false;
  const form = store.get(key);
  if (!form) return false;

  return form.willLoad || form.isLoading;
};

export default isLoading;
