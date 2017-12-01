import createCachedSelector from 're-reselect';
import { SEPARATOR, VARIABLES } from '../constants';

const selectValues = (name) => (state) => state && state.getIn([name, VARIABLES]);

const shallowlyConvert = (values) => values && values.toObject();

const selectOwnStore = (configs) =>
  createCachedSelector(
    selectValues(configs.name),
    shallowlyConvert
  )(() => `${configs.name}${SEPARATOR}${VARIABLES}`);


export default selectOwnStore;
