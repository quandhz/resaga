import { shallow } from 'enzyme';
import React from 'react';
import helpers from '../../helpers';
import withResaga from '../withResaga';

describe('withResaga()', () => {
  const MockComponent = <div>Hello</div>;

  const config = { name: 'MockComponent' };
  let rendered;
  let instance;

  beforeEach(() => {
    helpers.config = { set: jest.fn(), delete: jest.fn(), analyseConfigs: (a) => a };
    helpers.reselect = jest.fn();
    helpers.connect = jest.fn(() => (a) => a);

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


  describe('helpers.connect', () => {
    const dispatchFn = jest.fn();
    let mapDispatch;
    let mapState;


    beforeEach(() => {
      expect(helpers.connect).toBeCalled();
      expect(helpers.connect.mock.calls.length).toBe(1);
      expect(helpers.connect.mock.calls[0].length).toBe(2);
      const args = helpers.connect.mock.calls[0];
      expect(typeof args[0]).toBe('function');
      // eslint-disable-next-line prefer-destructuring
      mapState = args[0];

      expect(typeof args[1]).toBe('function');
      mapDispatch = args[1](dispatchFn);
    });


    it('mapState should call helpers.reselect', () => {
      helpers.reselect = jest.fn();
      mapState();
      expect(helpers.reselect).toBeCalled();
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
      expect(helpers.config.set).toBeCalledWith(config.name, config);
    });
  });


  describe('componentWillUnmount', () => {
    it('should delete config', () => {
      instance.componentWillUnmount();
      expect(helpers.config.delete).toBeCalledWith(config.name);
    });
  });
});
