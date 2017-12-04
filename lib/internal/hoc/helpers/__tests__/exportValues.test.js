import exportValues from '../exportValues';

describe('exportValues()', () => {
  afterEach(() => jest.clearAllMocks());


  it('should be defined', () => {
    expect(exportValues).toBeDefined();
    expect(typeof exportValues).toBe('function');
  });

  it('should return empty object if no props', () => {
    const props = {};
    expect(exportValues(props)).toEqual({});
  });

  it('should return empty if config is not object', () => {
    const props = { hi: 123 };
    const configs = { value: { hi: true } };
    expect(exportValues({ props, configs })).toEqual({});
  });

  it('should return empty if config is array', () => {
    const props = { hi: 123 };
    const configs = { value: { hi: [1, 2] } };
    expect(exportValues({ props, configs })).toEqual({});
  });

  it('should return value if isGetter true', () => {
    const props = { hi: 123 };
    const configs = { value: { hi: { getter: ({ hi }) => hi + 1 } } };
    expect(exportValues({ props, configs })).toEqual({ hi: 124 });
  });

  it('isGetter true, spreadObject true', () => {
    const props = { hi: 123 };
    const configs = { value: { hi: { getter: ({ hi }) => ({ ho: hi + 1, he: hi > 0 }), spreadObject: true } } };
    expect(exportValues({ props, configs })).toEqual({ ho: 124, he: true });
  });

  it('isGetter true, value undefined, return notSetValue', () => {
    const props = { hi: 123 };
    const configs = { value: { hi: { getter: () => undefined, notSetValue: 199 } } };
    expect(exportValues({ props, configs })).toEqual({ hi: 199 });
  });

  it('isGetter true, value undefined, spreadObject true, spread notSetValue', () => {
    const props = { hi: 123 };
    const configs = { value: { hi: { getter: () => undefined, notSetValue: { ho: 1, he: 2 }, spreadObject: true } } };
    expect(exportValues({ props, configs })).toEqual({ ho: 1, he: 2 });
  });
});
