import setValue from '../setValue';

describe('setValue()', () => {
  const props = {
    internalProps: {
      setValue: jest.fn((page, key, value, cb) => {
        if (typeof cb === 'function' && key !== 'donotset') cb({ [key]: value });
      }),
      setValueWithFunc: jest.fn(),
      configs: { name: 'hi ho' },
    },
    ownProps: {
      viewStore: 'hi ho',
    },
  };
  const key = 'key';
  const value = 'ho';
  const functionValue = () => 'ho';


  afterEach(() => jest.clearAllMocks());


  it('to be defined', () => {
    expect(setValue).toBeDefined();
    expect(typeof setValue).toBe('function');
  });


  it('should set value', () => {
    expect(setValue(props, key, value))
      .toBe(props.internalProps.setValue(key, value));
  });


  it('should set by setValue config', () => {
    const setValueProps = {
      ...props,
      internalProps: {
        ...props.internalProps,
        configs: { setValue: { [key]: ['hi ho', [key]] } },
      },
    };
    expect(setValue(setValueProps, key, value))
      .toBe(setValueProps.internalProps.setValue(key, value));
  });


  it('should set by setValue config - function', () => {
    const setValueProps = {
      ...props,
      internalProps: {
        ...props.internalProps,
        configs: { setValue: { [key]: ({ viewStore }) => [viewStore, [key]] } },
      },
    };
    expect(setValue(setValueProps, key, value))
      .toBe(setValueProps.internalProps.setValue(key, value));
  });


  it('should set object with value', () => {
    expect(setValue(props, { [key]: value })).toBe(props.internalProps.setValue(key, value));
  });


  it('should set object with function', () => {
    expect(setValue(props, { [key]: functionValue })).toBe(props.internalProps.setValueWithFunc(key, functionValue));
  });


  it('should set value by function', () => {
    expect(setValue(props, key, functionValue)).toBe(props.internalProps.setValueWithFunc(key, functionValue));
  });
});
