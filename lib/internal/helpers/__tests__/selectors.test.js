/* eslint-disable no-console */
import selectors from '../selectors';

describe('selectors()', () => {
  it('to be defined', () => {
    expect(selectors).toBeDefined();
    expect(selectors.selectValue).toBeDefined();
  });

  it('should return object type', () => {
    const page = { getIn: () => ({ value: 555 }) };
    expect(selectors.selectValue()(page)).toBe(555);
  });

  it('should return get immutable', () => {
    const page = { getIn: () => ({ get: () => 555 }) };
    expect(selectors.selectValue()(page)).toBe(555);
  });
});
