/**
 * Created by quando on 7/3/17.
 */

import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { acknowledge, cleanup, submitForm } from '../actions';
import { SERVER_ERROR, SUBMIT_SUCCESS } from '../constants';
import reSagaHOC from '../index';
import component from '../utils/component-helpers';

describe('utils/hoc/onSubmit/index', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  const PAGE = 'mockTestPage';

// Initialize mockstore with empty state
  const initialState = fromJS({
    [PAGE]: fromJS({
      [SERVER_ERROR]: '',
      [SUBMIT_SUCCESS]: false,
    }),
  });
  const store = mockStore(initialState);
  const MockComponent = () => <div>Hello</div>;
  const options = { page: PAGE };
  // eslint-disable-next-line no-unused-vars
  const WrapperComponent = reSagaHOC(MockComponent, options);
  const mockSubmit = jest.fn();
  const cleanupOnUnmount = jest.fn();
  const renderedComponent = mount(
    <Provider store={store}>
      <WrapperComponent submit={mockSubmit} cleanupOnUnmount={cleanupOnUnmount} />
    </Provider>
  );
  const wrappedComponent = renderedComponent.find(MockComponent);

  describe('<reSagaHOC />', () => {
    it('should render without exploding', () => {
      expect(renderedComponent).toBeDefined();
    });
    it('should render MockComponent', () => {
      expect(renderedComponent.find(MockComponent).length).toBe(1);
    });
    it('should render children', () => {
      const formName = 'FORM_NAME';
      const mockData = { hi: 'ho' };

      const props = wrappedComponent.props();
      expect(typeof props.onSubmit).toBe('function');
      expect(typeof props.resaga).toBe('object');

      const resaga = props.resaga;
      expect(typeof resaga.analyse).toBe('function');
      expect(typeof resaga.dispatch).toBe('function');
      expect(typeof resaga.acknowledge).toBe('function');

      expect(props.onSubmit(mockData, formName)).toEqual(submitForm(mockData, options, formName));
      expect(resaga.dispatch(formName)).toEqual(submitForm({}, options, formName));
      expect(resaga.acknowledge(formName)).toEqual(acknowledge(options.page, formName));
      expect(resaga.cleanup(options.page)).toEqual(cleanup(options.page));

      component.analyseNextProps = jest.fn();
      resaga.analyse(mockData, mockData);
      expect(component.analyseNextProps).toBeCalledWith(mockData, mockData, resaga.acknowledge);
      component.analyseNextProps.mockClear();
    });

    it('componentWillUnmount', () => {
      renderedComponent.unmount();
    });
  });
});

