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
      var configs = pageName && (0, _index.getConfig)(pageName) || _this.props.configs;
      console.log('configs', configs);

      if (!configs) throw SyntaxError('`config` must be defined.');
      if (!configs[_config.SUBMIT]) throw SyntaxError('`config.submit` must be defined.');
      if (!formName || !configs[_config.SUBMIT][formName]) throw SyntaxError('Request \'' + formName + '\' must be defined in config.submit.');

      var preProcess = configs[_config.BEFORE_SUBMIT] || function (o) {
        return o;
      };

      // case 1: both parameters passed in
      if (formName) return _this.props.dispatchProp(preProcess(data), configs, formName, pageName);

      // case 2: one parameter passed in
      return _this.props.dispatchProp({}, configs, data, pageName);
    }, _this.analyseProps = function (nextProps, actions) {
      return _componentHelpers2.default.analyseNextProps(nextProps, actions, _this.acknowledgeStore);
    }, _this.acknowledgeStore = function (formName) {
      return _this.props.acknowledgeProp(_this.props.configs.page, formName);
    }, _this.isLoading = function (key) {
      var store = _this.props[_constants.STORE];
      if (!store || typeof _this.props[_constants.STORE].get !== 'function') return false;
      var form = _this.props[_constants.STORE].get(key);
      return !!(form && form[_constants.IS_LOADING]);
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
  dispatchProp: _propTypes2.default.func,
  acknowledgeProp: _propTypes2.default.func,
  cleanupProp: _propTypes2.default.func,
  configs: _propTypes2.default.object
}, _defineProperty(_ReSaga$propTypes, _constants.GET_VARIABLES, _propTypes2.default.object), _defineProperty(_ReSaga$propTypes, _constants.SET_VARIABLE, _propTypes2.default.func), _defineProperty(_ReSaga$propTypes, _constants.SET_VARIABLE_FN, _propTypes2.default.func), _ReSaga$propTypes);

