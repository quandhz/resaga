import { differenceWith, isEqual, find } from 'lodash';


const getValues = (props = {}) => Object.keys(props).map((key) => [key, props[key]]);

const getCallback = (array, key) => {
  const cb = find(array, ([cbKey]) => cbKey === `@@cb/${key}`);
  return cb && cb[1];
};


export const checkValuesChanged = (props, nextProps) => {
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

const componentWillReceiveProps = (...params) => setTimeout(() => checkValuesChanged(...params), 100);


export default componentWillReceiveProps;
