'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReSaga = undefined;

var _ReSaga$propTypes;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('./config');

var _constants = require('./constants');

var _componentHelpers = require('./utils/component-helpers');

var _componentHelpers2 = _interopRequireDefault(_componentHelpers);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReSaga = exports.ReSaga = function (_React$PureComponent) {
  _inherits(ReSaga, _React$PureComponent);

  function ReSaga() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReSaga);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReSaga.__proto__ || Object.getPrototypeOf(ReSaga)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillUnmount = function () {
      var _this$props = _this.props,
          cleanup = _this$props[_config.MANUALLY_CLEANUP],
          cleanupProp = _this$props.cleanupProp,
          configs = _this$props.configs;

      return !cleanup && cleanupProp(configs[_constants.PAGE]);
    }, _this.setValue = function (key, valueOrFunc) {
      if (typeof valueOrFunc === 'function') {
        return _this.props[_constants.SET_VARIABLE_FN](key, valueOrFunc);
      }
      return _this.props[_constants.SET_VARIABLE](key, valueOrFunc);
    }, _this.getValue = function (key) {
      return _this.props[_constants.GET_VARIABLES] ? _this.props[_constants.GET_VARIABLES].get(key) : null;
    }, _this.dispatchSaga = function (data, formName, pageName) {
      var _this$props2;

      var configs = pageName && (0, _index.getConfig)(pageName) || _this.props.configs;

      if (!configs) throw SyntaxError('`config` must be defined.');
      if (!configs[_config.SUBMIT]) throw SyntaxError('`config.submit` must be defined.');
      if (!formName || !configs[_config.SUBMIT][formName]) throw SyntaxError('Request \'' + formName + '\' must be defined in config.submit.');

      var preProcess = configs[_config.BEFORE_SUBMIT] || function (o) {
        return o;
      };

      // one parameter passed in
      var params = [{}, configs, data, pageName];
      // both parameters passed in
      if (formName) params = [preProcess(data), configs, formName, pageName];

      return (_this$props2 = _this.props).beforeDispatchProp.apply(_this$props2, _toConsumableArray(params));
    }, _this.analyseProps = function (nextProps, actions) {
      return _componentHelpers2.default.analyseNextProps(nextProps, actions, {
        acknowledge: _this.acknowledgeStore,
        dispatch: _this.props.dispatchProp
      });
    }, _this.acknowledgeStore = function (formName) {
      return _this.props.acknowledgeProp(_this.props.configs.page, formName);
    }, _this.isLoading = function (key) {
      var store = _this.props[_constants.STORE];
      if (!store || typeof _this.props[_constants.STORE].get !== 'function') return false;
      var form = _this.props[_constants.STORE].get(key);
      return !!(form && (form[_constants.IS_LOADING] || form[_constants.WILL_LOAD]));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * Automatically clear redux store on un-mount.
   * Unless users set manuallyCleanup to true in CONFIG
   */


  /**
   * Submit form with data. 2 ways to call this function:
   * - Case 1. dispatchSaga(orgUserData, CREATE_ORG_USER);
   * - Case 2. dispatchSaga(FETCH_TEMPLATES);
   * @param data
   * @param formName
   * @param pageName
   */


  /**
   * Utility Function: to be called on `componentWillReceiveProps`
   * Automatically call the assigned function and acknowledge the received prop
   * @param nextProps
   * @param actions
   */


  /**
   * Acknowledge by cleaning up data of a request in redux store
   * @param formName
   */


  _createClass(ReSaga, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.Component,
          setVariable = _props[_constants.SET_VARIABLE],
          variables = _props[_constants.GET_VARIABLES],
          props = _objectWithoutProperties(_props, ['Component', _constants.SET_VARIABLE, _constants.GET_VARIABLES]);

      // map functions as props to component


      var resaga = {
        analyse: this.analyseProps,
        dispatch: this.dispatchSaga,
        acknowledge: this.acknowledgeStore,
        cleanup: this.props.cleanupProp,
        setValue: this.setValue,
        getValue: this.getValue,
        isLoading: this.isLoading
      };

      return _react2.default.createElement(Component, _extends({}, props, {
        onSubmit: this.dispatchSaga // keep it for backward compatibility
        , resaga: resaga
      }));
    }
  }]);

  return ReSaga;
}(_react2.default.PureComponent);

