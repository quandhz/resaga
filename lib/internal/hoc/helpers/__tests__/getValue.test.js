import getValue from '../getValue';

describe('getValue()', () => {
  it('to be defined', () => {
    expect(getValue).toBeDefined();
    expect(typeof getValue).toBe('function');
  });

  it('should return value', () => {
    expect(getValue({ hi: 123 }, 'hi')).toBe(123);
  });

  it('not found', () => {
    expect(getValue({}, 'some other key')).toBe(undefined);
  });

  it('should return null', () => {
    expect(getValue({ hi: null }, 'hi')).toBe(null);
  });

  it('should return notSetValue', () => {
    expect(getValue({ hi: 123 }, 'some other key', 456)).toBe(456);
  });
});
