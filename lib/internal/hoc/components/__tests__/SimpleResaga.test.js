import { shallow } from 'enzyme';
import React from 'react';
import helpers from '../helpers';
import SimpleResaga from '../SimpleResaga';

describe('SimpleResaga', () => {
  const MockComponent = () => <div>Hello</div>;
  const internalProps = {
    Component: MockComponent,
    cleanup: jest.fn(),
  };
  const requiredProps = { otherValues: {}, beforeDispatch: jest.fn() };

  let rendered;
  let instance;


  beforeEach(() => {
    rendered = shallow(<SimpleResaga internalProps={internalProps} {...requiredProps} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());


  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(SimpleResaga).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });


  describe('componentWillUpdate()', () => {
    it('no changes, should not update instance.values', () => {
      helpers.getValuesChanged = jest.fn(() => false);
      instance.values = 111;
      instance.componentWillUpdate(456);
      expect(helpers.getValuesChanged).toBeCalledWith(111, 456);
      expect(instance.values).toBe(111);
    });

    it('some changes, should update instance.values', () => {
      helpers.getValuesChanged = jest.fn(() => ({ hi: 'hello', he: 'ho hii' }));
      instance.values = { hello: 'world', he: 'ho hi' };
      instance.componentWillUpdate(456);
      expect(helpers.getValuesChanged).toBeCalledWith({ hello: 'world', he: 'ho hi' }, 456);
      expect(instance.values).toEqual({
        hello: 'world',
        hi: 'hello',
        he: 'ho hii',
      });
    });
  });


  describe('setValue()', () => {
    it('should call helpers.setValue', () => {
      helpers.setValue = jest.fn();
      instance.setValue('key', 111);
      expect(helpers.setValue).toBeCalledWith(internalProps, 'key', 111);
    });
  });


  describe('dispatchTo()', () => {
    it('should call helpers.dispatchTo', () => {
      helpers.dispatchTo = jest.fn();
      instance.dispatchTo('key');
      expect(helpers.dispatchTo).toBeCalledWith('key', instance.props);
    });
  });
});