ReSaga.propTypes = (_ReSaga$propTypes = {
  Component: _propTypes2.default.any,
  beforeDispatchProp: _propTypes2.default.func,
  dispatchProp: _propTypes2.default.func,
  acknowledgeProp: _propTypes2.default.func,
  cleanupProp: _propTypes2.default.func,
  configs: _propTypes2.default.object
}, _defineProperty(_ReSaga$propTypes, _constants.GET_VARIABLES, _propTypes2.default.object), _defineProperty(_ReSaga$propTypes, _constants.SET_VARIABLE, _propTypes2.default.func), _defineProperty(_ReSaga$propTypes, _constants.SET_VARIABLE_FN, _propTypes2.default.func), _ReSaga$propTypes);

exports.default = ReSaga;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZXNhZ2EuanMiXSwibmFtZXMiOlsiUmVTYWdhIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJwcm9wcyIsImNsZWFudXAiLCJjbGVhbnVwUHJvcCIsImNvbmZpZ3MiLCJzZXRWYWx1ZSIsImtleSIsInZhbHVlT3JGdW5jIiwiZ2V0VmFsdWUiLCJnZXQiLCJkaXNwYXRjaFNhZ2EiLCJkYXRhIiwiZm9ybU5hbWUiLCJwYWdlTmFtZSIsIlN5bnRheEVycm9yIiwicHJlUHJvY2VzcyIsIm8iLCJwYXJhbXMiLCJiZWZvcmVEaXNwYXRjaFByb3AiLCJhbmFseXNlUHJvcHMiLCJuZXh0UHJvcHMiLCJhY3Rpb25zIiwiYW5hbHlzZU5leHRQcm9wcyIsImFja25vd2xlZGdlIiwiYWNrbm93bGVkZ2VTdG9yZSIsImRpc3BhdGNoIiwiZGlzcGF0Y2hQcm9wIiwiYWNrbm93bGVkZ2VQcm9wIiwicGFnZSIsImlzTG9hZGluZyIsInN0b3JlIiwiZm9ybSIsIkNvbXBvbmVudCIsInNldFZhcmlhYmxlIiwidmFyaWFibGVzIiwicmVzYWdhIiwiYW5hbHlzZSIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJhbnkiLCJmdW5jIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsTSxXQUFBQSxNOzs7Ozs7Ozs7Ozs7OztzTEFLWEMsb0IsR0FBdUIsWUFBTTtBQUFBLHdCQUNtQyxNQUFLQyxLQUR4QztBQUFBLFVBQ0NDLE9BREQ7QUFBQSxVQUNVQyxXQURWLGVBQ1VBLFdBRFY7QUFBQSxVQUN1QkMsT0FEdkIsZUFDdUJBLE9BRHZCOztBQUUzQixhQUFPLENBQUNGLE9BQUQsSUFBWUMsWUFBWUMsd0JBQVosQ0FBbkI7QUFDRCxLLFFBRURDLFEsR0FBVyxVQUFDQyxHQUFELEVBQU1DLFdBQU4sRUFBc0I7QUFDL0IsVUFBSSxPQUFPQSxXQUFQ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QUFmOztBQVVBLGFBQ0UsOEJBQUMsU0FBRCxlQUNNNUIsS0FETjtBQUVFLGtCQUFVLEtBQUtTLFlBRmpCLENBRStCO0FBRi9CLFVBR0UsUUFBUXlCO0FBSFYsU0FERjtBQU9EOzs7O0VBN0Z5QixnQkFBTUUsYTs7QUFnR2xDdEMsT0FBT3VDLFNBQVA7QUFDRU4sYUFBVyxvQkFBVU8sR0FEdkI7QUFFRXJCLHNCQUFvQixvQkFBVXNCLElBRmhDO0FBR0VkLGdCQUFjLG9CQUFVYyxJQUgxQjtBQUlFYixtQkFBaUIsb0JBQVVhLElBSjdCO0FBS0VyQyxlQUFhLG9CQUFVcUMsSUFMekI7QUFNRXBDLFdBQVMsb0JBQVVxQztBQU5yQixnRUFPbUIsb0JBQVVBLE1BUDdCLCtEQVFrQixvQkFBVUQsSUFSNUIsa0VBU3FCLG9CQUFVQSxJQVQvQjs7a0JBWWV6QyxNIiwiZmlsZSI6InJlc2FnYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQkVGT1JFX1NVQk1JVCwgU1VCTUlULCBNQU5VQUxMWV9DTEVBTlVQIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgUEFHRSwgR0VUX1ZBUklBQkxFUywgU0VUX1ZBUklBQkxFLCBTRVRfVkFSSUFCTEVfRk4sIFNUT1JFLCBJU19MT0FESU5HLCBXSUxMX0xPQUQgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgY29tcG9uZW50IGZyb20gJy4vdXRpbHMvY29tcG9uZW50LWhlbHBlcnMnO1xuaW1wb3J0IHsgZ2V0Q29uZmlnIH0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBSZVNhZ2EgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEF1dG9tYXRpY2FsbHkgY2xlYXIgcmVkdXggc3RvcmUgb24gdW4tbW91bnQuXG4gICAqIFVubGVzcyB1c2VycyBzZXQgbWFudWFsbHlDbGVhbnVwIHRvIHRydWUgaW4gQ09ORklHXG4gICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IFtNQU5VQUxMWV9DTEVBTlVQXTogY2xlYW51cCwgY2xlYW51cFByb3AsIGNvbmZpZ3MgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuICFjbGVhbnVwICYmIGNsZWFudXBQcm9wKGNvbmZpZ3NbUEFHRV0pO1xuICB9O1xuXG4gIHNldFZhbHVlID0gKGtleSwgdmFsdWVPckZ1bmMpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlT3JGdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wc1tTRVRfVkFSSUFCTEVfRk5dKGtleSwgdmFsdWVPckZ1bmMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wc1tTRVRfVkFSSUFCTEVdKGtleSwgdmFsdWVPckZ1bmMpO1xuICB9O1xuICBnZXRWYWx1ZSA9IChrZXkpID0+IHRoaXMucHJvcHNbR0VUX1ZBUklBQkxFU10gPyB0aGlzLnByb3BzW0dFVF9WQVJJQUJMRVNdLmdldChrZXkpIDogbnVsbDtcblxuICAvKipcbiAgICogU3VibWl0IGZvcm0gd2l0aCBkYXRhLiAyIHdheXMgdG8gY2FsbCB0aGlzIGZ1bmN0aW9uOlxuICAgKiAtIENhc2UgMS4gZGlzcGF0Y2hTYWdhKG9yZ1VzZXJEYXRhLCBDUkVBVEVfT1JHX1VTRVIpO1xuICAgKiAtIENhc2UgMi4gZGlzcGF0Y2hTYWdhKEZFVENIX1RFTVBMQVRFUyk7XG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBmb3JtTmFtZVxuICAgKiBAcGFyYW0gcGFnZU5hbWVcbiAgICovXG4gIGRpc3BhdGNoU2FnYSA9IChkYXRhLCBmb3JtTmFtZSwgcGFnZU5hbWUpID0+IHtcbiAgICBjb25zdCBjb25maWdzID0gKHBhZ2VOYW1lICYmIGdldENvbmZpZyhwYWdlTmFtZSkpIHx8IHRoaXMucHJvcHMuY29uZmlncztcblxuICAgIGlmICghY29uZmlncykgdGhyb3cgU3ludGF4RXJyb3IoJ2Bjb25maWdgIG11c3QgYmUgZGVmaW5lZC4nKTtcbiAgICBpZiAoIWNvbmZpZ3NbU1VCTUlUXSkgdGhyb3cgU3ludGF4RXJyb3IoJ2Bjb25maWcuc3VibWl0YCBtdXN0IGJlIGRlZmluZWQuJyk7XG4gICAgaWYgKCFmb3JtTmFtZSB8fCAhY29uZmlnc1tTVUJNSVRdW2Zvcm1OYW1lXSkgdGhyb3cgU3ludGF4RXJyb3IoYFJlcXVlc3QgJyR7Zm9ybU5hbWV9JyBtdXN0IGJlIGRlZmluZWQgaW4gY29uZmlnLnN1Ym1pdC5gKTtcblxuICAgIGNvbnN0IHByZVByb2Nlc3MgPSBjb25maWdzW0JFRk9SRV9TVUJNSVRdIHx8ICgobykgPT4gKG8pKTtcblxuICAgIC8vIG9uZSBwYXJhbWV0ZXIgcGFzc2VkIGluXG4gICAgbGV0IHBhcmFtcyA9IFt7fSwgY29uZmlncywgZGF0YSwgcGFnZU5hbWVdO1xuICAgIC8vIGJvdGggcGFyYW1ldGVycyBwYXNzZWQgaW5cbiAgICBpZiAoZm9ybU5hbWUpIHBhcmFtcyA9IFtwcmVQcm9jZXNzKGRhdGEpLCBjb25maWdzLCBmb3JtTmFtZSwgcGFnZU5hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuYmVmb3JlRGlzcGF0Y2hQcm9wKC4uLnBhcmFtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgRnVuY3Rpb246IHRvIGJlIGNhbGxlZCBvbiBgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc2BcbiAgICogQXV0b21hdGljYWxseSBjYWxsIHRoZSBhc3NpZ25lZCBmdW5jdGlvbiBhbmQgYWNrbm93bGVkZ2UgdGhlIHJlY2VpdmVkIHByb3BcbiAgICogQHBhcmFtIG5leHRQcm9wc1xuICAgKiBAcGFyYW0gYWN0aW9uc1xuICAgKi9cbiAgYW5hbHlzZVByb3BzID0gKG5leHRQcm9wcywgYWN0aW9ucykgPT5cbiAgICBjb21wb25lbnQuYW5hbHlzZU5leHRQcm9wcyhuZXh0UHJvcHMsIGFjdGlvbnMsIHtcbiAgICAgIGFja25vd2xlZGdlOiB0aGlzLmFja25vd2xlZGdlU3RvcmUsXG4gICAgICBkaXNwYXRjaDogdGhpcy5wcm9wcy5kaXNwYXRjaFByb3AsXG4gICAgfSk7XG5cbiAgLyoqXG4gICAqIEFja25vd2xlZGdlIGJ5IGNsZWFuaW5nIHVwIGRhdGEgb2YgYSByZXF1ZXN0IGluIHJlZHV4IHN0b3JlXG4gICAqIEBwYXJhbSBmb3JtTmFtZVxuICAgKi9cbiAgYWNrbm93bGVkZ2VTdG9yZSA9IChmb3JtTmFtZSkgPT4gdGhpcy5wcm9wcy5hY2tub3dsZWRnZVByb3AodGhpcy5wcm9wcy5jb25maWdzLnBhZ2UsIGZvcm1OYW1lKTtcblxuICBpc0xvYWRpbmcgPSAoa2V5KSA9PiB7XG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLnByb3BzW1NUT1JFXTtcbiAgICBpZiAoIXN0b3JlIHx8IHR5cGVvZiB0aGlzLnByb3BzW1NUT1JFXS5nZXQgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBmb3JtID0gdGhpcy5wcm9wc1tTVE9SRV0uZ2V0KGtleSk7XG4gICAgcmV0dXJuICEhKGZvcm0gJiYgKGZvcm1bSVNfTE9BRElOR10gfHwgZm9ybVtXSUxMX0xPQURdKSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIENvbXBvbmVudCxcbiAgICAgIFtTRVRfVkFSSUFCTEVdOiBzZXRWYXJpYWJsZSwgW0dFVF9WQVJJQUJMRVNdOiB2YXJpYWJsZXMsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBtYXAgZnVuY3Rpb25zIGFzIHByb3BzIHRvIGNvbXBvbmVudFxuICAgIGNvbnN0IHJlc2FnYSA9IHtcbiAgICAgIGFuYWx5c2U6IHRoaXMuYW5hbHlzZVByb3BzLFxuICAgICAgZGlzcGF0Y2g6IHRoaXMuZGlzcGF0Y2hTYWdhLFxuICAgICAgYWNrbm93bGVkZ2U6IHRoaXMuYWNrbm93bGVkZ2VTdG9yZSxcbiAgICAgIGNsZWFudXA6IHRoaXMucHJvcHMuY2xlYW51cFByb3AsXG4gICAgICBzZXRWYWx1ZTogdGhpcy5zZXRWYWx1ZSxcbiAgICAgIGdldFZhbHVlOiB0aGlzLmdldFZhbHVlLFxuICAgICAgaXNMb2FkaW5nOiB0aGlzLmlzTG9hZGluZyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgICBvblN1Ym1pdD17dGhpcy5kaXNwYXRjaFNhZ2F9IC8vIGtlZXAgaXQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgcmVzYWdhPXtyZXNhZ2F9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuUmVTYWdhLnByb3BUeXBlcyA9IHtcbiAgQ29tcG9uZW50OiBQcm9wVHlwZXMuYW55LFxuICBiZWZvcmVEaXNwYXRjaFByb3A6IFByb3BUeXBlcy5mdW5jLFxuICBkaXNwYXRjaFByb3A6IFByb3BUeXBlcy5mdW5jLFxuICBhY2tub3dsZWRnZVByb3A6IFByb3BUeXBlcy5mdW5jLFxuICBjbGVhbnVwUHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gIGNvbmZpZ3M6IFByb3BUeXBlcy5vYmplY3QsXG4gIFtHRVRfVkFSSUFCTEVTXTogUHJvcFR5cGVzLm9iamVjdCxcbiAgW1NFVF9WQVJJQUJMRV06IFByb3BUeXBlcy5mdW5jLFxuICBbU0VUX1ZBUklBQkxFX0ZOXTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZVNhZ2E7XG4iXX0=