import createCachedSelector from 're-reselect';
import helpers from './helpers/selectors';


const NOT_SET_VALUE = '@@resaga/valueNotSet';

const selectPage = (page) => (state) => state.get(page);


const selectValueByKeyPath = (keyPath, notSetValue) =>
  createCachedSelector(
    selectPage(keyPath[0]),
    helpers.selectValue(keyPath[0], keyPath[1], notSetValue),
  )(() => `${keyPath[0]}.${keyPath[1]}`);

const selectProps = (state, props) => props;


const selectOtherValuesByObject = ({
  keyPath, getter, id, notSetValue,
}) => createCachedSelector(
  [selectValueByKeyPath(keyPath, NOT_SET_VALUE), selectProps],
  (value, props) => {
    if (value === NOT_SET_VALUE) return notSetValue;

    return getter ? getter(value, props) : value;
  },
)((state, props) => `${keyPath[0]}.${keyPath[1]}.${id ? props[id] : props.id}`);

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
