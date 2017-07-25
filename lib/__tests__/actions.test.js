import { describe, it } from 'eslint/lib/testers/event-generator-tester';
import {
  submitFormFailed,
  submitFormSucceed,
  submitForm,
  acknowledge,
  cleanup,
} from '../actions';

import {
  DO_SUBMIT,
  SUBMIT_FAILED,
  SUBMIT_SUCCEED,
  SUBMIT_ACKED,
  HOC_CLEAR,
} from '../constants';

const page = 'mockTestPage';

describe('Register Actions', () => {
  describe('register server validation', () => {
    it('submitFormSucceed should return the correct type and success response', () => {
      const fixture = 'data';
      const expectedResult = {
        type: SUBMIT_SUCCEED,
        page,
        result: fixture,
      };
      const actualResult = submitFormSucceed(fixture, page);
      expect(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      expect(actualResult.page).toEqual(expectedResult.page);
      expect(actualResult.result).toEqual(expectedResult.result);
    });
    it('submitFormFailed should return the correct type and error', () => {
      const fixture = 'some error';
      const expectedResult = {
        type: SUBMIT_FAILED,
        page,
        error: fixture,
      };
      const actualResult = submitFormFailed(fixture, page);
      expect(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      expect(actualResult.page).toEqual(expectedResult.page);
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
    it('cleanup should return the correct type', () => {
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
  });
});
