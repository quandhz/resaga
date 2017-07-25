import { LOCATION_CHANGE } from 'react-router-redux';
import { call, cancel, fork, take, takeLatest } from 'redux-saga/effects';
import { submitFormFailed, submitFormSucceed } from './actions';
import { makeCallback } from './utils/makeCallback';
import { analyse, doSubmit } from './utils/sagas-helpers';

/**
 * handle submit saga
 * @param data: form data
 * @param options: CONFIG
 * @param formName: works as an ID in the same page
 */
export function* handleRequest({ data, options, formName }) {
  const option = analyse(options, formName);
  try {
    const result = yield call(option.submit, data);
    yield makeCallback(submitFormSucceed, option.onSubmitSuccess, option.postProcess(result), option.request, formName);
  } catch (error) {
    yield makeCallback(submitFormFailed, option.onSubmitError, option.postProcessError(error), option.request, formName);
  }
}

/**
 * Root saga manages watcher lifecycle
 * Watches for DO_SUBMIT actions and calls `handleRequest` when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* saga() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(takeLatest, doSubmit, handleRequest);

  // Suspend execution if location changed
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [saga];
