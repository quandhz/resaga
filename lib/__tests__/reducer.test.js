import helpers from '../internal/helpers';
import reducer, { reducers } from '../reducer';
import mocks from './helpers/mock-reducer';

describe('Test Reducer', () => {
  let state;

  beforeEach(() => {
    state = mocks.initialState;
    helpers.config.isResagaStore = jest.fn((name) => !!name);
  });
  afterEach(() => jest.clearAllMocks());

  it('should exist', () => {
    expect(reducers).toBeDefined();
    expect(typeof reducers).toBe('function');
  });


  it('BEFORE_DISPATCH', () => {
    expect(reducers(state, mocks.beforeDispatch)).toEqual(mocks.expectBeforeDispatch(state));
  });


  it('DO_SUBMIT', () => {
    expect(reducers(state, mocks.doSubmit)).toEqual(mocks.expectDoSubmit(state));
  });


  it('SUBMIT_FAILED', () => {
    expect(reducers(state, mocks.submitFailed)).toEqual(mocks.expectSubmitFailed(state));
  });


  it('SUBMIT_SUCCEED', () => {
    expect(reducers(state, mocks.submitSuccess)).toEqual(mocks.expectSubmitSuccess(state));
  });


  it('SUBMIT_ACKED', () => {
    expect(reducers(state, mocks.submitAcked)).toEqual(mocks.expectSubmitAcked(state));
  });


  it('HOC_CLEAR', () => {
    expect(reducers(state, mocks.clear)).toEqual(mocks.expectClear());
  });


  it('REDUX_SET resaga store', () => {
    expect(reducers(state, { ...mocks.setValueResagaStore })).toEqual(mocks.expectSetValue(state));
  });


  it('REDUX_SET normal store', () => {
    expect(reducers(state, { ...mocks.setValue })).toEqual(mocks.expectSetValueNormal(state));
  });


  it('REDUX_SET normal store - nested', () => {
    expect(reducers(state, { ...mocks.setValueNested })).toEqual(mocks.expectSetValueNormalNested(state));
  });


  it('REDUX_SET_FN resaga store', () => {
    expect(reducers(state, { ...mocks.setFunctionResagaStore })).toEqual(mocks.expectSetFunction(state));
  });


  it('REDUX_SET_FN normal store', () => {
    expect(reducers(state, { ...mocks.setFunction })).toEqual(mocks.expectSetFunctionNormal(state));
  });


  it('REDUX_SET_FN normal store - nested', () => {
    expect(reducers(mocks.nestedValueState, { ...mocks.setFunctionNested })).toEqual(mocks.expectSetFunctionNormalNested(mocks.nestedValueState));
  });


  it('DEFAULT', () => {
    expect(reducers(state, mocks.otherAction)).toEqual(mocks.expectOtherAction(state));
  });


  it('DEFAULT state undefined', () => {
    expect(reducers(undefined, mocks.otherAction)).toEqual(mocks.expectOtherAction());
  });


  describe('Test Reducer', () => {
    afterEach(() => jest.clearAllMocks());
    it('should call helper.reducer.wrapReducer', () => {
      helpers.reducer.wrapReducer = jest.fn();
      expect(reducer).toBeDefined();
      expect(typeof reducer).toBe('function');
      reducer();
      expect(helpers.reducer.wrapReducer).toBeCalled();
    });
  });

  describe('getValue', () => {
    it('should get from rest', () => {

    });
  });
});
