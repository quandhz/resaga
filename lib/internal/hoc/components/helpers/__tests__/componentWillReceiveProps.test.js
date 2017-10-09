import { fromJS } from 'immutable';
import componentWillReceiveProps from '../componentWillReceiveProps';

describe('componentWillReceiveProps()', () => {
  const nextProps = { internalProps: { values: fromJS([123, 231]) } };

  it('to be defined', () => {
    expect(componentWillReceiveProps).toBeDefined();
    expect(typeof componentWillReceiveProps).toBe('function');
  });


  it('should return diffs', () => {
    const result = componentWillReceiveProps({ values: fromJS([]) }, nextProps);
    expect(result).toBeDefined();
    expect(result).toEqual([true, true]);
  });


  it('should return false if no diffs', () => {
    const result = componentWillReceiveProps(nextProps.internalProps, nextProps);
    expect(result).toBe(false);
  });


  it('should callback', () => {
    const callback = jest.fn();
    const key = 'hii';
    const nextPropCallback = { internalProps: { values: { toArray: () => [{ key, value: 22222, callback }] } } };

    const result = componentWillReceiveProps(nextProps.internalProps, nextPropCallback);
    expect(result).toBeDefined();
    expect(result).toEqual([true]);

    expect(callback).toBeCalledWith({ [key]: 22222 });
  });


  it('should return false if values undefined', () => {
    const result = componentWillReceiveProps({}, { internalProps: {} });
    expect(result).toBe(false);
  });
});
