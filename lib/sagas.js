import { call, takeEvery, all } from 'redux-saga/effects';
import { submitFormFailed, submitFormSucceed } from './internal/actions';
import { isErrorHandlerSet, isResultHandlerSet, handlers } from './handler';
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
  let callbacks;

  if (originConfigs.name === name) {
    const configs = analyseConfig.analyse(originConfigs, requestName);
    try {
      const result = yield call(configs.requests, payload);
      callbacks = makeCallback(
        submitFormSucceed, configs.onSuccess, // actions to call on success
        configs.postProcess(result, payload), payload, configs.name, requestName, options // parameters
      );

      if (isResultHandlerSet()) {
        let actions = handlers.resultHandler(result, payload);
        if (typeof actions === 'function') actions = [actions];

        if (Array.isArray(actions)) {
          callbacks = makeCallback(null, actions, result, payload);
        }
      }

      yield all(callbacks);
    } catch (error) {
      callbacks = makeCallback(
        submitFormFailed, configs.onError, // actions to call on error
        configs.postProcessError(error, payload), payload, configs.name, requestName, options // parameters
      );

      if (isErrorHandlerSet()) {
        let actions = handlers.errorHandler(error, payload);
        // make array
        if (typeof actions === 'function') actions = [actions];

        if (Array.isArray(actions)) {
          callbacks = makeCallback(null, actions, error, payload);
        }
      }

      yield all(callbacks);
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
  yield takeEvery(analyseConfig.doSubmit, handleRequest);
}

// Bootstrap sagas
export default [saga];
