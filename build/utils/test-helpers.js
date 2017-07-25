'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('../constants');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by quando on 13/7/17.
                                                                                                                                                                                                                   */


var stateNeither = function stateNeither() {
  return (0, _immutable.fromJS)({ thisState: 'is neither success nor fail' });
};
var stateSuccess = function stateSuccess(formName) {
  return (0, _reducer2.default)((0, _immutable.fromJS)(), { formName: formName, type: _constants.SUBMIT_SUCCEED });
};
var stateError = function stateError(formName) {
  return (0, _reducer2.default)((0, _immutable.fromJS)(), { formName: formName, type: _constants.SUBMIT_FAILED });
};

var propsNeither = function propsNeither() {
  var _ref;

  return _ref = {}, _defineProperty(_ref, _constants.SERVER_ERROR, ''), _defineProperty(_ref, _constants.SUBMIT_SUCCESS, false), _ref;
};
var propsSuccess = function propsSuccess(result) {
  var _ref2;

  return _ref2 = {}, _defineProperty(_ref2, _constants.SERVER_ERROR, ''), _defineProperty(_ref2, _constants.SUBMIT_SUCCESS, true), _defineProperty(_ref2, _constants.RESULT, result), _ref2;
};
var propsError = function propsError(error) {
  var _ref3;

  return _ref3 = {}, _defineProperty(_ref3, _constants.SERVER_ERROR, error), _defineProperty(_ref3, _constants.SUBMIT_SUCCESS, false), _ref3;
};

exports.default = {
  generate: {
    stateNeither: stateNeither,
    stateSuccess: stateSuccess,
    stateError: stateError,
    propsNeither: propsNeither,
    propsSuccess: propsSuccess,
    propsError: propsError
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy90ZXN0LWhlbHBlcnMuanMiXSwibmFtZXMiOlsic3RhdGVOZWl0aGVyIiwidGhpc1N0YXRlIiwic3RhdGVTdWNjZXNzIiwiZm9ybU5hbWUiLCJ0eXBlIiwic3RhdGVFcnJvciIsInByb3BzTmVpdGhlciIsInByb3BzU3VjY2VzcyIsInJlc3VsdCIsInByb3BzRXJyb3IiLCJlcnJvciIsImdlbmVyYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQTs7QUFDQTs7QUFDQTs7Ozs7O2tOQUxBOzs7OztBQU9BLElBQU1BLGVBQWUsU0FBZkEsWUFBZTtBQUFBLFNBQU0sdUJBQU8sRUFBRUMsV0FBVyw2QkFBYixFQUFQLENBQU47QUFBQSxDQUFyQjtBQUNBLElBQU1DLGVBQWUsU0FBZkEsWUFBZSxDQUFDQyxRQUFEO0FBQUEsU0FBYyx1QkFBUSx3QkFBUixFQUFrQixFQUFFQSxrQkFBRixFQUFZQywrQkFBWixFQUFsQixDQUFkO0FBQUEsQ0FBckI7QUFDQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0YsUUFBRDtBQUFBLFNBQWMsdUJBQVEsd0JBQVIsRUFBa0IsRUFBRUEsa0JBQUYsRUFBWUMsOEJBQVosRUFBbEIsQ0FBZDtBQUFBLENBQW5COztBQUVBLElBQU1FLGVBQWUsU0FBZkEsWUFBZTtBQUFBOztBQUFBLG1FQUF5QixFQUF6QixvREFBK0MsS0FBL0M7QUFBQSxDQUFyQjtBQUNBLElBQU1DLGVBQWUsU0FBZkEsWUFBZSxDQUFDQyxNQUFEO0FBQUE7O0FBQUEscUVBQStCLEVBQS9CLHFEQUFxRCxJQUFyRCw2Q0FBcUVBLE1BQXJFO0FBQUEsQ0FBckI7QUFDQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsS0FBRDtBQUFBOztBQUFBLHFFQUE4QkEsS0FBOUIscURBQXVELEtBQXZEO0FBQUEsQ0FBbkI7O2tCQUVlO0FBQ2JDLFlBQVU7QUFDUlgsOEJBRFE7QUFFUkUsOEJBRlE7QUFHUkcsMEJBSFE7QUFJUkMsOEJBSlE7QUFLUkMsOEJBTFE7QUFNUkU7QUFOUTtBQURHLEMiLCJmaWxlIjoidGVzdC1oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHF1YW5kbyBvbiAxMy83LzE3LlxuICovXG5pbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgUkVTVUxULCBTRVJWRVJfRVJST1IsIFNVQk1JVF9GQUlMRUQsIFNVQk1JVF9TVUNDRUVELCBTVUJNSVRfU1VDQ0VTUyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgcmVkdWNlciBmcm9tICcuLi9yZWR1Y2VyJztcblxuY29uc3Qgc3RhdGVOZWl0aGVyID0gKCkgPT4gZnJvbUpTKHsgdGhpc1N0YXRlOiAnaXMgbmVpdGhlciBzdWNjZXNzIG5vciBmYWlsJyB9KTtcbmNvbnN0IHN0YXRlU3VjY2VzcyA9IChmb3JtTmFtZSkgPT4gcmVkdWNlcihmcm9tSlMoKSwgeyBmb3JtTmFtZSwgdHlwZTogU1VCTUlUX1NVQ0NFRUQgfSk7XG5jb25zdCBzdGF0ZUVycm9yID0gKGZvcm1OYW1lKSA9PiByZWR1Y2VyKGZyb21KUygpLCB7IGZvcm1OYW1lLCB0eXBlOiBTVUJNSVRfRkFJTEVEIH0pO1xuXG5jb25zdCBwcm9wc05laXRoZXIgPSAoKSA9PiAoeyBbU0VSVkVSX0VSUk9SXTogJycsIFtTVUJNSVRfU1VDQ0VTU106IGZhbHNlIH0pO1xuY29uc3QgcHJvcHNTdWNjZXNzID0gKHJlc3VsdCkgPT4gKHsgW1NFUlZFUl9FUlJPUl06ICcnLCBbU1VCTUlUX1NVQ0NFU1NdOiB0cnVlLCBbUkVTVUxUXTogcmVzdWx0IH0pO1xuY29uc3QgcHJvcHNFcnJvciA9IChlcnJvcikgPT4gKHsgW1NFUlZFUl9FUlJPUl06IGVycm9yLCBbU1VCTUlUX1NVQ0NFU1NdOiBmYWxzZSB9KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZW5lcmF0ZToge1xuICAgIHN0YXRlTmVpdGhlcixcbiAgICBzdGF0ZVN1Y2Nlc3MsXG4gICAgc3RhdGVFcnJvcixcbiAgICBwcm9wc05laXRoZXIsXG4gICAgcHJvcHNTdWNjZXNzLFxuICAgIHByb3BzRXJyb3IsXG4gIH0sXG59O1xuIl19