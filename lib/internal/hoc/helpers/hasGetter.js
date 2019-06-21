import { get } from 'lodash';
import { isGetter } from './exportValues';

const hasGetter = (configs) => {
  const value = get(configs, 'value');

  if (typeof value !== 'object') return false;

  const keys = Object.keys(value);
  if (!keys.length) return false;

  for (let i = 0; i < keys.length; i += 1) {
    if (isGetter(value[keys[i]])) {
      return true;
    }
  }

  return false;
};

export default hasGetter;
