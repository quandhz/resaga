import {
  handlers, setResultHandler, setErrorHandler, isErrorHandlerSet, isResultHandlerSet,
} from '../handler';

describe('Test Handlers', () => {
  describe('isErrorHandlerSet', () => {
    it('should return false', () => {
      handlers.errorHandler = 123;
      expect(isErrorHandlerSet()).toBe(false);
    });

    it('should isErrorHandlerSet', () => {
      handlers.errorHandler = () => 123;
      expect(isErrorHandlerSet()).toBe(true);
    });
  });


  describe('isResultHandlerSet', () => {
    it('should return false', () => {
      handlers.resultHandler = 123;
      expect(isResultHandlerSet()).toBe(false);
    });

    it('should isResultHandlerSet', () => {
      handlers.resultHandler = () => 123;
      expect(isResultHandlerSet()).toBe(true);
    });
  });


  describe('setResultHandler', () => {
    it('should throw error', () => {
      let error;

      try {
        setResultHandler(123);
      } catch (err) {
        error = err;
      }

      expect(error).toMatchSnapshot();
    });

    it('should setResultHandler', () => {
      const handler = () => 123;
      setResultHandler(handler);
      expect(typeof handlers.resultHandler).toBe('function');
      expect(handlers.resultHandler()).toBe(123);
    });
  });


  describe('setErrorHandler', () => {
    it('should throw error', () => {
      let error;

      try {
        setErrorHandler(123);
      } catch (err) {
        error = err;
      }

      expect(error).toMatchSnapshot();
    });

    it('should setErrorHandler', () => {
      const handler = () => 123;
      setErrorHandler(handler);
      expect(typeof handlers.errorHandler).toBe('function');
      expect(handlers.errorHandler()).toBe(123);
    });
  });
});
