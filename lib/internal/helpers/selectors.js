import { VARIABLES } from '../constants';

const selectValue = (key) => (page) => {
  const object = page && page.getIn([VARIABLES, key]);
  return object && object.value ? object.value : object.get('value');
};

export default {
  selectValue,
};
