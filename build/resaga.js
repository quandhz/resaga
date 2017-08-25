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
      return !_this.props.configs[_config.MANUALLY_CLEANUP] && _this.props.cleanupProp(_this.props.configs.page);
    }, _this.setValue = function (key, valueOrFunc) {
      if (typeof valueOrFunc === 'function') {
        return _this.props[_constants.SET_VARIABLE_FN](key, valueOrFunc);
      }
      return _this.props[_constants.SET_VARIABLE](key, valueOrFunc);
    }, _this.getValue = function (key) {
      return _this.props[_constants.GET_VARIABLES] ? _this.props[_constants.GET_VARIABLES].get(key) : null;
    }, _this.dispatchSaga = function (data, formName, pageName) {
      var _this$props;

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

      return (_this$props = _this.props).beforeDispatchProp.apply(_this$props, _toConsumableArray(params));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZXNhZ2EuanMiXSwibmFtZXMiOlsiUmVTYWdhIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJwcm9wcyIsImNvbmZpZ3MiLCJjbGVhbnVwUHJvcCIsInBhZ2UiLCJzZXRWYWx1ZSIsImtleSIsInZhbHVlT3JGdW5jIiwiZ2V0VmFsdWUiLCJnZXQiLCJkaXNwYXRjaFNhZ2EiLCJkYXRhIiwiZm9ybU5hbWUiLCJwYWdlTmFtZSIsIlN5bnRheEVycm9yIiwicHJlUHJvY2VzcyIsIm8iLCJwYXJhbXMiLCJiZWZvcmVEaXNwYXRjaFByb3AiLCJhbmFseXNlUHJvcHMiLCJuZXh0UHJvcHMiLCJhY3Rpb25zIiwiYW5hbHlzZU5leHRQcm9wcyIsImFja25vd2xlZGdlIiwiYWNrbm93bGVkZ2VTdG9yZSIsImRpc3BhdGNoIiwiZGlzcGF0Y2hQcm9wIiwiYWNrbm93bGVkZ2VQcm9wIiwiaXNMb2FkaW5nIiwic3RvcmUiLCJmb3JtIiwiQ29tcG9uZW50Iiwic2V0VmFyaWFibGUiLCJ2YXJpYWJsZXMiLCJyZXNhZ2EiLCJhbmFseXNlIiwiY2xlYW51cCIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJhbnkiLCJmdW5jIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsTSxXQUFBQSxNOzs7Ozs7Ozs7Ozs7OztzTEFLWEMsb0IsR0FBdUI7QUFBQSxhQUFNLENBQUMsTUFBS0MsS0FBTCxDQUFXQyxPQUFYLDBCQUFELElBQXlDLE1BQUtELEtBQUwsQ0FBV0UsV0FBWCxDQUF1QixNQUFLRixLQUFMLENBQVdDLE9BQVgsQ0FBbUJFLElBQTFDLENBQS9DO0FBQUEsSyxRQUV2QkMsUSxHQUFXLFVBQUNDLEdBQUQsRUFBTUMsV0FBTixFQUFzQjtBQUMvQixVQUFJLE9BQU9BLFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7QUFDckMsZUFBTyxN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QUROO0FBRUUsa0JBQVUsS0FBS1MsWUFGakIsQ0FFK0I7QUFGL0IsVUFHRSxRQUFRd0I7QUFIVixTQURGO0FBT0Q7Ozs7RUExRnlCLGdCQUFNRyxhOztBQTZGbEN0QyxPQUFPdUMsU0FBUDtBQUNFUCxhQUFXLG9CQUFVUSxHQUR2QjtBQUVFckIsc0JBQW9CLG9CQUFVc0IsSUFGaEM7QUFHRWQsZ0JBQWMsb0JBQVVjLElBSDFCO0FBSUViLG1CQUFpQixvQkFBVWEsSUFKN0I7QUFLRXJDLGVBQWEsb0JBQVVxQyxJQUx6QjtBQU1FdEMsV0FBUyxvQkFBVXVDO0FBTnJCLGdFQU9tQixvQkFBVUEsTUFQN0IsK0RBUWtCLG9CQUFVRCxJQVI1QixrRUFTcUIsb0JBQVVBLElBVC9COztrQkFZZXpDLE0iLCJmaWxlIjoicmVzYWdhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCRUZPUkVfU1VCTUlULCBTVUJNSVQsIE1BTlVBTExZX0NMRUFOVVAgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBHRVRfVkFSSUFCTEVTLCBTRVRfVkFSSUFCTEUsIFNFVF9WQVJJQUJMRV9GTiwgU1RPUkUsIElTX0xPQURJTkcsIFdJTExfTE9BRCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBjb21wb25lbnQgZnJvbSAnLi91dGlscy9jb21wb25lbnQtaGVscGVycyc7XG5pbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGNsYXNzIFJlU2FnYSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAvKipcbiAgICogQXV0b21hdGljYWxseSBjbGVhciByZWR1eCBzdG9yZSBvbiB1bi1tb3VudC5cbiAgICogVW5sZXNzIHVzZXJzIHNldCBtYW51YWxseUNsZWFudXAgdG8gdHJ1ZSBpbiBDT05GSUdcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4gIXRoaXMucHJvcHMuY29uZmlnc1tNQU5VQUxMWV9DTEVBTlVQXSAmJiB0aGlzLnByb3BzLmNsZWFudXBQcm9wKHRoaXMucHJvcHMuY29uZmlncy5wYWdlKTtcblxuICBzZXRWYWx1ZSA9IChrZXksIHZhbHVlT3JGdW5jKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZU9yRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHNbU0VUX1ZBUklBQkxFX0ZOXShrZXksIHZhbHVlT3JGdW5jKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcHNbU0VUX1ZBUklBQkxFXShrZXksIHZhbHVlT3JGdW5jKTtcbiAgfTtcbiAgZ2V0VmFsdWUgPSAoa2V5KSA9PiB0aGlzLnByb3BzW0dFVF9WQVJJQUJMRVNdID8gdGhpcy5wcm9wc1tHRVRfVkFSSUFCTEVTXS5nZXQoa2V5KSA6IG51bGw7XG5cbiAgLyoqXG4gICAqIFN1Ym1pdCBmb3JtIHdpdGggZGF0YS4gMiB3YXlzIHRvIGNhbGwgdGhpcyBmdW5jdGlvbjpcbiAgICogLSBDYXNlIDEuIGRpc3BhdGNoU2FnYShvcmdVc2VyRGF0YSwgQ1JFQVRFX09SR19VU0VSKTtcbiAgICogLSBDYXNlIDIuIGRpc3BhdGNoU2FnYShGRVRDSF9URU1QTEFURVMpO1xuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcGFyYW0gZm9ybU5hbWVcbiAgICogQHBhcmFtIHBhZ2VOYW1lXG4gICAqL1xuICBkaXNwYXRjaFNhZ2EgPSAoZGF0YSwgZm9ybU5hbWUsIHBhZ2VOYW1lKSA9PiB7XG4gICAgY29uc3QgY29uZmlncyA9IChwYWdlTmFtZSAmJiBnZXRDb25maWcocGFnZU5hbWUpKSB8fCB0aGlzLnByb3BzLmNvbmZpZ3M7XG5cbiAgICBpZiAoIWNvbmZpZ3MpIHRocm93IFN5bnRheEVycm9yKCdgY29uZmlnYCBtdXN0IGJlIGRlZmluZWQuJyk7XG4gICAgaWYgKCFjb25maWdzW1NVQk1JVF0pIHRocm93IFN5bnRheEVycm9yKCdgY29uZmlnLnN1Ym1pdGAgbXVzdCBiZSBkZWZpbmVkLicpO1xuICAgIGlmICghZm9ybU5hbWUgfHwgIWNvbmZpZ3NbU1VCTUlUXVtmb3JtTmFtZV0pIHRocm93IFN5bnRheEVycm9yKGBSZXF1ZXN0ICcke2Zvcm1OYW1lfScgbXVzdCBiZSBkZWZpbmVkIGluIGNvbmZpZy5zdWJtaXQuYCk7XG5cbiAgICBjb25zdCBwcmVQcm9jZXNzID0gY29uZmlnc1tCRUZPUkVfU1VCTUlUXSB8fCAoKG8pID0+IChvKSk7XG5cbiAgICAvLyBvbmUgcGFyYW1ldGVyIHBhc3NlZCBpblxuICAgIGxldCBwYXJhbXMgPSBbe30sIGNvbmZpZ3MsIGRhdGEsIHBhZ2VOYW1lXTtcbiAgICAvLyBib3RoIHBhcmFtZXRlcnMgcGFzc2VkIGluXG4gICAgaWYgKGZvcm1OYW1lKSBwYXJhbXMgPSBbcHJlUHJvY2VzcyhkYXRhKSwgY29uZmlncywgZm9ybU5hbWUsIHBhZ2VOYW1lXTtcblxuICAgIHJldHVybiB0aGlzLnByb3BzLmJlZm9yZURpc3BhdGNoUHJvcCguLi5wYXJhbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVdGlsaXR5IEZ1bmN0aW9uOiB0byBiZSBjYWxsZWQgb24gYGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNgXG4gICAqIEF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYXNzaWduZWQgZnVuY3Rpb24gYW5kIGFja25vd2xlZGdlIHRoZSByZWNlaXZlZCBwcm9wXG4gICAqIEBwYXJhbSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIGFjdGlvbnNcbiAgICovXG4gIGFuYWx5c2VQcm9wcyA9IChuZXh0UHJvcHMsIGFjdGlvbnMpID0+XG4gICAgY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMobmV4dFByb3BzLCBhY3Rpb25zLCB7XG4gICAgICBhY2tub3dsZWRnZTogdGhpcy5hY2tub3dsZWRnZVN0b3JlLFxuICAgICAgZGlzcGF0Y2g6IHRoaXMucHJvcHMuZGlzcGF0Y2hQcm9wLFxuICAgIH0pO1xuXG4gIC8qKlxuICAgKiBBY2tub3dsZWRnZSBieSBjbGVhbmluZyB1cCBkYXRhIG9mIGEgcmVxdWVzdCBpbiByZWR1eCBzdG9yZVxuICAgKiBAcGFyYW0gZm9ybU5hbWVcbiAgICovXG4gIGFja25vd2xlZGdlU3RvcmUgPSAoZm9ybU5hbWUpID0+IHRoaXMucHJvcHMuYWNrbm93bGVkZ2VQcm9wKHRoaXMucHJvcHMuY29uZmlncy5wYWdlLCBmb3JtTmFtZSk7XG5cbiAgaXNMb2FkaW5nID0gKGtleSkgPT4ge1xuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5wcm9wc1tTVE9SRV07XG4gICAgaWYgKCFzdG9yZSB8fCB0eXBlb2YgdGhpcy5wcm9wc1tTVE9SRV0uZ2V0ICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMucHJvcHNbU1RPUkVdLmdldChrZXkpO1xuICAgIHJldHVybiAhIShmb3JtICYmIChmb3JtW0lTX0xPQURJTkddIHx8IGZvcm1bV0lMTF9MT0FEXSkpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBDb21wb25lbnQsXG4gICAgICBbU0VUX1ZBUklBQkxFXTogc2V0VmFyaWFibGUsIFtHRVRfVkFSSUFCTEVTXTogdmFyaWFibGVzLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gbWFwIGZ1bmN0aW9ucyBhcyBwcm9wcyB0byBjb21wb25lbnRcbiAgICBjb25zdCByZXNhZ2EgPSB7XG4gICAgICBhbmFseXNlOiB0aGlzLmFuYWx5c2VQcm9wcyxcbiAgICAgIGRpc3BhdGNoOiB0aGlzLmRpc3BhdGNoU2FnYSxcbiAgICAgIGFja25vd2xlZGdlOiB0aGlzLmFja25vd2xlZGdlU3RvcmUsXG4gICAgICBjbGVhbnVwOiB0aGlzLnByb3BzLmNsZWFudXBQcm9wLFxuICAgICAgc2V0VmFsdWU6IHRoaXMuc2V0VmFsdWUsXG4gICAgICBnZXRWYWx1ZTogdGhpcy5nZXRWYWx1ZSxcbiAgICAgIGlzTG9hZGluZzogdGhpcy5pc0xvYWRpbmcsXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgb25TdWJtaXQ9e3RoaXMuZGlzcGF0Y2hTYWdhfSAvLyBrZWVwIGl0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgIHJlc2FnYT17cmVzYWdhfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cblJlU2FnYS5wcm9wVHlwZXMgPSB7XG4gIENvbXBvbmVudDogUHJvcFR5cGVzLmFueSxcbiAgYmVmb3JlRGlzcGF0Y2hQcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgZGlzcGF0Y2hQcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgYWNrbm93bGVkZ2VQcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgY2xlYW51cFByb3A6IFByb3BUeXBlcy5mdW5jLFxuICBjb25maWdzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBbR0VUX1ZBUklBQkxFU106IFByb3BUeXBlcy5vYmplY3QsXG4gIFtTRVRfVkFSSUFCTEVdOiBQcm9wVHlwZXMuZnVuYyxcbiAgW1NFVF9WQVJJQUJMRV9GTl06IFByb3BUeXBlcy5mdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVTYWdhO1xuIl19