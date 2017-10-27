import { shallow } from 'enzyme';
import React from 'react';
import helpers from '../../helpers';
import withSimplifyResaga from '../withSimplifyResaga';

describe('withSimplifyResaga()', () => {
  const MockComponent = <div>Hello</div>;
  const requiredProps = { otherValues: {}, beforeDispatch: jest.fn() };

  const config = { name: 'MockComponent' };
  let rendered;

  beforeEach(() => {
    helpers.reselect = jest.fn();
    helpers.connect = jest.fn(() => (a) => a);

    const Wrapped = withSimplifyResaga(config)(MockComponent);
    rendered = shallow(<Wrapped {...requiredProps} />);
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


    it('beforeDispatch', () => {
      mapDispatch.beforeDispatch();
      expect(dispatchFn).toBeCalled();
    });
  });
});
