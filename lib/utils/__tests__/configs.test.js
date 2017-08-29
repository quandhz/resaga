import configs from '../configs';
import errors from '../errors';

describe('utils/configs', () => {
  it('to be defined', () => {
    expect(configs).toBeDefined();
    expect(typeof configs.get).toBe('function');
    expect(typeof configs.set).toBe('function');
    expect(typeof configs.delete).toBe('function');
  });
  const key = 'key';
  const value = 'value';
  it('set key value', () => {
    configs.set(key, value);
    expect(configs.get(key)).toBe(value);
  });
  it('set duplicate key value', () => {
    errors.ResagaBreakingError = jest.fn();
    configs.set(key, value);
    configs.set(key, value);
    expect(errors.ResagaBreakingError).toBeCalled();
    expect(configs.get(key)).toBe(value);
  });
  it('page null', () => {
    errors.ResagaError = jest.fn();
    expect(configs.get()).not.toBe(value);
    expect(errors.ResagaError).toBeCalled();
  });
  it('page not found', () => {
    errors.ResagaError = jest.fn();
    expect(configs.get('some_page')).not.toBe(value);
    expect(errors.ResagaError).toBeCalled();
  });
  it('page found', () => {
    errors.ResagaError = jest.fn();
    configs.set(key, value);
    expect(configs.get(key)).toBe(value);
  });
  it('delete key', () => {
    errors.ResagaError = jest.fn();
    configs.set(key, value);
    expect(configs.get(key)).toBe(value);
    configs.delete(key);
    errors.ResagaError = jest.fn();
    expect(configs.get(key)).not.toBe(value);
    expect(errors.ResagaError).toBeCalled();
  });
});
