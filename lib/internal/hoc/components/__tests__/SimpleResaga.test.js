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

  let rendered;
  let instance;


  beforeEach(() => {
    rendered = shallow(<SimpleResaga internalProps={internalProps} />);
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


  describe('dispatchTo()', () => {
    it('should call helpers.dispatchTo', () => {
      helpers.dispatchTo = jest.fn();
      instance.dispatchTo('key');
      expect(helpers.dispatchTo).toBeCalledWith('key', instance.props);
    });
  });
});

