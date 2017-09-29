import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import { IS_LOADING, WILL_LOAD } from '../../../constants';
import analyseConfig from '../../../helpers/analyseConfig';
import { ReSaga } from '../Resaga';

describe('resaga', () => {
  const pageName = 'PAGE_KEY';
  const key = 'FORM_KEY';
  const configs = { submit: { [key]: () => {} } };
  const MockComponent = () => <div>Hello</div>;
  const store = fromJS({ [key]: {} }).set(key, { [IS_LOADING]: true });
  const storeWillLoad = fromJS({ [key]: {} }).set(key, { [WILL_LOAD]: true });


  const internalProps = {
    Component: MockComponent,
    configs,
    beforeDispatch: jest.fn(),
    cleanup: jest.fn(),
  };
  let rendered;
  let instance;

  beforeEach(() => {
    global.setTimeout = jest.fn((cb) => cb());
    global.clearTimeout = jest.fn();

    rendered = shallow(<ReSaga store={store} internalProps={internalProps} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<ReSaga />', () => {
    it('should render without exploding', () => {
      expect(rendered).toBeDefined();
    });
  });


  describe('componentWillUnmount()', () => {
    it('configs.manuallyCleanup false', () => {
      instance.componentWillUnmount();
      expect(global.clearTimeout.mock.calls.length).toBe(2);
    });
  });


  describe('isLoading()', () => {
    it('isLoading true', () => {
      const result = instance.isLoading(key);
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
    it('analyseConfig.get return true', () => {
      const page = rendered.instance();
      analyseConfig.get = jest.fn(() => true);
      try {
        page.dispatchSaga({}, key, pageName);
        expect(analyseConfig.get).toBeCalled();
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
    it('analyseConfig.get return object', () => {
      const page = rendered.instance();
      analyseConfig.get = jest.fn(() => ({ submit: 'hi' }));
      try {
        page.dispatchSaga({}, key, pageName);
        expect(analyseConfig.get).toBeCalled();
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
      analyseConfig.get = jest.fn(() => ({ submit: { [key]: () => {} } }));
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

