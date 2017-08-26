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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZXNhZ2EuanMiXSwibmFtZXMiOlsiUmVTYWdhIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJwcm9wcyIsImNvbmZpZ3MiLCJjbGVhbnVwUHJvcCIsInBhZ2UiLCJzZXRWYWx1ZSIsImtleSIsInZhbHVlT3JGdW5jIiwiZ2V0VmFsdWUiLCJnZXQiLCJkaXNwYXRjaFNhZ2EiLCJkYXRhIiwiZm9ybU5hbWUiLCJwcmVQcm9jZXNzIiwibyIsImRpc3BhdGNoUHJvcCIsImFuYWx5c2VQcm9wcyIsIm5leHRQcm9wcyIsImFjdGlvbnMiLCJhbmFseXNlTmV4dFByb3BzIiwiYWNrbm93bGVkZ2VTdG9yZSIsImFja25vd2xlZGdlUHJvcCIsImlzTG9hZGluZyIsInN0b3JlIiwiZm9ybSIsIkNvbXBvbmVudCIsInNldFZhcmlhYmxlIiwidmFyaWFibGVzIiwicmVzYWdhIiwiYW5hbHlzZSIsImRpc3BhdGNoIiwiYWNrbm93bGVkZ2UiLCJjbGVhbnVwIiwiUHVyZUNvbXBvbmVudCIsInByb3BUeXBlcyIsImFueSIsImZ1bmMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsTSxXQUFBQSxNOzs7Ozs7Ozs7Ozs7OztzTEFLWEMsb0IsR0FBdUI7QUFBQSxhQUFNLENBQUMsTUFBS0MsS0FBTCxDQUFXQyxPQUFYLDBCQUFELElBQXlDLE1BQUtELEtBQUwsQ0FBV0UsV0FBWCxDQUF1QixNQUFLRixLQUFMLENBQVdDLE9BQVgsQ0FBbUJFLElBQTFDLENBQS9DO0FBQUEsSyxRQUV2QkMsUSxHQUFXLFVBQUNDLEdBQUQsRUFBTUMsV0FBTixFQUFzQjtBQUMvQixVQUFJLE9BQU9BLFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7QUFDckMsZUFBTyxNQUFLTixLQUFMLDZCQUE0QkssR0FBNUIsRUFBaUNDLFdBQWpDLENBQVA7QUFDRDtBQUNELGFBQU8sTUFBS04sS0FBTCwwQkFBeUJLLEdBQXpCLEVBQThCQyxXQUE5QixDQUFQO0FBQ0QsSyxRQUNEQyxRLEdBQVcsVUFBQ0YsR0FBRDtBQUFBLGFBQVMsTUFBS0wsS0FBTCw2QkFBNEIsTUFBS0EsS0FBTCwyQkFBMEJRLEdBQTFCLENBQThCSCxHQUE5QixDQUE1QixHQUFpRSxJQUExRTtBQUFBLEssUUFTWEksWSxHQUFlLFVBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFvQjtBQUNqQyxVQUFNQyxhQUFhLE1BQUtaLEtBQUwsQ0FBV0MsT0FBWCwyQkFBc0MsVUFBQ1ksQ0FBRDtBQUFBLGVBQVFBLENBQVI7QUFBQSxPQUF6RDs7QUFFQTtBQUNBLFVBQUlGLFFBQUosRUFBYyxPQUFPLE1BQUtYLEtBQUwsQ0FBV2MsWUFBWCxDQUF3QkYsV0FBV0YsSUFBWCxDQUF4QixFQUEwQyxNQUFLVixLQUFMLENBQVdDLE9BQXJELEVBQThEVSxRQUE5RCxDQUFQOztBQUVkO0FBQ0EsYUFBTyxNQUFLWCxLQUFMLENBQVdjLFlBQVgsQ0FBd0IsRUFBeEIsRUFBNEIsTUFBS2QsS0FBTCxDQUFXQyxPQUF2QyxFQUFnRFMsSUFBaEQsQ0FBUDtBQUNELEssUUFRREssWSxHQUFlLFVBQUNDLFNBQUQsRUFBWUMsT0FBWjtBQUFBLGFBQXdCLDJCQUFVQyxnQkFBVixDQUEyQkYsU0FBM0IsRUFBc0NDLE9BQXRDLEVBQStDLE1BQUtFLGdCQUFwRCxDQUF4QjtBQUFBLEssUUFNZkEsZ0IsR0FBbUIsVUFBQ1IsUUFBRDtBQUFBLGFBQWMsTUFBS1gsS0FBTCxDQUFXb0IsZUFBWCxDQUEyQixNQUFLcEIsS0FBTCxDQUFXQyxPQUFYLENBQW1CRSxJQUE5QyxFQUFvRFEsUUFBcEQsQ0FBZDtBQUFBLEssUUFFbkJVLFMsR0FBWSxVQUFDaEIsR0FBRCxFQUFTO0FBQ25CLFVBQU1pQixRQUFRLE1BQUt0QixLQUFMLGtCQUFkO0FBQ0EsVUFBSSxDQUFDc0IsS0FBRCxJQUFVLE9BQU8sTUFBS3RCLEtBQUwsbUJBQWtCUSxHQUF6QixLQUFpQyxVQUEvQyxFQUEyRCxPQUFPLEtBQVA7QUFDM0QsVUFBTWUsT0FBTyxNQUFLdkIsS0FBTCxtQkFBa0JRLEdBQWxCLENBQXNCSCxHQUF0QixDQUFiO0FBQ0EsYUFBTyxDQUFDLEVBQUVrQixRQUFRQSwyQkFBVixDQUFSO0FBQ0QsSzs7QUFsREQ7Ozs7OztBQWNBOzs7Ozs7Ozs7QUFpQkE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7OzZCQWFTO0FBQUEsbUJBS0gsS0FBS3ZCLEtBTEY7QUFBQSxVQUVMd0IsU0FGSyxVQUVMQSxTQUZLO0FBQUEsVUFHV0MsV0FIWDtBQUFBLFVBR3lDQyxTQUh6QztBQUFBLFVBSUYxQixLQUpFOztBQU9QOzs7QUFDQSxVQUFNMkIsU0FBUztBQUNiQyxpQkFBUyxLQUFLYixZQUREO0FBRWJjLGtCQUFVLEtBQUtwQixZQUZGO0FBR2JxQixxQkFBYSxLQUFLWCxnQkFITDtBQUliWSxpQkFBUyxLQUFLL0IsS0FBTCxDQUFXRSxXQUpQO0FBS2JFLGtCQUFVLEtBQUtBLFFBTEY7QUFNYkcsa0JBQVUsS0FBS0EsUUFORjtBQU9iYyxtQkFBVyxLQUFLQTtBQVBILE9BQWY7O0FBVUEsYUFDRSw4QkFBQyxTQUFELGVBQ01yQixLQUROO0FBRUUsa0JBQVUsS0FBS1MsWUFGakIsQ0FFK0I7QUFGL0IsVUFHRSxRQUFRa0I7QUFIVixTQURGO0FBT0Q7Ozs7RUE5RXlCLGdCQUFNSyxhOztBQWlGbENsQyxPQUFPbUMsU0FBUDtBQUNFVCxhQUFXLG9CQUFVVSxHQUR2QjtBQUVFcEIsZ0JBQWMsb0JBQVVxQixJQUYxQjtBQUdFZixtQkFBaUIsb0JBQVVlLElBSDdCO0FBSUVqQyxlQUFhLG9CQUFVaUMsSUFKekI7QUFLRWxDLFdBQVMsb0JBQVVtQztBQUxyQixnRUFNbUIsb0JBQVVBLE1BTjdCLCtEQU9rQixvQkFBVUQsSUFQNUIsa0VBUXFCLG9CQUFVQSxJQVIvQjs7a0JBV2VyQyxNIiwiZmlsZSI6InJlc2FnYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQkVGT1JFX1NVQk1JVCwgTUFOVUFMTFlfQ0xFQU5VUCB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IEdFVF9WQVJJQUJMRVMsIFNFVF9WQVJJQUJMRSwgU0VUX1ZBUklBQkxFX0ZOLCBTVE9SRSwgSVNfTE9BRElORyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBjb21wb25lbnQgZnJvbSAnLi91dGlscy9jb21wb25lbnQtaGVscGVycyc7XG5cbmV4cG9ydCBjbGFzcyBSZVNhZ2EgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEF1dG9tYXRpY2FsbHkgY2xlYXIgcmVkdXggc3RvcmUgb24gdW4tbW91bnQuXG4gICAqIFVubGVzcyB1c2VycyBzZXQgbWFudWFsbHlDbGVhbnVwIHRvIHRydWUgaW4gQ09ORklHXG4gICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudCA9ICgpID0+ICF0aGlzLnByb3BzLmNvbmZpZ3NbTUFOVUFMTFlfQ0xFQU5VUF0gJiYgdGhpcy5wcm9wcy5jbGVhbnVwUHJvcCh0aGlzLnByb3BzLmNvbmZpZ3MucGFnZSk7XG5cbiAgc2V0VmFsdWUgPSAoa2V5LCB2YWx1ZU9yRnVuYykgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWVPckZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzW1NFVF9WQVJJQUJMRV9GTl0oa2V5LCB2YWx1ZU9yRnVuYyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb3BzW1NFVF9WQVJJQUJMRV0oa2V5LCB2YWx1ZU9yRnVuYyk7XG4gIH07XG4gIGdldFZhbHVlID0gKGtleSkgPT4gdGhpcy5wcm9wc1tHRVRfVkFSSUFCTEVTXSA/IHRoaXMucHJvcHNbR0VUX1ZBUklBQkxFU10uZ2V0KGtleSkgOiBudWxsO1xuXG4gIC8qKlxuICAgKiBTdWJtaXQgZm9ybSB3aXRoIGRhdGEuIDIgd2F5cyB0byBjYWxsIHRoaXMgZnVuY3Rpb246XG4gICAqIC0gQ2FzZSAxLiBkaXNwYXRjaFNhZ2Eob3JnVXNlckRhdGEsIENSRUFURV9PUkdfVVNFUik7XG4gICAqIC0gQ2FzZSAyLiBkaXNwYXRjaFNhZ2EoRkVUQ0hfVEVNUExBVEVTKTtcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHBhcmFtIGZvcm1OYW1lXG4gICAqL1xuICBkaXNwYXRjaFNhZ2EgPSAoZGF0YSwgZm9ybU5hbWUpID0+IHtcbiAgICBjb25zdCBwcmVQcm9jZXNzID0gdGhpcy5wcm9wcy5jb25maWdzW0JFRk9SRV9TVUJNSVRdIHx8ICgobykgPT4gKG8pKTtcblxuICAgIC8vIGNhc2UgMTogYm90aCBwYXJhbWV0ZXJzIHBhc3NlZCBpblxuICAgIGlmIChmb3JtTmFtZSkgcmV0dXJuIHRoaXMucHJvcHMuZGlzcGF0Y2hQcm9wKHByZVByb2Nlc3MoZGF0YSksIHRoaXMucHJvcHMuY29uZmlncywgZm9ybU5hbWUpO1xuXG4gICAgLy8gY2FzZSAyOiBvbmUgcGFyYW1ldGVyIHBhc3NlZCBpblxuICAgIHJldHVybiB0aGlzLnByb3BzLmRpc3BhdGNoUHJvcCh7fSwgdGhpcy5wcm9wcy5jb25maWdzLCBkYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogVXRpbGl0eSBGdW5jdGlvbjogdG8gYmUgY2FsbGVkIG9uIGBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzYFxuICAgKiBBdXRvbWF0aWNhbGx5IGNhbGwgdGhlIGFzc2lnbmVkIGZ1bmN0aW9uIGFuZCBhY2tub3dsZWRnZSB0aGUgcmVjZWl2ZWQgcHJvcFxuICAgKiBAcGFyYW0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSBhY3Rpb25zXG4gICAqL1xuICBhbmFseXNlUHJvcHMgPSAobmV4dFByb3BzLCBhY3Rpb25zKSA9PiBjb21wb25lbnQuYW5hbHlzZU5leHRQcm9wcyhuZXh0UHJvcHMsIGFjdGlvbnMsIHRoaXMuYWNrbm93bGVkZ2VTdG9yZSk7XG5cbiAgLyoqXG4gICAqIEFja25vd2xlZGdlIGJ5IGNsZWFuaW5nIHVwIGRhdGEgb2YgYSByZXF1ZXN0IGluIHJlZHV4IHN0b3JlXG4gICAqIEBwYXJhbSBmb3JtTmFtZVxuICAgKi9cbiAgYWNrbm93bGVkZ2VTdG9yZSA9IChmb3JtTmFtZSkgPT4gdGhpcy5wcm9wcy5hY2tub3dsZWRnZVByb3AodGhpcy5wcm9wcy5jb25maWdzLnBhZ2UsIGZvcm1OYW1lKTtcblxuICBpc0xvYWRpbmcgPSAoa2V5KSA9PiB7XG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLnByb3BzW1NUT1JFXTtcbiAgICBpZiAoIXN0b3JlIHx8IHR5cGVvZiB0aGlzLnByb3BzW1NUT1JFXS5nZXQgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBmb3JtID0gdGhpcy5wcm9wc1tTVE9SRV0uZ2V0KGtleSk7XG4gICAgcmV0dXJuICEhKGZvcm0gJiYgZm9ybVtJU19MT0FESU5HXSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIENvbXBvbmVudCxcbiAgICAgIFtTRVRfVkFSSUFCTEVdOiBzZXRWYXJpYWJsZSwgW0dFVF9WQVJJQUJMRVNdOiB2YXJpYWJsZXMsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBtYXAgZnVuY3Rpb25zIGFzIHByb3BzIHRvIGNvbXBvbmVudFxuICAgIGNvbnN0IHJlc2FnYSA9IHtcbiAgICAgIGFuYWx5c2U6IHRoaXMuYW5hbHlzZVByb3BzLFxuICAgICAgZGlzcGF0Y2g6IHRoaXMuZGlzcGF0Y2hTYWdhLFxuICAgICAgYWNrbm93bGVkZ2U6IHRoaXMuYWNrbm93bGVkZ2VTdG9yZSxcbiAgICAgIGNsZWFudXA6IHRoaXMucHJvcHMuY2xlYW51cFByb3AsXG4gICAgICBzZXRWYWx1ZTogdGhpcy5zZXRWYWx1ZSxcbiAgICAgIGdldFZhbHVlOiB0aGlzLmdldFZhbHVlLFxuICAgICAgaXNMb2FkaW5nOiB0aGlzLmlzTG9hZGluZyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgICBvblN1Ym1pdD17dGhpcy5kaXNwYXRjaFNhZ2F9IC8vIGtlZXAgaXQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgcmVzYWdhPXtyZXNhZ2F9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuUmVTYWdhLnByb3BUeXBlcyA9IHtcbiAgQ29tcG9uZW50OiBQcm9wVHlwZXMuYW55LFxuICBkaXNwYXRjaFByb3A6IFByb3BUeXBlcy5mdW5jLFxuICBhY2tub3dsZWRnZVByb3A6IFByb3BUeXBlcy5mdW5jLFxuICBjbGVhbnVwUHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gIGNvbmZpZ3M6IFByb3BUeXBlcy5vYmplY3QsXG4gIFtHRVRfVkFSSUFCTEVTXTogUHJvcFR5cGVzLm9iamVjdCxcbiAgW1NFVF9WQVJJQUJMRV06IFByb3BUeXBlcy5mdW5jLFxuICBbU0VUX1ZBUklBQkxFX0ZOXTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZVNhZ2E7XG4iXX0=