import { fromJS } from 'immutable';
import { acknowledge, cleanup, submitForm, submitFormFailed, submitFormSucceed } from '../actions';
import { RESULT, SERVER_ERROR, SUBMIT_SUCCESS, VARIABLES } from '../constants';
import registerReducer from '../reducer';

describe('registerReducer', () => {
  const formName = 'testName';
  const pageName = 'testPage';
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
      [SUBMIT_SUCCESS]: false,
    });
    expect(
      registerReducer(state, submitFormFailed(serverError, pageName, formName))
    ).toEqual(expectedResult);
  });
  it('should set Server success correctly', () => {
    const expectedResult = state.set(formName, {
      [SERVER_ERROR]: '',
      [RESULT]: '',
      [SUBMIT_SUCCESS]: true,
    });
    expect(
      registerReducer(state, submitFormSucceed('', pageName, formName))
    ).toEqual(expectedResult);
  });
  it('should set submitForm correctly', () => {
    const expectedResult = state.set(formName, {
      [SERVER_ERROR]: '',
      [SUBMIT_SUCCESS]: false,
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
