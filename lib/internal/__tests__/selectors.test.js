import { fromJS } from 'immutable';
import helpers from '../helpers/analyseConfig';
import selectors from '../../internal/selectors';
import { VARIABLES } from '../constants';


describe('Test selectors', () => {
  const PAGE = 'mockTestPage';

  afterEach(() => jest.clearAllMocks());

  describe('selectPage()', () => {
    it('should select the register state', () => {
      const selector = selectors.selectPage(PAGE);
      const page = fromJS({ userData: {} });
      const store = fromJS({ [PAGE]: page });
      expect(selector(store)).toEqual(page);
    });
  });


  describe('selectOtherValues() with resaga store', () => {
    beforeEach(() => {
      helpers.isResagaStore = jest.fn(() => true);
    });

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
      expect(select(store, {})).toEqual('ho');
    });
  });


  describe('selectOtherValues() with normal store', () => {
    beforeEach(() => {
      helpers.isResagaStore = jest.fn(() => false);
    });

    it('should return undefined if no params', () => {
      expect(selectors.selectOtherValues()).toBe(undefined);
    });

    it('should select by key path', () => {
      const select = selectors.selectOtherValues([PAGE, 'hi']);
      const store = fromJS({ [PAGE]: { hi: 'ho' } });
      expect(select(store)).toEqual('ho');
    });

    it('should select by object', () => {
      const select = selectors.selectOtherValues({ keyPath: [PAGE, 'hi'] });
      const store = fromJS({ [PAGE]: { hi: 'ho' } });
      expect(select(store, {})).toEqual('ho');
    });
  });


  describe('selectOtherValuesByObject() with resaga store', () => {
    beforeEach(() => {
      helpers.isResagaStore = jest.fn(() => true);
    });

    it('should return undefined', () => {
      const getter = () => 'hello';

      const select = selectors.selectOtherValuesByObject({ keyPath: [PAGE, 'hi'], getter });

      const values = fromJS({ hello: 'ho' });
      const store = fromJS({ [PAGE]: { [VARIABLES]: values } });

      expect(select(store, {})).toBe(undefined);
    });

    it('should use getter', () => {
      const getter = () => 'hello';
      const select = selectors.selectOtherValuesByObject({ keyPath: [PAGE, 'hi'], getter });
      const values = fromJS({ hi: 'ho' });
      const store = fromJS({ [PAGE]: { [VARIABLES]: values } });
      expect(select(store, {})).toBe(getter());
    });
  });


  describe('selectOtherValuesByObject() with normal store', () => {
    beforeEach(() => {
      helpers.isResagaStore = jest.fn(() => false);
    });

    it('should return undefined', () => {
      const getter = () => 'hello';

      const select = selectors.selectOtherValuesByObject({ keyPath: [PAGE, 'hi'], getter });

      const store = fromJS({ [PAGE]: { hello: 'ho' } });

      expect(select(store, {})).toBe(undefined);
    });

    it('should use getter', () => {
      const getter = () => 'hello';
      const select = selectors.selectOtherValuesByObject({ keyPath: [PAGE, 'hi'], getter });
      const store = fromJS({ [PAGE]: { hi: 'ho' } });
      expect(select(store, {})).toBe(getter());
    });

    it('should use custom id', () => {
      const getter = () => 'hello';
      const select = selectors.selectOtherValuesByObject({ keyPath: [PAGE, 'hi'], getter, id: 'key' });
      const store = fromJS({ [PAGE]: { hi: 'ho' } });
      expect(select(store, { key: 'hello' })).toBe(getter());
    });
  });
});

