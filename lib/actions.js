import {
  SUBMIT_FAILED, SUBMIT_SUCCEED, BEFORE_DISPATCH, DO_SUBMIT, SUBMIT_ACKED, HOC_CLEAR, SEPARATOR, REDUX_SET, REDUX_SET_FN,
  SET_VARIABLE, SET_VARIABLE_FN,
} from './constants';

export function beforeSubmitForm(payload, configs, formName, pageName) {
  const page = pageName || configs.name;
  return {
    type: `${BEFORE_DISPATCH}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    configs,
    formName,
    payload,
  };
}

export function submitForm(payload, configs, formName, pageName) {
  const page = pageName || configs.name;
  return {
    type: `${DO_SUBMIT}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    configs,
    formName,
    payload,
  };
}

export function submitFormFailed(error, payload, page, formName) {
  return {
    type: `${SUBMIT_FAILED}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    formName,
    payload,
    error,
  };
}

export function submitFormSucceed(result, payload, page, formName) {
  return {
    type: `${SUBMIT_SUCCEED}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    formName,
    payload,
    result,
  };
}

export function doAcknowledge(page, formName) {
  return {
    type: `${SUBMIT_ACKED}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    formName,
  };
}

export function doCleanup(page) {
  return {
    type: `${HOC_CLEAR}${SEPARATOR}${page}`,
    page,
  };
}

export function setVariable(page, key, value) {
  return {
    type: `${REDUX_SET}${SEPARATOR}${page}${SEPARATOR}${key}`,
    page,
    key,
    value,
  };
}

export function setVariableWithFunction(page, key, func) {
  return {
    type: `${REDUX_SET_FN}${SEPARATOR}${page}${SEPARATOR}${key}`,
    page,
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

