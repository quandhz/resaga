import setValue from '../setValue';

describe('setValue()', () => {
  it('to be defined', () => {
    expect(setValue).toBeDefined();
    expect(typeof setValue).toBe('function');
  });

  const props = { setValue: jest.fn(), setValueWithFunc: jest.fn() };
  const key = 'key';

  it('should set value', () => {
    const value = 'ho';
    expect(
      setValue(key, value, props)
    ).toBe(
      props.setValue(key, value)
    );
  });

  it('should set value by function', () => {
    const value = () => 'ho';
    expect(
      setValue(key, value, props)
    ).toBe(
      props.setValueWithFunc(key, value)
    );
  });
});
