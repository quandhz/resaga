'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _enzyme = require('enzyme');

var _immutable = require('immutable');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _actions = require('../actions');

var _constants = require('../constants');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _reducerHelpers = require('../utils/reducer-helpers');

var _reducerHelpers2 = _interopRequireDefault(_reducerHelpers);

var _componentHelpers = require('../utils/component-helpers');

var _componentHelpers2 = _interopRequireDefault(_componentHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('reSagaHOC.reducer', function () {
  it('should be called correctly', function () {
    _reducerHelpers2.default.wrapReducer = jest.fn();
    (0, _index.reducer)();
    expect(_reducerHelpers2.default.wrapReducer).toBeCalled();
  });
});
describe('utils/hoc/onSubmit/index', function () {
  var _fromJS;

  var middlewares = [];
  var mockStore = (0, _reduxMockStore2.default)(middlewares);

  var PAGE = 'mockTestPage';
  var key = 'keyyyy';
  var value = 'keyyyy';

  // Initialize mockstore with empty state
  var initialState = (0, _immutable.fromJS)(_defineProperty({}, PAGE, (0, _immutable.fromJS)((_fromJS = {}, _defineProperty(_fromJS, _constants.VARIABLES, _defineProperty({}, key, value)), _defineProperty(_fromJS, _constants.SERVER_ERROR, ''), _defineProperty(_fromJS, _constants.SUBMIT_SUCCESS, false), _fromJS))));
  var store = mockStore(initialState);
  var MockComponent = function MockComponent() {
    return _react2.default.createElement(
      'div',
      null,
      'Hello'
    );
  };
  var options = { page: PAGE };
  // eslint-disable-next-line no-unused-vars
  var WrapperComponent = (0, _index2.default)(MockComponent, options);
  var mockSubmit = jest.fn();
  var cleanupOnUnmount = jest.fn();
  var renderedComponent = (0, _enzyme.mount)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(WrapperComponent, { submit: mockSubmit, cleanupOnUnmount: cleanupOnUnmount })
  ));
  var wrappedComponent = renderedComponent.find(MockComponent);

  describe('<reSagaHOC />', function () {
    it('should render without exploding', function () {
      expect(renderedComponent).toBeDefined();
    });
    it('should render MockComponent', function () {
      expect(renderedComponent.find(MockComponent).length).toBe(1);
    });
    it('should render children', function () {
      var formName = 'FORM_NAME';
      var mockData = { hi: 'ho' };
      var func = function func(data) {
        return data;
      };

      var props = wrappedComponent.props();
      expect(_typeof(props.onSubmit)).toBe('function');
      expect(_typeof(props.resaga)).toBe('object');

      var resaga = props.resaga;
      expect(_typeof(resaga.analyse)).toBe('function');
      expect(_typeof(resaga.dispatch)).toBe('function');
      expect(_typeof(resaga.acknowledge)).toBe('function');
      expect(_typeof(resaga.setValue)).toBe('function');
      expect(_typeof(resaga.getValue)).toBe('function');
      expect(_typeof(resaga.isLoading)).toBe('function');

      expect(props.onSubmit(mockData, formName)).toEqual((0, _actions.submitForm)(mockData, options, formName));
      expect(resaga.dispatch(formName)).toEqual((0, _actions.submitForm)({}, options, formName));
      expect(resaga.acknowledge(formName)).toEqual((0, _actions.acknowledge)(options.page, formName));
      expect(resaga.cleanup(options.page)).toEqual((0, _actions.cleanup)(options.page));
      expect(resaga.setValue(key, value)).toEqual((0, _actions.setVariable)(options.page, key, value));
      expect(resaga.setValue(key, func)).toEqual((0, _actions.setVariableWithFunction)(options.page, key, func));
      expect(resaga.getValue(key)).toBe(value);
      expect(resaga.isLoading(formName)).toBe(false);

      _componentHelpers2.default.analyseNextProps = jest.fn();
      resaga.analyse(mockData, mockData);
      expect(_componentHelpers2.default.analyseNextProps).toBeCalledWith(mockData, mockData, resaga.acknowledge);
      _componentHelpers2.default.analyseNextProps.mockClear();
    });

    it('componentWillUnmount', function () {
      renderedComponent.unmount();
    });
    it('no store should return null', function () {
      var state = (0, _immutable.fromJS)({});
      var emptyStore = mockStore(state);
      var rendered = (0, _enzyme.mount)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: emptyStore },
        _react2.default.createElement(WrapperComponent, { submit: mockSubmit, cleanupOnUnmount: cleanupOnUnmount })
      ));
      var wrapped = rendered.find(MockComponent);
      var resaga = wrapped.props().resaga;
      expect(resaga.getValue(key)).toBe(null);
      expect(resaga.isLoading('FORM_NAME')).toBe(false);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vaW5kZXgudGVzdC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0Iiwid3JhcFJlZHVjZXIiLCJqZXN0IiwiZm4iLCJleHBlY3QiLCJ0b0JlQ2FsbGVkIiwibWlkZGxld2FyZXMiLCJtb2NrU3RvcmUiLCJQQUdFIiwia2V5IiwidmFsdWUiLCJpbml0aWFsU3RhdGUiLCJzdG9yZSIsIk1vY2tDb21wb25lbnQiLCJvcHRpb25zIiwicGFnZSIsIldyYXBwZXJDb21wb25lbnQiLCJtb2NrU3VibWl0IiwiY2xlYW51cE9uVW5tb3VudCIsInJlbmRlcmVkQ29tcG9uZW50Iiwid3JhcHBlZENvbXBvbmVudCIsImZpbmQiLCJ0b0JlRGVmaW5lZCIsImxlbmd0aCIsInRvQmUiLCJmb3JtTmFtZSIsIm1vY2tEYXRhIiwiaGkiLCJmdW5jIiwiZGF0YSIsInByb3BzIiwib25TdWJtaXQiLCJyZXNhZ2EiLCJhbmFseXNlIiwiZGlzcGF0Y2giLCJhY2tub3dsZWRnZSIsInNldFZhbHVlIiwiZ2V0VmFsdWUiLCJpc0xvYWRpbmciLCJ0b0VxdWFsIiwiY2xlYW51cCIsImFuYWx5c2VOZXh0UHJvcHMiLCJ0b0JlQ2FsbGVkV2l0aCIsIm1vY2tDbGVhciIsInVubW91bnQiLCJzdGF0ZSIsImVtcHR5U3RvcmUiLCJyZW5kZXJlZCIsIndyYXBwZWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBQSxTQUFTLG1CQUFULEVBQThCLFlBQU07QUFDbENDLEtBQUcsNEJBQUgsRUFBaUMsWUFBTTtBQUNyQyw2QkFBZUMsV0FBZixHQUE2QkMsS0FBS0MsRUFBTCxFQUE3QjtBQUNBO0FBQ0FDLFdBQU8seUJBQWVILFdBQXRCLEVBQW1DSSxVQUFuQztBQUNELEdBSkQ7QUFLRCxDQU5EO0FBT0FOLFNBQVMsMEJBQVQsRUFBcUMsWUFB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QWF2QyxVQUFVc0MsS0FBVixDQUFuQjtBQUNBLFVBQU1FLFdBQVcsbUJBQ2Y7QUFBQTtBQUFBLFVBQVUsT0FBT0QsVUFBakI7QUFDRSxzQ0FBQyxnQkFBRCxJQUFrQixRQUFRN0IsVUFBMUIsRUFBc0Msa0JBQWtCQyxnQkFBeEQ7QUFERixPQURlLENBQWpCO0FBS0EsVUFBTThCLFVBQVVELFNBQVMxQixJQUFULENBQWNSLGFBQWQsQ0FBaEI7QUFDQSxVQUFNbUIsU0FBU2dCLFFBQVFsQixLQUFSLEdBQWdCRSxNQUEvQjtBQUNBNUIsYUFBTzRCLE9BQU9LLFFBQVAsQ0FBZ0I1QixHQUFoQixDQUFQLEVBQTZCZSxJQUE3QixDQUFrQyxJQUFsQztBQUNBcEIsYUFBTzRCLE9BQU9NLFNBQVAsQ0FBaUIsV0FBakIsQ0FBUCxFQUFzQ2QsSUFBdEMsQ0FBMkMsS0FBM0M7QUFDRCxLQVpEO0FBYUQsR0F2REQ7QUF3REQsQ0F4RkQiLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vdW50IH0gZnJvbSAnZW56eW1lJztcbmltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAncmVkdXgtbW9jay1zdG9yZSc7XG5pbXBvcnQgeyBhY2tub3dsZWRnZSwgY2xlYW51cCwgc3VibWl0Rm9ybSwgc2V0VmFyaWFibGUsIHNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBTRVJWRVJfRVJST1IsIFNVQk1JVF9TVUNDRVNTLCBWQVJJQUJMRVMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHJlU2FnYUhPQywgeyByZWR1Y2VyIH0gZnJvbSAnLi4vaW5kZXgnO1xuaW1wb3J0IHJlZHVjZXJIZWxwZXJzIGZyb20gJy4uL3V0aWxzL3JlZHVjZXItaGVscGVycyc7XG5pbXBvcnQgY29tcG9uZW50IGZyb20gJy4uL3V0aWxzL2NvbXBvbmVudC1oZWxwZXJzJztcblxuZGVzY3JpYmUoJ3JlU2FnYUhPQy5yZWR1Y2VyJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIGJlIGNhbGxlZCBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgcmVkdWNlckhlbHBlcnMud3JhcFJlZHVjZXIgPSBqZXN0LmZuKCk7XG4gICAgcmVkdWNlcigpO1xuICAgIGV4cGVjdChyZWR1Y2VySGVscGVycy53cmFwUmVkdWNlcikudG9CZUNhbGxlZCgpO1xuICB9KTtcbn0pO1xuZGVzY3JpYmUoJ3V0aWxzL2hvYy9vblN1Ym1pdC9pbmRleCcsICgpID0+IHtcbiAgY29uc3QgbWlkZGxld2FyZXMgPSBbXTtcbiAgY29uc3QgbW9ja1N0b3JlID0gY29uZmlndXJlU3RvcmUobWlkZGxld2FyZXMpO1xuXG4gIGNvbnN0IFBBR0UgPSAnbW9ja1Rlc3RQYWdlJztcbiAgY29uc3Qga2V5ID0gJ2tleXl5eSc7XG4gIGNvbnN0IHZhbHVlID0gJ2tleXl5eSc7XG5cbi8vIEluaXRpYWxpemUgbW9ja3N0b3JlIHdpdGggZW1wdHkgc3RhdGVcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0gZnJvbUpTKHtcbiAgICBbUEFHRV06IGZyb21KUyh7XG4gICAgICBbVkFSSUFCTEVTXToge1xuICAgICAgICBba2V5XTogdmFsdWUsXG4gICAgICB9LFxuICAgICAgW1NFUlZFUl9FUlJPUl06ICcnLFxuICAgICAgW1NVQk1JVF9TVUNDRVNTXTogZmFsc2UsXG4gICAgfSksXG4gIH0pO1xuICBjb25zdCBzdG9yZSA9IG1vY2tTdG9yZShpbml0aWFsU3RhdGUpO1xuICBjb25zdCBNb2NrQ29tcG9uZW50ID0gKCkgPT4gPGRpdj5IZWxsbzwvZGl2PjtcbiAgY29uc3Qgb3B0aW9ucyA9IHsgcGFnZTogUEFHRSB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgV3JhcHBlckNvbXBvbmVudCA9IHJlU2FnYUhPQyhNb2NrQ29tcG9uZW50LCBvcHRpb25zKTtcbiAgY29uc3QgbW9ja1N1Ym1pdCA9IGplc3QuZm4oKTtcbiAgY29uc3QgY2xlYW51cE9uVW5tb3VudCA9IGplc3QuZm4oKTtcbiAgY29uc3QgcmVuZGVyZWRDb21wb25lbnQgPSBtb3VudChcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxXcmFwcGVyQ29tcG9uZW50IHN1Ym1pdD17bW9ja1N1Ym1pdH0gY2xlYW51cE9uVW5tb3VudD17Y2xlYW51cE9uVW5tb3VudH0gLz5cbiAgICA8L1Byb3ZpZGVyPlxuICApO1xuICBjb25zdCB3cmFwcGVkQ29tcG9uZW50ID0gcmVuZGVyZWRDb21wb25lbnQuZmluZChNb2NrQ29tcG9uZW50KTtcblxuICBkZXNjcmliZSgnPHJlU2FnYUhPQyAvPicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJlbmRlciB3aXRob3V0IGV4cGxvZGluZycsICgpID0+IHtcbiAgICAgIGV4cGVjdChyZW5kZXJlZENvbXBvbmVudCkudG9CZURlZmluZWQoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlbmRlciBNb2NrQ29tcG9uZW50JywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHJlbmRlcmVkQ29tcG9uZW50LmZpbmQoTW9ja0NvbXBvbmVudCkubGVuZ3RoKS50b0JlKDEpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVuZGVyIGNoaWxkcmVuJywgKCkgPT4ge1xuICAgICAgY29uc3QgZm9ybU5hbWUgPSAnRk9STV9OQU1FJztcbiAgICAgIGNvbnN0IG1vY2tEYXRhID0geyBoaTogJ2hvJyB9O1xuICAgICAgY29uc3QgZnVuYyA9IChkYXRhKSA9PiBkYXRhO1xuXG4gICAgICBjb25zdCBwcm9wcyA9IHdyYXBwZWRDb21wb25lbnQucHJvcHMoKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgcHJvcHMub25TdWJtaXQpLnRvQmUoJ2Z1bmN0aW9uJyk7XG4gICAgICBleHBlY3QodHlwZW9mIHByb3BzLnJlc2FnYSkudG9CZSgnb2JqZWN0Jyk7XG5cbiAgICAgIGNvbnN0IHJlc2FnYSA9IHByb3BzLnJlc2FnYTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgcmVzYWdhLmFuYWx5c2UpLnRvQmUoJ2Z1bmN0aW9uJyk7XG4gICAgICBleHBlY3QodHlwZW9mIHJlc2FnYS5kaXNwYXRjaCkudG9CZSgnZnVuY3Rpb24nKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgcmVzYWdhLmFja25vd2xlZGdlKS50b0JlKCdmdW5jdGlvbicpO1xuICAgICAgZXhwZWN0KHR5cGVvZiByZXNhZ2Euc2V0VmFsdWUpLnRvQmUoJ2Z1bmN0aW9uJyk7XG4gICAgICBleHBlY3QodHlwZW9mIHJlc2FnYS5nZXRWYWx1ZSkudG9CZSgnZnVuY3Rpb24nKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgcmVzYWdhLmlzTG9hZGluZykudG9CZSgnZnVuY3Rpb24nKTtcblxuICAgICAgZXhwZWN0KHByb3BzLm9uU3VibWl0KG1vY2tEYXRhLCBmb3JtTmFtZSkpLnRvRXF1YWwoc3VibWl0Rm9ybShtb2NrRGF0YSwgb3B0aW9ucywgZm9ybU5hbWUpKTtcbiAgICAgIGV4cGVjdChyZXNhZ2EuZGlzcGF0Y2goZm9ybU5hbWUpKS50b0VxdWFsKHN1Ym1pdEZvcm0oe30sIG9wdGlvbnMsIGZvcm1OYW1lKSk7XG4gICAgICBleHBlY3QocmVzYWdhLmFja25vd2xlZGdlKGZvcm1OYW1lKSkudG9FcXVhbChhY2tub3dsZWRnZShvcHRpb25zLnBhZ2UsIGZvcm1OYW1lKSk7XG4gICAgICBleHBlY3QocmVzYWdhLmNsZWFudXAob3B0aW9ucy5wYWdlKSkudG9FcXVhbChjbGVhbnVwKG9wdGlvbnMucGFnZSkpO1xuICAgICAgZXhwZWN0KHJlc2FnYS5zZXRWYWx1ZShrZXksIHZhbHVlKSkudG9FcXVhbChzZXRWYXJpYWJsZShvcHRpb25zLnBhZ2UsIGtleSwgdmFsdWUpKTtcbiAgICAgIGV4cGVjdChyZXNhZ2Euc2V0VmFsdWUoa2V5LCBmdW5jKSkudG9FcXVhbChzZXRWYXJpYWJsZVdpdGhGdW5jdGlvbihvcHRpb25zLnBhZ2UsIGtleSwgZnVuYykpO1xuICAgICAgZXhwZWN0KHJlc2FnYS5nZXRWYWx1ZShrZXkpKS50b0JlKHZhbHVlKTtcbiAgICAgIGV4cGVjdChyZXNhZ2EuaXNMb2FkaW5nKGZvcm1OYW1lKSkudG9CZShmYWxzZSk7XG5cbiAgICAgIGNvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzID0gamVzdC5mbigpO1xuICAgICAgcmVzYWdhLmFuYWx5c2UobW9ja0RhdGEsIG1vY2tEYXRhKTtcbiAgICAgIGV4cGVjdChjb21wb25lbnQuYW5hbHlzZU5leHRQcm9wcykudG9CZUNhbGxlZFdpdGgobW9ja0RhdGEsIG1vY2tEYXRhLCByZXNhZ2EuYWNrbm93bGVkZ2UpO1xuICAgICAgY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMubW9ja0NsZWFyKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY29tcG9uZW50V2lsbFVubW91bnQnLCAoKSA9PiB7XG4gICAgICByZW5kZXJlZENvbXBvbmVudC51bm1vdW50KCk7XG4gICAgfSk7XG4gICAgaXQoJ25vIHN0b3JlIHNob3VsZCByZXR1cm4gbnVsbCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gZnJvbUpTKHt9KTtcbiAgICAgIGNvbnN0IGVtcHR5U3RvcmUgPSBtb2NrU3RvcmUoc3RhdGUpO1xuICAgICAgY29uc3QgcmVuZGVyZWQgPSBtb3VudChcbiAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtlbXB0eVN0b3JlfT5cbiAgICAgICAgICA8V3JhcHBlckNvbXBvbmVudCBzdWJtaXQ9e21vY2tTdWJtaXR9IGNsZWFudXBPblVubW91bnQ9e2NsZWFudXBPblVubW91bnR9IC8+XG4gICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICApO1xuICAgICAgY29uc3Qgd3JhcHBlZCA9IHJlbmRlcmVkLmZpbmQoTW9ja0NvbXBvbmVudCk7XG4gICAgICBjb25zdCByZXNhZ2EgPSB3cmFwcGVkLnByb3BzKCkucmVzYWdhO1xuICAgICAgZXhwZWN0KHJlc2FnYS5nZXRWYWx1ZShrZXkpKS50b0JlKG51bGwpO1xuICAgICAgZXhwZWN0KHJlc2FnYS5pc0xvYWRpbmcoJ0ZPUk1fTkFNRScpKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuIl19