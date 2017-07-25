'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('../constants');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy90ZXN0LWhlbHBlcnMuanMiXSwibmFtZXMiOlsic3RhdGVOZWl0aGVyIiwidGhpc1N0YXRlIiwic3RhdGVTdWNjZXNzIiwiZm9ybU5hbWUiLCJ0eXBlIiwic3RhdGVFcnJvciIsInByb3BzTmVpdGhlciIsInByb3BzU3VjY2VzcyIsInJlc3VsdCIsInByb3BzRXJyb3IiLCJlcnJvciIsImdlbmVyYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxlQUFlLFNBQWZBLFlBQWU7QUFBQSxTQUFNLHVCQUFPLEVBQUVDLFdBQVcsNkJBQWIsRUFBUCxDQUFOO0FBQUEsQ0FBckI7QUFDQSxJQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsUUFBRDtBQUFBLFNBQWMsdUJBQVEsd0JBQVIsRUFBa0IsRUFBRUEsa0JBQUYsRUFBWUMsK0JBQVosRUFBbEIsQ0FBZDtBQUFBLENBQXJCO0FBQ0EsSUFBTUMsYUFBYSxTQUFiQSxVQUFhLENBQUNGLFFBQUQ7QUFBQSxTQUFjLHVCQUFRLHdCQUFSLEVBQWtCLEVBQUVBLGtCQUFGLEVBQVlDLDhCQUFaLEVBQWxCLENBQWQ7QUFBQSxDQUFuQjs7QUFFQSxJQUFNRSxlQUFlLFNBQWZBLFlBQWU7QUFBQTs7QUFBQSxtRUFBeUIsRUFBekIsb0RBQStDLEtBQS9DO0FBQUEsQ0FBckI7QUFDQSxJQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsTUFBRDtBQUFBOztBQUFBLHFFQUErQixFQUEvQixxREFBcUQsSUFBckQsNkNBQXFFQSxNQUFyRTtBQUFBLENBQXJCO0FBQ0EsSUFBTUMsYUFBYSxTQUFiQSxVQUFhLENBQUNDLEtBQUQ7QUFBQTs7QUFBQSxxRUFBOEJBLEtBQTlCLHFEQUF1RCxLQUF2RDtBQUFBLENBQW5COztrQkFFZTtBQUNiQyxZQUFVO0FBQ1JYLDhCQURRO0FBRVJFLDhCQUZRO0FBR1JHLDBCQUhRO0FBSVJDLDhCQUpRO0FBS1JDLDhCQUxRO0FBTVJFO0FBTlE7QUFERyxDIiwiZmlsZSI6InRlc3QtaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBSRVNVTFQsIFNFUlZFUl9FUlJPUiwgU1VCTUlUX0ZBSUxFRCwgU1VCTUlUX1NVQ0NFRUQsIFNVQk1JVF9TVUNDRVNTIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4uL3JlZHVjZXInO1xuXG5jb25zdCBzdGF0ZU5laXRoZXIgPSAoKSA9PiBmcm9tSlMoeyB0aGlzU3RhdGU6ICdpcyBuZWl0aGVyIHN1Y2Nlc3Mgbm9yIGZhaWwnIH0pO1xuY29uc3Qgc3RhdGVTdWNjZXNzID0gKGZvcm1OYW1lKSA9PiByZWR1Y2VyKGZyb21KUygpLCB7IGZvcm1OYW1lLCB0eXBlOiBTVUJNSVRfU1VDQ0VFRCB9KTtcbmNvbnN0IHN0YXRlRXJyb3IgPSAoZm9ybU5hbWUpID0+IHJlZHVjZXIoZnJvbUpTKCksIHsgZm9ybU5hbWUsIHR5cGU6IFNVQk1JVF9GQUlMRUQgfSk7XG5cbmNvbnN0IHByb3BzTmVpdGhlciA9ICgpID0+ICh7IFtTRVJWRVJfRVJST1JdOiAnJywgW1NVQk1JVF9TVUNDRVNTXTogZmFsc2UgfSk7XG5jb25zdCBwcm9wc1N1Y2Nlc3MgPSAocmVzdWx0KSA9PiAoeyBbU0VSVkVSX0VSUk9SXTogJycsIFtTVUJNSVRfU1VDQ0VTU106IHRydWUsIFtSRVNVTFRdOiByZXN1bHQgfSk7XG5jb25zdCBwcm9wc0Vycm9yID0gKGVycm9yKSA9PiAoeyBbU0VSVkVSX0VSUk9SXTogZXJyb3IsIFtTVUJNSVRfU1VDQ0VTU106IGZhbHNlIH0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdlbmVyYXRlOiB7XG4gICAgc3RhdGVOZWl0aGVyLFxuICAgIHN0YXRlU3VjY2VzcyxcbiAgICBzdGF0ZUVycm9yLFxuICAgIHByb3BzTmVpdGhlcixcbiAgICBwcm9wc1N1Y2Nlc3MsXG4gICAgcHJvcHNFcnJvcixcbiAgfSxcbn07XG4iXX0=