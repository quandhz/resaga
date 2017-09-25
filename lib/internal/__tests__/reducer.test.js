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
} from '../actions';
import { VARIABLES } from '../constants';
import registerReducer from '../reducer';

describe('registerReducer', () => {
  const name = 'testPage';
  const formName = 'testName';
  const payload = 'payload';
  const options = {};
  let state;
  beforeEach(() => {
    state = fromJS({
      [VARIABLES]: {},
    });
  });

  it('should exist', () => {
    expect(registerReducer);
  });


  it('BEFORE_DISPATCH', () => {
    const expectedResult = state.set(formName, { name, formName, payload, options, willLoad: true });
    expect(registerReducer(state, beforeSubmitForm(name, formName, payload, options))).toEqual(
      expectedResult
    );
  });


  it('DO_SUBMIT', () => {
    const expectedResult = state.set(formName, {
      isLoading: true,
    });
    expect(registerReducer(state, submitForm(name, formName, payload, options))).toEqual(
      expectedResult
    );
  });


  it('SUBMIT_FAILED', () => {
    const error = 'error';
    const expectedResult = state.set(formName, { name, formName, payload, options, error });
    expect(
      registerReducer(state, submitFormFailed(name, formName, payload, options, error))
    ).toEqual(expectedResult);
  });


  it('SUBMIT_SUCCEED', () => {
    const result = 'result';
    const expectedResult = state.set(formName, { name, formName, payload, options, result, isSubmitSuccess: true });
    expect(
      registerReducer(state, submitFormSucceed(name, formName, payload, options, result))
    ).toEqual(expectedResult);
  });


  it('SUBMIT_ACKED', () => {
    const expectedResult = state.delete(formName);
    expect(registerReducer(state, doAcknowledge(name, formName))).toEqual(
      expectedResult
    );
  });


  it('HOC_CLEAR', () => {
    expect(registerReducer(state, doCleanup())).toEqual(
      fromJS({ [VARIABLES]: {} })
    );
  });


  it('REDUX_SET', () => {
    const key = 'keyyy';
    const value = 'valueee';

    const expectedResult = state.merge({
      [VARIABLES]: state.get(VARIABLES).concat({ [key]: value }),
    });
    expect(registerReducer(state, setVariable(name, key, value))).toEqual(expectedResult);
  });


  it('REDUX_SET_FN', () => {
    const key = 'keyyy';
    const func = (data) => data;

    const expectedResult = state.merge({
      [VARIABLES]: state.get(VARIABLES).concat({
        [key]: func(state.get(VARIABLES).get(key)),
      }),
    });
    expect(registerReducer(state, setVariableWithFunction(name, key, func))).toEqual(expectedResult);
  });


  it('DEFAULT', () => {
    const mockAction = { type: 'other' };
    expect(registerReducer(state, mockAction)).toEqual(state);
  });


  it('DEFAULT state undefined', () => {
    const mockAction = { type: 'other' };
    expect(registerReducer(undefined, mockAction)).toEqual(state);
  });
});
