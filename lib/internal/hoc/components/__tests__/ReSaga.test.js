import { shallow } from 'enzyme';
import React from 'react';
import helpers from '../helpers';
import ReSaga from '../Resaga';

describe('resaga', () => {
  const MockComponent = () => <div>Hello</div>;
  const internalProps = {
    Component: MockComponent,
    cleanup: jest.fn(),
  };

  let rendered;
  let instance;


  beforeEach(() => {
    rendered = shallow(<ReSaga internalProps={internalProps} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());


  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(ReSaga).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });


  describe('componentWillReceiveProps()', () => {
    it('should call helpers.componentWillReceiveProps', () => {
      helpers.componentWillReceiveProps = jest.fn();
      instance.componentWillReceiveProps(123);
      expect(helpers.componentWillReceiveProps).toBeCalledWith(internalProps, 123);
    });
  });


  describe('componentWillUnmount()', () => {
    it('should call helpers.cleanUp', () => {
      helpers.cleanUp = jest.fn();
      instance.componentWillUnmount();
      expect(helpers.cleanUp).toBeCalledWith(internalProps);
    });
  });


  describe('setValue()', () => {
    it('should call helpers.setValue', () => {
      helpers.setValue = jest.fn();
      instance.setValue('key', 111);
      expect(helpers.setValue).toBeCalledWith(internalProps, 'key', 111);
    });
  });


  describe('getValue()', () => {
    it('should call helpers.getValue', () => {
      helpers.getValue = jest.fn();
      instance.getValue('key');
      expect(helpers.getValue).toBeCalledWith(internalProps, 'key');
    });
  });


  describe('dispatch()', () => {
    it('should call helpers.dispatch', () => {
      helpers.dispatch = jest.fn();
      instance.dispatch('key');
      expect(helpers.dispatch).toBeCalledWith('key', internalProps);
    });
  });


  describe('dispatchTo()', () => {
    it('should call helpers.dispatchTo', () => {
      helpers.dispatchTo = jest.fn();
      instance.dispatchTo('key');
      expect(helpers.dispatchTo).toBeCalledWith('key', instance.props);
    });
  });


  describe('analyse()', () => {
    it('should call helpers.analyseNextProps', () => {
      helpers.analyseNextProps = jest.fn();
      instance.analyse('key');
      expect(helpers.analyseNextProps).toBeCalledWith('key', internalProps);
    });
  });


  describe('isLoading()', () => {
    it('should call helpers.isLoading', () => {
      helpers.isLoading = jest.fn();
      instance.isLoading('key');
      expect(helpers.isLoading).toBeCalledWith('key', instance.props);
    });
  });
});

