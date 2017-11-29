import { get } from 'lodash';
import { VARIABLES } from '../../constants';
import { getKeyPath } from '../../helpers/subscribeValue';

const exportProps = (internalProps, props) => {
  const name = get(internalProps, 'configs.name');
  const {
    resaga, acknowledge, beforeDispatch, cleanup, dispatch, setValue, setValueWithFunc,
    [name]: store,
    ...rest
  } = props;


  const value = get(internalProps, 'configs.value', {});
  Object.keys(value).forEach((key) => {
    const keyPath = getKeyPath(value[key], props);
    if (keyPath) {
      delete rest[keyPath];
    }
  });


  if (typeof name === 'undefined' || !store) return { ...rest };

  return { ...rest, [name]: store.delete(VARIABLES) };
};

export default exportProps;
