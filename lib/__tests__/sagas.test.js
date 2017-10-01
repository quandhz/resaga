import { LOCATION_CHANGE } from 'react-router-redux';
import { cancel, fork, take, takeEvery } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
import analyseConfig from '../internal/helpers/analyseConfig';
import { handleRequest, saga } from '../sagas';
import mocks from './helpers/mock-saga';

describe('Tests sagas', () => {
  describe('saga()', () => {
    const generator = saga();

    it('should fork getWatcher()', () => {
      const expectedYield = fork(takeEvery, analyseConfig.doSubmit, handleRequest);
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


  describe('handleRequest()', () => {
    it('should success', () => {
      const generator = handleRequest(mocks.actions);

      expect(generator.next().value).toEqual(mocks.expectYield);
      expect(generator.next(mocks.result).value).toEqual(mocks.expectSuccess);
    });

    it('should error', () => {
      const generator = handleRequest(mocks.actions);

      expect(generator.next().value).toEqual(mocks.expectYield);
      expect(generator.throw(mocks.error).value).toEqual(mocks.expectError);
    });

    it('should not do anything', () => {
      const generator = handleRequest(mocks.actionOther);
      expect(generator.next().value).toEqual(undefined);
    });
  });
});
