import { createSelector } from 'reselect';
import { SERVER_ERROR, SUBMIT_SUCCESS, VARIABLES, GET_VARIABLES } from './constants';

export const selectPage = (page) => (state) => state.get(page);

/**
 * get errors of a request in a page
 * @param page i.e. RegistrationPage
 * @param request i.e. RegisterForm
 */
export const selectErrors = (page, request) => createSelector(
  selectPage(page),
  (form) => form && form.get(request),
  (requestState) => requestState && requestState.get(SERVER_ERROR)
);

/**
 * get submit success status of a request in a page
 * @param page i.e. RegistrationPage
 * @param request i.e. RegisterForm
 */
export const selectIsSubmitSuccess = (page, request) => createSelector(
  selectPage(page),
  (form) => form && form.get(request),
  (requestState) => requestState && requestState.get(SUBMIT_SUCCESS)
);

export const selectVariables = (pageName) => createSelector(
  selectPage(pageName),
  (page) => page && page.get(VARIABLES)
);

export default {
  selectPage,
  selectErrors,
  selectIsSubmitSuccess,
  selectVariables,
  [GET_VARIABLES]: selectVariables,
};
