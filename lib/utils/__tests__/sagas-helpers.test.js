import { HANDLE_ERROR, HANDLE_SUCCESS } from '../../internal/config';
import { DO_SUBMIT, HOC_CLEAR } from '../../internal/constants';
import { analyse, doSubmit } from '../sagas-helpers';

describe('resaga/utils/sagas-helpers', () => {
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
    const requestName = 'testForm';
    const mock = {
      [HANDLE_SUCCESS]: { [requestName]: 'success' },
      [HANDLE_ERROR]: { [requestName]: 'error' },
    };
    it('should return correct values', () => {
      const res = analyse(mock, requestName);
      expect(res.postProcess).toBe('success');
      expect(res.postProcessError).toBe('error');
    });
  });
});
