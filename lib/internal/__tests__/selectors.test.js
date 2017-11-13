import { fromJS } from 'immutable';
import selectors from '../../internal/selectors';
import { VARIABLES } from '../constants';


describe('Test selectors', () => {
  const PAGE = 'mockTestPage';

  describe('selectPage()', () => {
    it('should select the register state', () => {
      const selector = selectors.selectPage(PAGE);
      const page = fromJS({ userData: {} });
      const store = fromJS({ [PAGE]: page });
      expect(selector(store)).toEqual(page);
    });
  });


  describe('selectValues()', () => {
    it('should select the register state', () => {
      const selectValues = selectors.selectValues(PAGE);
      const values = fromJS({ hi: 'ho' });
      const store = fromJS({ [PAGE]: { [VARIABLES]: values } });
      expect(selectValues(store)).toEqual(values);
    });
  });


  describe('selectOtherValues()', () => {
    it('should return undefined if no params', () => {
      expect(selectors.selectOtherValues()).toBe(undefined);
    });

    it('should select by key path', () => {
      const select = selectors.selectOtherValues([PAGE, 'hi']);
      const values = fromJS({ hi: 'ho' });
      const store = fromJS({ [PAGE]: { [VARIABLES]: values } });
      expect(select(store)).toEqual('ho');
    });

    it('should select by object', () => {
      const select = selectors.selectOtherValues({ keyPath: [PAGE, 'hi'] });
      const values = fromJS({ hi: 'ho' });
      const store = fromJS({ [PAGE]: { [VARIABLES]: values } });
      expect(select(store)).toEqual('ho');
    });
  });


  describe('selectOtherValuesByObject()', () => {
    it('should return undefined', () => {
      const getter = () => 'hello';

      const select = selectors.selectOtherValuesByObject({ keyPath: [PAGE, 'hi'], getter });

      const values = fromJS({ hello: 'ho' });
      const store = fromJS({ [PAGE]: { [VARIABLES]: values } });

      expect(select(store)).toBe(undefined);
    });

    it('should use getter', () => {
      const getter = () => 'hello';
      const select = selectors.selectOtherValuesByObject({ keyPath: [PAGE, 'hi'], getter });
      const values = fromJS({ hi: 'ho' });
      const store = fromJS({ [PAGE]: { [VARIABLES]: values } });
      expect(select(store)).toBe(getter());
    });
  });
});

