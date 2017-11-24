import helpers from '../index';
import getValue from '../getValue';

describe('getValue()', () => {
  afterEach(() => jest.clearAllMocks());

  it('to be defined', () => {
    expect(getValue).toBeDefined();
    expect(typeof getValue).toBe('function');
  });

  it('should return value', () => {
    const key = 'key';
    const value = 'ho';
    const values = { get: () => value };
    helpers.getValuesFromProps = jest.fn(() => values);
    expect(getValue({}, key)).toBe(value);
  });

  it('not found', () => {
    helpers.getValuesFromProps = jest.fn(() => undefined);
    expect(getValue({}, 'some other key')).toBe(undefined);
  });

  it('should return null', () => {
    const values = { get: () => null };
    helpers.getValuesFromProps = jest.fn(() => values);
    expect(getValue({}, 'some other key')).toBe(null);
  });

  it('should return notSetValue', () => {
    const values = { get: () => 123 };
    helpers.getValuesFromProps = jest.fn(() => values);
    expect(getValue({}, 'some other key', 123)).toBe(123);
  });
});
