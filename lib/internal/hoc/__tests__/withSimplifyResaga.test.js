import { shallow } from 'enzyme';
import React from 'react';
import debug from '../../../debug';
import debugs from '../../debugs';
import utils from '../../helpers';
import helpers from '../helpers';
import withSimplifyResaga from '../withSimplifyResaga';

describe('withSimplifyResaga()', () => {
  const MockComponent = () => <div>Hello</div>;
  const requiredProps = {
    setValue: jest.fn(), setValueWithFunc: jest.fn(), beforeDispatch: jest.fn(),
  };

  const config = {};
  let rendered;
  let instance;

  beforeEach(() => {
    utils.subscribeValue = jest.fn(() => jest.fn());
    utils.connect = jest.fn(() => (a) => a);

    const Wrapped = withSimplifyResaga(config)(MockComponent);
    rendered = shallow(<Wrapped {...requiredProps} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());


  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(withSimplifyResaga).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });


  describe('utils.connect', () => {
    const dispatchFn = jest.fn();
    let mapDispatch;


    beforeEach(() => {
      expect(utils.connect).toBeCalled();
      expect(utils.connect.mock.calls.length).toBe(1);
      expect(utils.connect.mock.calls[0].length).toBe(2);
      const args = utils.connect.mock.calls[0];

      expect(typeof args[0]).toBe('function');
      expect(typeof args[1]).toBe('function');
      mapDispatch = args[1](dispatchFn);
    });


    it('mapState should call utils.subscribeValue', () => {
      expect(utils.subscribeValue).toBeCalled();
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
  });


  describe('componentWillReceiveProps', () => {
    it('should NOT call debug', () => {
      debug.on = jest.fn(() => false);
      debugs.componentWillReceiveProps = jest.fn();
      instance.componentWillReceiveProps();
      expect(debugs.componentWillReceiveProps).not.toBeCalled();
    });

    it('should call debug', () => {
      helpers.componentWillReceiveProps = jest.fn(() => 123);
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


  describe('setValue', () => {
    it('should call setValue', () => {
      helpers.setValue = jest.fn();
      instance.setValue();
      expect(helpers.setValue).toBeCalled();
    });
  });


  describe('dispatchTo', () => {
    it('should call dispatchTo', () => {
      helpers.dispatchTo = jest.fn();
      instance.dispatchTo();
      expect(helpers.dispatchTo).toBeCalled();
    });
  });
});
