import { reducers } from '../reducer';
import mocks from './helpers/mock-reducer';

describe('Test Reducer', () => {
  let state;

  beforeEach(() => (state = mocks.initialState));

  it('should exist', () => {
    expect(reducers).toBeDefined();
    expect(typeof reducers).toBe('function');
  });


  it('BEFORE_DISPATCH', () => {
    expect(
      reducers(state, mocks.beforeDispatch)
    ).toEqual(
      mocks.expectBeforeDispatch(state)
    );
  });


  it('DO_SUBMIT', () => {
    expect(
      reducers(state, mocks.doSubmit)
    ).toEqual(
      mocks.expectDoSubmit(state)
    );
  });


  it('SUBMIT_FAILED', () => {
    expect(
      reducers(state, mocks.submitFailed)
    ).toEqual(
      mocks.expectSubmitFailed(state)
    );
  });


  it('SUBMIT_SUCCEED', () => {
    expect(
      reducers(state, mocks.submitSuccess)
    ).toEqual(
      mocks.expectSubmitSuccess(state)
    );
  });


  it('SUBMIT_ACKED', () => {
    expect(
      reducers(state, mocks.submitAcked)
    ).toEqual(
      mocks.expectSubmitAcked(state)
    );
  });


  it('HOC_CLEAR', () => {
    expect(
      reducers(state, mocks.clear)
    ).toEqual(
      mocks.expectClear()
    );
  });


  it('REDUX_SET', () => {
    expect(
      reducers(state, mocks.setValue)
    ).toEqual(
      mocks.expectSetValue(state)
    );
  });


  it('REDUX_SET_FN', () => {
    expect(
      reducers(state, mocks.setFunction)
    ).toEqual(
      mocks.expectSetFunction(state)
    );
  });


  it('DEFAULT', () => {
    expect(
      reducers(state, mocks.otherAction)
    ).toEqual(
      mocks.expectOtherAction(state)
    );
  });


  it('DEFAULT state undefined', () => {
    expect(
      reducers(undefined, mocks.otherAction)
    ).toEqual(
      mocks.expectOtherAction()
    );
  });
});
