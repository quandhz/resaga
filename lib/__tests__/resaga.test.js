import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import { IS_LOADING } from '../constants';
import { ReSaga } from '../resaga';

describe('utils/hoc/onSubmit/resaga', () => {
  const key = 'FORM_KEY';
  const MockComponent = () => <div>Hello</div>;
  const store = fromJS({
    [key]: {},
  }).set(key, { [IS_LOADING]: true });
  const rendered = shallow(<ReSaga store={store} Component={MockComponent} />);
  describe('<ReSaga />', () => {
    it('should render without exploding', () => {
      expect(rendered).toBeDefined();
    });
  });
  describe('isLoading()', () => {
    it('should render without exploding', () => {
      const page = rendered.instance();
      const result = page.isLoading(key);
      expect(result).toBe(true);
    });
  });
});

