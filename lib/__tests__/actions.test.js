import { describe, it } from 'eslint/lib/testers/event-generator-tester';
import {
  submitFormFailed,
  submitFormSucceed,
  submitForm,
  acknowledge,
  cleanup,
  setVariable,
  setVariableWithFunction,
} from '../actions';

import {
  DO_SUBMIT,
  SUBMIT_FAILED,
  SUBMIT_SUCCEED,
  SUBMIT_ACKED,
  HOC_CLEAR,
  REDUX_SET,
  REDUX_SET_FN,
} from '../constants';

const page = 'mockTestPage';

describe('Register Actions', () => {
  describe('register server validation', () => {
    it('submitFormSucceed should return the correct type and success response', () => {
      const fixture = 'data';
      const expectedResult = {
        type: SUBMIT_SUCCEED,
        page,
        payload: fixture,
        result: fixture,
      };
      const actualResult = submitFormSucceed(fixture, fixture, page);
      expect(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      expect(actualResult.page).toEqual(expectedResult.page);
      expect(actualResult.payload).toEqual(fixture);
      expect(actualResult.result).toEqual(expectedResult.result);
    });
    it('submitFormFailed should return the correct type and error', () => {
      const fixture = 'some error';
      const expectedResult = {
        type: SUBMIT_FAILED,
        page,
        error: fixture,
      };
      const actualResult = submitFormFailed(fixture, fixture, page);
      expect(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      expect(actualResult.page).toEqual(expectedResult.page);
      expect(actualResult.payload).toEqual(fixture);
      expect(actualResult.result).toEqual(expectedResult.result);
    });
    it('submitForm should return the correct type', () => {
      const fixture = 'data';
      const expectedResult = {
        type: DO_SUBMIT,
        options: { page },
        data: fixture,
      };
      const actualResult = submitForm(fixture, page);
      expect(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      expect(actualResult.page).toEqual(expectedResult.page);
      expect(actualResult.result).toEqual(expectedResult.result);
    });
    it('cleanup should return the correct type', () => {
      const expectedResult = {
        type: HOC_CLEAR,
        page,
      };
      const actualResult = cleanup(page);
      expect(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      expect(actualResult.page).toEqual(expectedResult.page);
    });
    it('acknowledge should return the correct type', () => {
      const fixture = 'data';
      const expectedResult = {
        type: SUBMIT_ACKED,
        page,
      };
      const actualResult = acknowledge(page, fixture);
      expect(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      expect(actualResult.page).toEqual(expectedResult.page);
      expect(actualResult.formName).toEqual(fixture);
    });
    it('setVariable should return the correct type', () => {
      const key = 'keyyy';
      const value = 'valueee';
      const expectedResult = {
        type: REDUX_SET, page, key, value,
      };
      const actualResult = setVariable(page, key, value);
      expect(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      expect(actualResult.page).toEqual(expectedResult.page);
      expect(actualResult.key).toEqual(key);
      expect(actualResult.value).toEqual(value);
    });
    it('setVariableWithFunction should return the correct type', () => {
      const key = 'keyyy';
      const func = (data) => data;
      const expectedResult = {
        type: REDUX_SET_FN, page, key, func,
      };
      const actualResult = setVariableWithFunction(page, key, func);
      expect(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      expect(actualResult.page).toEqual(expectedResult.page);
      expect(actualResult.key).toEqual(key);
      expect(actualResult.func).toEqual(func);
    });
  });
});
