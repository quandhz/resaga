'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectVariables = exports.selectIsSubmitSuccess = exports.selectErrors = exports.selectPage = undefined;

var _reselect = require('reselect');

var _constants = require('./constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var selectPage = exports.selectPage = function selectPage(page) {
  return function (state) {
    return state.get(page);
  };
};

/**
 * get errors of a request in a page
 * @param page i.e. RegistrationPage
 * @param request i.e. RegisterForm
 */
var selectErrors = exports.selectErrors = function selectErrors(page, request) {
  return (0, _reselect.createSelector)(selectPage(page), function (form) {
    return form && form.get(request);
  }, function (requestState) {
    return requestState && requestState.get(_constants.SERVER_ERROR);
  });
};

/**
 * get submit success status of a request in a page
 * @param page i.e. RegistrationPage
 * @param request i.e. RegisterForm
 */
var selectIsSubmitSuccess = exports.selectIsSubmitSuccess = function selectIsSubmitSuccess(page, request) {
  return (0, _reselect.createSelector)(selectPage(page), function (form) {
    return form && form.get(request);
  }, function (requestState) {
    return requestState && requestState.get(_constants.SUBMIT_SUCCESS);
  });
};

var selectVariables = exports.selectVariables = function selectVariables(pageName) {
  return (0, _reselect.createSelector)(selectPage(pageName), function (page) {
    return page && page.get(_constants.VARIABLES);
  });
};

