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
const key = 'keyyy';
const value = 'valueee';


const initialState = fromJS({});
const nestedValueState = initialState.merge(initialState.concat({
  [key]: {
    deep: {
      nested: 123,
    },
  },
}));


const beforeDispatch = beforeSubmitForm(name, requestName, payload, options);
const expectBeforeDispatch = (state) =>
  state.set(requestName, {
    name, requestName, payload, options, willLoad: true,
  });


const doSubmit = submitForm({
  name, requestName, payload, options,
});
const expectDoSubmit = (state) =>
  state.set(requestName, { isLoading: true });


const submitFailed = submitFormFailed(error, payload, name, requestName, options);
const expectSubmitFailed = (state) =>
  state.set(requestName, {
    name, requestName, payload, options, error,
  });


const submitSuccess = submitFormSucceed(result, payload, name, requestName, options);
const expectSubmitSuccess = (state) =>
  state.set(requestName, {
    name, requestName, payload, options, result, isSuccess: true,
  });


const submitAcked = doAcknowledge(name, requestName);
const expectSubmitAcked = (state) =>
  state.delete(requestName);


const clear = doCleanup();
const expectClear = () => initialState;


const setValue = setVariable([false, key], value);
const setValueNested = setVariable([false, key, 'deep', 'nested'], value);
const setValueResagaStore = setVariable([true, key], value);

const expectSetValue = (state) =>
  state.merge({
    [VARIABLES]: state.get(VARIABLES, fromJS({})).concat({
      [key]: value,
    }),
  });
const expectSetValueNormal = (state) =>
  state.merge(state.concat({
    [key]: value,
  }));
const expectSetValueNormalNested = (state) =>
  state.merge(state.concat({
    [key]: {
      deep: {
        nested: value,
      },
    },
  }));


const func = (data) => data;
const setFunction = setVariableWithFunction([false, key], func);
const setFunctionNested = setVariableWithFunction([false, key, 'deep', 'nested'], func);
const setFunctionResagaStore = setVariableWithFunction([true, key], func);
const expectSetFunction = (state) => {
  const updatedData = func(state.get(VARIABLES, fromJS({})).get(key));
  return state.merge({
    [VARIABLES]: state.get(VARIABLES, fromJS({})).concat({
      [key]: updatedData,
    }),
  });
};
const expectSetFunctionNormal = (state) => {
  const updatedData = func(state.get(VARIABLES, fromJS({})).get(key));
  return state.merge(state.concat({
    [key]: updatedData,
  }));
};
const expectSetFunctionNormalNested = (state) => state.merge(state.concat({
  [key]: {
    deep: {
      nested: 123,
    },
  },
}));


const otherAction = { type: 'other' };
const expectOtherAction = (state) => state || initialState;


export default {
  initialState,
  nestedValueState,
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
  setValueNested,
  setValueResagaStore,
  expectSetValue,
  expectSetValueNormal,
  expectSetValueNormalNested,
  setFunction,
  setFunctionNested,
  setFunctionResagaStore,
  expectSetFunction,
  expectSetFunctionNormal,
  expectSetFunctionNormalNested,
  otherAction,
  expectOtherAction,
};
