import { shallow } from 'enzyme';
import React from 'react';
import selectors from '../../selectors';
import utils from '../../helpers';
import helpers from '../helpers';
import withResaga from '../withResaga';
import debugs from '../../../internal/debugs';
import debug from '../../../debug';

describe('withResaga()', () => {
  const MockComponent = () => <div>Hello</div>;

  const config = { name: 'MockComponent' };
  let rendered;
  let instance;

  beforeEach(() => {
    utils.config = { set: jest.fn(), delete: jest.fn(), analyseConfigs: (a) => a };
    utils.connect = jest.fn(() => (a) => a);

    const Wrapped = withResaga(config)(MockComponent);
    rendered = shallow(<Wrapped />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());


  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(withResaga).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });


  describe('utils.connect', () => {
    const dispatchFn = jest.fn();
    let mapDispatch;
    let mapState;

    beforeEach(() => {
      expect(utils.connect).toBeCalled();
      expect(utils.connect.mock.calls.length).toBe(1);
      expect(utils.connect.mock.calls[0].length).toBe(2);
      const args = utils.connect.mock.calls[0];
      expect(typeof args[0]).toBe('function');
      // eslint-disable-next-line prefer-destructuring
      mapState = args[0];

      expect(typeof args[1]).toBe('function');
      mapDispatch = args[1](dispatchFn);
    });


    it('mapState should call subscribeValue and selectPage', () => {
      utils.subscribeValue = jest.fn(() => jest.fn());
      selectors.selectPage = jest.fn(() => jest.fn());
      mapState();
      expect(utils.subscribeValue).toBeCalled();
      expect(selectors.selectPage).toBeCalled();
    });


    it('setValue', () => {
      mapDispatch.setValue(1);
      expect(dispatchFn).toBeCalled();
    });


    it('setValueWithFunc', () => {
      mapDispatch.setValueWithFunc(1);
      expect(dispatchFn).toBeCalled();
    });


    it('beforeDispatch', () => {
      mapDispatch.beforeDispatch();
      expect(dispatchFn).toBeCalled();
    });


    it('dispatch', () => {
      mapDispatch.dispatch(1);
      expect(dispatchFn).toBeCalled();
    });


    it('acknowledge', () => {
      mapDispatch.acknowledge(1);
      expect(dispatchFn).toBeCalled();
    });


    it('cleanup', () => {
      mapDispatch.cleanup(1);
      expect(dispatchFn).toBeCalled();
    });
  });


  describe('componentWillMount', () => {
    it('should set config', () => {
      instance.componentWillMount();
      expect(utils.config.set).toBeCalledWith(config.name, config);
    });
  });


  describe('componentWillReceiveProps', () => {
    it('should NOT call debug', () => {
      debug.on = jest.fn(() => false);
      debugs.componentWillReceiveProps = jest.fn();
      instance.componentWillReceiveProps();
      expect(debugs.componentWillReceiveProps).not.toBeCalled();
    });

    it('should call debug', () => {
      debug.on = jest.fn(() => true);
      debugs.componentWillReceiveProps = jest.fn();
      instance.componentWillReceiveProps();
      expect(debugs.componentWillReceiveProps).toBeCalled();
    });

    it('should pass prop.id', () => {
      rendered.setProps({ id: 111 });
      helpers.componentWillReceiveProps = jest.fn(() => 123);
      debug.on = jest.fn(() => true);
      debugs.componentWillReceiveProps = jest.fn();
      instance.componentWillReceiveProps();
      expect(debugs.componentWillReceiveProps).toBeCalled();
    });
  });


  describe('componentWillUpdate', () => {
    it('helpers.getValuesChanged true', () => {
      helpers.getValuesChanged = jest.fn(() => ({ hi: 999 }));
      instance.values = { hi: 998 };
      instance.componentWillUpdate();
      expect(instance.values).toEqual({ hi: 999 });
    });

    it('helpers.getValuesChanged false', () => {
      helpers.getValuesChanged = jest.fn(() => false);
      instance.values = { hi: 998 };
      instance.componentWillUpdate();
      expect(instance.values).toEqual({ hi: 998 });
    });
  });


  describe('componentWillUnmount', () => {
    it('should delete config', () => {
      utils.config.delete = jest.fn();
      helpers.cleanUp = jest.fn();
      instance.componentWillUnmount();
      expect(utils.config.delete).toBeCalled();
      expect(helpers.cleanUp).toBeCalled();
    });
  });


  describe('setValue', () => {
    it('should call setValue', () => {
      helpers.setValue = jest.fn();
      instance.setValue();
      expect(helpers.setValue).toBeCalled();
    });
  });


  describe('getValue', () => {
    it('should call getValue', () => {
      helpers.getValue = jest.fn();
      instance.getValue();
      expect(helpers.getValue).toBeCalled();
    });
  });


  describe('dispatch', () => {
    it('should call dispatch', () => {
      helpers.dispatch = jest.fn();
      instance.dispatch();
      expect(helpers.dispatch).toBeCalled();
    });
  });


  describe('dispatchTo', () => {
    it('should call dispatchTo', () => {
      helpers.dispatchTo = jest.fn();
      instance.dispatchTo();
      expect(helpers.dispatchTo).toBeCalled();
    });
  });


  describe('analyse', () => {
    it('should call analyse', () => {
      helpers.analyseNextProps = jest.fn();
      instance.analyse();
      expect(helpers.analyseNextProps).toBeCalled();
    });
  });


  describe('isLoading', () => {
    it('should call isLoading', () => {
      helpers.isLoading = jest.fn();
      instance.isLoading();
      expect(helpers.isLoading).toBeCalled();
    });
  });
});
