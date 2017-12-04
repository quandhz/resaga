import componentWillReceiveProps, { checkValuesChanged } from '../componentWillReceiveProps';

describe('componentWillReceiveProps()', () => {
  beforeAll(() => {
    global.setTimeout = jest.fn((a) => a && a());
  });
  afterEach(() => jest.clearAllMocks());

  it('to be defined', () => {
    expect(componentWillReceiveProps).toBeDefined();
    expect(typeof componentWillReceiveProps).toBe('function');
  });


  it('should return timeout empty', () => {
    const result = componentWillReceiveProps();
    expect(result).toBeDefined();
  });


  it('should return timeout', () => {
    const result = componentWillReceiveProps(
      { hi: 1, ho: 'ho' },
      { hi: 2, ho: 'ho' },
    );
    expect(result).toBeDefined();
    expect(global.setTimeout).toBeCalled();
  });


  describe('checkValuesChanged()', () => {
    it('should return true', () => {
      const result = checkValuesChanged(
        { hi: 1, ho: 'ho' },
        { hi: 2, ho: 'ho' },
      );
      expect(result).toEqual([true]);
    });

    it('should return false', () => {
      const result = checkValuesChanged(
        { hi: 1, ho: 'ho' },
        { hi: 1, ho: 'ho' },
      );
      expect(result).toEqual(false);
    });

    it('should callback', () => {
      const callback = jest.fn();
      const result = checkValuesChanged(
        { hi: 1, ho: 'ho' },
        { hi: 2, ho: 'ho', '@@cb/hi': callback },
      );
      expect(result).toEqual([true, true]);
      expect(callback).toBeCalledWith({ hi: 2 });
    });
  });
});
