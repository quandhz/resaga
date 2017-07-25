'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('./config');

var _componentHelpers = require('./utils/component-helpers');

var _componentHelpers2 = _interopRequireDefault(_componentHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by quando on 14/7/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


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
      // eslint-disable-next-line no-unused-vars
      var _props = this.props,
          Component = _props.Component,
          props = _objectWithoutProperties(_props, ['Component']);

      // map functions as props to component


      var resaga = {
        analyse: this.analyseProps,
        dispatch: this.dispatchSaga,
        acknowledge: this.acknowledgeStore,
        cleanup: this.props.cleanupProp
      };

      return _react2.default.createElement(Component, _extends({}, props, {
        onSubmit: this.dispatchSaga // keep it for backward compatibility
        , resaga: resaga
      }));
    }
  }]);

  return ReSaga;
}(_react2.default.PureComponent);

ReSaga.propTypes = {
  Component: _react2.default.PropTypes.any,
  dispatchProp: _react2.default.PropTypes.func,
  acknowledgeProp: _react2.default.PropTypes.func,
  cleanupProp: _react2.default.PropTypes.func,
  configs: _react2.default.PropTypes.object
};

exports.default = ReSaga;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZXNhZ2EuanMiXSwibmFtZXMiOlsiUmVTYWdhIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJwcm9wcyIsImNvbmZpZ3MiLCJjbGVhbnVwUHJvcCIsInBhZ2UiLCJkaXNwYXRjaFNhZ2EiLCJkYXRhIiwiZm9ybU5hbWUiLCJwcmVQcm9jZXNzIiwibyIsImRpc3BhdGNoUHJvcCIsImFuYWx5c2VQcm9wcyIsIm5leHRQcm9wcyIsImFjdGlvbnMiLCJhbmFseXNlTmV4dFByb3BzIiwiYWNrbm93bGVkZ2VTdG9yZSIsImFja25vd2xlZGdlUHJvcCIsIkNvbXBvbmVudCIsInJlc2FnYSIsImFuYWx5c2UiLCJkaXNwYXRjaCIsImFja25vd2xlZGdlIiwiY2xlYW51cCIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJhbnkiLCJmdW5jIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7OytlQUxBOzs7OztJQU9NQSxNOzs7Ozs7Ozs7Ozs7OztzTEFLSkMsb0IsR0FBdUI7QUFBQSxhQUFNLENBQUMsTUFBS0MsS0FBTCxDQUFXQyxPQUFYLDBCQUFELElBQXlDLE1BQUtELEtBQUwsQ0FBV0UsV0FBWCxDQUF1QixNQUFLRixLQUFMLENBQVdDLE9BQVgsQ0FBbUJFLElBQTFDLENBQS9DO0FBQUEsSyxRQVN2QkMsWSxHQUFlLFVBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFvQjtBQUNqQyxVQUFNQyxhQUFhLE1BQUtQLEtBQUwsQ0FBV0MsT0FBWCwyQkFBc0MsVUFBQ08sQ0FBRDtBQUFBLGVBQVFBLENBQVI7QUFBQSxPQUF6RDs7QUFFQTtBQUNBLFVBQUlGLFFBQUosRUFBYyxPQUFPLE1BQUtOLEtBQUwsQ0FBV1MsWUFBWCxDQUF3QkYsV0FBV0YsSUFBWCxDQUF4QixFQUEwQyxNQUFLTCxLQUFMLENBQVdDLE9BQXJELEVBQThESyxRQUE5RCxDQUFQOztBQUVkO0FBQ0EsYUFBTyxNQUFLTixLQUFMLENBQVdTLFlBQVgsQ0FBd0IsRUFBeEIsRUFBNEIsTUFBS1QsS0FBTCxDQUFXQyxPQUF2QyxFQUFnREksSUFBaEQsQ0FBUDtBQUNELEssUUFRREssWSxHQUFlLFVBQUNDLFNBQUQsRUFBWUMsT0FBWjtBQUFBLGFBQXdCLDJCQUFVQyxnQkFBVixDQUEyQkYsU0FBM0IsRUFBc0NDLE9BQXRDLEVBQStDLE1BQUtFLGdCQUFwRCxDQUF4QjtBQUFBLEssUUFNZkEsZ0IsR0FBbUIsVUFBQ1IsUUFBRDtBQUFBLGFBQWMsTUFBS04sS0FBTCxDQUFXZSxlQUFYLENBQTJCLE1BQUtmLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQkUsSUFBOUMsRUFBb0RHLFFBQXBELENBQWQ7QUFBQSxLOztBQW5DbkI7Ozs7OztBQU1BOzs7Ozs7Ozs7QUFpQkE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7OzZCQU1TO0FBQ1Q7QUFEUyxtQkFFeUIsS0FBS04sS0FGOUI7QUFBQSxVQUVDZ0IsU0FGRCxVQUVDQSxTQUZEO0FBQUEsVUFFZWhCLEtBRmY7O0FBSVA7OztBQUNBLFVBQU1pQixTQUFTO0FBQ2JDLGlCQUFTLEtBQUtSLFlBREQ7QUFFYlMsa0JBQVUsS0FBS2YsWUFGRjtBQUdiZ0IscUJBQWEsS0FBS04sZ0JBSEw7QUFJYk8saUJBQVMsS0FBS3JCLEtBQUwsQ0FBV0U7QUFKUCxPQUFmOztBQU9BLGFBQ0UsOEJBQUMsU0FBRCxlQUNNRixLQUROO0FBRUUsa0JBQVUsS0FBS0ksWUFGakIsQ0FFK0I7QUFGL0IsVUFHRSxRQUFRYTtBQUhWLFNBREY7QUFPRDs7OztFQXpEa0IsZ0JBQU1LLGE7O0FBNEQzQnhCLE9BQU95QixTQUFQLEdBQW1CO0FBQ2pCUCxhQUFXLGdCQUFNUSxTQUFOLENBQWdCQyxHQURWO0FBRWpCaEIsZ0JBQWMsZ0JBQU1lLFNBQU4sQ0FBZ0JFLElBRmI7QUFHakJYLG1CQUFpQixnQkFBTVMsU0FBTixDQUFnQkUsSUFIaEI7QUFJakJ4QixlQUFhLGdCQUFNc0IsU0FBTixDQUFnQkUsSUFKWjtBQUtqQnpCLFdBQVMsZ0JBQU11QixTQUFOLENBQWdCRztBQUxSLENBQW5COztrQkFRZTdCLE0iLCJmaWxlIjoicmVzYWdhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHF1YW5kbyBvbiAxNC83LzE3LlxuICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTUFOVUFMTFlfQ0xFQU5VUCwgQkVGT1JFX1NVQk1JVCB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBjb21wb25lbnQgZnJvbSAnLi91dGlscy9jb21wb25lbnQtaGVscGVycyc7XG5cbmNsYXNzIFJlU2FnYSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAvKipcbiAgICogQXV0b21hdGljYWxseSBjbGVhciByZWR1eCBzdG9yZSBvbiB1bi1tb3VudC5cbiAgICogVW5sZXNzIHVzZXJzIHNldCBtYW51YWxseUNsZWFudXAgdG8gdHJ1ZSBpbiBDT05GSUdcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4gIXRoaXMucHJvcHMuY29uZmlnc1tNQU5VQUxMWV9DTEVBTlVQXSAmJiB0aGlzLnByb3BzLmNsZWFudXBQcm9wKHRoaXMucHJvcHMuY29uZmlncy5wYWdlKTtcblxuICAvKipcbiAgICogU3VibWl0IGZvcm0gd2l0aCBkYXRhLiAyIHdheXMgdG8gY2FsbCB0aGlzIGZ1bmN0aW9uOlxuICAgKiAtIENhc2UgMS4gZGlzcGF0Y2hTYWdhKG9yZ1VzZXJEYXRhLCBDUkVBVEVfT1JHX1VTRVIpO1xuICAgKiAtIENhc2UgMi4gZGlzcGF0Y2hTYWdhKEZFVENIX1RFTVBMQVRFUyk7XG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBmb3JtTmFtZVxuICAgKi9cbiAgZGlzcGF0Y2hTYWdhID0gKGRhdGEsIGZvcm1OYW1lKSA9PiB7XG4gICAgY29uc3QgcHJlUHJvY2VzcyA9IHRoaXMucHJvcHMuY29uZmlnc1tCRUZPUkVfU1VCTUlUXSB8fCAoKG8pID0+IChvKSk7XG5cbiAgICAvLyBjYXNlIDE6IGJvdGggcGFyYW1ldGVycyBwYXNzZWQgaW5cbiAgICBpZiAoZm9ybU5hbWUpIHJldHVybiB0aGlzLnByb3BzLmRpc3BhdGNoUHJvcChwcmVQcm9jZXNzKGRhdGEpLCB0aGlzLnByb3BzLmNvbmZpZ3MsIGZvcm1OYW1lKTtcblxuICAgIC8vIGNhc2UgMjogb25lIHBhcmFtZXRlciBwYXNzZWQgaW5cbiAgICByZXR1cm4gdGhpcy5wcm9wcy5kaXNwYXRjaFByb3Aoe30sIHRoaXMucHJvcHMuY29uZmlncywgZGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgRnVuY3Rpb246IHRvIGJlIGNhbGxlZCBvbiBgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc2BcbiAgICogQXV0b21hdGljYWxseSBjYWxsIHRoZSBhc3NpZ25lZCBmdW5jdGlvbiBhbmQgYWNrbm93bGVkZ2UgdGhlIHJlY2VpdmVkIHByb3BcbiAgICogQHBhcmFtIG5leHRQcm9wc1xuICAgKiBAcGFyYW0gYWN0aW9uc1xuICAgKi9cbiAgYW5hbHlzZVByb3BzID0gKG5leHRQcm9wcywgYWN0aW9ucykgPT4gY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMobmV4dFByb3BzLCBhY3Rpb25zLCB0aGlzLmFja25vd2xlZGdlU3RvcmUpO1xuXG4gIC8qKlxuICAgKiBBY2tub3dsZWRnZSBieSBjbGVhbmluZyB1cCBkYXRhIG9mIGEgcmVxdWVzdCBpbiByZWR1eCBzdG9yZVxuICAgKiBAcGFyYW0gZm9ybU5hbWVcbiAgICovXG4gIGFja25vd2xlZGdlU3RvcmUgPSAoZm9ybU5hbWUpID0+IHRoaXMucHJvcHMuYWNrbm93bGVkZ2VQcm9wKHRoaXMucHJvcHMuY29uZmlncy5wYWdlLCBmb3JtTmFtZSk7XG5cbiAgcmVuZGVyKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBjb25zdCB7IENvbXBvbmVudCwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBtYXAgZnVuY3Rpb25zIGFzIHByb3BzIHRvIGNvbXBvbmVudFxuICAgIGNvbnN0IHJlc2FnYSA9IHtcbiAgICAgIGFuYWx5c2U6IHRoaXMuYW5hbHlzZVByb3BzLFxuICAgICAgZGlzcGF0Y2g6IHRoaXMuZGlzcGF0Y2hTYWdhLFxuICAgICAgYWNrbm93bGVkZ2U6IHRoaXMuYWNrbm93bGVkZ2VTdG9yZSxcbiAgICAgIGNsZWFudXA6IHRoaXMucHJvcHMuY2xlYW51cFByb3AsXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgb25TdWJtaXQ9e3RoaXMuZGlzcGF0Y2hTYWdhfSAvLyBrZWVwIGl0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgIHJlc2FnYT17cmVzYWdhfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cblJlU2FnYS5wcm9wVHlwZXMgPSB7XG4gIENvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLmFueSxcbiAgZGlzcGF0Y2hQcm9wOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgYWNrbm93bGVkZ2VQcm9wOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgY2xlYW51cFByb3A6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBjb25maWdzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVTYWdhO1xuIl19