'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _enzyme = require('enzyme');

var _expect = require('expect');

var expect = _interopRequireWildcard(_expect);

var _immutable = require('immutable');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _proc = require('redux-saga/src/internal/proc');

var _proc2 = _interopRequireDefault(_proc);

var _actions = require('../actions');

var _constants = require('../constants');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _componentHelpers = require('../utils/component-helpers');

var _componentHelpers2 = _interopRequireDefault(_componentHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by quando on 7/3/17.
                                                                                                                                                                                                                   */

// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars


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
  var mockSubmit = _proc2.default.fn();
  var cleanupOnUnmount = _proc2.default.fn();
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

      _componentHelpers2.default.analyseNextProps = _proc2.default.fn();
      resaga.analyse(mockData, mockData);
      expect(_componentHelpers2.default.analyseNextProps).toBeCalledWith(mockData, mockData, resaga.acknowledge);
      _componentHelpers2.default.analyseNextProps.mockClear();
    });

    it('componentWillUnmount', function () {
      renderedComponent.unmount();
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vaW5kZXgudGVzdC5qcyJdLCJuYW1lcyI6WyJleHBlY3QiLCJkZXNjcmliZSIsIm1pZGRsZXdhcmVzIiwibW9ja1N0b3JlIiwiUEFHRSIsImluaXRpYWxTdGF0ZSIsInN0b3JlIiwiTW9ja0NvbXBvbmVudCIsIm9wdGlvbnMiLCJwYWdlIiwiV3JhcHBlckNvbXBvbmVudCIsIm1vY2tTdWJtaXQiLCJmbiIsImNsZWFudXBPblVubW91bnQiLCJyZW5kZXJlZENvbXBvbmVudCIsIndyYXBwZWRDb21wb25lbnQiLCJmaW5kIiwiaXQiLCJ0b0JlRGVmaW5lZCIsImxlbmd0aCIsInRvQmUiLCJmb3JtTmFtZSIsIm1vY2tEYXRhIiwiaGkiLCJwcm9wcyIsIm9uU3VibWl0IiwicmVzYWdhIiwiYW5hbHlzZSIsImRpc3BhdGNoIiwiYWNrbm93bGVkZ2UiLCJ0b0VxdWFsIiwiY2xlYW51cCIsImFuYWx5c2VOZXh0UHJvcHMiLCJ0b0JlQ2FsbGVkV2l0aCIsIm1vY2tDbGVhciIsInVubW91bnQiXSwibWFwcGluZ3MiOiI7Ozs7QUFJQTs7QUFDQTs7SUFBWUEsTTs7QUFDWjs7QUFFQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7OztrTkFoQkE7Ozs7QUFPQTs7QUFFQTs7O0FBU0FDLFNBQVMsMEJBQVQsRUFBcUMsWUFBTTtBQUFBOztBQUN6QyxNQUFNQyxjQUFjLEVBQXBCO0FBQ0EsTUFBTUMsWUFBWSw4QkFBZUQsV0FBZixDQUFsQjs7QUFFQSxNQUFNRSxPQUFPLGNBQWI7O0FBRUY7QUFDRSxNQUFNQyxlQUFlLDJDQUNsQkQsSUFEa0IsRUFDWCx3RkFDVSxFQURWLHVEQUVZLEtBRlosWUFEVyxFQUFyQjtBQU1BLE1BQU1FLFFBQVFILFVBQVVFLFlBQVYsQ0FBZDtBQUNBLE1BQU1FLGdCQUFnQixTQUFoQkEsYUFBZ0I7QUFBQSxXQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBTjtBQUFBLEdBQXRCO0FBQ0EsTUFBTUMsVUFBVSxFQUFFQyxNQUFNTCxJQUFSLEVBQWhCO0FBQ0E7QUFDQSxNQUFNTSxtQkFBbUIscUJBQVVILGFBQVYsRUFBeUJDLE9BQXpCLENBQXpCO0FBQ0EsTUFBTUcsYUFBYSxlQUFLQyxFQUFMLEVBQW5CO0FBQ0EsTUFBTUMsbUJBQW1CLGVBQUtELEVBQUwsRUFBekI7QUFDQSxNQUFNRSxvQkFBb0IsbUJBQ3hCO0FBQUE7QUFBQSxNQUFVLE9BQU9SLEtBQWpCO0FBQ0Usa0NBQUMsZ0JBQUQsSUFBa0IsUUFBUUssVUFBMUIsRUFBc0Msa0JBQWtCRSxnQkFBeEQ7QUFERixHQUR3QixDQUExQjtBQUtBLE1BQU1FLG1CQUFtQkQsa0JBQWtCRSxJQUFsQixDQUF1QlQsYUFBdkIsQ0FBekI7O0FBRUFOLFdBQVMsZUFBVCxFQUEwQixZQUFNO0FBQzlCZ0IsT0FBRyxpQ0FBSCxFQUFzQyxZQUFNO0FBQzFDakIsYUFBT2MsaUJBQVAsRUFBMEJJLFdBQTFCO0FBQ0QsS0FGRDtBQUdBRCxPQUFHLDZCQUFILEVBQWtDLFlBQU07QUFDdENqQixhQUFPYyxrQkFBa0JFLElBQWxCLENBQXVCVCxhQUF2QixFQUFzQ1ksTUFBN0MsRUFBcURDLElBQXJELENBQTBELENBQTFEO0FBQ0QsS0FGRDtBQUdBSCxPQUFHLHdCQUFILEVBQTZCLFlBQU07QUFDakMsVUFBTUksV0FBVyxXQUFqQjtBQUNBLFVBQU1DLFdBQVcsRUFBRUMsSUFBSSxJQUFOLEVBQWpCOztBQUVBLFVBQU1DLFFBQVFULGlCQUFpQlMsS0FBakIsRUFBZDtBQUNBeEIscUJBQWN3QixNQUFNQyxRQUFwQixHQUE4QkwsSUFBOUIsQ0FBbUMsVUFBbkM7QUFDQXBCLHFCQUFjd0IsTUFBTUUsTUFBcEIsR0FBNEJOLElBQTVCLENBQWlDLFFBQWpDOztBQUVBLFVBQU1NLFNBQVNGLE1BQU1FLE1BQXJCO0FBQ0ExQixxQkFBYzBCLE9BQU9DLE9BQXJCLEdBQThCUCxJQUE5QixDQUFtQyxVQUFuQztBQUNBcEIscUJBQWMwQixPQUFPRSxRQUFyQixHQUErQlIsSUFBL0IsQ0FBb0MsVUFBcEM7QUFDQXBCLHFCQUFjMEIsT0FBT0csV0FBckIsR0FBa0NULElBQWxDLENBQXVDLFVBQXZDOztBQUVBcEIsYUFBT3dCLE1BQU1DLFFBQU4sQ0FBZUgsUUFBZixFQUF5QkQsUUFBekIsQ0FBUCxFQUEyQ1MsT0FBM0MsQ0FBbUQseUJBQVdSLFFBQVgsRUFBcUJkLE9BQXJCLEVBQThCYSxRQUE5QixDQUFuRDtBQUNBckIsYUFBTzBCLE9BQU9FLFFBQVAsQ0FBZ0JQLFFBQWhCLENBQVAsRUFBa0NTLE9BQWxDLENBQTBDLHlCQUFXLEVBQVgsRUFBZXRCLE9BQWYsRUFBd0JhLFFBQXhCLENBQTFDO0FBQ0FyQixhQUFPMEIsT0FBT0csV0FBUCxDQUFtQlIsUUFBbkIsQ0FBUCxFQUFxQ1MsT0FBckMsQ0FBNkMsMEJBQVl0QixRQUFRQyxJQUFwQixFQUEwQlksUUFBMUIsQ0FBN0M7QUFDQXJCLGFBQU8wQixPQUFPSyxPQUFQLENBQWV2QixRQUFRQyxJQUF2QixDQUFQLEVBQXFDcUIsT0FBckMsQ0FBNkMsc0JBQVF0QixRQUFRQyxJQUFoQixDQUE3Qzs7QUFFQSxpQ0FBVXVCLGdCQUFWLEdBQTZCLGVBQUtwQixFQUFMLEVBQTdCO0FBQ0FjLGFBQU9DLE9BQVAsQ0FBZUwsUUFBZixFQUF5QkEsUUFBekI7QUFDQXRCLGFBQU8sMkJBQVVnQyxnQkFBakIsRUFBbUNDLGNBQW5DLENBQWtEWCxRQUFsRCxFQUE0REEsUUFBNUQsRUFBc0VJLE9BQU9HLFdBQTdFO0FBQ0EsaUNBQVVHLGdCQUFWLENBQTJCRSxTQUEzQjtBQUNELEtBdEJEOztBQXdCQWpCLE9BQUcsc0JBQUgsRUFBMkIsWUFBTTtBQUMvQkgsd0JBQWtCcUIsT0FBbEI7QUFDRCxLQUZEO0FBR0QsR0FsQ0Q7QUFtQ0QsQ0E5REQiLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBxdWFuZG8gb24gNy8zLzE3LlxuICovXG5cbmltcG9ydCB7IG1vdW50IH0gZnJvbSAnZW56eW1lJztcbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICdleHBlY3QnO1xuaW1wb3J0IHsgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAncmVkdXgtbW9jay1zdG9yZSc7XG5pbXBvcnQgamVzdCBmcm9tICdyZWR1eC1zYWdhL3NyYy9pbnRlcm5hbC9wcm9jJztcbmltcG9ydCB7IGFja25vd2xlZGdlLCBjbGVhbnVwLCBzdWJtaXRGb3JtIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBTRVJWRVJfRVJST1IsIFNVQk1JVF9TVUNDRVNTIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCByZVNhZ2FIT0MgZnJvbSAnLi4vaW5kZXgnO1xuaW1wb3J0IGNvbXBvbmVudCBmcm9tICcuLi91dGlscy9jb21wb25lbnQtaGVscGVycyc7XG5cbmRlc2NyaWJlKCd1dGlscy9ob2Mvb25TdWJtaXQvaW5kZXgnLCAoKSA9PiB7XG4gIGNvbnN0IG1pZGRsZXdhcmVzID0gW107XG4gIGNvbnN0IG1vY2tTdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKG1pZGRsZXdhcmVzKTtcblxuICBjb25zdCBQQUdFID0gJ21vY2tUZXN0UGFnZSc7XG5cbi8vIEluaXRpYWxpemUgbW9ja3N0b3JlIHdpdGggZW1wdHkgc3RhdGVcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0gZnJvbUpTKHtcbiAgICBbUEFHRV06IGZyb21KUyh7XG4gICAgICBbU0VSVkVSX0VSUk9SXTogJycsXG4gICAgICBbU1VCTUlUX1NVQ0NFU1NdOiBmYWxzZSxcbiAgICB9KSxcbiAgfSk7XG4gIGNvbnN0IHN0b3JlID0gbW9ja1N0b3JlKGluaXRpYWxTdGF0ZSk7XG4gIGNvbnN0IE1vY2tDb21wb25lbnQgPSAoKSA9PiA8ZGl2PkhlbGxvPC9kaXY+O1xuICBjb25zdCBvcHRpb25zID0geyBwYWdlOiBQQUdFIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBjb25zdCBXcmFwcGVyQ29tcG9uZW50ID0gcmVTYWdhSE9DKE1vY2tDb21wb25lbnQsIG9wdGlvbnMpO1xuICBjb25zdCBtb2NrU3VibWl0ID0gamVzdC5mbigpO1xuICBjb25zdCBjbGVhbnVwT25Vbm1vdW50ID0gamVzdC5mbigpO1xuICBjb25zdCByZW5kZXJlZENvbXBvbmVudCA9IG1vdW50KFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFdyYXBwZXJDb21wb25lbnQgc3VibWl0PXttb2NrU3VibWl0fSBjbGVhbnVwT25Vbm1vdW50PXtjbGVhbnVwT25Vbm1vdW50fSAvPlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG4gIGNvbnN0IHdyYXBwZWRDb21wb25lbnQgPSByZW5kZXJlZENvbXBvbmVudC5maW5kKE1vY2tDb21wb25lbnQpO1xuXG4gIGRlc2NyaWJlKCc8cmVTYWdhSE9DIC8+JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmVuZGVyIHdpdGhvdXQgZXhwbG9kaW5nJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHJlbmRlcmVkQ29tcG9uZW50KS50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVuZGVyIE1vY2tDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgICBleHBlY3QocmVuZGVyZWRDb21wb25lbnQuZmluZChNb2NrQ29tcG9uZW50KS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZW5kZXIgY2hpbGRyZW4nLCAoKSA9PiB7XG4gICAgICBjb25zdCBmb3JtTmFtZSA9ICdGT1JNX05BTUUnO1xuICAgICAgY29uc3QgbW9ja0RhdGEgPSB7IGhpOiAnaG8nIH07XG5cbiAgICAgIGNvbnN0IHByb3BzID0gd3JhcHBlZENvbXBvbmVudC5wcm9wcygpO1xuICAgICAgZXhwZWN0KHR5cGVvZiBwcm9wcy5vblN1Ym1pdCkudG9CZSgnZnVuY3Rpb24nKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgcHJvcHMucmVzYWdhKS50b0JlKCdvYmplY3QnKTtcblxuICAgICAgY29uc3QgcmVzYWdhID0gcHJvcHMucmVzYWdhO1xuICAgICAgZXhwZWN0KHR5cGVvZiByZXNhZ2EuYW5hbHlzZSkudG9CZSgnZnVuY3Rpb24nKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgcmVzYWdhLmRpc3BhdGNoKS50b0JlKCdmdW5jdGlvbicpO1xuICAgICAgZXhwZWN0KHR5cGVvZiByZXNhZ2EuYWNrbm93bGVkZ2UpLnRvQmUoJ2Z1bmN0aW9uJyk7XG5cbiAgICAgIGV4cGVjdChwcm9wcy5vblN1Ym1pdChtb2NrRGF0YSwgZm9ybU5hbWUpKS50b0VxdWFsKHN1Ym1pdEZvcm0obW9ja0RhdGEsIG9wdGlvbnMsIGZvcm1OYW1lKSk7XG4gICAgICBleHBlY3QocmVzYWdhLmRpc3BhdGNoKGZvcm1OYW1lKSkudG9FcXVhbChzdWJtaXRGb3JtKHt9LCBvcHRpb25zLCBmb3JtTmFtZSkpO1xuICAgICAgZXhwZWN0KHJlc2FnYS5hY2tub3dsZWRnZShmb3JtTmFtZSkpLnRvRXF1YWwoYWNrbm93bGVkZ2Uob3B0aW9ucy5wYWdlLCBmb3JtTmFtZSkpO1xuICAgICAgZXhwZWN0KHJlc2FnYS5jbGVhbnVwKG9wdGlvbnMucGFnZSkpLnRvRXF1YWwoY2xlYW51cChvcHRpb25zLnBhZ2UpKTtcblxuICAgICAgY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMgPSBqZXN0LmZuKCk7XG4gICAgICByZXNhZ2EuYW5hbHlzZShtb2NrRGF0YSwgbW9ja0RhdGEpO1xuICAgICAgZXhwZWN0KGNvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzKS50b0JlQ2FsbGVkV2l0aChtb2NrRGF0YSwgbW9ja0RhdGEsIHJlc2FnYS5hY2tub3dsZWRnZSk7XG4gICAgICBjb21wb25lbnQuYW5hbHlzZU5leHRQcm9wcy5tb2NrQ2xlYXIoKTtcbiAgICB9KTtcblxuICAgIGl0KCdjb21wb25lbnRXaWxsVW5tb3VudCcsICgpID0+IHtcbiAgICAgIHJlbmRlcmVkQ29tcG9uZW50LnVubW91bnQoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuIl19