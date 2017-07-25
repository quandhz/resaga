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

var _config2 = _interopRequireDefault(_config);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

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
reSagaHOC.config = _config2.default;
reSagaHOC.constants = _constants2.default;

exports.default = reSagaHOC;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZVNhZ2FIT0MiLCJDb21wb25lbnQiLCJjb25maWdzIiwiUFAiLCJyZW5kZXIiLCJwcm9wcyIsIlB1cmVDb21wb25lbnQiLCJtYXBTdGF0ZSIsIm1hcERpc3BhdGNoIiwiZGlzcGF0Y2giLCJkaXNwYXRjaFByb3AiLCJhY2tub3dsZWRnZVByb3AiLCJjbGVhbnVwUHJvcCIsImNvbmZpZyIsImNvbnN0YW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRU8sSUFBTUEsZ0NBQVksU0FBWkEsU0FBWSxDQUFDQyxTQUFELEVBQVlDLE9BQVosRUFBd0I7QUFDL0M7Ozs7O0FBRCtDLE1BTXpDQyxFQU55QztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBLGdMQU83Q0MsTUFQNkMsR0FPcEM7QUFBQSxlQUFNLDJEQUFRLFdBQVdILFNBQW5CLEVBQThCLFNBQVNDLE9BQXZDLElBQW9ELE1BQUtHLEtBQXpELEVBQU47QUFBQSxPQVBvQztBQUFBLE1BTVI7OztBQU5RO0FBQUEsSUFNOUIsZ0JBQU1DLGFBTndCOztBQVUvQyxNQUFNQyxXQUFXLCtFQUNOLDJCQUFXTCxxQkFBWCxDQURNLEVBQWpCOztBQUlBLE1BQU1NLGNBQWMsU0FBZEEsV0FBYyxDQUFDQyxRQUFEO0FBQUEsV0FBZTtBQUNqQ0Msb0JBQWM7QUFBQSxlQUFlRCxTQUFTLCtDQUFULENBQWY7QUFBQSxPQURtQjtBQUVqQ0UsdUJBQWlCO0FBQUEsZUFBZUYsU0FBUyxnREFBVCxDQUFmO0FBQUEsT0FGZ0I7QUFHakNHLG1CQUFhO0FBQUEsZUFBZUgsU0FBUyw0Q0FBVCxDQUFmO0FBQUE7QUFIb0IsS0FBZjtBQUFBLEdBQXBCOztBQU1BLFNBQU8seUJBQVFGLFFBQVIsRUFBa0JDLFdBQWxCLEVBQStCTCxFQUEvQixDQUFQO0FBQ0QsQ0FyQk07QUFzQlBILFVBQVVhLE1BQVY7QUFDQWIsVUFBVWMsU0FBVjs7a0JBRWVkLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGNyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvciBhcyByZXNlbGVjdCB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7IGFja25vd2xlZGdlLCBjbGVhbnVwLCBzdWJtaXRGb3JtIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCBjb25maWcsIHsgUEFHRSB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBjb25zdGFudHMsIHsgU1RPUkUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgUmVTYWdhIGZyb20gJy4vcmVzYWdhJztcbmltcG9ydCB7IHNlbGVjdFBhZ2UgfSBmcm9tICcuL3NlbGVjdG9ycyc7XG5cbmV4cG9ydCBjb25zdCByZVNhZ2FIT0MgPSAoQ29tcG9uZW50LCBjb25maWdzKSA9PiB7XG4gIC8qKlxuICAgKiBUaGlzIGNsYXNzIGlzIGZvciBpbmplY3RpbmcgcmVkdXggc3RvcmUgYW5kIGRpc3BhdGNoIGZ1bmN0aW9ucyBvbmx5LlxuICAgKiBDb21wb25lbnQtdG8tYmUtd3JhcHBlZCwgYWxsIHByb3BzIGFuZCBjb25maWdzIGFyZSB0byBiZSBwcm9jZXNzZWQgaW4gPFJlU2FnYSAvPlxuICAgKiBOb3RlOiBNdXN0IGJlIGEgUmVhY3QgQ29tcG9uZW50LCB0aHVzIGVzbGludC1kaXNhYmxlLlxuICAgKi9cbiAgY2xhc3MgUFAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9wcmVmZXItc3RhdGVsZXNzLWZ1bmN0aW9uXG4gICAgcmVuZGVyID0gKCkgPT4gPFJlU2FnYSBDb21wb25lbnQ9e0NvbXBvbmVudH0gY29uZmlncz17Y29uZmlnc30gey4uLnRoaXMucHJvcHN9IC8+O1xuICB9XG5cbiAgY29uc3QgbWFwU3RhdGUgPSByZXNlbGVjdCh7XG4gICAgW1NUT1JFXTogc2VsZWN0UGFnZShjb25maWdzW1BBR0VdKSxcbiAgfSk7XG5cbiAgY29uc3QgbWFwRGlzcGF0Y2ggPSAoZGlzcGF0Y2gpID0+ICh7XG4gICAgZGlzcGF0Y2hQcm9wOiAoLi4ucGFyYW1zKSA9PiBkaXNwYXRjaChzdWJtaXRGb3JtKC4uLnBhcmFtcykpLFxuICAgIGFja25vd2xlZGdlUHJvcDogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goYWNrbm93bGVkZ2UoLi4ucGFyYW1zKSksXG4gICAgY2xlYW51cFByb3A6ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKGNsZWFudXAoLi4ucGFyYW1zKSksXG4gIH0pO1xuXG4gIHJldHVybiBjb25uZWN0KG1hcFN0YXRlLCBtYXBEaXNwYXRjaCkoUFApO1xufTtcbnJlU2FnYUhPQy5jb25maWcgPSBjb25maWc7XG5yZVNhZ2FIT0MuY29uc3RhbnRzID0gY29uc3RhbnRzO1xuXG5leHBvcnQgZGVmYXVsdCByZVNhZ2FIT0M7XG4iXX0=