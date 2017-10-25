import { createSelector } from 'reselect';
import { VARIABLES } from './constants';

const selectPage = (page) => (state) => state.get(page);

const selectValues = (pageName) => createSelector(
  selectPage(pageName),
  (page) => page && page.get(VARIABLES)
);

const selectOtherValues = ([pageName, ...searchKeyPath]) =>
  createSelector(
    selectPage(pageName),
    (page) => page && page.getIn([VARIABLES, ...searchKeyPath])
  );

export default {
  selectPage,
  selectValues,
  selectOtherValues,
};
