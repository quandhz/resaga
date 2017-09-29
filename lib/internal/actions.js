import {
  SUBMIT_FAILED, SUBMIT_SUCCEED, BEFORE_DISPATCH, DO_SUBMIT, SUBMIT_ACKED, HOC_CLEAR, REDUX_SET, REDUX_SET_FN,
  SET_VARIABLE, SET_VARIABLE_FN,
  SEPARATOR, SEPARATOR_SHORT,
} from './constants';
import helpers from './helpers';

export function beforeSubmitForm(pageName, requestName, payload, options) {
  const name = pageName || options.configs.name;
  const isRemote = options.origin ? `${SEPARATOR}remotely` : '';
  return {
    type: `${helpers.padEnd(BEFORE_DISPATCH)}${SEPARATOR}${name}${SEPARATOR_SHORT}${requestName}${isRemote}`,
    name,
    requestName,
    payload,
    options,
  };
}

export function submitForm({ name, requestName, payload, options }) {
  const page = name || options.configs.name;
  return {
    type: `${helpers.padEnd(DO_SUBMIT)}${SEPARATOR}${page}${SEPARATOR_SHORT}${requestName}`,
    name: page,
    requestName,
    payload,
    options,
  };
}

export function submitFormFailed(error, payload, name, requestName, options) {
  return {
    type: `${helpers.padEnd(SUBMIT_FAILED)}${SEPARATOR}${name}${SEPARATOR_SHORT}${requestName}${SEPARATOR_SHORT}failed`,
    name,
    requestName,
    payload,
    options,
    error,
  };
}

export function submitFormSucceed(result, payload, name, requestName, options) {
  return {
    type: `${helpers.padEnd(SUBMIT_SUCCEED)}${SEPARATOR}${name}${SEPARATOR_SHORT}${requestName}${SEPARATOR_SHORT}successfully`,
    name,
    requestName,
    payload,
    options,
    result,
  };
}

export function doAcknowledge(name, requestName) {
  return {
    type: `${helpers.padEnd(SUBMIT_ACKED)}${SEPARATOR}${name}${SEPARATOR_SHORT}${requestName}`,
    name,
    requestName,
  };
}

export function doCleanup(name) {
  return {
    type: `${helpers.padEnd(HOC_CLEAR)}${SEPARATOR}${name}`,
    name,
  };
}

export function setVariable(name, key, value) {
  return {
    type: `${helpers.padEnd(REDUX_SET)}${SEPARATOR}${name}${SEPARATOR_SHORT}${key}`,
    name,
    key,
    value,
  };
}

export function setVariableWithFunction(name, key, func) {
  return {
    type: `${helpers.padEnd(REDUX_SET_FN)}${SEPARATOR}${name}${SEPARATOR_SHORT}${key}`,
    name,
    key,
    func,
  };
}

export default {
  submitForm,
  submitFormFailed,
  submitFormSucceed,
  doAcknowledge,
  doCleanup,
  [SET_VARIABLE]: setVariable,
  [SET_VARIABLE_FN]: setVariableWithFunction,
};

