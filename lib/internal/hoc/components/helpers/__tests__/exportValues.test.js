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
    const props = {
      internalProps: {
        values: {
          reduce: jest.fn((cb) => {
            cb({});
            return 111;
          }),
        },
      },
    };
    expect(exportValues(props)).toEqual(111);
  });

  it('should return values', () => {
    const props = {
      internalProps: {
        values: {
          reduce: jest.fn((cb) => {
            cb({}, {});
            return { test: 'testValue' };
          }),
        },
      },
    };
    expect(exportValues(props)).toEqual({ test: 'testValue' });
  });

  it('should return otherValues', () => {
    const props = {
      internalProps: {
        otherValues: {
          hiii: 'hooo',
        },
      },
    };
    expect(exportValues(props)).toEqual({ hiii: 'hooo' });
  });

  it('should return undefined', () => {
    const props = {
      internalProps: {
        otherValues: {
          hiii: false,
        },
      },
    };
    expect(exportValues(props)).toEqual({ hiii: false });
  });

  it('should return both values', () => {
    const props = {
      internalProps: {
        values: {
          reduce: jest.fn(() => ({ test: 'testValue' })),
        },
        otherValues: {
          hiii: 'hooo',
        },
      },
    };
    expect(exportValues(props)).toEqual({
      test: 'testValue',
      hiii: 'hooo',
    });
  });
});
