import { VARIABLES } from '../constants';

const selectValue = (key) => (page) => {
  const object = page && page.getIn([VARIABLES, key]);
  if (!object) return object;

  return object.value || object.get('value');
};

export default {
  selectValue,
};
