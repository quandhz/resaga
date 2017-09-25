import { LOCATION_CHANGE } from 'react-router-redux';
import { call, cancel, fork, take, takeEvery } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
import { submitFormFailed, submitFormSucceed } from '../../internal/actions';
import { HANDLE_ERROR, HANDLE_SUCCESS, ON_ERROR, ON_SUCCESS, SUBMIT } from '../../internal/config';
import { handleRequest, saga } from '../../internal/sagas';
import { makeCallback } from '../../utils/makeCallback';
import { doSubmit } from '../../utils/sagas-helpers';

describe('resaga/sagas', () => {
  const onSuccessCallback = (() => ({ type: 'SUCCESS_ACTION' }));
  const onErrorCallback = (() => ({ type: 'ERROR_ACTION' }));
  const mockRes = { res: 'Some result.' };
  const mockErr = { error: 'Some error.' };
  const handleError = (e) => e.error;
  const handleSuccess = (r) => r.res;
  const payload = { hi: 'ho' };

  const mockSubmit = () => (mockRes);
  const params = {
    name: 'testPage',
    formName: 'testForm',
    payload,
    options: {
      configs: {
        name: 'testPage',
        [SUBMIT]: mockSubmit,
        [ON_SUCCESS]: onSuccessCallback,
        [ON_ERROR]: onErrorCallback,
        [HANDLE_ERROR]: handleError,
        [HANDLE_SUCCESS]: handleSuccess,
      },
    },
  };


  describe('saga()', () => {
    const generator = saga();

    it('should fork getWatcher()', () => {
      const expectedYield = fork(takeEvery, doSubmit, handleRequest);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should cancel on LOCATION_CHANGE action', () => {
      const mockTask = createMockTask();
      // take LOCATION_CHANGE
      const expectedTakeYield = take(LOCATION_CHANGE);
      expect(generator.next(mockTask).value).toEqual(expectedTakeYield);
      // cancel
      const expectedCancelYield = cancel(mockTask);
      expect(generator.next().value).toEqual(expectedCancelYield);
    });
  });

  const minParams = {
    name: 'testPage',
    formName: 'testForm',
    payload: {},
    options: {
      configs: {
        name: 'testPage',
        [SUBMIT]: mockSubmit,
      },
    },
  };
  describe('handleRequest() with minimum params - promise success', () => {
    const generator = handleRequest(minParams);

    it('should call submit with payload', () => {
      const expectedYield = call(mockSubmit, minParams.payload);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should return onSuccess', () => {
      const expectedYield = makeCallback(submitFormSucceed, onSuccessCallback, mockRes, minParams.payload, minParams.name, minParams.formName, minParams.options);
      expect(generator.next(mockRes).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() with minimum params - promise fail', () => {
    const generator = handleRequest(minParams);

    it('should call submit with payload', () => {
      const expectedYield = call(mockSubmit, minParams.payload);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should throw onError', () => {
      const expectedYield = makeCallback(submitFormFailed, onErrorCallback, mockErr, minParams.payload, minParams.name, minParams.formName, minParams.options);
      expect(generator.throw(mockErr).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() with minimum params - different page', () => {
    const otherParams = {
      name: 'testOtherPage',
      formName: 'testForm',
      payload: {},
      options: {
        configs: {
          name: 'testPage',
          [SUBMIT]: mockSubmit,
        },
      },
    };
    const generator = handleRequest(otherParams);

    it('should call submit with payload', () => {
      expect(generator.next().value).toEqual(undefined); // do nothing
    });
  });

  describe('handleRequest() with submit as object params - promise fail', () => {
    const formName = 'testForm';
    const objectParams = {
      name: 'testPage',
      formName,
      payload: {},
      options: {
        configs: {
          name: 'testPage',
          [SUBMIT]: {
            [formName]: mockSubmit,
          },
        },
      },
    };
    const generator = handleRequest(objectParams);

    it('should call submit with payload - with page', () => {
      const expectedYield = call(mockSubmit, objectParams.payload);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should throw onError', () => {
      const expectedYield = makeCallback(submitFormFailed, onErrorCallback, mockErr, objectParams.payload, objectParams.name, objectParams.formName, objectParams.options);
      expect(generator.throw(mockErr).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() - promise success', () => {
    const generator = handleRequest(params);

    it('should call submit with payload', () => {
      const expectedYield = call(mockSubmit, payload);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should callback onSuccess', () => {
      const expectedYield = makeCallback(submitFormSucceed, onSuccessCallback, handleSuccess(mockRes), params.payload, params.name, params.formName, params.options);
      expect(generator.next(mockRes).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() - promise fail', () => {
    const generator = handleRequest(params);

    it('should call submit with payload', () => {
      const expectedYield = call(mockSubmit, payload);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should throw onError', () => {
      const expectedYield = makeCallback(submitFormFailed, onErrorCallback, handleError(mockErr), params.payload, params.name, params.formName, params.options);
      expect(generator.throw(mockErr).value).toEqual(expectedYield);
    });
  });
});
