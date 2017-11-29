import { get } from 'lodash';
import helpers from './analyseConfig';
import { VARIABLES } from '../constants';

const selectValue = (storeName, [key, ...path], notSetValue) => (page) => {
  if (!page) return notSetValue;
  let value;

  if (helpers.isResagaStore(storeName)) {
    value = page.getIn([VARIABLES, key], notSetValue);
  } else {
    value = page.get(key, notSetValue);
  }

  if (path.length) {
    return get(value, path, notSetValue);
  }

  return value;
};

export default {
  selectValue,
};
