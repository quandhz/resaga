import { get } from 'lodash';

const isLoading = (internalProps, props, key) => {
  const name = get(internalProps, 'configs.name');

  const store = props[name];
  if (!store || typeof store.get !== 'function') return false;

  const form = store.get(key);
  if (!form) return false;

  return form.willLoad || form.isLoading;
};

export default isLoading;
