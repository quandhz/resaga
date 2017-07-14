import expect from 'expect';
/**
 * Created by Yang on 8/11/16.
 */
import { fromJS } from 'immutable';
import { acknowledge, cleanup, submitForm, submitFormFailed, submitFormSucceed } from '../actions';
import { RESULT, SERVER_ERROR, SUBMIT_SUCCESS } from '../constants';
import registerReducer from '../reducer';

describe('registerReducer', () => {
  const formName = 'testName';
  const pageName = 'testPage';
  let state;
  beforeEach(() => {
    state = fromJS({});
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
      fromJS({})
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
});
