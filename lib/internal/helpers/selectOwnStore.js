import createCachedSelector from 're-reselect';
import { SEPARATOR, VARIABLES } from '../constants';

export const selectValues = (name) => (state) => state && state.getIn([name, VARIABLES]);

export const shallowlyConvert = (values) => values && values.toObject();

const selectOwnStore = (configs) => createCachedSelector(
  selectValues(configs.name),
  shallowlyConvert
)(() => `${configs.name}${SEPARATOR}${VARIABLES}`);


export default selectOwnStore;