exports.default = _defineProperty({
  selectPage: selectPage,
  selectErrors: selectErrors,
  selectIsSubmitSuccess: selectIsSubmitSuccess,
  selectVariables: selectVariables
}, _constants.GET_VARIABLES, selectVariables);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9zZWxlY3RvcnMuanMiXSwibmFtZXMiOlsic2VsZWN0UGFnZSIsInBhZ2UiLCJzdGF0ZSIsImdldCIsInNlbGVjdEVycm9ycyIsInJlcXVlc3QiLCJmb3JtIiwicmVxdWVzdFN0YXRlIiwic2VsZWN0SXNTdWJtaXRTdWNjZXNzIiwic2VsZWN0VmFyaWFibGVzIiwicGFnZU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVPLElBQU1BLGtDQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsSUFBRDtBQUFBLFNBQVUsVUFBQ0MsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLEdBQU4sQ0FBVUYsSUFBVixDQUFYO0FBQUEsR0FBVjtBQUFBLENBQW5COztBQUVQOzs7OztBQUtPLElBQU1HLHNDQUFlLFNBQWZBLFlBQWUsQ0FBQ0gsSUFBRCxFQUFPSSxPQUFQO0FBQUEsU0FBbUIsOEJBQzdDTCxXQUFXQyxJQUFYLENBRDZDLEVBRTdDLFVBQUNLLElBQUQ7QUFBQSxXQUFVQSxRQUFRQSxLQUFLSCxHQUFMLENBQVNFLE9BQVQsQ0FBbEI7QUFBQSxHQUY2QyxFQUc3QyxVQUFDRSxZQUFEO0FBQUEsV0FBa0JBLGdCQUFnQkEsYUFBYUosR0FBYix5QkFBbEM7QUFBQSxHQUg2QyxDQUFuQjtBQUFBLENBQXJCOztBQU1QOzs7OztBQUtPLElBQU1LLHdEQUF3QixTQUF4QkEscUJBQXdCLENBQUNQLElBQUQsRUFBT0ksT0FBUDtBQUFBLFNBQW1CLDhCQUN0REwsV0FBV0MsSUFBWCxDQURzRCxFQUV0RCxVQUFDSyxJQUFEO0FBQUEsV0FBVUEsUUFBUUEsS0FBS0gsR0FBTCxDQUFTRSxPQUFULENBQWxCO0FBQUEsR0FGc0QsRUFHdEQsVUFBQ0UsWUFBRDtBQUFBLFdBQWtCQSxnQkFBZ0JBLGFBQWFKLEdBQWIsMkJBQWxDO0FBQUEsR0FIc0QsQ0FBbkI7QUFBQSxDQUE5Qjs7QUFNQSxJQUFNTSw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUNDLFFBQUQ7QUFBQSxTQUFjLDhCQUMzQ1YsV0FBV1UsUUFBWCxDQUQyQyxFQUUzQyxVQUFDVCxJQUFEO0FBQUEsV0FBVUEsUUFBUUEsS0FBS0UsR0FBTCxzQkFBbEI7QUFBQSxHQUYyQyxDQUFkO0FBQUEsQ0FBeEI7OztBQU1MSCx3QjtBQUNBSSw0QjtBQUNBSSw4QztBQUNBQzs2QkFDaUJBLGUiLCJmaWxlIjoic2VsZWN0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBTRVJWRVJfRVJST1IsIFNVQk1JVF9TVUNDRVNTLCBWQVJJQUJMRVMsIEdFVF9WQVJJQUJMRVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RQYWdlID0gKHBhZ2UpID0+IChzdGF0ZSkgPT4gc3RhdGUuZ2V0KHBhZ2UpO1xuXG4vKipcbiAqIGdldCBlcnJvcnMgb2YgYSByZXF1ZXN0IGluIGEgcGFnZVxuICogQHBhcmFtIHBhZ2UgaS5lLiBSZWdpc3RyYXRpb25QYWdlXG4gKiBAcGFyYW0gcmVxdWVzdCBpLmUuIFJlZ2lzdGVyRm9ybVxuICovXG5leHBvcnQgY29uc3Qgc2VsZWN0RXJyb3JzID0gKHBhZ2UsIHJlcXVlc3QpID0+IGNyZWF0ZVNlbGVjdG9yKFxuICBzZWxlY3RQYWdlKHBhZ2UpLFxuICAoZm9ybSkgPT4gZm9ybSAmJiBmb3JtLmdldChyZXF1ZXN0KSxcbiAgKHJlcXVlc3RTdGF0ZSkgPT4gcmVxdWVzdFN0YXRlICYmIHJlcXVlc3RTdGF0ZS5nZXQoU0VSVkVSX0VSUk9SKVxuKTtcblxuLyoqXG4gKiBnZXQgc3VibWl0IHN1Y2Nlc3Mgc3RhdHVzIG9mIGEgcmVxdWVzdCBpbiBhIHBhZ2VcbiAqIEBwYXJhbSBwYWdlIGkuZS4gUmVnaXN0cmF0aW9uUGFnZVxuICogQHBhcmFtIHJlcXVlc3QgaS5lLiBSZWdpc3RlckZvcm1cbiAqL1xuZXhwb3J0IGNvbnN0IHNlbGVjdElzU3VibWl0U3VjY2VzcyA9IChwYWdlLCByZXF1ZXN0KSA9PiBjcmVhdGVTZWxlY3RvcihcbiAgc2VsZWN0UGFnZShwYWdlKSxcbiAgKGZvcm0pID0+IGZvcm0gJiYgZm9ybS5nZXQocmVxdWVzdCksXG4gIChyZXF1ZXN0U3RhdGUpID0+IHJlcXVlc3RTdGF0ZSAmJiByZXF1ZXN0U3RhdGUuZ2V0KFNVQk1JVF9TVUNDRVNTKVxuKTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFZhcmlhYmxlcyA9IChwYWdlTmFtZSkgPT4gY3JlYXRlU2VsZWN0b3IoXG4gIHNlbGVjdFBhZ2UocGFnZU5hbWUpLFxuICAocGFnZSkgPT4gcGFnZSAmJiBwYWdlLmdldChWQVJJQUJMRVMpXG4pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNlbGVjdFBhZ2UsXG4gIHNlbGVjdEVycm9ycyxcbiAgc2VsZWN0SXNTdWJtaXRTdWNjZXNzLFxuICBzZWxlY3RWYXJpYWJsZXMsXG4gIFtHRVRfVkFSSUFCTEVTXTogc2VsZWN0VmFyaWFibGVzLFxufTtcbiJdfQ==