import { VARIABLES } from '../../../constants';

const getValuesFromProps = (props) => {
  const { internalProps } = props;
  if (!internalProps) return false;

  const { configs } = internalProps;

  const name = configs && configs.name;
  const store = props[name];

  return store && store.get(VARIABLES);
};

export default getValuesFromProps;
