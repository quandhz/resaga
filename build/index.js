'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.saga = exports.sagas = exports.originReducer = exports.wrapReducer = exports.CONSTANTS = exports.CONFIG = exports.reSagaHOC = exports.deleteConfig = exports.getConfig = exports.setConfig = undefined;

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

var ResagaError = function ResagaError(error) {
  // TODO: will throw Error in the next minor release
  // throw new Error(`[resaga] ${error}`);
  console.error('[resaga] Warning: ' + error + '. A breaking Error will be thrown in the next minor release.'); // eslint-disable-line no-console
  return null;
};

var resagaConfigs = {};
var setConfig = exports.setConfig = function setConfig(page, cfg) {
  if (resagaConfigs[page]) ResagaError('Component \'' + page + '\' has been mounted multiple times which is anti-pattern. It\'s possibly due to dynamically generating by a loop. Consider moving state up to parent');
  resagaConfigs[page] = cfg;
  return true;
};
var getConfig = exports.getConfig = function getConfig(page) {
  if (!page) return ResagaError('The configuration of \'' + page + '\' not found. Check whether some component has been unmounted before the request finished, or it has never been mounted in the first place');
  var pageConfig = resagaConfigs[page];
  if (!pageConfig) ResagaError('Component \'' + page + '\' not found. Check whether the component has been unmounted before the request finished, or it has never been mounted in the first place');

  return pageConfig;
};
var deleteConfig = exports.deleteConfig = function deleteConfig(page) {
  return delete resagaConfigs[page];
};

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

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PP.__proto__ || Object.getPrototypeOf(PP)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillMount = function () {
        return setConfig(configs[_config.PAGE], configs);
      }, _this.componentWillUnmount = function () {
        return deleteConfig(configs[_config.PAGE]);
      }, _this.render = function () {
        return _react2.default.createElement(_resaga2.default, _extends({ Component: Component, configs: configs, dispatchProp: _this.dispatchProp }, _this.props));
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

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
    }), _defineProperty(_ref2, 'beforeDispatchProp', function beforeDispatchProp() {
      return dispatch(_actions.beforeSubmitForm.apply(undefined, arguments));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZXNhZ2FFcnJvciIsImVycm9yIiwiY29uc29sZSIsInJlc2FnYUNvbmZpZ3MiLCJzZXRDb25maWciLCJwYWdlIiwiY2ZnIiwiZ2V0Q29uZmlnIiwicGFnZUNvbmZpZyIsImRlbGV0ZUNvbmZpZyIsInJlU2FnYUhPQyIsIkNvbXBvbmVudCIsImNvbmZpZ3MiLCJQUCIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVuZGVyIiwiZGlzcGF0Y2hQcm9wIiwicHJvcHMiLCJQdXJlQ29tcG9uZW50IiwibWFwU3RhdGUiLCJtYXBEaXNwYXRjaCIsImRpc3BhdGNoIiwicGFyYW1zIiwiQ09ORklHIiwiQ09OU1RBTlRTIiwid3JhcFJlZHVjZXIiLCJvcmlnaW5SZWR1Y2VyIiwic2FnYXMiLCJzYWdhIiwicmVkdWNlciIsImN1c3RvbXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsS0FBRCxFQUFXO0FBQzdCO0FBQ0E7QUFDQUMsVUFBUUQsS0FBUix3QkFBbUNBLEtBQW5DLG1FQUg2QixDQUc0RTtBQUN6RyxTQUFPLElBQVA7QUFDRCxDQUxEOztBQU9BLElBQU1FLGdCQUFnQixFQUF0QjtBQUNPLElBQU1DLGdDQUFZLFNBQVpBLFNBQVksQ0FBQ0MsSUFBRCxFQUFPQyxHQUFQLEVBQWU7QUFDdEMsTUFBSUgsY0FBY0UsSUFBZCxDQUFKLEVBQXlCTCw2QkFBMEJLLElBQTFCO0FBQ3pCRixnQkFBY0UsSUFBZCxJQUFzQkMsR0FBdEI7QUFDQSxTQUFPLElBQVA7QUFDRCxDQUpNO0FBS0EsSUFBTUMsZ0NBQVksU0FBWkEsU0FBWSxDQUFDRixJQUFELEVBQVU7QUFDakMsTUFBSSxDQUFDQSxJQUFMLEVBQVcsT0FBT0wsd0NBQXFDSyxJQUFyQyxnSkFBUDtBQUNYLE1BQU1HLGFBQWFMLGNBQWNFLElBQWQsQ0FBbkI7QUFDQSxNQUFJLENBQUNHLFVBQUwsRUFBaUJSLDZCQUEwQkssSUFBMUI7O0FBRWpCLFNBQU9HLFVBQVA7QUFDRCxDQU5NO0FBT0EsSUFBTUMsc0NBQWUsU0FBZkEsWUFBZSxDQUFDSixJQUFEO0FBQUEsU0FBVSxPQUFPRixjQUFjRSxJQUFkLENBQWpCO0FBQUEsQ0FBckI7O0FBRUEsSUFBTUssZ0NBQVksU0FBWkEsU0FBWSxDQUFDQyxTQUFELEVBQVlDLE9BQVosRUFBd0I7QUFBQTs7QUFDL0M7Ozs7O0FBRCtDLE1BTXpDQyxFQU55QztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBLGdMQU83Q0Msa0JBUDZDLEdBT3hCO0FBQUEsZUFBTVYsVUFBVVEscUJBQVYsRUFBeUJBLE9BQXpCLENBQU47QUFBQSxPQVB3QixRQVE3Q0csb0JBUjZDLEdBUXRCO0FBQUEsZUFBTU4sYUFBYUcscUJBQWIsQ0FBTjtBQUFBLE9BUnNCLFFBUzdDSSxNQVQ2QyxHQVNwQztBQUFBLGVBQU0sMkRBQVEsV0FBV0wsU0FBbkIsRUFBOEIsU0FBU0MsT0FBdkMsRUFBZ0QsY0FBYyxNQUFLSyxZQUFuRSxJQUFxRixNQUFLQyxLQUExRixFQUFOO0FBQUEsT0FUb0M7QUFBQTs7QUFBQTtBQUFBLElBTTlCLGdCQUFNQyxhQU53Qjs7QUFZL0MsTUFBTUMsV0FBVyx1R0FDTiwyQkFBV1IscUJBQVgsQ0FETSx3REFFRSw4Q0FBeUJBLHFCQUF6QixDQUZGLGNBQWpCOztBQUtBLE1BQU1TLGNBQWMsU0FBZEEsV0FBYyxDQUFDQyxRQUFEO0FBQUE7O0FBQUEsdUVBQ0Y7QUFBQSx5Q0FBSUMsTUFBSjtBQUFJQSxjQUFKO0FBQUE7O0FBQUEsYUFBZUQsU0FBUyxxRUFBc0JWLHFCQUF0QixTQUF3Q1csTUFBeEMsRUFBVCxDQUFmO0FBQUEsS0FERSxzREFFQztBQUFBLHlDQUFJQSxNQUFKO0FBQUlBLGNBQUo7QUFBQTs7QUFBQSxhQUFlRCxTQUFTLHdFQUF5QlYscUJBQXpCLFNBQTJDVyxNQUEzQyxFQUFULENBQWY7QUFBQSxLQUZELGdEQUdFO0FBQUEsYUFBZUQsU0FBUyxxREFBVCxDQUFmO0FBQUEsS0FIRiwwQ0FJSjtBQUFBLGFBQWVBLFNBQVMsK0NBQVQsQ0FBZjtBQUFBLEtBSkksNkNBS0Q7QUFBQSxhQUFlQSxTQUFTLGdEQUFULENBQWY7QUFBQSxLQUxDLHlDQU1MO0FBQUEsYUFBZUEsU0FBUyw0Q0FBVCxDQUFmO0FBQUEsS0FOSztBQUFBLEdBQXBCOztBQVNBLFNBQU8seUJBQVFGLFFBQVIsRUFBa0JDLFdBQWxCLEVBQStCUixFQUEvQixDQUFQO0FBQ0QsQ0EzQk07QUE0QkEsSUFBTVcsMENBQU47QUFDQSxJQUFNQyxtREFBTjtBQUNBLElBQU1DLG9DQUFjLHlCQUFlQSxXQUFuQztBQUNBLElBQU1DLHlEQUFOO0FBQ0EsSUFBTUMsdUNBQU47QUFDQSxJQUFNQyxpQ0FBTjtBQUNBLElBQU1DLDRCQUFVLFNBQVZBLE9BQVUsQ0FBQ3pCLElBQUQsRUFBTzBCLE9BQVA7QUFBQSxTQUFtQix5QkFBZUwsV0FBZixvQkFBcUNyQixJQUFyQyxFQUEyQzBCLE9BQTNDLENBQW5CO0FBQUEsQ0FBaEI7QUFDUHJCLFVBQVVvQixPQUFWLEdBQW9CQSxPQUFwQjtrQkFDZXBCLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGNyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvciBhcyByZXNlbGVjdCB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCBhY3Rpb25zLCB7IGFja25vd2xlZGdlLCBjbGVhbnVwLCBzdWJtaXRGb3JtLCBiZWZvcmVTdWJtaXRGb3JtIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCBjb25maWcsIHsgUEFHRSB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBjb25zdGFudHMsIHsgU1RPUkUsIEdFVF9WQVJJQUJMRVMsIFNFVF9WQVJJQUJMRSwgU0VUX1ZBUklBQkxFX0ZOIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHJlZHVjZXJzIGZyb20gJy4vcmVkdWNlcic7XG5pbXBvcnQgcmVkdWNlckhlbHBlcnMgZnJvbSAnLi91dGlscy9yZWR1Y2VyLWhlbHBlcnMnO1xuaW1wb3J0IHNhZ2FzQXJyYXksIHsgc2FnYSBhcyBzYWdhT2JqZWN0IH0gZnJvbSAnLi9zYWdhcyc7XG5pbXBvcnQgUmVTYWdhIGZyb20gJy4vcmVzYWdhJztcbmltcG9ydCBzZWxlY3RvcnMsIHsgc2VsZWN0UGFnZSB9IGZyb20gJy4vc2VsZWN0b3JzJztcblxuY29uc3QgUmVzYWdhRXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgLy8gVE9ETzogd2lsbCB0aHJvdyBFcnJvciBpbiB0aGUgbmV4dCBtaW5vciByZWxlYXNlXG4gIC8vIHRocm93IG5ldyBFcnJvcihgW3Jlc2FnYV0gJHtlcnJvcn1gKTtcbiAgY29uc29sZS5lcnJvcihgW3Jlc2FnYV0gV2FybmluZzogJHtlcnJvcn0uIEEgYnJlYWtpbmcgRXJyb3Igd2lsbCBiZSB0aHJvd24gaW4gdGhlIG5leHQgbWlub3IgcmVsZWFzZS5gKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgcmVzYWdhQ29uZmlncyA9IHt9O1xuZXhwb3J0IGNvbnN0IHNldENvbmZpZyA9IChwYWdlLCBjZmcpID0+IHtcbiAgaWYgKHJlc2FnYUNvbmZpZ3NbcGFnZV0pIFJlc2FnYUVycm9yKGBDb21wb25lbnQgJyR7cGFnZX0nIGhhcyBiZWVuIG1vdW50ZWQgbXVsdGlwbGUgdGltZXMgd2hpY2ggaXMgYW50aS1wYXR0ZXJuLiBJdCdzIHBvc3NpYmx5IGR1ZSB0byBkeW5hbWljYWxseSBnZW5lcmF0aW5nIGJ5IGEgbG9vcC4gQ29uc2lkZXIgbW92aW5nIHN0YXRlIHVwIHRvIHBhcmVudGApO1xuICByZXNhZ2FDb25maWdzW3BhZ2VdID0gY2ZnO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5leHBvcnQgY29uc3QgZ2V0Q29uZmlnID0gKHBhZ2UpID0+IHtcbiAgaWYgKCFwYWdlKSByZXR1cm4gUmVzYWdhRXJyb3IoYFRoZSBjb25maWd1cmF0aW9uIG9mICcke3BhZ2V9JyBub3QgZm91bmQuIENoZWNrIHdoZXRoZXIgc29tZSBjb21wb25lbnQgaGFzIGJlZW4gdW5tb3VudGVkIGJlZm9yZSB0aGUgcmVxdWVzdCBmaW5pc2hlZCwgb3IgaXQgaGFzIG5ldmVyIGJlZW4gbW91bnRlZCBpbiB0aGUgZmlyc3QgcGxhY2VgKTtcbiAgY29uc3QgcGFnZUNvbmZpZyA9IHJlc2FnYUNvbmZpZ3NbcGFnZV07XG4gIGlmICghcGFnZUNvbmZpZykgUmVzYWdhRXJyb3IoYENvbXBvbmVudCAnJHtwYWdlfScgbm90IGZvdW5kLiBDaGVjayB3aGV0aGVyIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gdW5tb3VudGVkIGJlZm9yZSB0aGUgcmVxdWVzdCBmaW5pc2hlZCwgb3IgaXQgaGFzIG5ldmVyIGJlZW4gbW91bnRlZCBpbiB0aGUgZmlyc3QgcGxhY2VgKTtcblxuICByZXR1cm4gcGFnZUNvbmZpZztcbn07XG5leHBvcnQgY29uc3QgZGVsZXRlQ29uZmlnID0gKHBhZ2UpID0+IGRlbGV0ZSByZXNhZ2FDb25maWdzW3BhZ2VdO1xuXG5leHBvcnQgY29uc3QgcmVTYWdhSE9DID0gKENvbXBvbmVudCwgY29uZmlncykgPT4ge1xuICAvKipcbiAgICogVGhpcyBjbGFzcyBpcyBmb3IgaW5qZWN0aW5nIHJlZHV4IHN0b3JlIGFuZCBkaXNwYXRjaCBmdW5jdGlvbnMgb25seS5cbiAgICogQ29tcG9uZW50LXRvLWJlLXdyYXBwZWQsIGFsbCBwcm9wcyBhbmQgY29uZmlncyBhcmUgdG8gYmUgcHJvY2Vzc2VkIGluIDxSZVNhZ2EgLz5cbiAgICogTm90ZTogTXVzdCBiZSBhIFJlYWN0IENvbXBvbmVudCwgdGh1cyBlc2xpbnQtZGlzYWJsZS5cbiAgICovXG4gIGNsYXNzIFBQIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgY29tcG9uZW50V2lsbE1vdW50ID0gKCkgPT4gc2V0Q29uZmlnKGNvbmZpZ3NbUEFHRV0sIGNvbmZpZ3MpO1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4gZGVsZXRlQ29uZmlnKGNvbmZpZ3NbUEFHRV0pO1xuICAgIHJlbmRlciA9ICgpID0+IDxSZVNhZ2EgQ29tcG9uZW50PXtDb21wb25lbnR9IGNvbmZpZ3M9e2NvbmZpZ3N9IGRpc3BhdGNoUHJvcD17dGhpcy5kaXNwYXRjaFByb3B9IHsuLi50aGlzLnByb3BzfSAvPlxuICB9XG5cbiAgY29uc3QgbWFwU3RhdGUgPSByZXNlbGVjdCh7XG4gICAgW1NUT1JFXTogc2VsZWN0UGFnZShjb25maWdzW1BBR0VdKSxcbiAgICBbR0VUX1ZBUklBQkxFU106IHNlbGVjdG9yc1tHRVRfVkFSSUFCTEVTXShjb25maWdzW1BBR0VdKSxcbiAgfSk7XG5cbiAgY29uc3QgbWFwRGlzcGF0Y2ggPSAoZGlzcGF0Y2gpID0+ICh7XG4gICAgW1NFVF9WQVJJQUJMRV06ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKGFjdGlvbnNbU0VUX1ZBUklBQkxFXShjb25maWdzW1BBR0VdLCAuLi5wYXJhbXMpKSxcbiAgICBbU0VUX1ZBUklBQkxFX0ZOXTogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goYWN0aW9uc1tTRVRfVkFSSUFCTEVfRk5dKGNvbmZpZ3NbUEFHRV0sIC4uLnBhcmFtcykpLFxuICAgIGJlZm9yZURpc3BhdGNoUHJvcDogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goYmVmb3JlU3VibWl0Rm9ybSguLi5wYXJhbXMpKSxcbiAgICBkaXNwYXRjaFByb3A6ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKHN1Ym1pdEZvcm0oLi4ucGFyYW1zKSksXG4gICAgYWNrbm93bGVkZ2VQcm9wOiAoLi4ucGFyYW1zKSA9PiBkaXNwYXRjaChhY2tub3dsZWRnZSguLi5wYXJhbXMpKSxcbiAgICBjbGVhbnVwUHJvcDogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goY2xlYW51cCguLi5wYXJhbXMpKSxcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbm5lY3QobWFwU3RhdGUsIG1hcERpc3BhdGNoKShQUCk7XG59O1xuZXhwb3J0IGNvbnN0IENPTkZJRyA9IGNvbmZpZztcbmV4cG9ydCBjb25zdCBDT05TVEFOVFMgPSBjb25zdGFudHM7XG5leHBvcnQgY29uc3Qgd3JhcFJlZHVjZXIgPSByZWR1Y2VySGVscGVycy53cmFwUmVkdWNlcjtcbmV4cG9ydCBjb25zdCBvcmlnaW5SZWR1Y2VyID0gcmVkdWNlcnM7XG5leHBvcnQgY29uc3Qgc2FnYXMgPSBzYWdhc0FycmF5O1xuZXhwb3J0IGNvbnN0IHNhZ2EgPSBzYWdhT2JqZWN0O1xuZXhwb3J0IGNvbnN0IHJlZHVjZXIgPSAocGFnZSwgY3VzdG9tcykgPT4gcmVkdWNlckhlbHBlcnMud3JhcFJlZHVjZXIocmVkdWNlcnMsIHBhZ2UsIGN1c3RvbXMpO1xucmVTYWdhSE9DLnJlZHVjZXIgPSByZWR1Y2VyO1xuZXhwb3J0IGRlZmF1bHQgcmVTYWdhSE9DO1xuIl19