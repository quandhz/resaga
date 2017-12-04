import cleanUp from '../cleanUp';

describe('cleanUp()', () => {
  it('to be defined', () => {
    expect(cleanUp).toBeDefined();
    expect(typeof cleanUp).toBe('function');
  });


  it('should call clean up', () => {
    const props = { cleanup: jest.fn(), configs: { manuallyCleanup: false, name: 'some name' } };
    expect(cleanUp(props)).toBe(props.cleanup(props.configs.name));
  });

  it('should not call clean up', () => {
    const props = { cleanup: jest.fn(), configs: { manuallyCleanup: true, name: 'some name' } };
    expect(cleanUp(props)).toBe(false);
    expect(props.cleanup).not.toBeCalled();
  });
});
