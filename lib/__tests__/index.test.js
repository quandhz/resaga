import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { acknowledge, cleanup, submitForm, setVariable, setVariableWithFunction } from '../actions';
import { SERVER_ERROR, SUBMIT_SUCCESS, VARIABLES } from '../constants';
import reSagaHOC, { reducer } from '../index';
import reducerHelpers from '../utils/reducer-helpers';
import component from '../utils/component-helpers';

describe('reSagaHOC.reducer', () => {
  it('should be called correctly', () => {
    reducerHelpers.wrapReducer = jest.fn();
    reducer();
    expect(reducerHelpers.wrapReducer).toBeCalled();
  });
});
describe('utils/hoc/onSubmit/index', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  const PAGE = 'mockTestPage';
  const key = 'keyyyy';
  const value = 'keyyyy';

// Initialize mockstore with empty state
  const initialState = fromJS({
    [PAGE]: fromJS({
      [VARIABLES]: {
        [key]: value,
      },
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
      const func = (data) => data;

      const props = wrappedComponent.props();
      expect(typeof props.onSubmit).toBe('function');
      expect(typeof props.resaga).toBe('object');

      const resaga = props.resaga;
      expect(typeof resaga.analyse).toBe('function');
      expect(typeof resaga.dispatch).toBe('function');
      expect(typeof resaga.acknowledge).toBe('function');
      expect(typeof resaga.setValue).toBe('function');
      expect(typeof resaga.getValue).toBe('function');
      expect(typeof resaga.isLoading).toBe('function');

      expect(props.onSubmit(mockData, formName)).toEqual(submitForm(mockData, options, formName));
      expect(resaga.dispatch(formName)).toEqual(submitForm({}, options, formName));
      expect(resaga.acknowledge(formName)).toEqual(acknowledge(options.page, formName));
      expect(resaga.cleanup(options.page)).toEqual(cleanup(options.page));
      expect(resaga.setValue(key, value)).toEqual(setVariable(options.page, key, value));
      expect(resaga.setValue(key, func)).toEqual(setVariableWithFunction(options.page, key, func));
      expect(resaga.getValue(key)).toBe(value);
      expect(resaga.isLoading(formName)).toBe(false);

      component.analyseNextProps = jest.fn();
      resaga.analyse(mockData, mockData);
      expect(component.analyseNextProps).toBeCalledWith(mockData, mockData, resaga.acknowledge);
      component.analyseNextProps.mockClear();
    });

    it('componentWillUnmount', () => {
      renderedComponent.unmount();
    });
    it('no store should return null', () => {
      const state = fromJS({});
      const emptyStore = mockStore(state);
      const rendered = mount(
        <Provider store={emptyStore}>
          <WrapperComponent submit={mockSubmit} cleanupOnUnmount={cleanupOnUnmount} />
        </Provider>
      );
      const wrapped = rendered.find(MockComponent);
      const resaga = wrapped.props().resaga;
      expect(resaga.getValue(key)).toBe(null);
      expect(resaga.isLoading('FORM_NAME')).toBe(false);
    });
  });
});

