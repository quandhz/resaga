
const isLoading = (key, props) => {
  const { configs } = props.internalProps;
  const store = props[configs.name];
  if (!store || typeof store.get !== 'function') return false;

  const form = store.get(key);
  if (!form) return false;

  return form.willLoad || form.isLoading;
};

export default isLoading;
