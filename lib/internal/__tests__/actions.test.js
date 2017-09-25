import { describe, it } from 'eslint/lib/testers/event-generator-tester';
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


describe('resaga actions', () => {
  const name = 'mockTestPage';
  const formName = 'mockRequest';
  const payload = { hi: 'hooo' };
  const options = { configs: { name } };


  describe('beforeSubmitForm()', () => {
    it('pageName defined', () => {
      const action = beforeSubmitForm(name, formName, payload, options);
      expect(action.name).toBe(name);
      expect(action.formName).toBe(formName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
    });
    it('pageName undefined', () => {
      const action = beforeSubmitForm(undefined, formName, payload, options);
      expect(action.name).toBe(options.configs.name);
      expect(action.formName).toBe(formName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
    });
  });


  describe('submitForm()', () => {
    it('pageName defined', () => {
      const action = submitForm(name, formName, payload, options);
      expect(action.name).toBe(name);
      expect(action.formName).toBe(formName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
    });
    it('pageName undefined', () => {
      const action = submitForm(undefined, formName, payload, options);
      expect(action.name).toBe(options.configs.name);
      expect(action.formName).toBe(formName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
    });
  });


  describe('submitFormFailed()', () => {
    it('should return correct object', () => {
      const error = 'something wrong';
      const action = submitFormFailed(name, formName, payload, options, error);
      expect(action.name).toBe(name);
      expect(action.formName).toBe(formName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
      expect(action.error).toBe(error);
    });
  });


  describe('submitFormSucceed()', () => {
    it('should return correct object', () => {
      const result = 'this is result';
      const action = submitFormSucceed(name, formName, payload, options, result);
      expect(action.name).toBe(name);
      expect(action.formName).toBe(formName);
      expect(action.payload).toBe(payload);
      expect(action.options).toBe(options);
      expect(action.result).toBe(result);
    });
  });


  describe('doAcknowledge()', () => {
    it('should return correct object', () => {
      const action = doAcknowledge(name, formName);
      expect(action.name).toBe(name);
      expect(action.formName).toBe(formName);
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
      const action = setVariable(name, key, value);
      expect(action.name).toBe(name);
      expect(action.key).toBe(key);
      expect(action.value).toBe(value);
    });
  });


  describe('setVariableWithFunction()', () => {
    it('should return correct object', () => {
      const key = 'this key';
      const value = () => 'this value';
      const action = setVariableWithFunction(name, key, value);
      expect(action.name).toBe(name);
      expect(action.key).toBe(key);
      expect(action.func).toBe(value);
    });
  });
});
