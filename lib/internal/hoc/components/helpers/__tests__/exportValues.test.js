import exportValues from '../exportValues';

describe('exportValues()', () => {
  it('should be defined', () => {
    expect(exportValues).toBeDefined();
    expect(typeof exportValues).toBe('function');
  });

  it('should return empty if wrapValue false and isRoot false', () => {
    const internalProps = { configs: {} };
    expect(exportValues(internalProps)).toEqual({});
    expect(exportValues(internalProps, false)).toEqual({});
  });

  it('should return empty if no values and otherValues', () => {
    const internalProps = { values: { reduce: jest.fn(() => ({})) }, otherValues: {} };
    expect(exportValues(internalProps)).toEqual({});
    expect(exportValues(internalProps, false)).toEqual({});
  });

  it('should use default values', () => {
    const internalProps = {
      values: {
        reduce: jest.fn((cb) => {
          cb({});
          return 111;
        }),
      },
    };
    expect(exportValues(internalProps)).toEqual(111);
  });

  it('should return values', () => {
    const internalProps = {
      values: {
        reduce: jest.fn((cb) => {
          cb({}, {});
          return { test: 'testValue' };
        }),
      },
    };
    expect(exportValues(internalProps)).toEqual({ test: 'testValue' });
  });

  it('should return otherValues', () => {
    const internalProps = {
      otherValues: {
        hiii: 'hooo',
      },
    };
    expect(exportValues(internalProps)).toEqual({ hiii: 'hooo' });
  });

  it('should return undefined', () => {
    const internalProps = {
      otherValues: {
        hiii: false,
      },
    };
    expect(exportValues(internalProps)).toEqual({ hiii: false });
  });

  it('should return both values', () => {
    const internalProps = {
      values: {
        reduce: jest.fn(() => ({ test: 'testValue' })),
      },
      otherValues: {
        hiii: 'hooo',
      },
    };
    expect(exportValues(internalProps)).toEqual({
      test: 'testValue',
      hiii: 'hooo',
    });
  });
});
