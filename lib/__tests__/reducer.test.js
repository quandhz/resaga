import { fromJS } from 'immutable';
import { acknowledge, cleanup, beforeSubmitForm, submitForm, submitFormFailed, submitFormSucceed } from '../internal/actions';
import { RESULT, SERVER_ERROR, SUBMIT_SUCCESS, VARIABLES, IS_LOADING, PAYLOAD, WILL_LOAD } from '../internal/constants';
import registerReducer from '../internal/reducer';

describe('registerReducer', () => {
  const formName = 'testName';
  const pageName = 'testPage';
  const payload = 'payload';
  let state;
  beforeEach(() => {
    state = fromJS({
      [VARIABLES]: {},
    });
  });

  it('should exist', () => {
    expect(registerReducer);
  });
  it('should set Server error correctly', () => {
    const serverError = 'error';
    const expectedResult = state.set(formName, {
      [SERVER_ERROR]: serverError,
      [PAYLOAD]: payload,
    });
    expect(
      registerReducer(state, submitFormFailed(serverError, payload, pageName, formName))
    ).toEqual(expectedResult);
  });
  it('should set Server success correctly', () => {
    const expectedResult = state.set(formName, {
      [RESULT]: '',
      [PAYLOAD]: payload,
      [SUBMIT_SUCCESS]: true,
    });
    expect(
      registerReducer(state, submitFormSucceed('', payload, pageName, formName))
    ).toEqual(expectedResult);
  });
  it('should set beforeSubmitForm correctly', () => {
    const expectedResult = state.set(formName, {
      [PAYLOAD]: payload,
      [WILL_LOAD]: true,
      formName,
      page: pageName,
    });
    expect(registerReducer(state, beforeSubmitForm(payload, {}, formName, pageName))).toEqual(
      expectedResult
    );
  });
  it('should set submitForm correctly', () => {
    const expectedResult = state.set(formName, {
      [IS_LOADING]: true,
    });
    expect(registerReducer(state, submitForm({}, pageName, formName))).toEqual(
      expectedResult
    );
  });
  it('should set acknowledge correctly', () => {
    const expectedResult = state.delete(formName);
    expect(registerReducer(state, acknowledge(formName))).toEqual(
      expectedResult
    );
  });
  it('should set cleanup correctly', () => {
    expect(registerReducer(state, cleanup())).toEqual(
      fromJS({ [VARIABLES]: {} })
    );
  });
  it('should set other correctly', () => {
    const mockAction = { type: 'other' };
    expect(registerReducer(state, mockAction)).toEqual(state);
  });
  it('should set other correctly', () => {
    const mockAction = { type: 'other' };
    expect(registerReducer(undefined, mockAction)).toEqual(state);
  });
  it('should set REDUX_SET correctly', () => {
    const key = 'keyyy';
    const value = 'valueee';

    const expectedResult = state.merge({
      [VARIABLES]: state.get(VARIABLES).concat({ [key]: value }),
    });
    const mockAction = { type: 'REDUX_SET', key, value };
    expect(registerReducer(state, mockAction)).toEqual(expectedResult);
  });
  it('should set REDUX_SET_FN correctly', () => {
    const key = 'keyyy';
    const func = (data) => data;

    const expectedResult = state.merge({
      [VARIABLES]: state.get(VARIABLES).concat({
        [key]: func(state.get(VARIABLES).get(key)),
      }),
    });
    const mockAction = { type: 'REDUX_SET_FN', key, func };
    expect(registerReducer(state, mockAction)).toEqual(expectedResult);
  });
});
