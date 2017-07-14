/**
 * Created by quando on 14/7/17.
 */

import * as expect from 'expect';
import { SEPARATOR, SUBMIT_SUCCEED } from '../../constants';
import reducer from '../reducer-helpers';

describe('utils/hoc/onSubmit/utils/reducer-helpers', () => {
  it('is defined', () => {
    expect(reducer).toBeDefined();
    expect(reducer.trim).toBeDefined();
  });
  describe('reducer.trim', () => {
    it('return original string if no separator found', () => {
      expect(reducer.trim(SUBMIT_SUCCEED)).toBe(SUBMIT_SUCCEED);
    });
    it('return trimmed string if separator found', () => {
      const type = `${SUBMIT_SUCCEED}${SEPARATOR}some/path`;
      expect(reducer.trim(type)).toBe(SUBMIT_SUCCEED);
    });
  });
});
