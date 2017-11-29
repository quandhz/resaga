import { fromJS } from 'immutable';
import componentWillReceiveProps from '../componentWillReceiveProps';
import helpers from '../index';

describe('componentWillReceiveProps()', () => {
  const callback = jest.fn();
  const nextProps = fromJS({ hi: 'hello', ho: 'hehee', '@@cb/hi': callback });

  beforeEach(() => {
    helpers.getValuesFromProps = jest.fn((props) => props ? nextProps : false);
  });
  afterEach(() => jest.clearAllMocks());

  it('to be defined', () => {
    expect(componentWillReceiveProps).toBeDefined();
    expect(typeof componentWillReceiveProps).toBe('function');
  });


  it('should return diffs', () => {
    const result = componentWillReceiveProps(false, true);
    expect(result).toBeDefined();
    expect(result).toEqual([true, true, true]);
  });


  it('should return false if no diffs', () => {
    const result = componentWillReceiveProps(true, true);
    expect(result).toBe(false);
  });


  it('should callback', () => {
    const result = componentWillReceiveProps(false, true);
    expect(result).toBeDefined();
    expect(result).toEqual([true, true, true]);

    expect(callback).toBeCalledWith({ hi: 'hello' });
  });
});
