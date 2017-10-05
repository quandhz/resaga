import setValue from '../setValue';

describe('setValue()', () => {
  const props = {
    setValue: jest.fn((key, value, cb) => {
      if (typeof cb === 'function' && key !== 'donotset') cb({ [key]: value });
    }),
    setValueWithFunc: jest.fn(),
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
    expect(
      setValue(props, key, value)
    ).toBe(
      props.setValue(key, value)
    );
  });


  it('should set object with value', () => {
    expect(
      setValue(props, { [key]: value })
    ).toBe(
      props.setValue(key, value)
    );
  });


  it('should set object with function', () => {
    expect(
      setValue(props, { [key]: functionValue })
    ).toBe(
      props.setValueWithFunc(key, functionValue)
    );
  });


  it('should set value by function', () => {
    expect(
      setValue(props, key, functionValue)
    ).toBe(
      props.setValueWithFunc(key, functionValue)
    );
  });


  it('should set object with callback', () => {
    const callback = jest.fn();
    setValue(props, { [key]: value }, callback);
    expect(props.setValue.mock.calls.length).toBe(1);
    expect(callback).toBeCalledWith({ [key]: value });
  });


  it('should not callback if not all keys are set', () => {
    const callback = jest.fn();
    setValue(props, { [key]: value, donotset: value }, callback);
    expect(props.setValue.mock.calls.length).toBe(2);
    expect(callback).not.toBeCalled();
  });
});
