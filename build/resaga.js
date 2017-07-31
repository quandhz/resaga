'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReSaga = function (_React$PureComponent) {
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
    }, _this.dispatchSaga = function (data, formName) {
      var preProcess = _this.props.configs[_config.BEFORE_SUBMIT] || function (o) {
        return o;
      };

      // case 1: both parameters passed in
      if (formName) return _this.props.dispatchProp(preProcess(data), _this.props.configs, formName);

      // case 2: one parameter passed in
      return _this.props.dispatchProp({}, _this.props.configs, data);
    }, _this.analyseProps = function (nextProps, actions) {
      return _componentHelpers2.default.analyseNextProps(nextProps, actions, _this.acknowledgeStore);
    }, _this.acknowledgeStore = function (formName) {
      return _this.props.acknowledgeProp(_this.props.configs.page, formName);
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
        getValue: this.getValue
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
}, _defineProperty(_ReSaga$propTypes, _constants.GET_VARIABLES, _react2.default.PropTypes.object), _defineProperty(_ReSaga$propTypes, _constants.SET_VARIABLE, _react2.default.PropTypes.func), _defineProperty(_ReSaga$propTypes, _constants.SET_VARIABLE_FN, _react2.default.PropTypes.func), _ReSaga$propTypes);

exports.default = ReSaga;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZXNhZ2EuanMiXSwibmFtZXMiOlsiUmVTYWdhIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJwcm9wcyIsImNvbmZpZ3MiLCJjbGVhbnVwUHJvcCIsInBhZ2UiLCJzZXRWYWx1ZSIsImtleSIsInZhbHVlT3JGdW5jIiwiZ2V0VmFsdWUiLCJnZXQiLCJkaXNwYXRjaFNhZ2EiLCJkYXRhIiwiZm9ybU5hbWUiLCJwcmVQcm9jZXNzIiwibyIsImRpc3BhdGNoUHJvcCIsImFuYWx5c2VQcm9wcyIsIm5leHRQcm9wcyIsImFjdGlvbnMiLCJhbmFseXNlTmV4dFByb3BzIiwiYWNrbm93bGVkZ2VTdG9yZSIsImFja25vd2xlZGdlUHJvcCIsIkNvbXBvbmVudCIsInNldFZhcmlhYmxlIiwidmFyaWFibGVzIiwicmVzYWdhIiwiYW5hbHlzZSIsImRpc3BhdGNoIiwiYWNrbm93bGVkZ2UiLCJjbGVhbnVwIiwiUHVyZUNvbXBvbmVudCIsInByb3BUeXBlcyIsImFueSIsImZ1bmMiLCJvYmplY3QiLCJQcm9wVHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxNOzs7Ozs7Ozs7Ozs7OztzTEFLSkMsb0IsR0FBdUI7QUFBQSxhQUFNLENBQUMsTUFBS0MsS0FBTCxDQUFXQyxPQUFYLDBCQUFELElBQXlDLE1BQUtELEtBQUwsQ0FBV0UsV0FBWCxDQUF1QixNQUFLRixLQUFMLENBQVdDLE9BQVgsQ0FBbUJFLElBQTFDLENBQS9DO0FBQUEsSyxRQUV2QkMsUSxHQUFXLFVBQUNDLEdBQUQsRUFBTUMsV0FBTixFQUFzQjtBQUMvQixVQUFJLE9BQU9BLFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7QUFDckMsZUFBTyxNQUFLTixLQUFMLDZCQUE0QkssR0FBNUIsRUFBaUNDLFdBQWpDLENBQVA7QUFDRDtBQUNELGFBQU8sTUFBS04sS0FBTCwwQkFBeUJLLEdBQXpCLEVBQThCQyxXQUE5QixDQUFQO0FBQ0QsSyxRQUNEQyxRLEdBQVcsVUFBQ0YsR0FBRDtBQUFBLGFBQVMsTUFBS0wsS0FBTCw2QkFBNEIsTUFBS0EsS0FBTCwyQkFBMEJRLEdBQTFCLENBQThCSCxHQUE5QixDQUE1QixHQUFpRSxJQUExRTtBQUFBLEssUUFTWEksWSxHQUFlLFVBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFvQjtBQUNqQyxVQUFNQyxhQUFhLE1BQUtaLEtBQUwsQ0FBV0MsT0FBWCwyQkFBc0MsVUFBQ1ksQ0FBRDtBQUFBLGVBQVFBLENBQVI7QUFBQSxPQUF6RDs7QUFFQTtBQUNBLFVBQUlGLFFBQUosRUFBYyxPQUFPLE1BQUtYLEtBQUwsQ0FBV2MsWUFBWCxDQUF3QkYsV0FBV0YsSUFBWCxDQUF4QixFQUEwQyxNQUFLVixLQUFMLENBQVdDLE9BQXJELEVBQThEVSxRQUE5RCxDQUFQOztBQUVkO0FBQ0EsYUFBTyxNQUFLWCxLQUFMLENBQVdjLFlBQVgsQ0FBd0IsRUFBeEIsRUFBNEIsTUFBS2QsS0FBTCxDQUFXQyxPQUF2QyxFQUFnRFMsSUFBaEQsQ0FBUDtBQUNELEssUUFRREssWSxHQUFlLFVBQUNDLFNBQUQsRUFBWUMsT0FBWjtBQUFBLGFBQXdCLDJCQUFVQyxnQkFBVixDQUEyQkYsU0FBM0IsRUFBc0NDLE9BQXRDLEVBQStDLE1BQUtFLGdCQUFwRCxDQUF4QjtBQUFBLEssUUFNZkEsZ0IsR0FBbUIsVUFBQ1IsUUFBRDtBQUFBLGFBQWMsTUFBS1gsS0FBTCxDQUFXb0IsZUFBWCxDQUEyQixNQUFLcEIsS0FBTCxDQUFXQyxPQUFYLENBQW1CRSxJQUE5QyxFQUFvRFEsUUFBcEQsQ0FBZDtBQUFBLEs7O0FBM0NuQjs7Ozs7O0FBY0E7Ozs7Ozs7OztBQWlCQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7NkJBTVM7QUFBQSxtQkFLSCxLQUFLWCxLQUxGO0FBQUEsVUFFTHFCLFNBRkssVUFFTEEsU0FGSztBQUFBLFVBR1dDLFdBSFg7QUFBQSxVQUd5Q0MsU0FIekM7QUFBQSxVQUlGdkIsS0FKRTs7QUFPUDs7O0FBQ0EsVUFBTXdCLFNBQVM7QUFDYkMsaUJBQVMsS0FBS1YsWUFERDtBQUViVyxrQkFBVSxLQUFLakIsWUFGRjtBQUdia0IscUJBQWEsS0FBS1IsZ0JBSEw7QUFJYlMsaUJBQVMsS0FBSzVCLEtBQUwsQ0FBV0UsV0FKUDtBQUtiRSxrQkFBVSxLQUFLQSxRQUxGO0FBTWJHLGtCQUFVLEtBQUtBO0FBTkYsT0FBZjs7QUFTQSxhQUNFLDhCQUFDLFNBQUQsZUFDTVAsS0FETjtBQUVFLGtCQUFVLEtBQUtTLFlBRmpCLENBRStCO0FBRi9CLFVBR0UsUUFBUWU7QUFIVixTQURGO0FBT0Q7Ozs7RUF0RWtCLGdCQUFNSyxhOztBQXlFM0IvQixPQUFPZ0MsU0FBUDtBQUNFVCxhQUFXLG9CQUFVVSxHQUR2QjtBQUVFakIsZ0JBQWMsb0JBQVVrQixJQUYxQjtBQUdFWixtQkFBaUIsb0JBQVVZLElBSDdCO0FBSUU5QixlQUFhLG9CQUFVOEIsSUFKekI7QUFLRS9CLFdBQVMsb0JBQVVnQztBQUxyQixnRUFNbUIsZ0JBQU1DLFNBQU4sQ0FBZ0JELE1BTm5DLCtEQU9rQixnQkFBTUMsU0FBTixDQUFnQkYsSUFQbEMsa0VBUXFCLGdCQUFNRSxTQUFOLENBQWdCRixJQVJyQzs7a0JBV2VsQyxNIiwiZmlsZSI6InJlc2FnYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQkVGT1JFX1NVQk1JVCwgTUFOVUFMTFlfQ0xFQU5VUCB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IEdFVF9WQVJJQUJMRVMsIFNFVF9WQVJJQUJMRSwgU0VUX1ZBUklBQkxFX0ZOIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGNvbXBvbmVudCBmcm9tICcuL3V0aWxzL2NvbXBvbmVudC1oZWxwZXJzJztcblxuY2xhc3MgUmVTYWdhIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBBdXRvbWF0aWNhbGx5IGNsZWFyIHJlZHV4IHN0b3JlIG9uIHVuLW1vdW50LlxuICAgKiBVbmxlc3MgdXNlcnMgc2V0IG1hbnVhbGx5Q2xlYW51cCB0byB0cnVlIGluIENPTkZJR1xuICAgKi9cbiAgY29tcG9uZW50V2lsbFVubW91bnQgPSAoKSA9PiAhdGhpcy5wcm9wcy5jb25maWdzW01BTlVBTExZX0NMRUFOVVBdICYmIHRoaXMucHJvcHMuY2xlYW51cFByb3AodGhpcy5wcm9wcy5jb25maWdzLnBhZ2UpO1xuXG4gIHNldFZhbHVlID0gKGtleSwgdmFsdWVPckZ1bmMpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlT3JGdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wc1tTRVRfVkFSSUFCTEVfRk5dKGtleSwgdmFsdWVPckZ1bmMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wc1tTRVRfVkFSSUFCTEVdKGtleSwgdmFsdWVPckZ1bmMpO1xuICB9O1xuICBnZXRWYWx1ZSA9IChrZXkpID0+IHRoaXMucHJvcHNbR0VUX1ZBUklBQkxFU10gPyB0aGlzLnByb3BzW0dFVF9WQVJJQUJMRVNdLmdldChrZXkpIDogbnVsbDtcblxuICAvKipcbiAgICogU3VibWl0IGZvcm0gd2l0aCBkYXRhLiAyIHdheXMgdG8gY2FsbCB0aGlzIGZ1bmN0aW9uOlxuICAgKiAtIENhc2UgMS4gZGlzcGF0Y2hTYWdhKG9yZ1VzZXJEYXRhLCBDUkVBVEVfT1JHX1VTRVIpO1xuICAgKiAtIENhc2UgMi4gZGlzcGF0Y2hTYWdhKEZFVENIX1RFTVBMQVRFUyk7XG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBmb3JtTmFtZVxuICAgKi9cbiAgZGlzcGF0Y2hTYWdhID0gKGRhdGEsIGZvcm1OYW1lKSA9PiB7XG4gICAgY29uc3QgcHJlUHJvY2VzcyA9IHRoaXMucHJvcHMuY29uZmlnc1tCRUZPUkVfU1VCTUlUXSB8fCAoKG8pID0+IChvKSk7XG5cbiAgICAvLyBjYXNlIDE6IGJvdGggcGFyYW1ldGVycyBwYXNzZWQgaW5cbiAgICBpZiAoZm9ybU5hbWUpIHJldHVybiB0aGlzLnByb3BzLmRpc3BhdGNoUHJvcChwcmVQcm9jZXNzKGRhdGEpLCB0aGlzLnByb3BzLmNvbmZpZ3MsIGZvcm1OYW1lKTtcblxuICAgIC8vIGNhc2UgMjogb25lIHBhcmFtZXRlciBwYXNzZWQgaW5cbiAgICByZXR1cm4gdGhpcy5wcm9wcy5kaXNwYXRjaFByb3Aoe30sIHRoaXMucHJvcHMuY29uZmlncywgZGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgRnVuY3Rpb246IHRvIGJlIGNhbGxlZCBvbiBgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc2BcbiAgICogQXV0b21hdGljYWxseSBjYWxsIHRoZSBhc3NpZ25lZCBmdW5jdGlvbiBhbmQgYWNrbm93bGVkZ2UgdGhlIHJlY2VpdmVkIHByb3BcbiAgICogQHBhcmFtIG5leHRQcm9wc1xuICAgKiBAcGFyYW0gYWN0aW9uc1xuICAgKi9cbiAgYW5hbHlzZVByb3BzID0gKG5leHRQcm9wcywgYWN0aW9ucykgPT4gY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMobmV4dFByb3BzLCBhY3Rpb25zLCB0aGlzLmFja25vd2xlZGdlU3RvcmUpO1xuXG4gIC8qKlxuICAgKiBBY2tub3dsZWRnZSBieSBjbGVhbmluZyB1cCBkYXRhIG9mIGEgcmVxdWVzdCBpbiByZWR1eCBzdG9yZVxuICAgKiBAcGFyYW0gZm9ybU5hbWVcbiAgICovXG4gIGFja25vd2xlZGdlU3RvcmUgPSAoZm9ybU5hbWUpID0+IHRoaXMucHJvcHMuYWNrbm93bGVkZ2VQcm9wKHRoaXMucHJvcHMuY29uZmlncy5wYWdlLCBmb3JtTmFtZSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIENvbXBvbmVudCxcbiAgICAgIFtTRVRfVkFSSUFCTEVdOiBzZXRWYXJpYWJsZSwgW0dFVF9WQVJJQUJMRVNdOiB2YXJpYWJsZXMsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBtYXAgZnVuY3Rpb25zIGFzIHByb3BzIHRvIGNvbXBvbmVudFxuICAgIGNvbnN0IHJlc2FnYSA9IHtcbiAgICAgIGFuYWx5c2U6IHRoaXMuYW5hbHlzZVByb3BzLFxuICAgICAgZGlzcGF0Y2g6IHRoaXMuZGlzcGF0Y2hTYWdhLFxuICAgICAgYWNrbm93bGVkZ2U6IHRoaXMuYWNrbm93bGVkZ2VTdG9yZSxcbiAgICAgIGNsZWFudXA6IHRoaXMucHJvcHMuY2xlYW51cFByb3AsXG4gICAgICBzZXRWYWx1ZTogdGhpcy5zZXRWYWx1ZSxcbiAgICAgIGdldFZhbHVlOiB0aGlzLmdldFZhbHVlLFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIG9uU3VibWl0PXt0aGlzLmRpc3BhdGNoU2FnYX0gLy8ga2VlcCBpdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICByZXNhZ2E9e3Jlc2FnYX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5SZVNhZ2EucHJvcFR5cGVzID0ge1xuICBDb21wb25lbnQ6IFByb3BUeXBlcy5hbnksXG4gIGRpc3BhdGNoUHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gIGFja25vd2xlZGdlUHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gIGNsZWFudXBQcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgY29uZmlnczogUHJvcFR5cGVzLm9iamVjdCxcbiAgW0dFVF9WQVJJQUJMRVNdOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICBbU0VUX1ZBUklBQkxFXTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIFtTRVRfVkFSSUFCTEVfRk5dOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlU2FnYTtcbiJdfQ==