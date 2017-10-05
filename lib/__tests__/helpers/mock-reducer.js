import { fromJS } from 'immutable';
import {
  beforeSubmitForm,
  doAcknowledge,
  doCleanup,
  setVariable,
  setVariableWithFunction,
  submitForm,
  submitFormFailed,
  submitFormSucceed,
} from '../../internal/actions';
import { VARIABLES } from '../../internal/constants';


const name = 'MockPage';
const requestName = 'fetchSomething';
const error = 'something wrong';
const payload = { hi: 'hello' };
const result = { content: 'good' };
const options = {};


const initialState = fromJS({ [VARIABLES]: {} });


const beforeDispatch = beforeSubmitForm(name, requestName, payload, options);
const expectBeforeDispatch = (state) =>
  state.set(requestName, { name, requestName, payload, options, willLoad: true });


const doSubmit = submitForm({ name, requestName, payload, options });
const expectDoSubmit = (state) =>
  state.set(requestName, { isLoading: true });


const submitFailed = submitFormFailed(error, payload, name, requestName, options);
const expectSubmitFailed = (state) =>
  state.set(requestName, { name, requestName, payload, options, error });


const submitSuccess = submitFormSucceed(result, payload, name, requestName, options);
const expectSubmitSuccess = (state) =>
  state.set(requestName, { name, requestName, payload, options, result, isSuccess: true });


const submitAcked = doAcknowledge(name, requestName);
const expectSubmitAcked = (state) =>
  state.delete(requestName);


const clear = doCleanup();
const expectClear = () => initialState;


const key = 'keyyy';
const value = 'valueee';
const setValue = setVariable(name, key, value);
const expectSetValue = (state) =>
  state.merge({
    [VARIABLES]: state.get(VARIABLES).concat({ [key]: { key, value } }),
  });


const func = (data) => data;
const setFunction = setVariableWithFunction(name, key, func);
const expectSetFunction = (state) =>
  state.merge({
    [VARIABLES]: state.get(VARIABLES).concat({ [key]: { key, value: func(state.get(VARIABLES).get(key)) } }),
  });


const otherAction = { type: 'other' };
const expectOtherAction = (state) => state || initialState;


export default {
  initialState,
  beforeDispatch,
  expectBeforeDispatch,
  doSubmit,
  expectDoSubmit,
  submitFailed,
  expectSubmitFailed,
  submitSuccess,
  expectSubmitSuccess,
  submitAcked,
  expectSubmitAcked,
  clear,
  expectClear,
  setValue,
  expectSetValue,
  setFunction,
  expectSetFunction,
  otherAction,
  expectOtherAction,
};
