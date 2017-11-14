import helpers from '../helpers/analyseConfig';
import { VARIABLES } from '../constants';

const selectValue = (storeName, key, notSetValue) => (page) => {
  if (!page) return notSetValue;

  if (helpers.isResagaStore(storeName)) return page.getIn([VARIABLES, key], notSetValue);

  return page.get(key, notSetValue);
};

export default {
  selectValue,
};
