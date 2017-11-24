import selectors from '../selectors';
import helpers from '../analyseConfig';

describe('selectors()', () => {
  const page = { getIn: () => 555, get: () => 333 };

  beforeEach(() => {
    helpers.isResagaStore = jest.fn((name) => !!name);
  });
  afterEach(() => jest.clearAllMocks());

  it('to be defined', () => {
    expect(selectors).toBeDefined();
    expect(selectors.selectValue).toBeDefined();
  });

  it('should return notSetValue', () => {
    expect(selectors.selectValue(false, false, 123)()).toBe(123);
  });

  it('should return value with resaga store', () => {
    expect(selectors.selectValue(true)(page)).toBe(555);
  });

  it('should return value with normal store', () => {
    expect(selectors.selectValue(false)(page)).toBe(333);
  });
});
