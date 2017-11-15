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
    const values = {
      reduce: jest.fn((cb) => { cb({}); return { test: 'testValue' }; }),
    };
    helpers.getValuesFromProps = jest.fn(() => values);
    const props = {
      internalProps: {
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
