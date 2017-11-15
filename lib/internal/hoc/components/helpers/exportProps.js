import { VARIABLES } from '../../../constants';

const exportProps = (internalProps, props) => {
  if (!internalProps) return props;

  const { configs } = internalProps;
  const name = configs && configs.name;
  if (typeof name === 'undefined') return props;

  const { [name]: store, ...rest } = props;
  if (!store) return props;

  return { ...rest, [name]: store.delete(VARIABLES) };
};

export default exportProps;
