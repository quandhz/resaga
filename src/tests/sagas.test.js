/**
 * Created by quando on 4/4/17.
 */
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { call, cancel, fork, take } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { makeCallback } from './utils/makeCallback';
import { submitFormFailed, submitFormSucceed } from '../actions';
import { HANDLE_ERROR, HANDLE_SUCCESS, ON_ERROR, ON_SUCCESS, PAGE, SUBMIT } from '../config';
import { handleRequest, saga } from '../sagas';
import { doSubmit } from '../utils/sagas-helpers';

describe('utils/hoc/onSubmit/sagas', () => {
  const onSuccessCallback = (() => ({ type: 'SUCCESS_ACTION' }));
  const onErrorCallback = (() => ({ type: 'ERROR_ACTION' }));
  const mockRes = { res: 'Some result.' };
  const mockErr = { error: 'Some error.' };
  const handleError = (e) => e.error;
  const handleSuccess = (r) => r.res;
  const data = { hi: 'ho' };

  const mockSubmit = () => (mockRes);
  const params = {
    data,
    options: {
      [PAGE]: 'testPage',
      [SUBMIT]: mockSubmit,
      [ON_SUCCESS]: onSuccessCallback,
      [ON_ERROR]: onErrorCallback,
      [HANDLE_ERROR]: handleError,
      [HANDLE_SUCCESS]: handleSuccess,
    },
    formName: 'testForm',
  };


  describe('saga()', () => {
    const generator = saga();

    it('should fork getWatcher()', () => {
      const expectedYield = fork(takeLatest, doSubmit, handleRequest);
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

  describe('handleRequest() with minimum params - promise success', () => {
    const minParams = {
      data: {},
      options: {
        [PAGE]: 'testPage',
        [SUBMIT]: mockSubmit,
      },
      formName: 'testForm',
    };
    const generator = handleRequest(minParams);

    it('should call submit with data', () => {
      const expectedYield = call(mockSubmit, minParams.data);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should return onSuccess', () => {
      const expectedYield = makeCallback(submitFormSucceed, onSuccessCallback, mockRes, 'testPage', 'testForm');
      expect(generator.next(mockRes).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() with minimum params - promise fail', () => {
    const minParams = {
      data: {},
      options: {
        [PAGE]: 'testPage',
        [SUBMIT]: mockSubmit,
      },
      formName: 'testForm',
    };
    const generator = handleRequest(minParams);

    it('should call submit with data', () => {
      const expectedYield = call(mockSubmit, minParams.data);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should throw onError', () => {
      const expectedYield = makeCallback(submitFormFailed, onErrorCallback, mockErr, 'testPage', 'testForm');
      expect(generator.throw(mockErr).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() with submit as object params - promise fail', () => {
    const formName = 'testForm';
    const minParams = {
      data: {},
      options: {
        [PAGE]: 'testPage',
        [SUBMIT]: {
          [formName]: mockSubmit,
        },
      },
      formName,
    };
    const generator = handleRequest(minParams);

    it('should call submit with data', () => {
      const expectedYield = call(mockSubmit, minParams.data);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should throw onError', () => {
      const expectedYield = makeCallback(submitFormFailed, onErrorCallback, mockErr, 'testPage', formName);
      expect(generator.throw(mockErr).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() - promise success', () => {
    const generator = handleRequest(params);

    it('should call submit with data', () => {
      const expectedYield = call(mockSubmit, data);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should callback onSuccess', () => {
      const expectedYield = makeCallback(submitFormSucceed, onSuccessCallback, handleSuccess(mockRes), 'testPage', 'testForm');
      expect(generator.next(mockRes).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() - promise fail', () => {
    const generator = handleRequest(params);

    it('should call submit with data', () => {
      const expectedYield = call(mockSubmit, data);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should throw onError', () => {
      const expectedYield = makeCallback(submitFormFailed, onErrorCallback, handleError(mockErr), 'testPage', 'testForm');
      expect(generator.throw(mockErr).value).toEqual(expectedYield);
    });
  });
});
