import {
  beforeSubmitForm,
  submitFormFailed,
  submitFormSucceed,
  submitForm,
  doAcknowledge,
  doCleanup,
  setVariable,
  setVariableWithFunction,
} from '../actions';


describe('Test actions', () => {
  const name = 'mockTestPage';
  const requestName = 'mockRequest';
  const payload = { hi: 'hooo' };
  const options = { configs: { name } };


  describe('beforeSubmitForm()', () => {
    it('pageName defined', () => {
      const action = beforeSubmitForm(name, requestName, payload, options);
      expect(action.name).toBe(name);
      expect(action.requestName).toBe(requestName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
    });
    it('pageName undefined', () => {
      const action = beforeSubmitForm(undefined, requestName, payload, options);
      expect(action.name).toBe(options.configs.name);
      expect(action.requestName).toBe(requestName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
    });
    it('options undefined', () => {
      const action = beforeSubmitForm(name, requestName, payload);
      expect(action.name).toBe(name);
      expect(action.requestName).toBe(requestName);
      expect(action.payload).toBe(payload);
      expect(action.options).toEqual({ configs: {} });
    });
    it('origin true', () => {
      const originOptions = { configs: { name }, origin: true };
      const action = beforeSubmitForm(undefined, requestName, payload, originOptions);
      expect(action.type.indexOf('remotely')).not.toBe(-1);
      expect(action.name).toBe(options.configs.name);
      expect(action.requestName).toBe(requestName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(originOptions);
    });
  });


  describe('submitForm()', () => {
    it('pageName defined', () => {
      const action = submitForm({
        name, requestName, payload, options,
      });
      expect(action.name).toBe(name);
      expect(action.requestName).toBe(requestName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
    });
    it('pageName undefined', () => {
      const action = submitForm({ requestName, payload, options });
      expect(action.name).toBe(options.configs.name);
      expect(action.requestName).toBe(requestName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
    });
    it('options undefined', () => {
      const action = submitForm({
        name, requestName, payload,
      });
      expect(action.name).toBe(name);
      expect(action.requestName).toBe(requestName);
      expect(action.payload).toBe(payload);
      expect(action.options).toEqual({ configs: {} });
    });
  });


  describe('submitFormFailed()', () => {
    it('should return correct object', () => {
      const error = 'something wrong';
      const action = submitFormFailed(error, payload, name, requestName, options);
      expect(action.name).toBe(name);
      expect(action.requestName).toBe(requestName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
      expect(action.error).toBe(error);
    });
  });


  describe('submitFormSucceed()', () => {
    it('should return correct object', () => {
      const result = 'this is result';
      const action = submitFormSucceed(result, payload, name, requestName, options);
      expect(action.name).toBe(name);
      expect(action.requestName).toBe(requestName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
      expect(action.result).toBe(result);
    });
  });


  describe('doAcknowledge()', () => {
    it('should return correct object', () => {
      const action = doAcknowledge(name, requestName);
      expect(action.name).toBe(name);
      expect(action.requestName).toBe(requestName);
    });
  });


  describe('doCleanup()', () => {
    it('should return correct object', () => {
      const action = doCleanup(name);
      expect(action.name).toBe(name);
    });
  });


  describe('setVariable()', () => {
    it('should return correct object', () => {
      const key = 'this key';
      const value = 'this value';
      const action = setVariable([name, key], value);
      expect(action.name).toBe(name);
      expect(action.keyPath).toEqual([name, key]);
      expect(action.value).toBe(value);
    });
  });


  describe('setVariableWithFunction()', () => {
    it('should return correct object', () => {
      const key = 'this key';
      const value = () => 'this value';
      const action = setVariableWithFunction([name, key], value);
      expect(action.name).toBe(name);
      expect(action.keyPath).toEqual([name, key]);
      expect(action.func).toBe(value);
    });
  });
});
