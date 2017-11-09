import { VARIABLES } from '../constants';

const selectValue = (key) => (page) => page && page.getIn([VARIABLES, key]);

export default {
  selectValue,
};
