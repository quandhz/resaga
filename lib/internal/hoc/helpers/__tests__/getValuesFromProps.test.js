import getValuesFromProps from '../getValuesFromProps';

describe('getValuesFromProps()', () => {
  it('to be defined', () => {
    expect(getValuesFromProps).toBeDefined();
    expect(typeof getValuesFromProps).toBe('function');
  });

  it('should return false', () => {
    expect(getValuesFromProps()).toEqual(false);
    expect(getValuesFromProps(false)).toEqual(false);
    expect(getValuesFromProps({ internalProps: false })).toEqual(false);
  });

  it('configs.name not found', () => {
    expect(getValuesFromProps({ internalProps: { configs: {} } })).toEqual(false);
  });

  it('store not found', () => {
    const props = {
      internalProps: { configs: { name: 'hi' } },
    };
    expect(getValuesFromProps(props)).toEqual(false);
  });

  it('store found', () => {
    const props = {
      hi: { get: () => 123 },
      internalProps: { configs: { name: 'hi' } },
    };
    expect(getValuesFromProps(props)).toEqual(123);
  });
});
