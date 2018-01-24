/* eslint-disable redux-saga/yield-effects */
import { all, call } from 'redux-saga/effects';
import { HANDLE_ERROR, HANDLE_SUCCESS, ON_ERROR, ON_SUCCESS, REQUESTS } from '../../config';
import { submitFormFailed, submitFormSucceed } from '../../internal/actions';
import { makeCallback } from '../../internal/helpers/makeCallback';


const onSuccess = () => ({ type: 'SUCCESS_ACTION' });
const onError = () => ({ type: 'ERROR_ACTION' });
const result = { res: 'Some result.' };
const error = { error: 'Some error.' };
const handleError = (e) => e.error;
const handleSuccess = (r) => r.res;
const payload = { hi: 'ho' };
const submit = () => (result);


const actions = {
  name: 'testPage',
  requestName: 'testForm',
  payload,
  options: {
    configs: {
      name: 'testPage',
      [REQUESTS]: {
        testForm: submit,
      },
      [ON_SUCCESS]: onSuccess,
      [ON_ERROR]: onError,
      [HANDLE_ERROR]: handleError,
      [HANDLE_SUCCESS]: handleSuccess,
    },
  },
};

const actionOther = {
  options: {
    configs: {
      name: 'testOtherPage',
    },
  },
};


const expectYield = call(submit, payload);


const expectSuccess = all(makeCallback(
  submitFormSucceed, onSuccess,
  handleSuccess(result),
  actions.payload, actions.name, actions.requestName, actions.options
));

const handler = () => 123;
const handlerArray = [() => 123, () => 124];

const expectSuccessHandler = all(makeCallback(
  null, [handler],
  handleSuccess(result),
  actions.payload, actions.name, actions.requestName, actions.options
));

const expectSuccessArray = all(makeCallback(
  null, handlerArray,
  handleSuccess(result),
  actions.payload, actions.name, actions.requestName, actions.options
));

const expectErrorHandler = all(makeCallback(
  null, [handler],
  handleError(result),
  actions.payload, actions.name, actions.requestName, actions.options
));

const expectErrorArray = all(makeCallback(
  null, handlerArray,
  handleError(result),
  actions.payload, actions.name, actions.requestName, actions.options
));


const expectError = all(makeCallback(
  submitFormFailed, onError,
  handleError(error),
  actions.payload, actions.name, actions.requestName, actions.options
));

export default {
  actions,
  actionOther,
  submit,
  payload,
  onSuccess,
  onError,
  handleSuccess,
  handleError,
  handler,
  handlerArray,
  result,
  error,
  expectYield,
  expectSuccess,
  expectSuccessHandler,
  expectSuccessArray,
  expectError,
  expectErrorHandler,
  expectErrorArray,
};
