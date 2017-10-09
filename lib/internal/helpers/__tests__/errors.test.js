/* eslint-disable no-console */
import errors from '../errors';

describe('resaga/utils/errors', () => {
  it('to be defined', () => {
    expect(errors).toBeDefined();
    expect(errors.error).toBeDefined();
    expect(errors.breakingError).toBeDefined();
  });

  it('error', () => {
    console.error = jest.fn();
    errors.error();
    expect(console.error).toBeCalled();
  });

  it('warning', () => {
    console.warn = jest.fn();
    errors.warning();
    expect(console.warn).toBeCalled();
  });

  it('breakingError', () => {
    console.error = jest.fn();
    errors.breakingError();
    expect(console.error).toBeCalled();
  });
});
