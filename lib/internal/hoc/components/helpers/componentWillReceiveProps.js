import difference from 'lodash.difference';

const componentWillReceiveProps = (internalProps, nextProps) => {
  const currentValues = internalProps.values.toArray();
  const nextValues = nextProps.internalProps.values.toArray();

  const diffs = difference(nextValues, currentValues);
  if (!diffs.length) return false;

  return diffs.map(({ key, value, callback }) => {
    if (typeof callback === 'function') {
      callback({ [key]: value });
    }
    return true;
  });
};

export default componentWillReceiveProps;
