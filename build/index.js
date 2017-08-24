'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.saga = exports.sagas = exports.originReducer = exports.wrapReducer = exports.CONSTANTS = exports.CONFIG = exports.reSagaHOC = exports.getConfig = exports.setConfig = undefined;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXNhZ2FDb25maWdzIiwic2V0Q29uZmlnIiwicGFnZSIsImNmZyIsIkVycm9yIiwiZ2V0Q29uZmlnIiwicmVTYWdhSE9DIiwiQ29tcG9uZW50IiwiY29uZmlncyIsIlBQIiwicmVuZGVyIiwicHJvcHMiLCJQdXJlQ29tcG9uZW50IiwibWFwU3RhdGUiLCJtYXBEaXNwYXRjaCIsImRpc3BhdGNoIiwicGFyYW1zIiwiQ09ORklHIiwiQ09OU1RBTlRTIiwid3JhcFJlZHVjZXIiLCJvcmlnaW5SZWR1Y2VyIiwic2FnYXMiLCJzYWdhIiwicmVkdWNlciIsImN1c3RvbXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsRUFBdEI7QUFDTyxJQUFNQyxnQ0FBWSxTQUFaQSxTQUFZLENBQUNDLElBQUQsRUFBT0MsR0FBUCxFQUFlO0FBQ3RDLE1BQUlILGNBQWNFLElBQWQsQ0FBSixFQUF5QixNQUFNRSxnQkFBY0YsSUFBZCxhQUFOO0FBQ3pCRixnQkFBY0UsSUFBZCxJQUFzQkMsR0FBdEI7QUFDRCxDQUhNO0FBSUEsSUFBTUUsZ0NBQVksU0FBWkEsU0FBWSxDQUFDSCxJQUFEO0FBQUEsU0FBVUYsY0FBY0UsSUFBZCxDQUFWO0FBQUEsQ0FBbEI7O0FBRUEsSUFBTUksZ0NBQVksU0FBWkEsU0FBWSxDQUFDQyxTQUFELEVBQVlDLE9BQVosRUFBd0I7QUFBQTs7QUFDL0NQLFlBQVVPLHFCQUFWLEVBQXlCQSxPQUF6Qjs7QUFFQTs7Ozs7O0FBSCtDLE1BUXpDQyxFQVJ5QztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBLGdMQVM3Q0MsTUFUNkMsR0FTcEM7QUFBQSxlQUFNLDJEQUFRLFdBQVdILFNBQW5CLEVBQThCLFNBQVNDLE9BQXZDLElBQW9ELE1BQUtHLEtBQXpELEVBQU47QUFBQSxPQVRvQztBQUFBLE1BUVI7OztBQVJRO0FBQUEsSUFROUIsZ0JBQU1DLGFBUndCOztBQVkvQyxNQUFNQyxXQUFXLHVHQUNOLDJCQUFXTCxxQkFBWCxDQURNLHdEQUVFLDhDQUF5QkEscUJBQXpCLENBRkYsY0FBakI7O0FBS0EsTUFBTU0sY0FBYyxTQUFkQSxXQUFjLENBQUNDLFFBQUQ7QUFBQTs7QUFBQSx1RUFDRjtBQUFBLHlDQUFJQyxNQUFKO0FBQUlBLGNBQUo7QUFBQTs7QUFBQSxhQUFlRCxTQUFTLHFFQUFzQlAscUJBQXRCLFNBQXdDUSxNQUF4QyxFQUFULENBQWY7QUFBQSxLQURFLHNEQUVDO0FBQUEseUNBQUlBLE1BQUo7QUFBSUEsY0FBSjtBQUFBOztBQUFBLGFBQWVELFNBQVMsd0VBQXlCUCxxQkFBekIsU0FBMkNRLE1BQTNDLEVBQVQsQ0FBZjtBQUFBLEtBRkQsMENBR0o7QUFBQSxhQUFlRCxTQUFTLCtDQUFULENBQWY7QUFBQSxLQUhJLDZDQUlEO0FBQUEsYUFBZUEsU0FBUyxnREFBVCxDQUFmO0FBQUEsS0FKQyx5Q0FLTDtBQUFBLGFBQWVBLFNBQVMsNENBQVQsQ0FBZjtBQUFBLEtBTEs7QUFBQSxHQUFwQjs7QUFRQSxTQUFPLHlCQUFRRixRQUFSLEVBQWtCQyxXQUFsQixFQUErQkwsRUFBL0IsQ0FBUDtBQUNELENBMUJNO0FBMkJBLElBQU1RLDBDQUFOO0FBQ0EsSUFBTUMsbURBQU47QUFDQSxJQUFNQyxvQ0FBYyx5QkFBZUEsV0FBbkM7QUFDQSxJQUFNQyx5REFBTjtBQUNBLElBQU1DLHVDQUFOO0FBQ0EsSUFBTUMsaUNBQU47QUFDQSxJQUFNQyw0QkFBVSxTQUFWQSxPQUFVLENBQUNyQixJQUFELEVBQU9zQixPQUFQO0FBQUEsU0FBbUIseUJBQWVMLFdBQWYsb0JBQXFDakIsSUFBckMsRUFBMkNzQixPQUEzQyxDQUFuQjtBQUFBLENBQWhCO0FBQ1BsQixVQUFVaUIsT0FBVixHQUFvQkEsT0FBcEI7a0JBQ2VqQixTIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBjcmVhdGVTdHJ1Y3R1cmVkU2VsZWN0b3IgYXMgcmVzZWxlY3QgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgYWN0aW9ucywgeyBhY2tub3dsZWRnZSwgY2xlYW51cCwgc3VibWl0Rm9ybSB9IGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgY29uZmlnLCB7IFBBR0UgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgY29uc3RhbnRzLCB7IFNUT1JFLCBHRVRfVkFSSUFCTEVTLCBTRVRfVkFSSUFCTEUsIFNFVF9WQVJJQUJMRV9GTiB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCByZWR1Y2VycyBmcm9tICcuL3JlZHVjZXInO1xuaW1wb3J0IHJlZHVjZXJIZWxwZXJzIGZyb20gJy4vdXRpbHMvcmVkdWNlci1oZWxwZXJzJztcbmltcG9ydCBzYWdhc0FycmF5LCB7IHNhZ2EgYXMgc2FnYU9iamVjdCB9IGZyb20gJy4vc2FnYXMnO1xuaW1wb3J0IFJlU2FnYSBmcm9tICcuL3Jlc2FnYSc7XG5pbXBvcnQgc2VsZWN0b3JzLCB7IHNlbGVjdFBhZ2UgfSBmcm9tICcuL3NlbGVjdG9ycyc7XG5cbmNvbnN0IHJlc2FnYUNvbmZpZ3MgPSB7fTtcbmV4cG9ydCBjb25zdCBzZXRDb25maWcgPSAocGFnZSwgY2ZnKSA9PiB7XG4gIGlmIChyZXNhZ2FDb25maWdzW3BhZ2VdKSB0aHJvdyBFcnJvcihgUGFnZSAke3BhZ2V9IGV4aXN0IWApO1xuICByZXNhZ2FDb25maWdzW3BhZ2VdID0gY2ZnO1xufTtcbmV4cG9ydCBjb25zdCBnZXRDb25maWcgPSAocGFnZSkgPT4gcmVzYWdhQ29uZmlnc1twYWdlXTtcblxuZXhwb3J0IGNvbnN0IHJlU2FnYUhPQyA9IChDb21wb25lbnQsIGNvbmZpZ3MpID0+IHtcbiAgc2V0Q29uZmlnKGNvbmZpZ3NbUEFHRV0sIGNvbmZpZ3MpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGNsYXNzIGlzIGZvciBpbmplY3RpbmcgcmVkdXggc3RvcmUgYW5kIGRpc3BhdGNoIGZ1bmN0aW9ucyBvbmx5LlxuICAgKiBDb21wb25lbnQtdG8tYmUtd3JhcHBlZCwgYWxsIHByb3BzIGFuZCBjb25maWdzIGFyZSB0byBiZSBwcm9jZXNzZWQgaW4gPFJlU2FnYSAvPlxuICAgKiBOb3RlOiBNdXN0IGJlIGEgUmVhY3QgQ29tcG9uZW50LCB0aHVzIGVzbGludC1kaXNhYmxlLlxuICAgKi9cbiAgY2xhc3MgUFAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9wcmVmZXItc3RhdGVsZXNzLWZ1bmN0aW9uXG4gICAgcmVuZGVyID0gKCkgPT4gPFJlU2FnYSBDb21wb25lbnQ9e0NvbXBvbmVudH0gY29uZmlncz17Y29uZmlnc30gey4uLnRoaXMucHJvcHN9IC8+XG4gIH1cblxuICBjb25zdCBtYXBTdGF0ZSA9IHJlc2VsZWN0KHtcbiAgICBbU1RPUkVdOiBzZWxlY3RQYWdlKGNvbmZpZ3NbUEFHRV0pLFxuICAgIFtHRVRfVkFSSUFCTEVTXTogc2VsZWN0b3JzW0dFVF9WQVJJQUJMRVNdKGNvbmZpZ3NbUEFHRV0pLFxuICB9KTtcblxuICBjb25zdCBtYXBEaXNwYXRjaCA9IChkaXNwYXRjaCkgPT4gKHtcbiAgICBbU0VUX1ZBUklBQkxFXTogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goYWN0aW9uc1tTRVRfVkFSSUFCTEVdKGNvbmZpZ3NbUEFHRV0sIC4uLnBhcmFtcykpLFxuICAgIFtTRVRfVkFSSUFCTEVfRk5dOiAoLi4ucGFyYW1zKSA9PiBkaXNwYXRjaChhY3Rpb25zW1NFVF9WQVJJQUJMRV9GTl0oY29uZmlnc1tQQUdFXSwgLi4ucGFyYW1zKSksXG4gICAgZGlzcGF0Y2hQcm9wOiAoLi4ucGFyYW1zKSA9PiBkaXNwYXRjaChzdWJtaXRGb3JtKC4uLnBhcmFtcykpLFxuICAgIGFja25vd2xlZGdlUHJvcDogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goYWNrbm93bGVkZ2UoLi4ucGFyYW1zKSksXG4gICAgY2xlYW51cFByb3A6ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKGNsZWFudXAoLi4ucGFyYW1zKSksXG4gIH0pO1xuXG4gIHJldHVybiBjb25uZWN0KG1hcFN0YXRlLCBtYXBEaXNwYXRjaCkoUFApO1xufTtcbmV4cG9ydCBjb25zdCBDT05GSUcgPSBjb25maWc7XG5leHBvcnQgY29uc3QgQ09OU1RBTlRTID0gY29uc3RhbnRzO1xuZXhwb3J0IGNvbnN0IHdyYXBSZWR1Y2VyID0gcmVkdWNlckhlbHBlcnMud3JhcFJlZHVjZXI7XG5leHBvcnQgY29uc3Qgb3JpZ2luUmVkdWNlciA9IHJlZHVjZXJzO1xuZXhwb3J0IGNvbnN0IHNhZ2FzID0gc2FnYXNBcnJheTtcbmV4cG9ydCBjb25zdCBzYWdhID0gc2FnYU9iamVjdDtcbmV4cG9ydCBjb25zdCByZWR1Y2VyID0gKHBhZ2UsIGN1c3RvbXMpID0+IHJlZHVjZXJIZWxwZXJzLndyYXBSZWR1Y2VyKHJlZHVjZXJzLCBwYWdlLCBjdXN0b21zKTtcbnJlU2FnYUhPQy5yZWR1Y2VyID0gcmVkdWNlcjtcbmV4cG9ydCBkZWZhdWx0IHJlU2FnYUhPQztcbiJdfQ==