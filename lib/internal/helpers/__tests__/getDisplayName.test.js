import getDisplayName from '../getDisplayName';

describe('getDisplayName()', () => {
  it('to be defined', () => {
    expect(getDisplayName).toBeDefined();
  });

  it('returns displayName', () => {
    const Component = { displayName: 'displayName' };
    expect(getDisplayName(Component)).toEqual(Component.displayName);
  });

  it('returns name', () => {
    const Component = { name: 'name' };
    expect(getDisplayName(Component)).toEqual(Component.name);
  });

  it('returns default', () => {
    expect(getDisplayName({})).toEqual('Component');
    expect(getDisplayName()).toEqual('Component');
  });
});
