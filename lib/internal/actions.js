import {
  SUBMIT_FAILED, SUBMIT_SUCCEED, BEFORE_DISPATCH, DO_SUBMIT, SUBMIT_ACKED, HOC_CLEAR, SEPARATOR, REDUX_SET, REDUX_SET_FN,
  SET_VARIABLE, SET_VARIABLE_FN,
  PAGE,
} from './constants';

export function beforeSubmitForm(pageName, formName, payload, options) {
  const page = pageName || options.configs.name;
  return {
    type: `${BEFORE_DISPATCH}${SEPARATOR}${page}${SEPARATOR}dispatch${SEPARATOR}${formName}`,
    [PAGE]: page,
    formName,
    payload,
    options,
  };
}

export function submitForm(pageName, formName, payload, options) {
  const page = pageName || options.configs.name;
  return {
    type: `${DO_SUBMIT}${SEPARATOR}${page}${SEPARATOR}dispatch${SEPARATOR}${formName}`,
    [PAGE]: page,
    formName,
    payload,
    options,
  };
}

export function submitFormFailed(pageName, formName, payload, options, error) {
  return {
    type: `${SUBMIT_FAILED}${SEPARATOR}${pageName}${SEPARATOR}${formName}${SEPARATOR}failed`,
    [PAGE]: pageName,
    formName,
    payload,
    options,
    error,
  };
}

export function submitFormSucceed(pageName, formName, payload, options, result) {
  return {
    type: `${SUBMIT_SUCCEED}${SEPARATOR}${pageName}${SEPARATOR}${formName}${SEPARATOR}succeeded`,
    [PAGE]: pageName,
    formName,
    payload,
    options,
    result,
  };
}

export function doAcknowledge(pageName, formName) {
  return {
    type: `${SUBMIT_ACKED}${SEPARATOR}${pageName}${SEPARATOR}${formName}${SEPARATOR}acknowledged`,
    [PAGE]: pageName,
    formName,
  };
}

export function doCleanup(pageName) {
  return {
    type: `${HOC_CLEAR}${SEPARATOR}${pageName}`,
    [PAGE]: pageName,
  };
}

export function setVariable(pageName, key, value) {
  return {
    type: `${REDUX_SET}${SEPARATOR}${pageName}${SEPARATOR}${key}`,
    [PAGE]: pageName,
    key,
    value,
  };
}

export function setVariableWithFunction(pageName, key, func) {
  return {
    type: `${REDUX_SET_FN}${SEPARATOR}${pageName}${SEPARATOR}${key}`,
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

