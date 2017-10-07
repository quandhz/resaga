import getValue from '../getValue';

describe('getValue()', () => {
  it('to be defined', () => {
    expect(getValue).toBeDefined();
    expect(typeof getValue).toBe('function');
  });

  it('should return value', () => {
    const key = 'key';
    const value = 'ho';
    const props = { values: { get: () => ({ key, value }) } };
    expect(getValue(props, key)).toBe(value);
  });

  it('should return null', () => {
    const props = { values: { get: () => null } };
    expect(getValue(props, 'some other key')).toBe(undefined);
  });

  it('should return notSetValue', () => {
    const props = { values: { get: () => null } };
    expect(getValue(props, 'some other key', 123)).toBe(123);
  });
});
