import * as expect from 'expect';
/**
 * Created by quando on 14/7/17.
 */
import { fromJS } from 'immutable';
import { RESULT, SERVER_ERROR, SUBMIT_FAILED, SUBMIT_SUCCEED, SUBMIT_SUCCESS } from '../../constants';
import reducer from '../../reducer';
import test from '../test-helpers';


describe('utils/hoc/onSubmit/utils/test-helpers', () => {
  const mockString = 'this is string';

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
    const expected = reducer(fromJS({}), { formName: mockString, type: SUBMIT_FAILED });
    expect(test.generate.stateError(mockString)).toEqual(expected);
  });
  it('test.generate.stateSuccess', () => {
    const expected = reducer(fromJS({}), { formName: mockString, type: SUBMIT_SUCCEED });
    expect(test.generate.stateSuccess(mockString)).toEqual(expected);
  });
  it('test.generate.stateNeither', () => {
    const expected = reducer(fromJS({}), { formName: mockString, type: SUBMIT_SUCCEED });
    expect(test.generate.stateNeither(mockString)).not.toEqual(expected);
  });
});
