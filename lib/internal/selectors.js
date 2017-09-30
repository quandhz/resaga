import { createSelector } from 'reselect';
import { VARIABLES } from './constants';

const selectPage = (page) => (state) => state.get(page);

const selectValues = (pageName) => createSelector(
  selectPage(pageName),
  (page) => page && page.get(VARIABLES)
);

export default {
  selectPage,
  selectValues,
};
