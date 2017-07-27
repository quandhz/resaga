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

  // Initialize mockstore with empty state
  var initialState = (0, _immutable.fromJS)(_defineProperty({}, PAGE, (0, _immutable.fromJS)((_fromJS = {}, _defineProperty(_fromJS, _constants.SERVER_ERROR, ''), _defineProperty(_fromJS, _constants.SUBMIT_SUCCESS, false), _fromJS))));
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

      var props = wrappedComponent.props();
      expect(_typeof(props.onSubmit)).toBe('function');
      expect(_typeof(props.resaga)).toBe('object');

      var resaga = props.resaga;
      expect(_typeof(resaga.analyse)).toBe('function');
      expect(_typeof(resaga.dispatch)).toBe('function');
      expect(_typeof(resaga.acknowledge)).toBe('function');

      expect(props.onSubmit(mockData, formName)).toEqual((0, _actions.submitForm)(mockData, options, formName));
      expect(resaga.dispatch(formName)).toEqual((0, _actions.submitForm)({}, options, formName));
      expect(resaga.acknowledge(formName)).toEqual((0, _actions.acknowledge)(options.page, formName));
      expect(resaga.cleanup(options.page)).toEqual((0, _actions.cleanup)(options.page));

      _componentHelpers2.default.analyseNextProps = jest.fn();
      resaga.analyse(mockData, mockData);
      expect(_componentHelpers2.default.analyseNextProps).toBeCalledWith(mockData, mockData, resaga.acknowledge);
      _componentHelpers2.default.analyseNextProps.mockClear();
    });

    it('componentWillUnmount', function () {
      renderedComponent.unmount();
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vaW5kZXgudGVzdC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0Iiwid3JhcFJlZHVjZXIiLCJqZXN0IiwiZm4iLCJleHBlY3QiLCJ0b0JlQ2FsbGVkIiwibWlkZGxld2FyZXMiLCJtb2NrU3RvcmUiLCJQQUdFIiwiaW5pdGlhbFN0YXRlIiwic3RvcmUiLCJNb2NrQ29tcG9uZW50Iiwib3B0aW9ucyIsInBhZ2UiLCJXcmFwcGVyQ29tcG9uZW50IiwibW9ja1N1Ym1pdCIsImNsZWFudXBPblVubW91bnQiLCJyZW5kZXJlZENvbXBvbmVudCIsIndyYXBwZWRDb21wb25lbnQiLCJmaW5kIiwidG9CZURlZmluZWQiLCJsZW5ndGgiLCJ0b0JlIiwiZm9ybU5hbWUiLCJtb2NrRGF0YSIsImhpIiwicHJvcHMiLCJvblN1Ym1pdCIsInJlc2FnYSIsImFuYWx5c2UiLCJkaXNwYXRjaCIsImFja25vd2xlZGdlIiwidG9FcXVhbCIsImNsZWFudXAiLCJhbmFseXNlTmV4dFByb3BzIiwidG9CZUNhbGxlZFdpdGgiLCJtb2NrQ2xlYXIiLCJ1bm1vdW50Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQUEsU0FBUyxtQkFBVCxFQUE4QixZQUFNO0FBQ2xDQyxLQUFHLDRCQUFILEVBQWlDLFlBQU07QUFDckMsNkJBQWVDLFdBQWYsR0FBNkJDLEtBQUtDLEVBQUwsRUFBN0I7QUFDQTtBQUNBQyxXQUFPLHlCQUFlSCxXQUF0QixFQUFtQ0ksVUFBbkM7QUFDRCxHQUpEO0FBS0QsQ0FORDtBQU9BTixTQUFTLDBCQUFULEVBQXFDLFlBQU07QUFBQTs7QUFDekMsTUFBTU8sY0FBYyxFQUFwQjtBQUNBLE1BQU1DLFlBQVksOEJBQWVELFdBQWYsQ0FBbEI7O0FBRUEsTUFBTUUsT0FBTyxjQUFiOztBQUVGO0FBQ0UsTUFBTUMs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QUFNO0FBQy9CaUIsd0JBQWtCb0IsT0FBbEI7QUFDRCxLQUZEO0FBR0QsR0FsQ0Q7QUFtQ0QsQ0E5REQiLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vdW50IH0gZnJvbSAnZW56eW1lJztcbmltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAncmVkdXgtbW9jay1zdG9yZSc7XG5pbXBvcnQgeyBhY2tub3dsZWRnZSwgY2xlYW51cCwgc3VibWl0Rm9ybSB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgU0VSVkVSX0VSUk9SLCBTVUJNSVRfU1VDQ0VTUyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgcmVTYWdhSE9DLCB7IHJlZHVjZXIgfSBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgcmVkdWNlckhlbHBlcnMgZnJvbSAnLi4vdXRpbHMvcmVkdWNlci1oZWxwZXJzJztcbmltcG9ydCBjb21wb25lbnQgZnJvbSAnLi4vdXRpbHMvY29tcG9uZW50LWhlbHBlcnMnO1xuXG5kZXNjcmliZSgncmVTYWdhSE9DLnJlZHVjZXInLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgYmUgY2FsbGVkIGNvcnJlY3RseScsICgpID0+IHtcbiAgICByZWR1Y2VySGVscGVycy53cmFwUmVkdWNlciA9IGplc3QuZm4oKTtcbiAgICByZWR1Y2VyKCk7XG4gICAgZXhwZWN0KHJlZHVjZXJIZWxwZXJzLndyYXBSZWR1Y2VyKS50b0JlQ2FsbGVkKCk7XG4gIH0pO1xufSk7XG5kZXNjcmliZSgndXRpbHMvaG9jL29uU3VibWl0L2luZGV4JywgKCkgPT4ge1xuICBjb25zdCBtaWRkbGV3YXJlcyA9IFtdO1xuICBjb25zdCBtb2NrU3RvcmUgPSBjb25maWd1cmVTdG9yZShtaWRkbGV3YXJlcyk7XG5cbiAgY29uc3QgUEFHRSA9ICdtb2NrVGVzdFBhZ2UnO1xuXG4vLyBJbml0aWFsaXplIG1vY2tzdG9yZSB3aXRoIGVtcHR5IHN0YXRlXG4gIGNvbnN0IGluaXRpYWxTdGF0ZSA9IGZyb21KUyh7XG4gICAgW1BBR0VdOiBmcm9tSlMoe1xuICAgICAgW1NFUlZFUl9FUlJPUl06ICcnLFxuICAgICAgW1NVQk1JVF9TVUNDRVNTXTogZmFsc2UsXG4gICAgfSksXG4gIH0pO1xuICBjb25zdCBzdG9yZSA9IG1vY2tTdG9yZShpbml0aWFsU3RhdGUpO1xuICBjb25zdCBNb2NrQ29tcG9uZW50ID0gKCkgPT4gPGRpdj5IZWxsbzwvZGl2PjtcbiAgY29uc3Qgb3B0aW9ucyA9IHsgcGFnZTogUEFHRSB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgV3JhcHBlckNvbXBvbmVudCA9IHJlU2FnYUhPQyhNb2NrQ29tcG9uZW50LCBvcHRpb25zKTtcbiAgY29uc3QgbW9ja1N1Ym1pdCA9IGplc3QuZm4oKTtcbiAgY29uc3QgY2xlYW51cE9uVW5tb3VudCA9IGplc3QuZm4oKTtcbiAgY29uc3QgcmVuZGVyZWRDb21wb25lbnQgPSBtb3VudChcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxXcmFwcGVyQ29tcG9uZW50IHN1Ym1pdD17bW9ja1N1Ym1pdH0gY2xlYW51cE9uVW5tb3VudD17Y2xlYW51cE9uVW5tb3VudH0gLz5cbiAgICA8L1Byb3ZpZGVyPlxuICApO1xuICBjb25zdCB3cmFwcGVkQ29tcG9uZW50ID0gcmVuZGVyZWRDb21wb25lbnQuZmluZChNb2NrQ29tcG9uZW50KTtcblxuICBkZXNjcmliZSgnPHJlU2FnYUhPQyAvPicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJlbmRlciB3aXRob3V0IGV4cGxvZGluZycsICgpID0+IHtcbiAgICAgIGV4cGVjdChyZW5kZXJlZENvbXBvbmVudCkudG9CZURlZmluZWQoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlbmRlciBNb2NrQ29tcG9uZW50JywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHJlbmRlcmVkQ29tcG9uZW50LmZpbmQoTW9ja0NvbXBvbmVudCkubGVuZ3RoKS50b0JlKDEpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVuZGVyIGNoaWxkcmVuJywgKCkgPT4ge1xuICAgICAgY29uc3QgZm9ybU5hbWUgPSAnRk9STV9OQU1FJztcbiAgICAgIGNvbnN0IG1vY2tEYXRhID0geyBoaTogJ2hvJyB9O1xuXG4gICAgICBjb25zdCBwcm9wcyA9IHdyYXBwZWRDb21wb25lbnQucHJvcHMoKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgcHJvcHMub25TdWJtaXQpLnRvQmUoJ2Z1bmN0aW9uJyk7XG4gICAgICBleHBlY3QodHlwZW9mIHByb3BzLnJlc2FnYSkudG9CZSgnb2JqZWN0Jyk7XG5cbiAgICAgIGNvbnN0IHJlc2FnYSA9IHByb3BzLnJlc2FnYTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgcmVzYWdhLmFuYWx5c2UpLnRvQmUoJ2Z1bmN0aW9uJyk7XG4gICAgICBleHBlY3QodHlwZW9mIHJlc2FnYS5kaXNwYXRjaCkudG9CZSgnZnVuY3Rpb24nKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgcmVzYWdhLmFja25vd2xlZGdlKS50b0JlKCdmdW5jdGlvbicpO1xuXG4gICAgICBleHBlY3QocHJvcHMub25TdWJtaXQobW9ja0RhdGEsIGZvcm1OYW1lKSkudG9FcXVhbChzdWJtaXRGb3JtKG1vY2tEYXRhLCBvcHRpb25zLCBmb3JtTmFtZSkpO1xuICAgICAgZXhwZWN0KHJlc2FnYS5kaXNwYXRjaChmb3JtTmFtZSkpLnRvRXF1YWwoc3VibWl0Rm9ybSh7fSwgb3B0aW9ucywgZm9ybU5hbWUpKTtcbiAgICAgIGV4cGVjdChyZXNhZ2EuYWNrbm93bGVkZ2UoZm9ybU5hbWUpKS50b0VxdWFsKGFja25vd2xlZGdlKG9wdGlvbnMucGFnZSwgZm9ybU5hbWUpKTtcbiAgICAgIGV4cGVjdChyZXNhZ2EuY2xlYW51cChvcHRpb25zLnBhZ2UpKS50b0VxdWFsKGNsZWFudXAob3B0aW9ucy5wYWdlKSk7XG5cbiAgICAgIGNvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzID0gamVzdC5mbigpO1xuICAgICAgcmVzYWdhLmFuYWx5c2UobW9ja0RhdGEsIG1vY2tEYXRhKTtcbiAgICAgIGV4cGVjdChjb21wb25lbnQuYW5hbHlzZU5leHRQcm9wcykudG9CZUNhbGxlZFdpdGgobW9ja0RhdGEsIG1vY2tEYXRhLCByZXNhZ2EuYWNrbm93bGVkZ2UpO1xuICAgICAgY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMubW9ja0NsZWFyKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY29tcG9uZW50V2lsbFVubW91bnQnLCAoKSA9PiB7XG4gICAgICByZW5kZXJlZENvbXBvbmVudC51bm1vdW50KCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbiJdfQ==