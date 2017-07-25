import { SUBMIT_FAILED, SUBMIT_SUCCEED, DO_SUBMIT, SUBMIT_ACKED, HOC_CLEAR, SEPARATOR } from './constants';

function submitForm(data, options, formName) {
  return {
    type: `${DO_SUBMIT}${SEPARATOR}${options.page}${SEPARATOR}${formName}`,
    options,
    data,
    formName,
  };
}

function submitFormFailed(error, page, formName) {
  return {
    type: `${SUBMIT_FAILED}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    error,
    formName,
  };
}

function submitFormSucceed(result, page, formName) {
  return {
    type: `${SUBMIT_SUCCEED}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    result,
    formName,
  };
}

function acknowledge(page, formName) {
  return {
    type: `${SUBMIT_ACKED}${SEPARATOR}${page}${SEPARATOR}${formName}`,
    page,
    formName,
  };
}

function cleanup(page) {
  return {
    type: `${HOC_CLEAR}${SEPARATOR}${page}`,
    page,
  };
}

export { submitForm, submitFormFailed, submitFormSucceed, acknowledge, cleanup };
