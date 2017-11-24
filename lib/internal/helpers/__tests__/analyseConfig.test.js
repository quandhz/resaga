import analyseConfig from '../analyseConfig';
import errors from '../errors';
import { HANDLE_ERROR, HANDLE_SUCCESS } from '../../../config';
import { DO_SUBMIT, HOC_CLEAR } from '../../constants';


describe('analyseConfig', () => {
  describe('isResagaStore()', () => {
    it('should return false', () => {
      expect(analyseConfig.isResagaStore('hi')).toBe(false);
    });

    it('should return true', () => {
      analyseConfig.set('hi', 'hello');
      expect(analyseConfig.isResagaStore('hi')).toBe(true);
    });
  });


  describe('setConfig()', () => {
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
  });


  describe('checkConfig()', () => {
    const requestName = 'fetchSomething';
    const configs = { requests: { [requestName]: 123 } };

    it('should return configs', () => {
      expect(analyseConfig.check(configs, 'someName', requestName)).toBe(configs);
    });

    it('should throw error if configs not given', () => {
      try {
        analyseConfig.check();
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it('should throw error if configs.requests not given', () => {
      try {
        analyseConfig.check({ hi: 'ho' });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it('should throw error if requestName not match', () => {
      try {
        analyseConfig.check(configs, 'someName', 'someOtherRequest');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
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
      requests: { [requestName]: 'something' },
      onSuccess: { [requestName]: 'something' },
      onError: { [requestName]: 'something' },
      [HANDLE_SUCCESS]: { [requestName]: 'success' },
      [HANDLE_ERROR]: { [requestName]: 'error' },
    };

    it('should return default values', () => {
      const res = analyseConfig.analyse({ processResult: {}, processError: {} }, requestName);
      expect(res.postProcess(123)).toBe(123);
      expect(res.postProcessError(321)).toBe(321);
    });

    it('should return correct values', () => {
      const res = analyseConfig.analyse(mock, requestName);
      expect(res.postProcess).toBe('success');
      expect(res.postProcessError).toBe('error');
    });

    it('onSuccess is function', () => {
      const res = analyseConfig.analyse(mock, requestName);
      expect(res.postProcess).toBe('success');
      expect(res.postProcessError).toBe('error');
    });

    it('should return default values', () => {
      const res = analyseConfig.analyse({}, requestName);
      expect(res.postProcess).toBeDefined();
      expect(res.postProcess(1)).toBe(1);
      expect(res.postProcessError).toBeDefined();
      expect(res.postProcessError(1)).toBe(1);
    });
  });


  describe('analyseConfigs()', () => {
    beforeEach(() => {
      errors.warning = jest.fn();
    });
    afterEach(() => jest.clearAllMocks());


    it('config.page', () => {
      const page = 'SomePage';
      const configs = { page };
      const res = analyseConfig.analyseConfigs(configs);
      expect(res.name).toBe(page);
      expect(res.page).not.toBeDefined();
    });


    it('config.submit', () => {
      const submit = 'SomePage';
      const configs = { submit };
      const res = analyseConfig.analyseConfigs(configs);
      expect(res.requests).toBe(submit);
      expect(res.submit).not.toBeDefined();
    });
  });
});
