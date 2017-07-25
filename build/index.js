'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reSagaHOC = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reselect2 = require('reselect');

var _actions = require('./actions');

var _config = require('./config');

var _constants = require('./constants');

var _resaga = require('./resaga');

var _resaga2 = _interopRequireDefault(_resaga);

var _selectors = require('./selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reSagaHOC = exports.reSagaHOC = function reSagaHOC(Component, configs) {
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

  var mapState = (0, _reselect2.createStructuredSelector)(_defineProperty({}, _constants.STORE, (0, _selectors.selectPage)(configs[_config.PAGE])));

  var mapDispatch = function mapDispatch(dispatch) {
    return {
      dispatchProp: function dispatchProp() {
        return dispatch(_actions.submitForm.apply(undefined, arguments));
      },
      acknowledgeProp: function acknowledgeProp() {
        return dispatch(_actions.acknowledge.apply(undefined, arguments));
      },
      cleanupProp: function cleanupProp() {
        return dispatch(_actions.cleanup.apply(undefined, arguments));
      }
    };
  };

  return (0, _reactRedux.connect)(mapState, mapDispatch)(PP);
};

exports.default = reSagaHOC;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZVNhZ2FIT0MiLCJDb21wb25lbnQiLCJjb25maWdzIiwiUFAiLCJyZW5kZXIiLCJwcm9wcyIsIlB1cmVDb21wb25lbnQiLCJtYXBTdGF0ZSIsIm1hcERpc3BhdGNoIiwiZGlzcGF0Y2giLCJkaXNwYXRjaFByb3AiLCJhY2tub3dsZWRnZVByb3AiLCJjbGVhbnVwUHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxnQ0FBWSxTQUFaQSxTQUFZLENBQUNDLFNBQUQsRUFBWUMsT0FBWixFQUF3QjtBQUMvQzs7Ozs7QUFEK0MsTUFNekNDLEVBTnlDO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0xBTzdDQyxNQVA2QyxHQU9wQztBQUFBLGVBQU0sMkRBQVEsV0FBV0gsU0FBbkIsRUFBOEIsU0FBU0MsT0FBdkMsSUFBb0QsTUFBS0csS0FBekQsRUFBTjtBQUFBLE9BUG9DO0FBQUEsTUFNUjs7O0FBTlE7QUFBQSxJQU05QixnQkFBTUMsYUFOd0I7O0FBVS9DLE1BQU1DLFdBQVcsK0VBQ04sMkJBQVdMLHFCQUFYLENBRE0sRUFBakI7O0FBSUEsTUFBTU0sY0FBYyxTQUFkQSxXQUFjLENBQUNDLFFBQUQ7QUFBQSxXQUFlO0FBQ2pDQyxvQkFBYztBQUFBLGVBQWVELFNBQVMsK0NBQVQsQ0FBZjtBQUFBLE9BRG1CO0FBRWpDRSx1QkFBaUI7QUFBQSxlQUFlRixTQUFTLGdEQUFULENBQWY7QUFBQSxPQUZnQjtBQUdqQ0csbUJBQWE7QUFBQSxlQUFlSCxTQUFTLDRDQUFULENBQWY7QUFBQTtBQUhvQixLQUFmO0FBQUEsR0FBcEI7O0FBTUEsU0FBTyx5QkFBUUYsUUFBUixFQUFrQkMsV0FBbEIsRUFBK0JMLEVBQS9CLENBQVA7QUFDRCxDQXJCTTs7a0JBdUJRSCxTIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBjcmVhdGVTdHJ1Y3R1cmVkU2VsZWN0b3IgYXMgcmVzZWxlY3QgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBhY2tub3dsZWRnZSwgY2xlYW51cCwgc3VibWl0Rm9ybSB9IGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgeyBQQUdFIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgU1RPUkUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgUmVTYWdhIGZyb20gJy4vcmVzYWdhJztcbmltcG9ydCB7IHNlbGVjdFBhZ2UgfSBmcm9tICcuL3NlbGVjdG9ycyc7XG5cbmV4cG9ydCBjb25zdCByZVNhZ2FIT0MgPSAoQ29tcG9uZW50LCBjb25maWdzKSA9PiB7XG4gIC8qKlxuICAgKiBUaGlzIGNsYXNzIGlzIGZvciBpbmplY3RpbmcgcmVkdXggc3RvcmUgYW5kIGRpc3BhdGNoIGZ1bmN0aW9ucyBvbmx5LlxuICAgKiBDb21wb25lbnQtdG8tYmUtd3JhcHBlZCwgYWxsIHByb3BzIGFuZCBjb25maWdzIGFyZSB0byBiZSBwcm9jZXNzZWQgaW4gPFJlU2FnYSAvPlxuICAgKiBOb3RlOiBNdXN0IGJlIGEgUmVhY3QgQ29tcG9uZW50LCB0aHVzIGVzbGludC1kaXNhYmxlLlxuICAgKi9cbiAgY2xhc3MgUFAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9wcmVmZXItc3RhdGVsZXNzLWZ1bmN0aW9uXG4gICAgcmVuZGVyID0gKCkgPT4gPFJlU2FnYSBDb21wb25lbnQ9e0NvbXBvbmVudH0gY29uZmlncz17Y29uZmlnc30gey4uLnRoaXMucHJvcHN9IC8+O1xuICB9XG5cbiAgY29uc3QgbWFwU3RhdGUgPSByZXNlbGVjdCh7XG4gICAgW1NUT1JFXTogc2VsZWN0UGFnZShjb25maWdzW1BBR0VdKSxcbiAgfSk7XG5cbiAgY29uc3QgbWFwRGlzcGF0Y2ggPSAoZGlzcGF0Y2gpID0+ICh7XG4gICAgZGlzcGF0Y2hQcm9wOiAoLi4ucGFyYW1zKSA9PiBkaXNwYXRjaChzdWJtaXRGb3JtKC4uLnBhcmFtcykpLFxuICAgIGFja25vd2xlZGdlUHJvcDogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goYWNrbm93bGVkZ2UoLi4ucGFyYW1zKSksXG4gICAgY2xlYW51cFByb3A6ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKGNsZWFudXAoLi4ucGFyYW1zKSksXG4gIH0pO1xuXG4gIHJldHVybiBjb25uZWN0KG1hcFN0YXRlLCBtYXBEaXNwYXRjaCkoUFApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVTYWdhSE9DO1xuIl19