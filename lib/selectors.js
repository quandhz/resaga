/**
 * Created by quando on 8/3/17.
 * based on Yang on 29/10/16.
 */
import { createSelector } from 'reselect';
import {
  SERVER_ERROR,
  SUBMIT_SUCCESS,
} from './constants';

const selectPage = (page) => (state) => state.get(page);

/**
 * get errors of a request in a page
 * @param page i.e. RegistrationPage
 * @param request i.e. RegisterForm
 */
const selectErrors = (page, request) => createSelector(
  selectPage(page),
  (form) => form && form.get(request),
  (requestState) => requestState && requestState.get(SERVER_ERROR)
);

/**
 * get submit success status of a request in a page
 * @param page i.e. RegistrationPage
 * @param request i.e. RegisterForm
 */
const selectIsSubmitSuccess = (page, request) => createSelector(
  selectPage(page),
  (form) => form && form.get(request),
  (requestState) => requestState && requestState.get(SUBMIT_SUCCESS)
);

export {
  selectPage,
  selectErrors,
  selectIsSubmitSuccess,
};
