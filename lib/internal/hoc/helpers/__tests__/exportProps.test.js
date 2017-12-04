import exportProps from '../exportProps';

describe('exportProps()', () => {
  it('to be defined', () => {
    expect(exportProps).toBeDefined();
    expect(typeof exportProps).toBe('function');
    expect(exportProps()).toEqual({});
  });

  it('to exclude resaga props', () => {
    const props = {
      resaga: 1,
      acknowledge: 1,
      beforeDispatch: 1,
      cleanup: 1,
      dispatch: 1,
      setValue: 1,
      setValueWithFunc: 1,
      hi: 'hello',
      hu: 'hii',
    };
    const result = exportProps(props);
    expect(result).toEqual({ hi: 'hello', hu: 'hii' });
    expect(props.hi).toBe(result.hi);
    expect(props.hu).toBe(result.hu);
  });
});
