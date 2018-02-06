/* eslint-disable redux-saga/yield-effects */
import { takeEvery } from 'redux-saga/effects';
import { handlers } from '../handler';
import analyseConfig from '../internal/helpers/analyseConfig';
import { handleRequest, saga } from '../sagas';
import mocks from './helpers/mock-saga';

describe('Tests sagas', () => {
  describe('saga()', () => {
    const generator = saga();

    it('should fork getWatcher()', () => {
      const expectedYield = takeEvery(analyseConfig.doSubmit, handleRequest);
      expect(generator.next().value).toEqual(expectedYield);
    });
  });


  describe('handleRequest()', () => {
    it('should success', () => {
      const generator = handleRequest(mocks.actions);

      expect(generator.next().value).toEqual(mocks.expectYield);
      expect(generator.next(mocks.result).value).toEqual(mocks.expectSuccess);
    });

    it('should success and NOT dispatch invalid resultHandler', () => {
      const generator = handleRequest(mocks.actions);

      handlers.resultHandler = jest.fn(() => mocks.invalidHandler);

      expect(generator.next().value).toEqual(mocks.expectYield);
      expect(generator.next(mocks.result).value).toEqual(mocks.expectSuccess);
    });

    it('should success and dispatch resultHandler', () => {
      const generator = handleRequest(mocks.actions);

      handlers.resultHandler = jest.fn(() => mocks.handler);

      expect(generator.next().value).toEqual(mocks.expectYield);
      expect(generator.next(mocks.result).value).toEqual(mocks.expectSuccessHandler);
    });

    it('should success and dispatch resultHandler array', () => {
      const generator = handleRequest(mocks.actions);

      handlers.resultHandler = jest.fn(() => mocks.handlerArray);

      expect(generator.next().value).toEqual(mocks.expectYield);
      expect(generator.next(mocks.result).value).toEqual(mocks.expectSuccessArray);
    });

    it('should error', () => {
      const generator = handleRequest(mocks.actions);

      expect(generator.next().value).toEqual(mocks.expectYield);
      expect(generator.throw(mocks.error).value).toEqual(mocks.expectError);
    });

    it('should error and NOT dispatch invalid errorHandler', () => {
      const generator = handleRequest(mocks.actions);

      handlers.errorHandler = jest.fn(() => mocks.invalidHandler);

      expect(generator.next().value).toEqual(mocks.expectYield);
      expect(generator.throw(mocks.error).value).toEqual(mocks.expectError);
    });

    it('should error and dispatch errorHandler', () => {
      const generator = handleRequest(mocks.actions);

      handlers.errorHandler = jest.fn(() => mocks.handler);

      expect(generator.next().value).toEqual(mocks.expectYield);
      expect(generator.throw(mocks.error).value).toEqual(mocks.expectErrorHandler);
    });

    it('should error and dispatch errorHandler array', () => {
      const generator = handleRequest(mocks.actions);

      handlers.errorHandler = jest.fn(() => mocks.handlerArray);

      expect(generator.next().value).toEqual(mocks.expectYield);
      expect(generator.throw(mocks.error).value).toEqual(mocks.expectErrorArray);
    });

    it('should not do anything', () => {
      const generator = handleRequest(mocks.actionOther);
      expect(generator.next().value).toEqual(undefined);
    });
  });


  describe('mock-saga', () => {
    it('onSuccess()', () => {
      const result = mocks.onSuccess();
      expect(result).toBeDefined();
    });

    it('onError()', () => {
      const result = mocks.onError();
      expect(result).toBeDefined();
    });

    it('submit()', () => {
      const result = mocks.submit();
      expect(result).toBeDefined();
    });
  });
});
