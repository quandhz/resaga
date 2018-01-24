
export const handlers = {
  errorHandler: null,
  resultHandler: null,
};

export const isErrorHandlerSet = () => typeof handlers.errorHandler === 'function';
export const isResultHandlerSet = () => typeof handlers.resultHandler === 'function';

export const setErrorHandler = ((handler) => {
  if (typeof handler !== 'function') {
    throw new SyntaxError('resaga expects handler to be a function (i.e. const handler = (error, payload) => {...}). Received: ', typeof handler !== 'function');
  }

  handlers.errorHandler = handler;
});

export const setResultHandler = ((handler) => {
  if (typeof handler !== 'function') {
    throw new SyntaxError('resaga expects handler to be a function (i.e. const handler = (error, payload) => {...}). Received: ', typeof handler !== 'function');
  }

  handlers.resultHandler = handler;
});
