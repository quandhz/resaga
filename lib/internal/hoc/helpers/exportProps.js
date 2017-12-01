import { get } from 'lodash';
import { VARIABLES } from '../../constants';

const exportProps = (internalProps, props = {}) => {
  const name = get(internalProps, 'configs.name');
  const {
    resaga, acknowledge, beforeDispatch, cleanup, dispatch, setValue, setValueWithFunc,
    [name]: store,
    ...rest
  } = props;

  if (typeof name === 'undefined' || !store) return { ...rest };

  return { ...rest, [name]: store.delete(VARIABLES) };
};

export default exportProps;
