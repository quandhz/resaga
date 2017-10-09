import { LOCATION_CHANGE } from 'react-router-redux';
import { call, cancel, fork, take, takeEvery, all } from 'redux-saga/effects';
import { submitFormFailed, submitFormSucceed } from './internal/actions';
import { makeCallback } from './internal/helpers/makeCallback';
import analyseConfig from './internal/helpers/analyseConfig';

/**
 * handle submit saga
 * @param data: form data
 * @param options: CONFIG
 * @param requestName: works as an ID in the same page
 * @param page
 */
export function* handleRequest({
  name, requestName, payload, options,
}) {
  const originConfigs = options.configs;
  if (originConfigs.name === name) {
    const configs = analyseConfig.analyse(originConfigs, requestName);
    try {
      const result = yield call(configs.requests, payload);
      yield all(makeCallback(
        submitFormSucceed, configs.onSuccess, // actions to call on success
        configs.postProcess(result), payload, configs.name, requestName, options // parameters
      ));
    } catch (error) {
      yield all(makeCallback(
        submitFormFailed, configs.onError, // actions to call on error
        configs.postProcessError(error), payload, configs.name, requestName, options // parameters
      ));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 * Watches for DO_SUBMIT actions and calls `handleRequest` when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* saga() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(takeEvery, analyseConfig.doSubmit, handleRequest);

  // Suspend execution if location changed
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [saga];
