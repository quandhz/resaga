/* eslint-disable no-console */
import errors from '../errors';

describe('resaga/utils/errors', () => {
  it('to be defined', () => {
    expect(errors).toBeDefined();
    expect(errors.ResagaError).toBeDefined();
    expect(errors.ResagaBreakingError).toBeDefined();
  });
  it('ResagaError', () => {
    console.error = jest.fn();
    errors.ResagaError();
    expect(console.error).toBeCalled();
  });
  it('ResagaWarning', () => {
    console.warn = jest.fn();
    errors.ResagaWarning();
    expect(console.warn).toBeCalled();
  });
  it('ResagaBreakingError', () => {
    console.error = jest.fn();
    errors.ResagaBreakingError();
    expect(console.error).toBeCalled();
  });
});
