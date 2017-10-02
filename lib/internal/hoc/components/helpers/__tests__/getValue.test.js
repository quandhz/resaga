import { fromJS } from 'immutable';
import getValue from '../getValue';

describe('getValue()', () => {
  it('to be defined', () => {
    expect(getValue).toBeDefined();
    expect(typeof getValue).toBe('function');
  });

  it('should return value', () => {
    const key = 'key';
    const value = 'ho';
    const props = { values: fromJS({ key: value }) };
    expect(getValue(key, props)).toBe(value);
  });

  it('should return null', () => {
    const props = {};
    expect(getValue('some other key', props)).toBe(null);
  });
});
