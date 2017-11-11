import createCachedSelector from 're-reselect';
import { VARIABLES } from './constants';
import helpers from './helpers/selectors';


const selectPage = (page) => (state) => state.get(page);

const selectValues = (pageName) => createCachedSelector(
  selectPage(pageName),
  (page) => page && page.get(VARIABLES)
)(() => `${pageName}.${VARIABLES}`);


const selectValueByKeyPath = (keyPath) =>
  createCachedSelector(
    selectPage(keyPath[0]),
    helpers.selectValue(keyPath[1]),
  )(() => `${keyPath[0]}.${keyPath[1]}`);

const selectProps = (state, props) => props;


const selectOtherValuesByObject = ({ keyPath, getter, id }) => createCachedSelector(
  [selectValueByKeyPath(keyPath), selectProps],
  (value, props) => {
    if (!value) return value;
    return getter ? getter(value, props) : value;
  },
)((state, props) => `${keyPath[0]}.${keyPath[1]}.${props.id || id}`);

const selectOtherValues = (params) => {
  if (!params || typeof params !== 'object') return undefined;

  if (Array.isArray(params)) {
    return selectValueByKeyPath(params);
  }

  return selectOtherValuesByObject(params);
};

export default {
  selectPage,
  selectValues,
  selectOtherValues,
  selectOtherValuesByObject,
  selectValueByKeyPath,
};
