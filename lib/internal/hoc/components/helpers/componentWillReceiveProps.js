import { differenceWith, isEqual, find } from 'lodash';
import helpers from './index';


const getValues = (props) => {
  const values = helpers.getValuesFromProps(props);
  return values ? [...values.entries()] : [];
};

const getCallback = (array, key) => {
  const cb = find(array, ([cbKey]) => cbKey === `@@cb/${key}`);
  return cb && cb[1];
};


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
