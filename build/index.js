'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sagas = exports.reducer = exports.CONSTANTS = exports.CONFIG = exports.reSagaHOC = undefined;

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

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _sagas = require('./sagas');

var _sagas2 = _interopRequireDefault(_sagas);

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
var CONFIG = exports.CONFIG = _config2.default;
var CONSTANTS = exports.CONSTANTS = _constants2.default;
var reducer = exports.reducer = _reducer2.default;
var sagas = exports.sagas = _sagas2.default;

exports.default = reSagaHOC;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZVNhZ2FIT0MiLCJDb21wb25lbnQiLCJjb25maWdzIiwiUFAiLCJyZW5kZXIiLCJwcm9wcyIsIlB1cmVDb21wb25lbnQiLCJtYXBTdGF0ZSIsIm1hcERpc3BhdGNoIiwiZGlzcGF0Y2giLCJkaXNwYXRjaFByb3AiLCJhY2tub3dsZWRnZVByb3AiLCJjbGVhbnVwUHJvcCIsIkNPTkZJRyIsIkNPTlNUQU5UUyIsInJlZHVjZXIiLCJzYWdhcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLGdDQUFZLFNBQVpBLFNBQVksQ0FBQ0MsU0FBRCxFQUFZQyxPQUFaLEVBQXdCO0FBQy9DOzs7OztBQUQrQyxNQU16Q0MsRUFOeUM7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQSxnTEFPN0NDLE1BUDZDLEdBT3BDO0FBQUEsZUFBTSwyREFBUSxXQUFXSCxTQUFuQixFQUE4QixTQUFTQyxPQUF2QyxJQUFvRCxNQUFLRyxLQUF6RCxFQUFOO0FBQUEsT0FQb0M7QUFBQSxNQU1SOzs7QUFOUTtBQUFBLElBTTlCLGdCQUFNQyxhQU53Qjs7QUFVL0MsTUFBTUMsV0FBVywrRUFDTiwyQkFBV0wscUJBQVgsQ0FETSxFQUFqQjs7QUFJQSxNQUFNTSxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsUUFBRDtBQUFBLFdBQWU7QUFDakNDLG9CQUFjO0FBQUEsZUFBZUQsU0FBUywrQ0FBVCxDQUFmO0FBQUEsT0FEbUI7QUFFakNFLHVCQUFpQjtBQUFBLGVBQWVGLFNBQVMsZ0RBQVQsQ0FBZjtBQUFBLE9BRmdCO0FBR2pDRyxtQkFBYTtBQUFBLGVBQWVILFNBQVMsNENBQVQsQ0FBZjtBQUFBO0FBSG9CLEtBQWY7QUFBQSxHQUFwQjs7QUFNQSxTQUFPLHlCQUFRRixRQUFSLEVBQWtCQyxXQUFsQixFQUErQkwsRUFBL0IsQ0FBUDtBQUNELENBckJNO0FBc0JBLElBQU1VLDBDQUFOO0FBQ0EsSUFBTUMsbURBQU47QUFDQSxJQUFNQyw2Q0FBTjtBQUNBLElBQU1DLHVDQUFOOztrQkFFUWhCLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGNyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvciBhcyByZXNlbGVjdCB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7IGFja25vd2xlZGdlLCBjbGVhbnVwLCBzdWJtaXRGb3JtIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCBjb25maWcsIHsgUEFHRSB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBjb25zdGFudHMsIHsgU1RPUkUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgcmVkdWNlcnMgZnJvbSAnLi9yZWR1Y2VyJztcbmltcG9ydCBzYWdhIGZyb20gJy4vc2FnYXMnO1xuaW1wb3J0IFJlU2FnYSBmcm9tICcuL3Jlc2FnYSc7XG5pbXBvcnQgeyBzZWxlY3RQYWdlIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3QgcmVTYWdhSE9DID0gKENvbXBvbmVudCwgY29uZmlncykgPT4ge1xuICAvKipcbiAgICogVGhpcyBjbGFzcyBpcyBmb3IgaW5qZWN0aW5nIHJlZHV4IHN0b3JlIGFuZCBkaXNwYXRjaCBmdW5jdGlvbnMgb25seS5cbiAgICogQ29tcG9uZW50LXRvLWJlLXdyYXBwZWQsIGFsbCBwcm9wcyBhbmQgY29uZmlncyBhcmUgdG8gYmUgcHJvY2Vzc2VkIGluIDxSZVNhZ2EgLz5cbiAgICogTm90ZTogTXVzdCBiZSBhIFJlYWN0IENvbXBvbmVudCwgdGh1cyBlc2xpbnQtZGlzYWJsZS5cbiAgICovXG4gIGNsYXNzIFBQIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvcHJlZmVyLXN0YXRlbGVzcy1mdW5jdGlvblxuICAgIHJlbmRlciA9ICgpID0+IDxSZVNhZ2EgQ29tcG9uZW50PXtDb21wb25lbnR9IGNvbmZpZ3M9e2NvbmZpZ3N9IHsuLi50aGlzLnByb3BzfSAvPjtcbiAgfVxuXG4gIGNvbnN0IG1hcFN0YXRlID0gcmVzZWxlY3Qoe1xuICAgIFtTVE9SRV06IHNlbGVjdFBhZ2UoY29uZmlnc1tQQUdFXSksXG4gIH0pO1xuXG4gIGNvbnN0IG1hcERpc3BhdGNoID0gKGRpc3BhdGNoKSA9PiAoe1xuICAgIGRpc3BhdGNoUHJvcDogKC4uLnBhcmFtcykgPT4gZGlzcGF0Y2goc3VibWl0Rm9ybSguLi5wYXJhbXMpKSxcbiAgICBhY2tub3dsZWRnZVByb3A6ICguLi5wYXJhbXMpID0+IGRpc3BhdGNoKGFja25vd2xlZGdlKC4uLnBhcmFtcykpLFxuICAgIGNsZWFudXBQcm9wOiAoLi4ucGFyYW1zKSA9PiBkaXNwYXRjaChjbGVhbnVwKC4uLnBhcmFtcykpLFxuICB9KTtcblxuICByZXR1cm4gY29ubmVjdChtYXBTdGF0ZSwgbWFwRGlzcGF0Y2gpKFBQKTtcbn07XG5leHBvcnQgY29uc3QgQ09ORklHID0gY29uZmlnO1xuZXhwb3J0IGNvbnN0IENPTlNUQU5UUyA9IGNvbnN0YW50cztcbmV4cG9ydCBjb25zdCByZWR1Y2VyID0gcmVkdWNlcnM7XG5leHBvcnQgY29uc3Qgc2FnYXMgPSBzYWdhO1xuXG5leHBvcnQgZGVmYXVsdCByZVNhZ2FIT0M7XG4iXX0=