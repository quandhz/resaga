import isLoading from '../isLoading';

describe('isLoading()', () => {
  const key = 'fetchSomething';
  const props = {
    internalProps: {
      configs: { name: 'someName' },
    },
    someName: {
      get: () => ({ willLoad: true }),
    },
  };

  it('to be defined', () => {
    expect(isLoading).toBeDefined();
    expect(typeof isLoading).toBe('function');
  });


  it('willLoad true', () => {
    expect(isLoading(key, props)).toBe(true);
  });


  it('isLoading true', () => {
    props.someName.get = () => ({ isLoading: true });
    expect(isLoading(key, props)).toBe(true);
  });


  it('willLoad false isLoading false', () => {
    props.someName.get = () => ({ isLoading: false, willLoad: false });
    expect(isLoading(key, props)).toBe(false);
  });


  it('no store', () => {
    props.someName = false;
    expect(isLoading(key, props)).toBe(false);
  });


  it('store.get not a function', () => {
    props.someName = { get: 'get' };
    expect(isLoading(key, props)).toBe(false);
  });


  it('no key', () => {
    props.someName.get = () => false;
    expect(isLoading(key, props)).toBe(false);
  });
});
