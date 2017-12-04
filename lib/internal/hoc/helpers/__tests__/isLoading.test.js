import isLoading from '../isLoading';

describe('isLoading()', () => {
  const key = 'fetchSomething';
  const internalProps = {
    configs: { name: 'someName' },
  };
  const props = {
    someName: {
      get: () => ({ willLoad: true }),
    },
  };

  it('to be defined', () => {
    expect(isLoading).toBeDefined();
    expect(typeof isLoading).toBe('function');
  });


  it('willLoad true', () => {
    expect(isLoading(internalProps, props, key)).toBe(true);
  });


  it('isLoading true', () => {
    props.someName.get = () => ({ isLoading: true });
    expect(isLoading(internalProps, props, key)).toBe(true);
  });


  it('willLoad false isLoading false', () => {
    props.someName.get = () => ({ isLoading: false, willLoad: false });
    expect(isLoading(internalProps, props, key)).toBe(false);
  });


  it('no store', () => {
    props.someName = false;
    expect(isLoading(internalProps, props, key)).toBe(false);
  });


  it('store.get not a function', () => {
    props.someName = { get: 'get' };
    expect(isLoading(internalProps, props, key)).toBe(false);
  });


  it('no key', () => {
    props.someName.get = () => false;
    expect(isLoading(internalProps, props, key)).toBe(false);
  });
});
