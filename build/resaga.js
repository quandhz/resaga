'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _config = require('./config');

var _componentHelpers = require('./utils/component-helpers');

var _componentHelpers2 = _interopRequireDefault(_componentHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  Component: _propTypes2.default.any,
  dispatchProp: _propTypes2.default.func,
  acknowledgeProp: _propTypes2.default.func,
  cleanupProp: _propTypes2.default.func,
  configs: _propTypes2.default.object
};

exports.default = ReSaga;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZXNhZ2EuanMiXSwibmFtZXMiOlsiUmVTYWdhIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJwcm9wcyIsImNvbmZpZ3MiLCJjbGVhbnVwUHJvcCIsInBhZ2UiLCJkaXNwYXRjaFNhZ2EiLCJkYXRhIiwiZm9ybU5hbWUiLCJwcmVQcm9jZXNzIiwibyIsImRpc3BhdGNoUHJvcCIsImFuYWx5c2VQcm9wcyIsIm5leHRQcm9wcyIsImFjdGlvbnMiLCJhbmFseXNlTmV4dFByb3BzIiwiYWNrbm93bGVkZ2VTdG9yZSIsImFja25vd2xlZGdlUHJvcCIsIkNvbXBvbmVudCIsInJlc2FnYSIsImFuYWx5c2UiLCJkaXNwYXRjaCIsImFja25vd2xlZGdlIiwiY2xlYW51cCIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJhbnkiLCJmdW5jIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVNQSxNOzs7Ozs7Ozs7Ozs7OztzTEFLSkMsb0IsR0FBdUI7QUFBQSxhQUFNLENBQUMsTUFBS0MsS0FBTCxDQUFXQyxPQUFYLDBCQUFELElBQXlDLE1BQUtELEtBQUwsQ0FBV0UsV0FBWCxDQUF1QixNQUFLRixLQUFMLENBQVdDLE9BQVgsQ0FBbUJFLElBQTFDLENBQS9DO0FBQUEsSyxRQVN2QkMsWSxHQUFlLFVBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFvQjtBQUNqQyxVQUFNQyxhQUFhLE1BQUtQLEtBQUwsQ0FBV0MsT0FBWCwyQkFBc0MsVUFBQ08sQ0FBRDtBQUFBLGVBQVFBLENBQVI7QUFBQSxPQUF6RDs7QUFFQTtBQUNBLFVBQUlGLFFBQUosRUFBYyxPQUFPLE1BQUtOLEtBQUwsQ0FBV1MsWUFBWCxDQUF3QkYsV0FBV0YsSUFBWCxDQUF4QixFQUEwQyxNQUFLTCxLQUFMLENBQVdDLE9BQXJELEVBQThESyxRQUE5RCxDQUFQOztBQUVkO0FBQ0EsYUFBTyxNQUFLTixLQUFMLENBQVdTLFlBQVgsQ0FBd0IsRUFBeEIsRUFBNEIsTUFBS1QsS0FBTCxDQUFXQyxPQUF2QyxFQUFnREksSUFBaEQsQ0FBUDtBQUNELEssUUFRREssWSxHQUFlLFVBQUNDLFNBQUQsRUFBWUMsT0FBWjtBQUFBLGFBQXdCLDJCQUFVQyxnQkFBVixDQUEyQkYsU0FBM0IsRUFBc0NDLE9BQXRDLEVBQStDLE1BQUtFLGdCQUFwRCxDQUF4QjtBQUFBLEssUUFNZkEsZ0IsR0FBbUIsVUFBQ1IsUUFBRDtBQUFBLGFBQWMsTUFBS04sS0FBTCxDQUFXZSxlQUFYLENBQTJCLE1BQUtmLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQkUsSUFBOUMsRUFBb0RHLFFBQXBELENBQWQ7QUFBQSxLOztBQW5DbkI7Ozs7OztBQU1BOzs7Ozs7Ozs7QUFpQkE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7OzZCQU1TO0FBQ1Q7QUFEUyxtQkFFeUIsS0FBS04sS0FGOUI7QUFBQSxVQUVDZ0IsU0FGRCxVQUVDQSxTQUZEO0FBQUEsVUFFZWhCLEtBRmY7O0FBSVA7OztBQUNBLFVBQU1pQixTQUFTO0FBQ2JDLGlCQUFTLEtBQUtSLFlBREQ7QUFFYlMsa0JBQVUsS0FBS2YsWUFGRjtBQUdiZ0IscUJBQWEsS0FBS04sZ0JBSEw7QUFJYk8saUJBQVMsS0FBS3JCLEtBQUwsQ0FBV0U7QUFKUCxPQUFmOztBQU9BLGFBQ0UsOEJBQUMsU0FBRCxlQUNNRixLQUROO0FBRUUsa0JBQVUsS0FBS0ksWUFGakIsQ0FFK0I7QUFGL0IsVUFHRSxRQUFRYTtBQUhWLFNBREY7QUFPRDs7OztFQXpEa0IsZ0JBQU1LLGE7O0FBNEQzQnhCLE9BQU95QixTQUFQLEdBQW1CO0FBQ2pCUCxhQUFXLG9CQUFVUSxHQURKO0FBRWpCZixnQkFBYyxvQkFBVWdCLElBRlA7QUFHakJWLG1CQUFpQixvQkFBVVUsSUFIVjtBQUlqQnZCLGVBQWEsb0JBQVV1QixJQUpOO0FBS2pCeEIsV0FBUyxvQkFBVXlCO0FBTEYsQ0FBbkI7O2tCQVFlNUIsTSIsImZpbGUiOiJyZXNhZ2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1BTlVBTExZX0NMRUFOVVAsIEJFRk9SRV9TVUJNSVQgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgY29tcG9uZW50IGZyb20gJy4vdXRpbHMvY29tcG9uZW50LWhlbHBlcnMnO1xuXG5jbGFzcyBSZVNhZ2EgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEF1dG9tYXRpY2FsbHkgY2xlYXIgcmVkdXggc3RvcmUgb24gdW4tbW91bnQuXG4gICAqIFVubGVzcyB1c2VycyBzZXQgbWFudWFsbHlDbGVhbnVwIHRvIHRydWUgaW4gQ09ORklHXG4gICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudCA9ICgpID0+ICF0aGlzLnByb3BzLmNvbmZpZ3NbTUFOVUFMTFlfQ0xFQU5VUF0gJiYgdGhpcy5wcm9wcy5jbGVhbnVwUHJvcCh0aGlzLnByb3BzLmNvbmZpZ3MucGFnZSk7XG5cbiAgLyoqXG4gICAqIFN1Ym1pdCBmb3JtIHdpdGggZGF0YS4gMiB3YXlzIHRvIGNhbGwgdGhpcyBmdW5jdGlvbjpcbiAgICogLSBDYXNlIDEuIGRpc3BhdGNoU2FnYShvcmdVc2VyRGF0YSwgQ1JFQVRFX09SR19VU0VSKTtcbiAgICogLSBDYXNlIDIuIGRpc3BhdGNoU2FnYShGRVRDSF9URU1QTEFURVMpO1xuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcGFyYW0gZm9ybU5hbWVcbiAgICovXG4gIGRpc3BhdGNoU2FnYSA9IChkYXRhLCBmb3JtTmFtZSkgPT4ge1xuICAgIGNvbnN0IHByZVByb2Nlc3MgPSB0aGlzLnByb3BzLmNvbmZpZ3NbQkVGT1JFX1NVQk1JVF0gfHwgKChvKSA9PiAobykpO1xuXG4gICAgLy8gY2FzZSAxOiBib3RoIHBhcmFtZXRlcnMgcGFzc2VkIGluXG4gICAgaWYgKGZvcm1OYW1lKSByZXR1cm4gdGhpcy5wcm9wcy5kaXNwYXRjaFByb3AocHJlUHJvY2VzcyhkYXRhKSwgdGhpcy5wcm9wcy5jb25maWdzLCBmb3JtTmFtZSk7XG5cbiAgICAvLyBjYXNlIDI6IG9uZSBwYXJhbWV0ZXIgcGFzc2VkIGluXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuZGlzcGF0Y2hQcm9wKHt9LCB0aGlzLnByb3BzLmNvbmZpZ3MsIGRhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVdGlsaXR5IEZ1bmN0aW9uOiB0byBiZSBjYWxsZWQgb24gYGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNgXG4gICAqIEF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYXNzaWduZWQgZnVuY3Rpb24gYW5kIGFja25vd2xlZGdlIHRoZSByZWNlaXZlZCBwcm9wXG4gICAqIEBwYXJhbSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIGFjdGlvbnNcbiAgICovXG4gIGFuYWx5c2VQcm9wcyA9IChuZXh0UHJvcHMsIGFjdGlvbnMpID0+IGNvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzKG5leHRQcm9wcywgYWN0aW9ucywgdGhpcy5hY2tub3dsZWRnZVN0b3JlKTtcblxuICAvKipcbiAgICogQWNrbm93bGVkZ2UgYnkgY2xlYW5pbmcgdXAgZGF0YSBvZiBhIHJlcXVlc3QgaW4gcmVkdXggc3RvcmVcbiAgICogQHBhcmFtIGZvcm1OYW1lXG4gICAqL1xuICBhY2tub3dsZWRnZVN0b3JlID0gKGZvcm1OYW1lKSA9PiB0aGlzLnByb3BzLmFja25vd2xlZGdlUHJvcCh0aGlzLnByb3BzLmNvbmZpZ3MucGFnZSwgZm9ybU5hbWUpO1xuXG4gIHJlbmRlcigpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgY29uc3QgeyBDb21wb25lbnQsIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gbWFwIGZ1bmN0aW9ucyBhcyBwcm9wcyB0byBjb21wb25lbnRcbiAgICBjb25zdCByZXNhZ2EgPSB7XG4gICAgICBhbmFseXNlOiB0aGlzLmFuYWx5c2VQcm9wcyxcbiAgICAgIGRpc3BhdGNoOiB0aGlzLmRpc3BhdGNoU2FnYSxcbiAgICAgIGFja25vd2xlZGdlOiB0aGlzLmFja25vd2xlZGdlU3RvcmUsXG4gICAgICBjbGVhbnVwOiB0aGlzLnByb3BzLmNsZWFudXBQcm9wLFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIG9uU3VibWl0PXt0aGlzLmRpc3BhdGNoU2FnYX0gLy8ga2VlcCBpdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICByZXNhZ2E9e3Jlc2FnYX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5SZVNhZ2EucHJvcFR5cGVzID0ge1xuICBDb21wb25lbnQ6IFByb3BUeXBlcy5hbnksXG4gIGRpc3BhdGNoUHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gIGFja25vd2xlZGdlUHJvcDogUHJvcFR5cGVzLmZ1bmMsXG4gIGNsZWFudXBQcm9wOiBQcm9wVHlwZXMuZnVuYyxcbiAgY29uZmlnczogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlU2FnYTtcbiJdfQ==