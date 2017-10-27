import helpers from './index';
import selectors from '../selectors';

const subscribeValue = (configs, props) => {
  if (!configs || !configs.value) return () => null;

  const keys = Object.keys(configs.value);
  if (!keys || !keys.length) return () => null;

  return helpers.reselect(keys.reduce(
    (reduction, key) =>
      ({ ...reduction, [key]: selectors.selectOtherValues(configs.value[key], props) }),
    {}
  ));
};

export default subscribeValue;
