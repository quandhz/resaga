import { get } from 'lodash';
import { VARIABLES } from '../../constants';

const getValuesFromProps = (internalProps, props = {}) => {
  const name = get(internalProps, 'configs.name');
  if (!name) return undefined;

  const store = props[name];
  return store ? store.get(VARIABLES) : undefined;
};

export default getValuesFromProps;
