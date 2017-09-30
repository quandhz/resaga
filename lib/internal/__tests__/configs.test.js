import analyseConfig from '../helpers/analyseConfig';
import errors from '../helpers/errors';

describe('resaga/utils/config', () => {
  it('to be defined', () => {
    expect(analyseConfig).toBeDefined();
    expect(typeof analyseConfig.get).toBe('function');
    expect(typeof analyseConfig.set).toBe('function');
    expect(typeof analyseConfig.delete).toBe('function');
  });
  const key = 'key';
  const value = 'value';
  it('set key value', () => {
    analyseConfig.set(key, value);
    expect(analyseConfig.get(key)).toBe(value);
  });
  it('set duplicate key value', () => {
    errors.breakingError = jest.fn();
    analyseConfig.set(key, value);
    analyseConfig.set(key, value);
    expect(errors.breakingError).toBeCalled();
    expect(analyseConfig.get(key)).toBe(value);
  });
  it('page null', () => {
    errors.error = jest.fn();
    expect(analyseConfig.get()).not.toBe(value);
    expect(errors.error).toBeCalled();
  });
  it('page not found', () => {
    errors.error = jest.fn();
    expect(analyseConfig.get('some_page')).not.toBe(value);
    expect(errors.error).toBeCalled();
  });
  it('page found', () => {
    errors.error = jest.fn();
    analyseConfig.set(key, value);
    expect(analyseConfig.get(key)).toBe(value);
  });
  it('delete key', () => {
    errors.error = jest.fn();
    analyseConfig.set(key, value);
    expect(analyseConfig.get(key)).toBe(value);
    analyseConfig.delete(key);
    errors.error = jest.fn();
    expect(analyseConfig.get(key)).not.toBe(value);
    expect(errors.error).toBeCalled();
  });
});
