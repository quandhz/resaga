import subscribeValue from '../subscribeValue';

jest.mock('../selectOwnStore', () => ({
  __esModule: true, // this property makes it work
  default: jest.fn(() => () => ({ hi: 1 })),
}));

jest.mock('../selectConfigValue', () => ({
  __esModule: true, // this property makes it work
  default: jest.fn(() => () => ({ ho: 2 })),
  selectIsLoading: jest.fn(() => () => ({ he: 3 })),
}));

describe('subscribeValue()', () => {
  it('to be defined', () => {
    expect(subscribeValue).toBeDefined();
  });

  it('configs not defined properly', () => {
    expect(subscribeValue()()()).toBe(undefined);
  });

  it('return selectOwnStore', () => {
    expect(subscribeValue({ name: 'hi' })()).toEqual({ hi: 1 });
  });

  it('return selectConfigValue', () => {
    expect(subscribeValue({ value: {} })()).toEqual({ ho: 2 });
  });

  it('return selectIsLoading', () => {
    expect(subscribeValue({ isLoading: {} })()).toEqual({ he: 3 });
  });

  it('return both', () => {
    expect(subscribeValue({ name: 'hi', value: {} })()).toEqual({ hi: 1, ho: 2 });
  });
});
