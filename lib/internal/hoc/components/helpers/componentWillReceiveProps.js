import { differenceWith, isEqual, find } from 'lodash';
import { VARIABLES, SUBSCRIPTIONS } from '../../../constants';


const getStore = (props) => {
  const { internalProps } = props;
  if (!internalProps) return [];

  const { configs } = internalProps;

  const name = configs && configs.name;
  return props[name];
};


const getValues = (props) => {
  const store = getStore(props);

  const values = store && store.get(VARIABLES);
  return values ? [...values.entries()] : [];
};

const getCallback = (array, key) => {
  const cb = find(array, ([cbKey]) => cbKey === `@@cb/${key}`);
  return cb && cb[1];
};


// TODO: consider setValue callback
const componentWillReceiveProps = (props, nextProps) => {
  const currentValues = getValues(props);
  const nextValues = getValues(nextProps);

  const diffs = differenceWith(nextValues, currentValues, isEqual);
  if (!diffs.length) return false;

  return diffs.map(([key, value]) => {
    if (key.indexOf('@@cb/') === -1) {
      const callback = getCallback(diffs, key);

      if (typeof callback === 'function') {
        callback({ [key]: value });
      }
    }

    return true;
  });
};


export default componentWillReceiveProps;
