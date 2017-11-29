import exportProps from '../exportProps';

describe('exportProps()', () => {
  const props = { hi: 'hello', hu: 'hii' };

  it('to be defined', () => {
    expect(exportProps).toBeDefined();
    expect(typeof exportProps).toBe('function');
  });

  it('should return false', () => {
    expect(exportProps()).toEqual(undefined);
    expect(exportProps(false, props)).toEqual(props);
    expect(exportProps({})).toEqual(undefined);
  });

  it('configs.name not found', () => {
    expect(exportProps({}, props)).toEqual(props);
    expect(exportProps({ configs: {} }, props)).toEqual(props);
  });

  it('store not found', () => {
    expect(exportProps({ configs: { name: 'not found' } }, props)).toEqual(props);
  });

  it('store found', () => {
    expect(exportProps({ configs: { name: 'hi' } }, {
      ...props,
      hi: { delete: () => 'hellooo' },
    })).toEqual({ ...props, hi: 'hellooo' });
  });
});
