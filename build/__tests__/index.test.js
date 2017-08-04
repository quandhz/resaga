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

      expect(props.onSubmit(mockData, formName)).toEqual((0, _actions.submitForm)(mockData, options, formName));
      expect(props.onSubmit(mockData, formName)).toEqual((0, _actions.submitForm)(mockData, options, formName));
      expect(resaga.dispatch(formName)).toEqual((0, _actions.submitForm)({}, options, formName));
      expect(resaga.acknowledge(formName)).toEqual((0, _actions.acknowledge)(options.page, formName));
      expect(resaga.cleanup(options.page)).toEqual((0, _actions.cleanup)(options.page));
      expect(resaga.setValue(key, value)).toEqual((0, _actions.setVariable)(options.page, key, value));
      expect(resaga.setValue(key, func)).toEqual((0, _actions.setVariableWithFunction)(options.page, key, func));
      expect(resaga.getValue(key)).toBe(value);

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
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vaW5kZXgudGVzdC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0Iiwid3JhcFJlZHVjZXIiLCJqZXN0IiwiZm4iLCJleHBlY3QiLCJ0b0JlQ2FsbGVkIiwibWlkZGxld2FyZXMiLCJtb2NrU3RvcmUiLCJQQUdFIiwia2V5IiwidmFsdWUiLCJpbml0aWFsU3RhdGUiLCJzdG9yZSIsIk1vY2tDb21wb25lbnQiLCJvcHRpb25zIiwicGFnZSIsIldyYXBwZXJDb21wb25lbnQiLCJtb2NrU3VibWl0IiwiY2xlYW51cE9uVW5tb3VudCIsInJlbmRlcmVkQ29tcG9uZW50Iiwid3JhcHBlZENvbXBvbmVudCIsImZpbmQiLCJ0b0JlRGVmaW5lZCIsImxlbmd0aCIsInRvQmUiLCJmb3JtTmFtZSIsIm1vY2tEYXRhIiwiaGkiLCJmdW5jIiwiZGF0YSIsInByb3BzIiwib25TdWJtaXQiLCJyZXNhZ2EiLCJhbmFseXNlIiwiZGlzcGF0Y2giLCJhY2tub3dsZWRnZSIsInNldFZhbHVlIiwiZ2V0VmFsdWUiLCJ0b0VxdWFsIiwiY2xlYW51cCIsImFuYWx5c2VOZXh0UHJvcHMiLCJ0b0JlQ2FsbGVkV2l0aCIsIm1vY2tDbGVhciIsInVubW91bnQiLCJzdGF0ZSIsImVtcHR5U3RvcmUiLCJyZW5kZXJlZCIsIndyYXBwZWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBQSxTQUFTLG1CQUFULEVBQThCLFlBQU07QUFDbENDLEtBQUcsNEJBQUgsRUFBaUMsWUFBTTtBQUNyQyw2QkFBZUMsV0FBZixHQUE2QkMsS0FBS0MsRUFBTCxFQUE3QjtBQUNBO0FBQ0FDLFdBQU8seUJBQWVILFdBQXRCLEVBQW1DSSxVQUFuQztBQUNELEdBSkQ7QUFLRCxDQU5EO0FBT0FOLFNBQVMsMEJBQVQsRUFBcUMsWUFBTTtBQUFBOztBQUN6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VixDQUFuQjtBQUNBLFVBQU1FLFdBQVcsbUJBQ2Y7QUFBQTtBQUFBLFVBQVUsT0FBT0QsVUFBakI7QUFDRSxzQ0FBQyxnQkFBRCxJQUFrQixRQUFRNUIsVUFBMUIsRUFBc0Msa0JBQWtCQyxnQkFBeEQ7QUFERixPQURlLENBQWpCO0FBS0EsVUFBTTZCLFVBQVVELFNBQVN6QixJQUFULENBQWNSLGFBQWQsQ0FBaEI7QUFDQSxVQUFNbUIsU0FBU2UsUUFBUWpCLEtBQVIsR0FBZ0JFLE1BQS9CO0FBQ0E1QixhQUFPNEIsT0FBT0ssUUFBUCxDQUFnQjVCLEdBQWhCLENBQVAsRUFBNkJlLElBQTdCLENBQWtDLElBQWxDO0FBQ0QsS0FYRDtBQVlELEdBckREO0FBc0RELENBdEZEIiwiZmlsZSI6ImluZGV4LnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtb3VudCB9IGZyb20gJ2VuenltZSc7XG5pbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJ3JlZHV4LW1vY2stc3RvcmUnO1xuaW1wb3J0IHsgYWNrbm93bGVkZ2UsIGNsZWFudXAsIHN1Ym1pdEZvcm0sIHNldFZhcmlhYmxlLCBzZXRWYXJpYWJsZVdpdGhGdW5jdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgU0VSVkVSX0VSUk9SLCBTVUJNSVRfU1VDQ0VTUywgVkFSSUFCTEVTIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCByZVNhZ2FIT0MsIHsgcmVkdWNlciB9IGZyb20gJy4uL2luZGV4JztcbmltcG9ydCByZWR1Y2VySGVscGVycyBmcm9tICcuLi91dGlscy9yZWR1Y2VyLWhlbHBlcnMnO1xuaW1wb3J0IGNvbXBvbmVudCBmcm9tICcuLi91dGlscy9jb21wb25lbnQtaGVscGVycyc7XG5cbmRlc2NyaWJlKCdyZVNhZ2FIT0MucmVkdWNlcicsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBiZSBjYWxsZWQgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIHJlZHVjZXJIZWxwZXJzLndyYXBSZWR1Y2VyID0gamVzdC5mbigpO1xuICAgIHJlZHVjZXIoKTtcbiAgICBleHBlY3QocmVkdWNlckhlbHBlcnMud3JhcFJlZHVjZXIpLnRvQmVDYWxsZWQoKTtcbiAgfSk7XG59KTtcbmRlc2NyaWJlKCd1dGlscy9ob2Mvb25TdWJtaXQvaW5kZXgnLCAoKSA9PiB7XG4gIGNvbnN0IG1pZGRsZXdhcmVzID0gW107XG4gIGNvbnN0IG1vY2tTdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKG1pZGRsZXdhcmVzKTtcblxuICBjb25zdCBQQUdFID0gJ21vY2tUZXN0UGFnZSc7XG4gIGNvbnN0IGtleSA9ICdrZXl5eXknO1xuICBjb25zdCB2YWx1ZSA9ICdrZXl5eXknO1xuXG4vLyBJbml0aWFsaXplIG1vY2tzdG9yZSB3aXRoIGVtcHR5IHN0YXRlXG4gIGNvbnN0IGluaXRpYWxTdGF0ZSA9IGZyb21KUyh7XG4gICAgW1BBR0VdOiBmcm9tSlMoe1xuICAgICAgW1ZBUklBQkxFU106IHtcbiAgICAgICAgW2tleV06IHZhbHVlLFxuICAgICAgfSxcbiAgICAgIFtTRVJWRVJfRVJST1JdOiAnJyxcbiAgICAgIFtTVUJNSVRfU1VDQ0VTU106IGZhbHNlLFxuICAgIH0pLFxuICB9KTtcbiAgY29uc3Qgc3RvcmUgPSBtb2NrU3RvcmUoaW5pdGlhbFN0YXRlKTtcbiAgY29uc3QgTW9ja0NvbXBvbmVudCA9ICgpID0+IDxkaXY+SGVsbG88L2Rpdj47XG4gIGNvbnN0IG9wdGlvbnMgPSB7IHBhZ2U6IFBBR0UgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGNvbnN0IFdyYXBwZXJDb21wb25lbnQgPSByZVNhZ2FIT0MoTW9ja0NvbXBvbmVudCwgb3B0aW9ucyk7XG4gIGNvbnN0IG1vY2tTdWJtaXQgPSBqZXN0LmZuKCk7XG4gIGNvbnN0IGNsZWFudXBPblVubW91bnQgPSBqZXN0LmZuKCk7XG4gIGNvbnN0IHJlbmRlcmVkQ29tcG9uZW50ID0gbW91bnQoXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICA8V3JhcHBlckNvbXBvbmVudCBzdWJtaXQ9e21vY2tTdWJtaXR9IGNsZWFudXBPblVubW91bnQ9e2NsZWFudXBPblVubW91bnR9IC8+XG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcbiAgY29uc3Qgd3JhcHBlZENvbXBvbmVudCA9IHJlbmRlcmVkQ29tcG9uZW50LmZpbmQoTW9ja0NvbXBvbmVudCk7XG5cbiAgZGVzY3JpYmUoJzxyZVNhZ2FIT0MgLz4nLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZW5kZXIgd2l0aG91dCBleHBsb2RpbmcnLCAoKSA9PiB7XG4gICAgICBleHBlY3QocmVuZGVyZWRDb21wb25lbnQpLnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZW5kZXIgTW9ja0NvbXBvbmVudCcsICgpID0+IHtcbiAgICAgIGV4cGVjdChyZW5kZXJlZENvbXBvbmVudC5maW5kKE1vY2tDb21wb25lbnQpLmxlbmd0aCkudG9CZSgxKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlbmRlciBjaGlsZHJlbicsICgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1OYW1lID0gJ0ZPUk1fTkFNRSc7XG4gICAgICBjb25zdCBtb2NrRGF0YSA9IHsgaGk6ICdobycgfTtcbiAgICAgIGNvbnN0IGZ1bmMgPSAoZGF0YSkgPT4gZGF0YTtcblxuICAgICAgY29uc3QgcHJvcHMgPSB3cmFwcGVkQ29tcG9uZW50LnByb3BzKCk7XG4gICAgICBleHBlY3QodHlwZW9mIHByb3BzLm9uU3VibWl0KS50b0JlKCdmdW5jdGlvbicpO1xuICAgICAgZXhwZWN0KHR5cGVvZiBwcm9wcy5yZXNhZ2EpLnRvQmUoJ29iamVjdCcpO1xuXG4gICAgICBjb25zdCByZXNhZ2EgPSBwcm9wcy5yZXNhZ2E7XG4gICAgICBleHBlY3QodHlwZW9mIHJlc2FnYS5hbmFseXNlKS50b0JlKCdmdW5jdGlvbicpO1xuICAgICAgZXhwZWN0KHR5cGVvZiByZXNhZ2EuZGlzcGF0Y2gpLnRvQmUoJ2Z1bmN0aW9uJyk7XG4gICAgICBleHBlY3QodHlwZW9mIHJlc2FnYS5hY2tub3dsZWRnZSkudG9CZSgnZnVuY3Rpb24nKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgcmVzYWdhLnNldFZhbHVlKS50b0JlKCdmdW5jdGlvbicpO1xuICAgICAgZXhwZWN0KHR5cGVvZiByZXNhZ2EuZ2V0VmFsdWUpLnRvQmUoJ2Z1bmN0aW9uJyk7XG5cbiAgICAgIGV4cGVjdChwcm9wcy5vblN1Ym1pdChtb2NrRGF0YSwgZm9ybU5hbWUpKS50b0VxdWFsKHN1Ym1pdEZvcm0obW9ja0RhdGEsIG9wdGlvbnMsIGZvcm1OYW1lKSk7XG4gICAgICBleHBlY3QocHJvcHMub25TdWJtaXQobW9ja0RhdGEsIGZvcm1OYW1lKSkudG9FcXVhbChzdWJtaXRGb3JtKG1vY2tEYXRhLCBvcHRpb25zLCBmb3JtTmFtZSkpO1xuICAgICAgZXhwZWN0KHJlc2FnYS5kaXNwYXRjaChmb3JtTmFtZSkpLnRvRXF1YWwoc3VibWl0Rm9ybSh7fSwgb3B0aW9ucywgZm9ybU5hbWUpKTtcbiAgICAgIGV4cGVjdChyZXNhZ2EuYWNrbm93bGVkZ2UoZm9ybU5hbWUpKS50b0VxdWFsKGFja25vd2xlZGdlKG9wdGlvbnMucGFnZSwgZm9ybU5hbWUpKTtcbiAgICAgIGV4cGVjdChyZXNhZ2EuY2xlYW51cChvcHRpb25zLnBhZ2UpKS50b0VxdWFsKGNsZWFudXAob3B0aW9ucy5wYWdlKSk7XG4gICAgICBleHBlY3QocmVzYWdhLnNldFZhbHVlKGtleSwgdmFsdWUpKS50b0VxdWFsKHNldFZhcmlhYmxlKG9wdGlvbnMucGFnZSwga2V5LCB2YWx1ZSkpO1xuICAgICAgZXhwZWN0KHJlc2FnYS5zZXRWYWx1ZShrZXksIGZ1bmMpKS50b0VxdWFsKHNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uKG9wdGlvbnMucGFnZSwga2V5LCBmdW5jKSk7XG4gICAgICBleHBlY3QocmVzYWdhLmdldFZhbHVlKGtleSkpLnRvQmUodmFsdWUpO1xuXG4gICAgICBjb21wb25lbnQuYW5hbHlzZU5leHRQcm9wcyA9IGplc3QuZm4oKTtcbiAgICAgIHJlc2FnYS5hbmFseXNlKG1vY2tEYXRhLCBtb2NrRGF0YSk7XG4gICAgICBleHBlY3QoY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMpLnRvQmVDYWxsZWRXaXRoKG1vY2tEYXRhLCBtb2NrRGF0YSwgcmVzYWdhLmFja25vd2xlZGdlKTtcbiAgICAgIGNvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzLm1vY2tDbGVhcigpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NvbXBvbmVudFdpbGxVbm1vdW50JywgKCkgPT4ge1xuICAgICAgcmVuZGVyZWRDb21wb25lbnQudW5tb3VudCgpO1xuICAgIH0pO1xuICAgIGl0KCdubyBzdG9yZSBzaG91bGQgcmV0dXJuIG51bGwnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGZyb21KUyh7fSk7XG4gICAgICBjb25zdCBlbXB0eVN0b3JlID0gbW9ja1N0b3JlKHN0YXRlKTtcbiAgICAgIGNvbnN0IHJlbmRlcmVkID0gbW91bnQoXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17ZW1wdHlTdG9yZX0+XG4gICAgICAgICAgPFdyYXBwZXJDb21wb25lbnQgc3VibWl0PXttb2NrU3VibWl0fSBjbGVhbnVwT25Vbm1vdW50PXtjbGVhbnVwT25Vbm1vdW50fSAvPlxuICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgKTtcbiAgICAgIGNvbnN0IHdyYXBwZWQgPSByZW5kZXJlZC5maW5kKE1vY2tDb21wb25lbnQpO1xuICAgICAgY29uc3QgcmVzYWdhID0gd3JhcHBlZC5wcm9wcygpLnJlc2FnYTtcbiAgICAgIGV4cGVjdChyZXNhZ2EuZ2V0VmFsdWUoa2V5KSkudG9CZShudWxsKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuIl19