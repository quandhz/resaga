import helpers from '../index';
import exportValues from '../exportValues';

describe('exportValues()', () => {
  afterEach(() => jest.clearAllMocks());


  it('should be defined', () => {
    expect(exportValues).toBeDefined();
    expect(typeof exportValues).toBe('function');
  });

  it('should return empty object if no internalProps', () => {
    const props = {};
    expect(exportValues(props)).toEqual({});
    expect(exportValues(props, false)).toEqual({});
  });

  it('should return empty if wrapValue false and isRoot false', () => {
    const props = { internalProps: { configs: {} } };
    expect(exportValues(props)).toEqual({});
    expect(exportValues(props, false)).toEqual({});
  });

  it('should return empty if no values and otherValues', () => {
    const props = { internalProps: { otherValues: {} } };
    expect(exportValues(props)).toEqual({});
    expect(exportValues(props, false)).toEqual({});
  });

  it('should use default values', () => {
    const values = {
      reduce: jest.fn((cb) => { cb({}); return 111; }),
    };
    helpers.getValuesFromProps = jest.fn(() => values);
    expect(exportValues({ internalProps: { configs: {} } })).toEqual(111);
    helpers.getValuesFromProps = jest.fn();
  });


  it('should return otherValues', () => {
    const props = {
      internalProps: {
        configs: { value: { hi: { keyPath: 'hiii' } } },
        otherValues: { hiii: 'hooo' },
      },
    };
    expect(exportValues(props)).toEqual({ hi: 'hooo' });
  });


  it('should return empty', () => {
    const props = {
      internalProps: {
        configs: { value: true },
      },
    };
    expect(exportValues(props)).toEqual({});
  });


  it('should return otherValues with getter', () => {
    const props = {
      internalProps: {
        configs: {
          value: {
            hi: {
              keyPath: 'hiii',
              getter: (val) => `${val}-1`,
            },
          },
        },
        otherValues: { hiii: 'hooo' },
      },
    };
    expect(exportValues(props)).toEqual({ hi: 'hooo-1' });
  });

  it('should return without keyPath', () => {
    const props = {
      internalProps: {
        configs: {
          value: {
            hi: {
              getter: () => 123,
            },
          },
        },
        otherValues: {},
      },
    };
    expect(exportValues(props)).toEqual({ hi: 123 });
  });

  it('should return undefined', () => {
    const props = {
      internalProps: {
        configs: { value: { hi: { keyPath: 'hiii' } } },
        otherValues: { hiii: undefined },
      },
    };
    expect(exportValues(props)).toEqual({ hi: undefined });
  });

  it('should return notSetValue', () => {
    const props = {
      internalProps: {
        configs: {
          value: {
            hi: {
              keyPath: 'hiii',
              notSetValue: 'hoooo',
            },
          },
        },
        otherValues: {},
      },
    };
    expect(exportValues(props)).toEqual({ hi: 'hoooo' });
  });

  it('should use previous value', () => {
    const props = {
      internalProps: {
        configs: {
          value: {
            name: ['hiii'],
            greeting: {
              getter: ({ name }) => `Hello ${name}`,
            },
          },
        },
        otherValues: { hiii: 'Jay' },
      },
    };
    expect(exportValues(props)).toEqual({ name: 'Jay', greeting: 'Hello Jay' });
  });

  it('should return spreadObject', () => {
    const props = {
      internalProps: {
        configs: {
          value: {
            hi: {
              keyPath: 'hiii',
              spreadObject: true,
            },
          },
        },
        otherValues: { hiii: { hi: 'ho', hello: 'world' } },
      },
    };
    expect(exportValues(props)).toEqual({ hi: 'ho', hello: 'world' });
  });

  it('should return both values', () => {
    const values = {
      reduce: jest.fn((cb) => { cb({}); return { test: 'testValue' }; }),
    };
    helpers.getValuesFromProps = jest.fn(() => values);
    const props = {
      internalProps: {
        configs: { value: { hi: { keyPath: 'hiii' } } },
        otherValues: {
          hiii: 'hooo',
        },
      },
    };
    expect(exportValues(props)).toEqual({
      test: 'testValue',
      hi: 'hooo',
    });
  });
});
