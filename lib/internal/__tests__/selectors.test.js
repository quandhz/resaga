import { fromJS } from 'immutable';
import selectors from '../selectors';


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

    it('should return undefined', () => {
      const selector = selectors.selectPage('otherPage');
      const page = fromJS({ userData: {} });
      const store = fromJS({ [PAGE]: page });
      expect(selector(store)).toEqual(undefined);
    });
  });
});
