'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectIsSubmitSuccess = exports.selectErrors = exports.selectPage = undefined;

var _reselect = require('reselect');

var _constants = require('./constants');

/**
 * Created by quando on 8/3/17.
 * based on Yang on 29/10/16.
 */
var selectPage = function selectPage(page) {
  return function (state) {
    return state.get(page);
  };
};

/**
 * get errors of a request in a page
 * @param page i.e. RegistrationPage
 * @param request i.e. RegisterForm
 */
var selectErrors = function selectErrors(page, request) {
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
var selectIsSubmitSuccess = function selectIsSubmitSuccess(page, request) {
  return (0, _reselect.createSelector)(selectPage(page), function (form) {
    return form && form.get(request);
  }, function (requestState) {
    return requestState && requestState.get(_constants.SUBMIT_SUCCESS);
  });
};

exports.selectPage = selectPage;
exports.selectErrors = selectErrors;
exports.selectIsSubmitSuccess = selectIsSubmitSuccess;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9zZWxlY3RvcnMuanMiXSwibmFtZXMiOlsic2VsZWN0UGFnZSIsInBhZ2UiLCJzdGF0ZSIsImdldCIsInNlbGVjdEVycm9ycyIsInJlcXVlc3QiLCJmb3JtIiwicmVxdWVzdFN0YXRlIiwic2VsZWN0SXNTdWJtaXRTdWNjZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUE7O0FBQ0E7O0FBTEE7Ozs7QUFVQSxJQUFNQSxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsSUFBRDtBQUFBLFNBQVUsVUFBQ0MsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLEdBQU4sQ0FBVUYsSUFBVixDQUFYO0FBQUEsR0FBVjtBQUFBLENBQW5COztBQUVBOzs7OztBQUtBLElBQU1HLGVBQWUsU0FBZkEsWUFBZSxDQUFDSCxJQUFELEVBQU9JLE9BQVA7QUFBQSxTQUFtQiw4QkFDdENMLFdBQVdDLElBQVgsQ0FEc0MsRUFFdEMsVUFBQ0ssSUFBRDtBQUFBLFdBQVVBLFFBQVFBLEtBQUtILEdBQUwsQ0FBU0UsT0FBVCxDQUFsQjtBQUFBLEdBRnNDLEVBR3RDLFVBQUNFLFlBQUQ7QUFBQSxXQUFrQkEsZ0JBQWdCQSxhQUFhSixHQUFiLHlCQUFsQztBQUFBLEdBSHNDLENBQW5CO0FBQUEsQ0FBckI7O0FBTUE7Ozs7O0FBS0EsSUFBTUssd0JBQXdCLFNBQXhCQSxxQkFBd0IsQ0FBQ1AsSUFBRCxFQUFPSSxPQUFQO0FBQUEsU0FBbUIsOEJBQy9DTCxXQUFXQyxJQUFYLENBRCtDLEVBRS9DLFVBQUNLLElBQUQ7QUFBQSxXQUFVQSxRQUFRQSxLQUFLSCxHQUFMLENBQVNFLE9BQVQsQ0FBbEI7QUFBQSxHQUYrQyxFQUcvQyxVQUFDRSxZQUFEO0FBQUEsV0FBa0JBLGdCQUFnQkEsYUFBYUosR0FBYiwyQkFBbEM7QUFBQSxHQUgrQyxDQUFuQjtBQUFBLENBQTlCOztRQU9FSCxVLEdBQUFBLFU7UUFDQUksWSxHQUFBQSxZO1FBQ0FJLHFCLEdBQUFBLHFCIiwiZmlsZSI6InNlbGVjdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBxdWFuZG8gb24gOC8zLzE3LlxuICogYmFzZWQgb24gWWFuZyBvbiAyOS8xMC8xNi5cbiAqL1xuaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQge1xuICBTRVJWRVJfRVJST1IsXG4gIFNVQk1JVF9TVUNDRVNTLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmNvbnN0IHNlbGVjdFBhZ2UgPSAocGFnZSkgPT4gKHN0YXRlKSA9PiBzdGF0ZS5nZXQocGFnZSk7XG5cbi8qKlxuICogZ2V0IGVycm9ycyBvZiBhIHJlcXVlc3QgaW4gYSBwYWdlXG4gKiBAcGFyYW0gcGFnZSBpLmUuIFJlZ2lzdHJhdGlvblBhZ2VcbiAqIEBwYXJhbSByZXF1ZXN0IGkuZS4gUmVnaXN0ZXJGb3JtXG4gKi9cbmNvbnN0IHNlbGVjdEVycm9ycyA9IChwYWdlLCByZXF1ZXN0KSA9PiBjcmVhdGVTZWxlY3RvcihcbiAgc2VsZWN0UGFnZShwYWdlKSxcbiAgKGZvcm0pID0+IGZvcm0gJiYgZm9ybS5nZXQocmVxdWVzdCksXG4gIChyZXF1ZXN0U3RhdGUpID0+IHJlcXVlc3RTdGF0ZSAmJiByZXF1ZXN0U3RhdGUuZ2V0KFNFUlZFUl9FUlJPUilcbik7XG5cbi8qKlxuICogZ2V0IHN1Ym1pdCBzdWNjZXNzIHN0YXR1cyBvZiBhIHJlcXVlc3QgaW4gYSBwYWdlXG4gKiBAcGFyYW0gcGFnZSBpLmUuIFJlZ2lzdHJhdGlvblBhZ2VcbiAqIEBwYXJhbSByZXF1ZXN0IGkuZS4gUmVnaXN0ZXJGb3JtXG4gKi9cbmNvbnN0IHNlbGVjdElzU3VibWl0U3VjY2VzcyA9IChwYWdlLCByZXF1ZXN0KSA9PiBjcmVhdGVTZWxlY3RvcihcbiAgc2VsZWN0UGFnZShwYWdlKSxcbiAgKGZvcm0pID0+IGZvcm0gJiYgZm9ybS5nZXQocmVxdWVzdCksXG4gIChyZXF1ZXN0U3RhdGUpID0+IHJlcXVlc3RTdGF0ZSAmJiByZXF1ZXN0U3RhdGUuZ2V0KFNVQk1JVF9TVUNDRVNTKVxuKTtcblxuZXhwb3J0IHtcbiAgc2VsZWN0UGFnZSxcbiAgc2VsZWN0RXJyb3JzLFxuICBzZWxlY3RJc1N1Ym1pdFN1Y2Nlc3MsXG59O1xuIl19