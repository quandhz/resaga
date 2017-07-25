import { HANDLE_ERROR, HANDLE_SUCCESS } from '../../config';
import { DO_SUBMIT, HOC_CLEAR } from '../../constants';
import { analyse, doSubmit } from '../sagas-helpers';

describe('utils/hoc/onSubmit/utils/sagas-helpers', () => {
  describe('doSubmit()', () => {
    it('should return true', () => {
      const action = { type: `${DO_SUBMIT}::something` };
      expect(doSubmit(action)).toBe(true);
    });
    it('should return false', () => {
      const action = { type: `${HOC_CLEAR}::something` };
      expect(doSubmit(action)).toBe(false);
    });
  });
  describe('analyse()', () => {
    const formName = 'testForm';
    const mock = {
      [HANDLE_SUCCESS]: { [formName]: 'success' },
      [HANDLE_ERROR]: { [formName]: 'error' },
    };
    it('should return correct values', () => {
      const res = analyse(mock, formName);
      expect(res.postProcess).toBe('success');
      expect(res.postProcessError).toBe('error');
    });
  });
});
