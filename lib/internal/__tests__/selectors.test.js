import { fromJS } from 'immutable';
import selectors from '../../internal/selectors';
import { VARIABLES } from '../constants';


describe('Test selectors', () => {
  const PAGE = 'mockTestPage';

  describe('selectPage()', () => {
    const selector = selectors.selectPage(PAGE);
    it('should select the register state', () => {
      const page = fromJS({ userData: {} });
      const store = fromJS({ [PAGE]: page });
      expect(selector(store)).toEqual(page);
    });
  });


  describe('selectValues()', () => {
    const selectValues = selectors.selectValues(PAGE);
    it('should select the register state', () => {
      const values = fromJS({ hi: 'ho' });
      const store = fromJS({ [PAGE]: { [VARIABLES]: values } });
      expect(selectValues(store)).toEqual(values);
    });
  });
});