exports.default = ReSaga;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZXNhZ2EuanMiXSwibmFtZXMiOlsiUmVTYWdhIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJwcm9wcyIsImNvbmZpZ3MiLCJjbGVhbnVwUHJvcCIsInBhZ2UiLCJzZXRWYWx1ZSIsImtleSIsInZhbHVlT3JGdW5jIiwiZ2V0VmFsdWUiLCJnZXQiLCJkaXNwYXRjaFNhZ2EiLCJkYXRhIiwiZm9ybU5hbWUiLCJwYWdlTmFtZSIsImNvbnNvbGUiLCJsb2ciLCJTeW50YXhFcnJvciIsInByZVByb2Nlc3MiLCJvIiwiZGlzcGF0Y2hQcm9wIiwiYW5hbHlzZVByb3BzIiwibmV4dFByb3BzIiwiYWN0aW9ucyIsImFuYWx5c2VOZXh0UHJvcHMiLCJhY2tub3dsZWRnZVN0b3JlIiwiYWNrbm93bGVkZ2VQcm9wIiwiaXNMb2FkaW5nIiwic3RvcmUiLCJmb3JtIiwiQ29tcG9uZW50Iiwic2V0VmFyaWFibGUiLCJ2YXJpYWJsZXMiLCJyZXNhZ2EiLCJhbmFseXNlIiwiZGlzcGF0Y2giLCJhY2tub3dsZWRnZSIsImNsZWFudXAiLCJQdXJlQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiYW55IiwiZnVuYyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVhQSxNLFdBQUFBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUtYQyxvQixHQUF1QjtBQUFBLGFBQU0sQ0FBQyxNQUFLQyxLQUFMLENBQVdDLE9BQVgsMEJBQUQsSUFBeUMsTUFBS0QsS0FBTCxDQUFXRSxXQUFYLENBQXVCLE1BQUtGLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQkUsSUFBMUMsQ0FBL0M7QUFBQSxLLFFBRXZCQyxRLEdBQVcsVUFBQ0MsR0FBRCxFQUFNQyxXQUFOLEVBQXNCO0FBQy9CLFVBQUksT0FBT0EsV0FBUCxLQUF1QixVQUEzQixFQUF1QztBQUNyQyxlQUFPLE1BQUtOLEtBQUwsNkJBQTRC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U0FERjtBQU9EOzs7O0VBdEZ5QixnQkFBTUssYTs7QUF5RmxDdEMsT0FBT3VDLFNBQVA7QUFDRVQsYUFBVyxvQkFBVVUsR0FEdkI7QUFFRXBCLGdCQUFjLG9CQUFVcUIsSUFGMUI7QUFHRWYsbUJBQWlCLG9CQUFVZSxJQUg3QjtBQUlFckMsZUFBYSxvQkFBVXFDLElBSnpCO0FBS0V0QyxXQUFTLG9CQUFVdUM7QUFMckIsZ0VBTW1CLG9CQUFVQSxNQU43QiwrREFPa0Isb0JBQVVELElBUDVCLGtFQVFxQixvQkFBVUEsSUFSL0I7O2tCQVdlekMsTSIsImZpbGUiOiJyZXNhZ2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJFRk9SRV9TVUJNSVQsIFNVQk1JVCwgTUFOVUFMTFlfQ0xFQU5VUCB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IEdFVF9WQVJJQUJMRVMsIFNFVF9WQVJJQUJMRSwgU0VUX1ZBUklBQkxFX0ZOLCBTVE9SRSwgSVNfTE9BRElORyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBjb21wb25lbnQgZnJvbSAnLi91dGlscy9jb21wb25lbnQtaGVscGVycyc7XG5pbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGNsYXNzIFJlU2FnYSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAvKipcbiAgICogQXV0b21hdGljYWxseSBjbGVhciByZWR1eCBzdG9yZSBvbiB1bi1tb3VudC5cbiAgICogVW5sZXNzIHVzZXJzIHNldCBtYW51YWxseUNsZWFudXAgdG8gdHJ1ZSBpbiBDT05GSUdcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4gIXRoaXMucHJvcHMuY29uZmlnc1tNQU5VQUxMWV9DTEVBTlVQXSAmJiB0aGlzLnByb3BzLmNsZWFudXBQcm9wKHRoaXMucHJvcHMuY29uZmlncy5wYWdlKTtcblxuICBzZXRWYWx1ZSA9IChrZXksIHZhbHVlT3JGdW5jKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZU9yRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHNbU0VUX1ZBUklBQkxFX0ZOXShrZXksIHZhbHVlT3JGdW5jKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcHNbU0VUX1ZBUklBQkxFXShrZXksIHZhbHVlT3JGdW5jKTtcbiAgfTtcbiAgZ2V0VmFsdWUgPSAoa2V5KSA9PiB0aGlzLnByb3BzW0dFVF9WQVJJQUJMRVNdID8gdGhpcy5wcm9wc1tHRVRfVkFSSUFCTEVTXS5nZXQoa2V5KSA6IG51bGw7XG5cbiAgLyoqXG4gICAqIFN1Ym1pdCBmb3JtIHdpdGggZGF0YS4gMiB3YXlzIHRvIGNhbGwgdGhpcyBmdW5jdGlvbjpcbiAgICogLSBDYXNlIDEuIGRpc3BhdGNoU2FnYShvcmdVc2VyRGF0YSwgQ1JFQVRFX09SR19VU0VSKTtcbiAgICogLSBDYXNlIDIuIGRpc3BhdGNoU2FnYShGRVRDSF9URU1QTEFURVMpO1xuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcGFyYW0gZm9ybU5hbWVcbiAgICogQHBhcmFtIHBhZ2VOYW1lXG4gICAqL1xuICBkaXNwYXRjaFNhZ2EgPSAoZGF0YSwgZm9ybU5hbWUsIHBhZ2VOYW1lKSA9PiB7XG4gICAgY29uc3QgY29uZmlncyA9IChwYWdlTmFtZSAmJiBnZXRDb25maWcocGFnZU5hbWUpKSB8fCB0aGlzLnByb3BzLmNvbmZpZ3M7XG4gICAgY29uc29sZS5sb2coJ2NvbmZpZ3MnLCBjb25maWdzKTtcblxuICAgIGlmICghY29uZmlncykgdGhyb3cgU3ludGF4RXJyb3IoJ2Bjb25maWdgIG11c3QgYmUgZGVmaW5lZC4nKTtcbiAgICBpZiAoIWNvbmZpZ3NbU1VCTUlUXSkgdGhyb3cgU3ludGF4RXJyb3IoJ2Bjb25maWcuc3VibWl0YCBtdXN0IGJlIGRlZmluZWQuJyk7XG4gICAgaWYgKCFmb3JtTmFtZSB8fCAhY29uZmlnc1tTVUJNSVRdW2Zvcm1OYW1lXSkgdGhyb3cgU3ludGF4RXJyb3IoYFJlcXVlc3QgJyR7Zm9ybU5hbWV9JyBtdXN0IGJlIGRlZmluZWQgaW4gY29uZmlnLnN1Ym1pdC5gKTtcblxuICAgIGNvbnN0IHByZVByb2Nlc3MgPSBjb25maWdzW0JFRk9SRV9TVUJNSVRdIHx8ICgobykgPT4gKG8pKTtcblxuICAgIC8vIGNhc2UgMTogYm90aCBwYXJhbWV0ZXJzIHBhc3NlZCBpblxuICAgIGlmIChmb3JtTmFtZSkgcmV0dXJuIHRoaXMucHJvcHMuZGlzcGF0Y2hQcm9wKHByZVByb2Nlc3MoZGF0YSksIGNvbmZpZ3MsIGZvcm1OYW1lLCBwYWdlTmFtZSk7XG5cbiAgICAvLyBjYXNlIDI6IG9uZSBwYXJhbWV0ZXIgcGFzc2VkIGluXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuZGlzcGF0Y2hQcm9wKHt9LCBjb25maWdzLCBkYXRhLCBwYWdlTmFtZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgRnVuY3Rpb246IHRvIGJlIGNhbGxlZCBvbiBgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc2BcbiAgICogQXV0b21hdGljYWxseSBjYWxsIHRoZSBhc3NpZ25lZCBmdW5jdGlvbiBhbmQgYWNrbm93bGVkZ2UgdGhlIHJlY2VpdmVkIHByb3BcbiAgICogQHBhcmFtIG5leHRQcm9wc1xuICAgKiBAcGFyYW0gYWN0aW9uc1xuICAgKi9cbiAgYW5hbHlzZVByb3BzID0gKG5leHRQcm9wcywgYWN0aW9ucykgPT4gY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMobmV4dFByb3BzLCBhY3Rpb25zLCB0aGlzLmFja25vd2xlZGdlU3RvcmUpO1xuXG4gIC8qKlxuICAgKiBBY2tub3dsZWRnZSBieSBjbGVhbmluZyB1cCBkYXRhIG9mIGEgcmVxdWVzdCBpbiByZWR1eCBzdG9yZVxuICAgKiBAcGFyYW0gZm9ybU5hbWVcbiAgICovXG4gIGFja25vd2xlZGdlU3RvcmUgPSAoZm9ybU5hbWUpID0+IHRoaXMucHJvcHMuYWNrbm93bGVkZ2VQcm9wKHRoaXMucHJvcHMuY29uZmlncy5wYWdlLCBmb3JtTmFtZSk7XG5cbiAgaXNMb2FkaW5nID0gKGtleSkgPT4ge1xuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5wcm9wc1tTVE9SRV07XG4gICAgaWYgKCFzdG9yZSB8fCB0eXBlb2YgdGhpcy5wcm9wc1tTVE9SRV0uZ2V0ICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMucHJvcHNbU1RPUkVdLmdldChrZXkpO1xuICAgIHJldHVybiAhIShmb3JtICYmIGZvcm1bSVNfTE9BRElOR10pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBDb21wb25lbnQsXG4gICAgICBbU0VUX1ZBUklBQkxFXTogc2V0VmFyaWFibGUsIFtHRVRfVkFSSUFCTEVTXTogdmFyaWFibGVzLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gbWFwIGZ1bmN0aW9ucyBhcyBwcm9wcyB0byBjb21wb25lbnRcbiAgICBjb25zdCByZXNhZ2EgPSB7XG4gICAgICBhbmFseXNlOiB0aGlzLmFuYWx5c2VQcm9wcyxcbiAgICAgIGRpc3BhdGNoOiB0aGlzLmRpc3BhdGNoU2FnYSxcbiAgICAgIGFja25vd2xlZGdlOiB0aGlzLmFja25vd2xlZGdlU3RvcmUsXG4gICAgICBjbGVhbnVwOiB0aGlzLnByb3BzLmNsZWFudXBQcm9wLFxuICAgICAgc2V0VmFsdWU6IHRoaXMuc2V0VmFsdWUsXG4gICAgICBnZXRWYWx1ZTogdGhpcy5nZXRWYWx1ZSxcbiAgICAgIGlzTG9hZGluZzogdGhpcy5pc0xvYWRpbmcsXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgb25TdWJtaXQ9e3RoaXMuZGlzcGF0Y2hTYWdhfSAvLyBrZWVwIGl0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgIHJlc2FnYT17cmVzYWdhfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cblJlU2FnYS5wcm9wVHlwZXMgPSB7XG4gIENvbXBvbmVudDogUHJvcFR5cGVzLmFueSxcbiAgZGlzcGF0Y2hQcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgYWNrbm93bGVkZ2VQcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgY2xlYW51cFByb3A6IFByb3BUeXBlcy5mdW5jLFxuICBjb25maWdzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBbR0VUX1ZBUklBQkxFU106IFByb3BUeXBlcy5vYmplY3QsXG4gIFtTRVRfVkFSSUFCTEVdOiBQcm9wVHlwZXMuZnVuYyxcbiAgW1NFVF9WQVJJQUJMRV9GTl06IFByb3BUeXBlcy5mdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVTYWdhO1xuIl19