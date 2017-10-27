import { createSelector } from 'reselect';
import { VARIABLES } from './constants';
import helpers from './helpers/selectors';


const selectPage = (page) => (state) => state.get(page);

const selectValues = (pageName) => createSelector(
  selectPage(pageName),
  (page) => page && page.get(VARIABLES)
);


const selectValueByKeyPath = (keyPath) => createSelector(
  selectPage(keyPath[0]),
  helpers.selectValue(keyPath[1]),
);


const selectOtherValuesByObject = ({ keyPath, getter }, props) =>
  createSelector(
    selectValueByKeyPath(keyPath),
    (value) => getter ? getter(value, props) : value,
  );

const selectOtherValues = (params, props) => {
  if (!params || typeof params !== 'object') return undefined;

  if (Array.isArray(params)) {
    return selectValueByKeyPath(params);
  }

  return selectOtherValuesByObject(params, props);
};

export default {
  selectPage,
  selectValues,
  selectOtherValues,
  selectOtherValuesByObject,
  selectValueByKeyPath,
};
