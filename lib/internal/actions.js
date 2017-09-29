import {
  SUBMIT_FAILED, SUBMIT_SUCCEED, BEFORE_DISPATCH, DO_SUBMIT, SUBMIT_ACKED, HOC_CLEAR, REDUX_SET, REDUX_SET_FN,
  SET_VARIABLE, SET_VARIABLE_FN,
  PAGE, PAD_LENGTH, SEPARATOR, SEPARATOR_SHORT,
} from './constants';

export function beforeSubmitForm(pageName, requestName, payload, options) {
  const page = pageName || options.configs.name;
  const isRemote = options.origin ? `${SEPARATOR}remotely` : '';
  return {
    type: `${BEFORE_DISPATCH.padEnd(PAD_LENGTH, SEPARATOR_SHORT)}${SEPARATOR}${page}${SEPARATOR_SHORT}${requestName}${isRemote}`,
    [PAGE]: page,
    requestName,
    payload,
    options,
  };
}

export function submitForm({ name, requestName, payload, options }) {
  const page = name || options.configs.name;
  return {
    type: `${DO_SUBMIT.padEnd(PAD_LENGTH, SEPARATOR_SHORT)}${SEPARATOR}${page}${SEPARATOR_SHORT}${requestName}`,
    name: page,
    requestName,
    payload,
    options,
  };
}

export function submitFormFailed(error, payload, pageName, requestName, options) {
  return {
    type: `${SUBMIT_FAILED.padEnd(PAD_LENGTH, SEPARATOR_SHORT)}${SEPARATOR}${pageName}${SEPARATOR_SHORT}${requestName}${SEPARATOR_SHORT}failed`,
    [PAGE]: pageName,
    requestName,
    payload,
    options,
    error,
  };
}

export function submitFormSucceed(result, payload, pageName, requestName, options) {
  return {
    type: `${SUBMIT_SUCCEED.padEnd(PAD_LENGTH, SEPARATOR_SHORT)}${SEPARATOR}${pageName}${SEPARATOR_SHORT}${requestName}${SEPARATOR_SHORT}successfully`,
    [PAGE]: pageName,
    requestName,
    payload,
    options,
    result,
  };
}

export function doAcknowledge(pageName, requestName) {
  return {
    type: `${SUBMIT_ACKED.padEnd(PAD_LENGTH, SEPARATOR_SHORT)}${SEPARATOR}${pageName}${SEPARATOR_SHORT}${requestName}`,
    [PAGE]: pageName,
    requestName,
  };
}

export function doCleanup(pageName) {
  return {
    type: `${HOC_CLEAR.padEnd(PAD_LENGTH, SEPARATOR_SHORT)}${SEPARATOR}${pageName}`,
    [PAGE]: pageName,
  };
}

export function setVariable(pageName, key, value) {
  return {
    type: `${REDUX_SET.padEnd(PAD_LENGTH, SEPARATOR_SHORT)}${SEPARATOR}${pageName}${SEPARATOR_SHORT}${key}`,
    [PAGE]: pageName,
    key,
    value,
  };
}

export function setVariableWithFunction(pageName, key, func) {
  return {
    type: `${REDUX_SET_FN.padEnd(PAD_LENGTH, SEPARATOR_SHORT)}${SEPARATOR}${pageName}${SEPARATOR_SHORT}${key}`,
    [PAGE]: pageName,
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

