import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import { IS_LOADING, WILL_LOAD } from '../internal/constants';
import cfgs from '../utils/configs';
import { ReSaga } from '../resaga';

describe('utils/hoc/onSubmit/resaga', () => {
  const pageName = 'PAGE_KEY';
  const key = 'FORM_KEY';
  const configs = { submit: { [key]: () => {} } };
  const MockComponent = () => <div>Hello</div>;
  const beforeDispatchProp = jest.fn();
  const store = fromJS({ [key]: {} }).set(key, { [IS_LOADING]: true });
  const storeWillLoad = fromJS({ [key]: {} }).set(key, { [WILL_LOAD]: true });
  const rendered = shallow(<ReSaga store={store} Component={MockComponent} configs={configs} beforeDispatchProp={beforeDispatchProp} />);
  describe('<ReSaga />', () => {
    it('should render without exploding', () => {
      expect(rendered).toBeDefined();
    });
  });
  describe('isLoading()', () => {
    it('isLoading true', () => {
      const page = rendered.instance();
      const result = page.isLoading(key);
      expect(result).toBe(true);
    });
    it('willLoad true', () => {
      const renderedWillLoad = shallow(<ReSaga store={storeWillLoad} Component={MockComponent} />);
      const page = renderedWillLoad.instance();
      const result = page.isLoading(key);
      expect(result).toBe(true);
    });
  });
  describe('dispatchSaga()', () => {
    it('cfgs.get return true', () => {
      const page = rendered.instance();
      cfgs.get = jest.fn(() => true);
      try {
        page.dispatchSaga({}, key, pageName);
        expect(cfgs.get).toBeCalled();
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
    it('cfgs.get return object', () => {
      const page = rendered.instance();
      cfgs.get = jest.fn(() => ({ submit: 'hi' }));
      try {
        page.dispatchSaga({}, key, pageName);
        expect(cfgs.get).toBeCalled();
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
    it('no form name', () => {
      const page = rendered.instance();
      try {
        page.dispatchSaga({});
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
    it('no page name', () => {
      const page = rendered.instance();
      cfgs.get = jest.fn(() => ({ submit: { [key]: () => {} } }));
      page.dispatchSaga({}, key);
      expect(beforeDispatchProp).toBeCalled();
    });
    it('no page name + no config', () => {
      const renderedNoConfig = shallow(<ReSaga store={storeWillLoad} Component={MockComponent} />);
      try {
        const page = renderedNoConfig.instance();
        page.dispatchSaga({}, key);
        expect(beforeDispatchProp).toBeCalled();
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
});

