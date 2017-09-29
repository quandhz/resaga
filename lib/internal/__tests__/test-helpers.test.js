import { fromJS } from 'immutable';
import { RESULT, SERVER_ERROR, SUBMIT_FAILED, SUBMIT_SUCCEED, SUBMIT_SUCCESS, VARIABLES } from '../constants';
import reducer from '../../reducer';
import test from '../helpers/tests';


describe('resaga/utils/test-helpers', () => {
  const mockString = 'this is string';
  const state = fromJS({ [VARIABLES]: {} });

  it('to be defined', () => {
    expect(test).toBeDefined();
    expect(test.generate).toBeDefined();
    expect(test.generate.propsError).toBeDefined();
    expect(test.generate.propsSuccess).toBeDefined();
    expect(test.generate.propsNeither).toBeDefined();
    expect(test.generate.stateError).toBeDefined();
    expect(test.generate.stateSuccess).toBeDefined();
    expect(test.generate.stateNeither).toBeDefined();
  });
  it('test.generate.propsError', () => {
    const expected = { [SERVER_ERROR]: mockString, [SUBMIT_SUCCESS]: false };
    expect(test.generate.propsError(mockString)).toEqual(expected);
  });
  it('test.generate.propsSuccess', () => {
    const expected = { [SERVER_ERROR]: '', [SUBMIT_SUCCESS]: true, [RESULT]: mockString };
    expect(test.generate.propsSuccess(mockString)).toEqual(expected);
  });
  it('test.generate.propsNeither', () => {
    const expected = { [SERVER_ERROR]: '', [SUBMIT_SUCCESS]: false };
    expect(test.generate.propsNeither()).toEqual(expected);
  });
  it('test.generate.stateError', () => {
    const expected = reducer(state, { requestName: mockString, type: SUBMIT_FAILED });
    expect(test.generate.stateError(mockString)).toEqual(expected);
  });
  it('test.generate.stateSuccess', () => {
    const expected = reducer(state, { requestName: mockString, type: SUBMIT_SUCCEED });
    expect(test.generate.stateSuccess(mockString)).toEqual(expected);
  });
  it('test.generate.stateNeither', () => {
    const expected = reducer(state, { requestName: mockString, type: SUBMIT_SUCCEED });
    expect(test.generate.stateNeither(mockString)).not.toEqual(expected);
  });
});
