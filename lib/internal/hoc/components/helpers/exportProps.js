import { VARIABLES } from '../../../constants';

const exportProps = (internalProps, props) => {
  if (!internalProps) return props;

  const { configs } = internalProps;

  const name = configs && configs.name;
  if (!name) return props;

  const { [name]: store, ...rest } = props;
  return { ...rest, [name]: store.delete(VARIABLES) };
};

export default exportProps;
