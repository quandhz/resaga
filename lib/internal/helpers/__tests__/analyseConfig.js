import analyseConfig from '../analyseConfig';
import errors from '../errors';
import { HANDLE_ERROR, HANDLE_SUCCESS } from '../../../config';
import { DO_SUBMIT, HOC_CLEAR } from '../../constants';

describe('analyseConfig', () => {
  it('to be defined', () => {
    expect(analyseConfig).toBeDefined();
    expect(typeof analyseConfig.get).toBe('function');
    expect(typeof analyseConfig.set).toBe('function');
    expect(typeof analyseConfig.delete).toBe('function');
  });
  const key = 'key';
  const value = { name: key, requests: { [key]: 'hi' } };
  it('set key value', () => {
    analyseConfig.set(key, value);
    expect(analyseConfig.get(key)).toBe(value);
  });
  it('set duplicate key value', () => {
    errors.breakingError = jest.fn();
    analyseConfig.set(key, value);
    analyseConfig.set(key, value);
    expect(errors.breakingError).toBeCalled();
    expect(analyseConfig.get(key)).toBe(value);
  });
  it('page null', () => {
    errors.error = jest.fn();
    expect(analyseConfig.get()).not.toBe(value);
    expect(errors.error).toBeCalled();
  });
  it('page not found', () => {
    try {
      expect(analyseConfig.get('some_page')).not.toBe(value);
    } catch (err) {
      expect(err);
    }
  });
  it('page found', () => {
    errors.error = jest.fn();
    analyseConfig.set(key, value);
    expect(analyseConfig.get(key)).toBe(value);
  });
  it('delete key', () => {
    errors.error = jest.fn();
    analyseConfig.set(key, value);
    expect(analyseConfig.get(key)).toBe(value);
    analyseConfig.delete(key);
    try {
      expect(analyseConfig.get(key)).not.toBe(value);
    } catch (err) {
      expect(err);
    }
  });

  describe('doSubmit()', () => {
    it('should return true', () => {
      const action = { type: `${DO_SUBMIT}::something` };
      expect(analyseConfig.doSubmit(action)).toBe(true);
    });

    it('should return false', () => {
      const action = { type: `${HOC_CLEAR}::something` };
      expect(analyseConfig.doSubmit(action)).toBe(false);
    });
  });


  describe('analyse()', () => {
    const requestName = 'testForm';
    const mock = {
      [HANDLE_SUCCESS]: { [requestName]: 'success' },
      [HANDLE_ERROR]: { [requestName]: 'error' },
    };

    it('should return correct values', () => {
      const res = analyseConfig.analyse(mock, requestName);
      expect(res.postProcess).toBe('success');
      expect(res.postProcessError).toBe('error');
    });
  });
});
