import { SEPARATOR, SUBMIT_SUCCEED } from '../constants';
import reducer from '../helpers/reducer';

describe('resaga/utils/reducer-helpers', () => {
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
  describe('reducer.wrapReducer', () => {
    let wrapReducer;
    const mockReducer = jest.fn();
    const name = 'testPage';
    const mockCustoms = { hi: jest.fn() };
    beforeAll(() => {
      expect(typeof reducer.wrapReducer).toBe('function');
      wrapReducer = reducer.wrapReducer(mockReducer, name, mockCustoms);
      expect(typeof wrapReducer).toBe('function');
    });
    it('should call if page name matched', () => {
      const state = undefined;
      const action = { page: name };
      wrapReducer(state, action);
      expect(mockReducer).toBeCalledWith(state, action);
    });
    it('should call if page name not matched and is initialisation call', () => {
      const state = undefined;
      const action = { page: 'other name' };
      wrapReducer(state, action);
      expect(mockReducer).toBeCalled();
    });
    it('should not call if page name not matched and is not initialisation call', () => {
      const state = { hi: 'ho' };
      const action = { page: 'other name' };
      wrapReducer(state, action);
      expect(mockReducer).not.toBeCalledWith(state, action);
    });
    it('should call customs', () => {
      const state = { hi: 'ho' };
      const action = { page: 'other name', type: 'hi' };
      wrapReducer(state, action);
      expect(mockCustoms.hi).toBeCalledWith(state);
    });
  });
});
