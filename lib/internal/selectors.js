import createCachedSelector from 're-reselect';
import { VARIABLES, NOT_SET_VALUE } from './constants';
import helpers from './helpers/selectors';


const selectPage = (page, manuallySubscribe = false) => (state) => {
  const store = state.get(page);
  if (!store) return undefined;

  if (!manuallySubscribe) return store;

  return store.delete(VARIABLES);
};


const selectValueByKeyPath = ([page, ...keys]) =>
  createCachedSelector(
    selectPage(page),
    helpers.selectValue(page, keys),
  )((state, props) => `${[page, ...keys].toString()}.${props.id || ''}`);

const selectProps = (state, props) => props;


const selectOtherValuesByObject = ({
  keyPath, id, notSetValue, selector,
}) => createCachedSelector(
  [selectValueByKeyPath(keyPath), selectProps],
  (value, props) => {
    let val = value;

    if (typeof selector === 'function') {
      val = selector(value, props);
    }

    if (typeof val === 'undefined') return notSetValue;

    return val;
  },
)((state, props) => `${keyPath.toString()}.${id ? props[id] : props.id}`);


const selectOtherValues = (params) => {
  if (!params || typeof params !== 'object') return undefined;

  if (Array.isArray(params)) {
    return selectValueByKeyPath(params);
  }

  return selectOtherValuesByObject(params);
};


export default {
  selectPage,
  selectOtherValues,
  selectOtherValuesByObject,
  selectValueByKeyPath,
};
