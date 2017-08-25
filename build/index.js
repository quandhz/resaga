'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.saga = exports.sagas = exports.originReducer = exports.wrapReducer = exports.CONSTANTS = exports.CONFIG = exports.reSagaHOC = exports.getConfig = exports.setConfig = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var resagaConfigs = {};
var setConfig = exports.setConfig = function setConfig(page, cfg) {
  if (resagaConfigs[page]) throw Error('Page ' + page + ' exist!');
  resagaConfigs[page] = cfg;
};
var getConfig = exports.getConfig = function getConfig(page) {
  return resagaConfigs[page];
};

var reSagaHOC = exports.reSagaHOC = function reSagaHOC(Component, configs) {
  var _reselect;

  setConfig(configs[_config.PAGE], configs);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXNhZ2FDb25maWdzIiwic2V0Q29uZmlnIiwicGFnZSIsImNmZyIsIkVycm9yIiwiZ2V0Q29uZmlnIiwicmVTYWdhSE9DIiwiQ29tcG9uZW50IiwiY29uZmlncyIsIlBQIiwicmVuZGVyIiwiZGlzcGF0Y2hQcm9wIiwicHJvcHMiLCJQdXJlQ29tcG9uZW50IiwibWFwU3RhdGUiLCJtYXBEaXNwYXRjaCIsImRpc3BhdGNoIiwicGFyYW1zIiwiQ09ORklHIiwiQ09OU1RBTlRTIiwid3JhcFJlZHVjZXIiLCJvcmlnaW5SZWR1Y2VyIiwic2FnYXMiLCJzYWdhIiwicmVkdWNlciIsImN1c3RvbXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixFQUF0QjtBQUNPLElBQU1DLGdDQUFZLFNBQVpBLFNBQVksQ0FBQ0MsSUFBRCxFQUFPQyxHQUFQLEVBQWU7QUFDdEMsTUFBSUgsY0FBY0UsSUFBZCxDQUFKLEVBQXlCLE1BQU1FLGdCQUFjRixJQUFkLGFBQU47QUFDekJGLGdCQUFjRSxJQUFkLElBQXNCQyxHQUF0QjtBQUNELENBSE07QUFJQSxJQUFNRSxnQ0FBWSxTQUFaQSxTQUFZLENBQUNILElBQUQ7QUFBQSxTQUFVRixjQUFjRSxJQUFkLENBQVY7QUFBQSxDQUFsQjs7QUFFQSxJQUFNSSxnQ0FBWSxTQUFaQSxTQUFZLENBQUNDLFNBQUQsRUFBWUMsT0FBWixFQUF3QjtBQUFBOztBQUMvQ1AsWUFBVU8scUJBQVYsRUFBeUJBLE9BQXpCOztBQUVBOzs7Ozs7QUFIK0MsTUFRekNDLEVBUnlDO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0xBUzdDQyxNQVQ2QyxHQVNwQztBQUFBLGVBQU0sMkRBQVEsV0FBV0gsU0FBbkIsRUFBOEIsU0FBU0MsT0FBdkMsRUFBZ0QsY0FBYyxNQUFLRyxZQUFuRSxJQUFxRixNQUFLQyxLQUExRixFQUFOO0FBQUEsT0FUb0M7QUFBQTs7QUFBQTtBQUFBLElBUTlCLGdCQUFNQyxhQVJ3Qjs7QUFZL0MsTUFBTUMsV0FBVyx1R0FDTiwyQkFBV04scUJBQVgsQ0FETSx3REFFRSw4Q0FBeUJBLHFCQUF6QixDQUZGLGNBQWpCOztBQUtBLE1BQU1PLGNBQWMsU0FBZEEsV0FBYyxDQUFDQyxRQUFEO0FBQUE7O0FBQUEsdUVBQ0Y7QUFBQSx5Q0FBSUMsTUFBSjtBQUFJQSxjQUFKO0FBQUE7O0FBQUEsYUFBZUQsU0FBUyxxRUFBc0JSLHFCQUF0QixTQUF3Q1MsTUFBeEMsRUFBVCxDQUFmO0FBQUEsS0FERSxzREFFQztBQUFBLHlDQUFJQSxNQUFKO0FBQUlBLGNBQUo7QUFBQTs7QUFBQSxhQUFlRCxTQUFTLHdFQUF5QlIscUJBQXpCLFNBQTJDUyxNQUEzQyxFQUFULENBQWY7QUFBQSxLQUZELGdEQUdFO0FBQUEsYUFBZUQsU0FBUyxxREFBVCxDQUFmO0FBQUEsS0FIRiwwQ0FJSjtBQUFBLGFBQWVBLFNBQVMsK0NBQVQsQ0FBZjtBQUFBLEtBSkksNkNBS0Q7QUFBQSxhQUFlQSxTQUFTLGdEQUFULENBQWY7QUFBQSxLQUxDLHlDQU1MO0FBQUEsYUFBZUEsU0FBUyw0Q0FBVCxDQUFmO0FBQUEsS0FOSztBQUFBLEdBQXBCOztBQVNBLFNBQU8seUJBQVFGLFFBQVIsRUFBa0JDLFdBQWxCLEVBQStCTixFQUEvQixDQUFQO0FBQ0QsQ0EzQk07QUE0QkEsSUFBTVMsMENBQU47QUFDQSxJQUFNQyxtREFBTjtBQUNBLElBQU1DLG9DQUFjLHlCQUFlQSxXQUFuQztBQUNBLElBQU1DLHlEQUFOO0FBQ0EsSUFBTUMsdUNBQU47QUFDQSxJQUFNQyxpQ0FBTjtBQUNBLElBQU1DLDRCQUFVLFNBQVZBLE9BQVUsQ0FBQ3RCLElBQUQsRUFBT3VCLE9BQVA7QUFBQSxTQUFtQix5QkFBZUwsV0FBZixvQkFBcUNsQixJQUFyQyxFQUEyQ3VCLE9BQTNDLENBQW5CO0FBQUEsQ0FBaEI7QUFDUG5CLFVBQVVrQixPQUFWLEdBQW9CQSxPQUFwQjtrQkFDZWxCLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBjcmVhdGVTdHJ1Y3R1cmVkU2VsZWN0b3IgYXMgcmVzZWxlY3QgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgYWN0aW9ucywgeyBhY2tub3dsZWRnZSwgY2xlYW51cCwgc3VibWl0Rm9ybSwgYmVmb3JlU3VibWl0Rm9ybSB9IGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgY29uZmlnLCB7IFBBR0UgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgY29uc3RhbnRzLCB7IFNUT1JFLCBHRVRfVkFSSUFCTEVTLCBTRVRfVkFSSUFCTEUsIFNFVF9WQVJJQUJMRV9GTiB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCByZWR1Y2VycyBmcm9tICcuL3JlZHVjZXInO1xuaW1wb3J0IHJlZHVjZXJIZWxwZXJzIGZyb20gJy4vdXRpbHMvcmVkdWNlci1oZWxwZXJzJztcbmltcG9ydCBzYWdhc0FycmF5LCB7IHNhZ2EgYXMgc2FnYU9iamVjdCB9IGZyb20gJy4vc2FnYXMnO1xuaW1wb3J0IFJlU2FnYSBmcm9tICcuL3Jlc2FnYSc7XG5pbXBvcnQgc2VsZWN0b3JzLCB7IHNlbGVjdFBhZ2UgfSBmcm9tICcuL3NlbGVjdG9ycyc7XG5cbmNvbnN0IHJlc2FnYUNvbmZpZ3MgPSB7fTtcbmV4cG9ydCBjb25zdCBzZXRDb25maWcgPSAocGFnZSwgY2ZnKSA9PiB7XG4gIGlmIChyZXNhZ2FDb25maWdzW3BhZ2VdKSB0aHJvdyBFcnJvcihgUGFnZSAke3BhZ2V9IGV4aXN0IWApO1xuICByZXNhZ2FDb25maWdzW3BhZ2VdID0gY2ZnO1xufTtcbmV4cG9ydCBjb25zdCBnZXRDb25maWcgPSAocGFnZSkgPT4gcmVzYWdhQ29uZmlnc1twYWdlXTtcblxuZXhwb3J0IGNvbnN0IHJlU2FnYUhPQyA9IChDb21wb25lbnQsIGNvbmZpZ3MpID0+IHtcbiAgc2V0Q29uZmlnKGNvbmZpZ3NbUEFHRV0sIGNvbmZpZ3MpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGNsYXNzIGlzIGZvciBpbmplY3RpbmcgcmVkdXggc3RvcmUgYW5kIGRpc3BhdGNoIGZ1bmN0aW9ucyBvbmx5LlxuICAgKiBDb21wb25lbnQtdG8tYmUtd3JhcHBlZCwgYWxsIHByb3BzIGFuZCBjb25maWdzIGFyZSB0byBiZSBwcm9jZXNzZWQgaW4gPFJlU2FnYSAvPlxuICAgKiBOb3RlOiBNdXN0IGJlIGEgUmVhY3QgQ29tcG9uZW50LCB0aHVzIGVzbGludC1kaXNhYmxlLlxuICAgKi9cbiAgY2xhc3MgUFAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICByZW5kZXIgPSAoKSA9PiA8UmVTYWdhIENvbXBvbmVudD17Q29tcG9uZW50fSBjb25maWdzPXtjb25maWdzfSBkaXNwYXRjaFByb3A9e3RoaXMuZGlzcGF0Y2hQcm9wfSB7Li4udGhpcy5wcm9wc30gLz5cbiAgfVxuXG4gIGNvbnN0IG1hcFN0YXRlID0gcmVzZWxlY3Qoe1xuICAgIFtTVE9SRV06IHNlbGVjdFBhZ2UoY29uZmlnc1tQQUdFXSksXG4gICAgW0dFVF9WQVJJQUJMRVNdOiBzZWxlY3RvcnNbR0VUX1ZBUklBQkxFU10oY29uZmlnc1tQQUdFXSksXG4gIH0pO1xuXG4gIGNvbnN0IG1hcERpc3BhdGNoID0gKGRpc3BhdGNoKSA9PiAoe1xuICAgIFtTRVRfVkFSSUFCTEVdOiAoLi4ucGFyYW1zKSA9PiBkaXNwYXRjaChhY3Rpb25zW1NFVF9WQVJJQUJMRV0oY29uZmlnc1tQQUdFXSwgLi4ucGFyYW1zKSksXG4gICAgW1NFVF9WQVJJQUJMRV9GTl06ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKGFjdGlvbnNbU0VUX1ZBUklBQkxFX0ZOXShjb25maWdzW1BBR0VdLCAuLi5wYXJhbXMpKSxcbiAgICBiZWZvcmVEaXNwYXRjaFByb3A6ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKGJlZm9yZVN1Ym1pdEZvcm0oLi4ucGFyYW1zKSksXG4gICAgZGlzcGF0Y2hQcm9wOiAoLi4ucGFyYW1zKSA9PiBkaXNwYXRjaChzdWJtaXRGb3JtKC4uLnBhcmFtcykpLFxuICAgIGFja25vd2xlZGdlUHJvcDogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goYWNrbm93bGVkZ2UoLi4ucGFyYW1zKSksXG4gICAgY2xlYW51cFByb3A6ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKGNsZWFudXAoLi4ucGFyYW1zKSksXG4gIH0pO1xuXG4gIHJldHVybiBjb25uZWN0KG1hcFN0YXRlLCBtYXBEaXNwYXRjaCkoUFApO1xufTtcbmV4cG9ydCBjb25zdCBDT05GSUcgPSBjb25maWc7XG5leHBvcnQgY29uc3QgQ09OU1RBTlRTID0gY29uc3RhbnRzO1xuZXhwb3J0IGNvbnN0IHdyYXBSZWR1Y2VyID0gcmVkdWNlckhlbHBlcnMud3JhcFJlZHVjZXI7XG5leHBvcnQgY29uc3Qgb3JpZ2luUmVkdWNlciA9IHJlZHVjZXJzO1xuZXhwb3J0IGNvbnN0IHNhZ2FzID0gc2FnYXNBcnJheTtcbmV4cG9ydCBjb25zdCBzYWdhID0gc2FnYU9iamVjdDtcbmV4cG9ydCBjb25zdCByZWR1Y2VyID0gKHBhZ2UsIGN1c3RvbXMpID0+IHJlZHVjZXJIZWxwZXJzLndyYXBSZWR1Y2VyKHJlZHVjZXJzLCBwYWdlLCBjdXN0b21zKTtcbnJlU2FnYUhPQy5yZWR1Y2VyID0gcmVkdWNlcjtcbmV4cG9ydCBkZWZhdWx0IHJlU2FnYUhPQztcbiJdfQ==