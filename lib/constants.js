export const STORE = 'store';
export const SERVER_ERROR = 'serverError';
export const SUBMIT_SUCCESS = 'isSubmitSuccess';
export const RESULT = 'serverResponse';
export const IS_LOADING = 'isLoading';
export const PAYLOAD = 'payload';

export const DO_SUBMIT = 'REDUX_DISPATCH';
export const SUBMIT_FAILED = 'SAGA_FAILED';
export const SUBMIT_SUCCEED = 'SAGA_SUCCEED';
export const SUBMIT_ACKED = 'REDUX_ACKNOWLEDGE';
export const HOC_CLEAR = 'REDUX_CLEAN_UP';

export const VARIABLES = 'reduxVariables';
export const GET_VARIABLES = 'getVariables';
export const SET_VARIABLE = 'setVariable';
export const SET_VARIABLE_FN = 'setVariableFn';
export const REDUX_SET = 'REDUX_SET';
export const REDUX_SET_FN = 'REDUX_SET_FN';

export const SEPARATOR = '__';

export default {
  STORE,
  SERVER_ERROR,
  SUBMIT_SUCCESS,
  RESULT,
  DO_SUBMIT,
  PAYLOAD,
  SUBMIT_FAILED,
  SUBMIT_SUCCEED,
  SUBMIT_ACKED,
  HOC_CLEAR,
  VARIABLES,
  GET_VARIABLES,
  SET_VARIABLE,
  SET_VARIABLE_FN,
  REDUX_SET,
  REDUX_SET_FN,
};
