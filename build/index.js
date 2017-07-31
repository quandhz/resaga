'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.saga = exports.sagas = exports.originReducer = exports.wrapReducer = exports.CONSTANTS = exports.CONFIG = exports.reSagaHOC = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reselect2 = require('reselect');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reducerHelpers = require('./utils/reducer-helpers');

var _reducerHelpers2 = _interopRequireDefault(_reducerHelpers);

var _sagas = require('./sagas');

var _sagas2 = _interopRequireDefault(_sagas);

var _resaga = require('./resaga');

var _resaga2 = _interopRequireDefault(_resaga);

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reSagaHOC = exports.reSagaHOC = function reSagaHOC(Component, configs) {
  var _reselect;

  /**
   * This class is for injecting redux store and dispatch functions only.
   * Component-to-be-wrapped, all props and configs are to be processed in <ReSaga />
   * Note: Must be a React Component, thus eslint-disable.
   */
  var PP = function (_React$PureComponent) {
    _inherits(PP, _React$PureComponent);

    function PP() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, PP);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PP.__proto__ || Object.getPrototypeOf(PP)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
        return _react2.default.createElement(_resaga2.default, _extends({ Component: Component, configs: configs }, _this.props));
      }, _temp), _possibleConstructorReturn(_this, _ret);
    } // eslint-disable-line react/prefer-stateless-function


    return PP;
  }(_react2.default.PureComponent);

  var mapState = (0, _reselect2.createStructuredSelector)((_reselect = {}, _defineProperty(_reselect, _constants.STORE, (0, _selectors.selectPage)(configs[_config.PAGE])), _defineProperty(_reselect, _constants.GET_VARIABLES, _selectors2.default[_constants.GET_VARIABLES](configs[_config.PAGE])), _reselect));

  var mapDispatch = function mapDispatch(dispatch) {
    var _ref2;

    return _ref2 = {}, _defineProperty(_ref2, _constants.SET_VARIABLE, function () {
      for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return dispatch(_actions2.default[_constants.SET_VARIABLE].apply(_actions2.default, [configs[_config.PAGE]].concat(params)));
    }), _defineProperty(_ref2, _constants.SET_VARIABLE_FN, function () {
      for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }

      return dispatch(_actions2.default[_constants.SET_VARIABLE_FN].apply(_actions2.default, [configs[_config.PAGE]].concat(params)));
    }), _defineProperty(_ref2, 'dispatchProp', function dispatchProp() {
      return dispatch(_actions.submitForm.apply(undefined, arguments));
    }), _defineProperty(_ref2, 'acknowledgeProp', function acknowledgeProp() {
      return dispatch(_actions.acknowledge.apply(undefined, arguments));
    }), _defineProperty(_ref2, 'cleanupProp', function cleanupProp() {
      return dispatch(_actions.cleanup.apply(undefined, arguments));
    }), _ref2;
  };

  return (0, _reactRedux.connect)(mapState, mapDispatch)(PP);
};
var CONFIG = exports.CONFIG = _config2.default;
var CONSTANTS = exports.CONSTANTS = _constants2.default;
var wrapReducer = exports.wrapReducer = _reducerHelpers2.default.wrapReducer;
var originReducer = exports.originReducer = _reducer2.default;
var sagas = exports.sagas = _sagas2.default;
var saga = exports.saga = _sagas.saga;
var reducer = exports.reducer = function reducer(page, customs) {
  return _reducerHelpers2.default.wrapReducer(_reducer2.default, page, customs);
};
reSagaHOC.reducer = reducer;
exports.default = reSagaHOC;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZVNhZ2FIT0MiLCJDb21wb25lbnQiLCJjb25maWdzIiwiUFAiLCJyZW5kZXIiLCJwcm9wcyIsIlB1cmVDb21wb25lbnQiLCJtYXBTdGF0ZSIsIm1hcERpc3BhdGNoIiwiZGlzcGF0Y2giLCJwYXJhbXMiLCJDT05GSUciLCJDT05TVEFOVFMiLCJ3cmFwUmVkdWNlciIsIm9yaWdpblJlZHVjZXIiLCJzYWdhcyIsInNhZ2EiLCJyZWR1Y2VyIiwicGFnZSIsImN1c3RvbXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxnQ0FBWSxTQUFaQSxTQUFZLENBQUNDLFNBQUQsRUFBWUMsT0FBWixFQUF3QjtBQUFBOztBQUMvQzs7Ozs7QUFEK0MsTUFNekNDLEVBTnlDO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0xBTzdDQyxNQVA2QyxHQU9wQztBQUFBLGVBQU0sMkRBQVEsV0FBV0gsU0FBbkIsRUFBOEIsU0FBU0MsT0FBdkMsSUFBb0QsTUFBS0csS0FBekQsRUFBTjtBQUFBLE9BUG9DO0FBQUEsTUFNUjs7O0FBTlE7QUFBQSxJQU05QixnQkFBTUMsYUFOd0I7O0FBVS9DLE1BQU1DLFdBQVcsdUdBQ04sMkJBQVdMLHFCQUFYLENBRE0sd0RBRUUsOENBQXlCQSxxQkFBekIsQ0FGRixjQUFqQjs7QUFLQSxNQUFNTSxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsUUFBRDtBQUFBOztBQUFBLHVFQUNGO0FBQUEseUNBQUlDLE1BQUo7QUFBSUEsY0FBSjtBQUFBOztBQUFBLGFBQWVELFNBQVMscUVBQXNCUCxxQkFBdEIsU0FBd0NRLE1BQXhDLEVBQVQsQ0FBZjtBQUFBLEtBREUsc0RBRUM7QUFBQSx5Q0FBSUEsTUFBSjtBQUFJQSxjQUFKO0FBQUE7O0FBQUEsYUFBZUQsU0FBUyx3RUFBeUJQLHFCQUF6QixTQUEyQ1EsTUFBM0MsRUFBVCxDQUFmO0FBQUEsS0FGRCwwQ0FHSjtBQUFBLGFBQWVELFNBQVMsK0NBQVQsQ0FBZjtBQUFBLEtBSEksNkNBSUQ7QUFBQSxhQUFlQSxTQUFTLGdEQUFULENBQWY7QUFBQSxLQUpDLHlDQUtMO0FBQUEsYUFBZUEsU0FBUyw0Q0FBVCxDQUFmO0FBQUEsS0FMSztBQUFBLEdBQXBCOztBQVFBLFNBQU8seUJBQVFGLFFBQVIsRUFBa0JDLFdBQWxCLEVBQStCTCxFQUEvQixDQUFQO0FBQ0QsQ0F4Qk07QUF5QkEsSUFBTVEsMENBQU47QUFDQSxJQUFNQyxtREFBTjtBQUNBLElBQU1DLG9DQUFjLHlCQUFlQSxXQUFuQztBQUNBLElBQU1DLHlEQUFOO0FBQ0EsSUFBTUMsdUNBQU47QUFDQSxJQUFNQyxpQ0FBTjtBQUNBLElBQU1DLDRCQUFVLFNBQVZBLE9BQVUsQ0FBQ0MsSUFBRCxFQUFPQyxPQUFQO0FBQUEsU0FBbUIseUJBQWVOLFdBQWYsb0JBQXFDSyxJQUFyQyxFQUEyQ0MsT0FBM0MsQ0FBbkI7QUFBQSxDQUFoQjtBQUNQbkIsVUFBVWlCLE9BQVYsR0FBb0JBLE9BQXBCO2tCQUNlakIsUyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgY3JlYXRlU3RydWN0dXJlZFNlbGVjdG9yIGFzIHJlc2VsZWN0IH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IGFjdGlvbnMsIHsgYWNrbm93bGVkZ2UsIGNsZWFudXAsIHN1Ym1pdEZvcm0gfSBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0IGNvbmZpZywgeyBQQUdFIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IGNvbnN0YW50cywgeyBTVE9SRSwgR0VUX1ZBUklBQkxFUywgU0VUX1ZBUklBQkxFLCBTRVRfVkFSSUFCTEVfRk4gfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgcmVkdWNlcnMgZnJvbSAnLi9yZWR1Y2VyJztcbmltcG9ydCByZWR1Y2VySGVscGVycyBmcm9tICcuL3V0aWxzL3JlZHVjZXItaGVscGVycyc7XG5pbXBvcnQgc2FnYXNBcnJheSwgeyBzYWdhIGFzIHNhZ2FPYmplY3QgfSBmcm9tICcuL3NhZ2FzJztcbmltcG9ydCBSZVNhZ2EgZnJvbSAnLi9yZXNhZ2EnO1xuaW1wb3J0IHNlbGVjdG9ycywgeyBzZWxlY3RQYWdlIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3QgcmVTYWdhSE9DID0gKENvbXBvbmVudCwgY29uZmlncykgPT4ge1xuICAvKipcbiAgICogVGhpcyBjbGFzcyBpcyBmb3IgaW5qZWN0aW5nIHJlZHV4IHN0b3JlIGFuZCBkaXNwYXRjaCBmdW5jdGlvbnMgb25seS5cbiAgICogQ29tcG9uZW50LXRvLWJlLXdyYXBwZWQsIGFsbCBwcm9wcyBhbmQgY29uZmlncyBhcmUgdG8gYmUgcHJvY2Vzc2VkIGluIDxSZVNhZ2EgLz5cbiAgICogTm90ZTogTXVzdCBiZSBhIFJlYWN0IENvbXBvbmVudCwgdGh1cyBlc2xpbnQtZGlzYWJsZS5cbiAgICovXG4gIGNsYXNzIFBQIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvcHJlZmVyLXN0YXRlbGVzcy1mdW5jdGlvblxuICAgIHJlbmRlciA9ICgpID0+IDxSZVNhZ2EgQ29tcG9uZW50PXtDb21wb25lbnR9IGNvbmZpZ3M9e2NvbmZpZ3N9IHsuLi50aGlzLnByb3BzfSAvPlxuICB9XG5cbiAgY29uc3QgbWFwU3RhdGUgPSByZXNlbGVjdCh7XG4gICAgW1NUT1JFXTogc2VsZWN0UGFnZShjb25maWdzW1BBR0VdKSxcbiAgICBbR0VUX1ZBUklBQkxFU106IHNlbGVjdG9yc1tHRVRfVkFSSUFCTEVTXShjb25maWdzW1BBR0VdKSxcbiAgfSk7XG5cbiAgY29uc3QgbWFwRGlzcGF0Y2ggPSAoZGlzcGF0Y2gpID0+ICh7XG4gICAgW1NFVF9WQVJJQUJMRV06ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKGFjdGlvbnNbU0VUX1ZBUklBQkxFXShjb25maWdzW1BBR0VdLCAuLi5wYXJhbXMpKSxcbiAgICBbU0VUX1ZBUklBQkxFX0ZOXTogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goYWN0aW9uc1tTRVRfVkFSSUFCTEVfRk5dKGNvbmZpZ3NbUEFHRV0sIC4uLnBhcmFtcykpLFxuICAgIGRpc3BhdGNoUHJvcDogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goc3VibWl0Rm9ybSguLi5wYXJhbXMpKSxcbiAgICBhY2tub3dsZWRnZVByb3A6ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKGFja25vd2xlZGdlKC4uLnBhcmFtcykpLFxuICAgIGNsZWFudXBQcm9wOiAoLi4ucGFyYW1zKSA9PiBkaXNwYXRjaChjbGVhbnVwKC4uLnBhcmFtcykpLFxuICB9KTtcblxuICByZXR1cm4gY29ubmVjdChtYXBTdGF0ZSwgbWFwRGlzcGF0Y2gpKFBQKTtcbn07XG5leHBvcnQgY29uc3QgQ09ORklHID0gY29uZmlnO1xuZXhwb3J0IGNvbnN0IENPTlNUQU5UUyA9IGNvbnN0YW50cztcbmV4cG9ydCBjb25zdCB3cmFwUmVkdWNlciA9IHJlZHVjZXJIZWxwZXJzLndyYXBSZWR1Y2VyO1xuZXhwb3J0IGNvbnN0IG9yaWdpblJlZHVjZXIgPSByZWR1Y2VycztcbmV4cG9ydCBjb25zdCBzYWdhcyA9IHNhZ2FzQXJyYXk7XG5leHBvcnQgY29uc3Qgc2FnYSA9IHNhZ2FPYmplY3Q7XG5leHBvcnQgY29uc3QgcmVkdWNlciA9IChwYWdlLCBjdXN0b21zKSA9PiByZWR1Y2VySGVscGVycy53cmFwUmVkdWNlcihyZWR1Y2VycywgcGFnZSwgY3VzdG9tcyk7XG5yZVNhZ2FIT0MucmVkdWNlciA9IHJlZHVjZXI7XG5leHBvcnQgZGVmYXVsdCByZVNhZ2FIT0M7XG4iXX0=