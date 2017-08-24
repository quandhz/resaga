import {
  SUBMIT_FAILED, SUBMIT_SUCCEED, DO_SUBMIT, SUBMIT_ACKED, HOC_CLEAR, SEPARATOR, REDUX_SET, REDUX_SET_FN,
  SET_VARIABLE, SET_VARIABLE_FN,
} from './constants';

export function submitForm(data, options, formName, pageName) {
  const page = pageName || options.page;
  return {
    type: `${DO_SUBMIT}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    options,
    data,
    formName,
  };
}

export function submitFormFailed(error, payload, page, formName) {
  return {
    type: `${SUBMIT_FAILED}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    payload,
    error,
    formName,
  };
}

export function submitFormSucceed(result, payload, page, formName) {
  return {
    type: `${SUBMIT_SUCCEED}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    payload,
    result,
    formName,
  };
}

export function acknowledge(page, formName) {
  return {
    type: `${SUBMIT_ACKED}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    formName,
  };
}

export function cleanup(page) {
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
  acknowledge,
  cleanup,
  [SET_VARIABLE]: setVariable,
  [SET_VARIABLE_FN]: setVariableWithFunction,
};

