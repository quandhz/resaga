import { differenceWith, isEqual, find } from 'lodash';
import helpers from './index';


const getValues = (internalProps, props) => {
  const values = helpers.exportProps(internalProps, props);
  return Object.keys(values).map((key) => [key, values[key]]);
};

const getCallback = (array, key) => {
  const cb = find(array, ([cbKey]) => cbKey === `@@cb/${key}`);
  return cb && cb[1];
};


const componentWillReceiveProps = (internalProps, props, nextProps) => {
  const currentValues = getValues(internalProps, props);
  const nextValues = getValues(internalProps, nextProps);


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
