import { fromJS } from 'immutable';
import { VARIABLES } from '../../constants';
/* eslint-disable redux-saga/yield-effects */
import selectOwnStore, { selectValues, shallowlyConvert } from '../selectOwnStore';


const state = fromJS({ TemplateStore: { [VARIABLES]: { id: 1 } } });

describe('selectOwnStore()', () => {
  const configs = { name: 'test' };

  it('should exists', () => {
    expect(selectOwnStore);
  });

  it('should use default value', () => {
    expect(selectOwnStore(configs)()).toEqual(undefined);
  });

  describe('selectValues()', () => {
    it('should return undefined', () => {
      expect(selectValues('TourStore')(state)).toBe(undefined);
    });

    it('should return value', () => {
      expect(selectValues('TemplateStore')(state).toJS()).toEqual({ id: 1 });
    });
  });

  describe('shallowlyConvert()', () => {
    it('should return undefined', () => {
      expect(shallowlyConvert()).toBe(undefined);
    });

    it('should return value', () => {
      expect(shallowlyConvert(fromJS({ id: 1 }))).toEqual({ id: 1 });
    });
  });
});
