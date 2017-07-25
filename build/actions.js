'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanup = exports.acknowledge = exports.submitFormSucceed = exports.submitFormFailed = exports.submitForm = undefined;

var _constants = require('./constants');

function submitForm(data, options, formName) {
  return {
    type: '' + _constants.DO_SUBMIT + _constants.SEPARATOR + options.page + _constants.SEPARATOR + formName,
    options: options,
    data: data,
    formName: formName
  };
}

function submitFormFailed(error, page, formName) {
  return {
    type: '' + _constants.SUBMIT_FAILED + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    error: error,
    formName: formName
  };
}

function submitFormSucceed(result, page, formName) {
  return {
    type: '' + _constants.SUBMIT_SUCCEED + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    result: result,
    formName: formName
  };
}

function acknowledge(page, formName) {
  return {
    type: '' + _constants.SUBMIT_ACKED + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    formName: formName
  };
}

function cleanup(page) {
  return {
    type: '' + _constants.HOC_CLEAR + _constants.SEPARATOR + page,
    page: page
  };
}

exports.submitForm = submitForm;
exports.submitFormFailed = submitFormFailed;
exports.submitFormSucceed = submitFormSucceed;
exports.acknowledge = acknowledge;
exports.cleanup = cleanup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbInN1Ym1pdEZvcm0iLCJkYXRhIiwib3B0aW9ucyIsImZvcm1OYW1lIiwidHlwZSIsInBhZ2UiLCJzdWJtaXRGb3JtRmFpbGVkIiwiZXJyb3IiLCJzdWJtaXRGb3JtU3VjY2VlZCIsInJlc3VsdCIsImFja25vd2xlZGdlIiwiY2xlYW51cCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBLFNBQVNBLFVBQVQsQ0FBb0JDLElBQXBCLEVBQTBCQyxPQUExQixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDM0MsU0FBTztBQUNMQyw2REFBaUNGLFFBQVFHLElBQXpDLDBCQUE0REYsUUFEdkQ7QUFFTEQsb0JBRks7QUFHTEQsY0FISztBQUlMRTtBQUpLLEdBQVA7QUFNRDs7QUFFRCxTQUFTRyxnQkFBVCxDQUEwQkMsS0FBMUIsRUFBaUNGLElBQWpDLEVBQXVDRixRQUF2QyxFQUFpRDtBQUMvQyxTQUFPO0FBQ0xDLGlFQUFxQ0MsSUFBckMsMEJBQXdERixRQURuRDtBQUVMRSxjQUZLO0FBR0xFLGdCQUhLO0FBSUxKO0FBSkssR0FBUDtBQU1EOztBQUVELFNBQVNLLGlCQUFULENBQTJCQyxNQUEzQixFQUFtQ0osSUFBbkMsRUFBeUNGLFFBQXpDLEVBQW1EO0FBQ2pELFNBQU87QUFDTEMsa0VBQXNDQyxJQUF0QywwQkFBeURGLFFBRHBEO0FBRUxFLGNBRks7QUFHTEksa0JBSEs7QUFJTE47QUFKSyxHQUFQO0FBTUQ7O0FBRUQsU0FBU08sV0FBVCxDQUFxQkwsSUFBckIsRUFBMkJGLFFBQTNCLEVBQXFDO0FBQ25DLFNBQU87QUFDTEMsZ0VBQW9DQyxJQUFwQywwQkFBdURGLFFBRGxEO0FBRUxFLGNBRks7QUFHTEY7QUFISyxHQUFQO0FBS0Q7O0FBRUQsU0FBU1EsT0FBVCxDQUFpQk4sSUFBakIsRUFBdUI7QUFDckIsU0FBTztBQUNMRCw2REFBaUNDLElBRDVCO0FBRUxBO0FBRkssR0FBUDtBQUlEOztRQUVRTCxVLEdBQUFBLFU7UUFBWU0sZ0IsR0FBQUEsZ0I7UUFBa0JFLGlCLEdBQUFBLGlCO1FBQW1CRSxXLEdBQUFBLFc7UUFBYUMsTyxHQUFBQSxPIiwiZmlsZSI6ImFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET19TVUJNSVQsIEhPQ19DTEVBUiwgU0VQQVJBVE9SLCBTVUJNSVRfQUNLRUQsIFNVQk1JVF9GQUlMRUQsIFNVQk1JVF9TVUNDRUVEIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5mdW5jdGlvbiBzdWJtaXRGb3JtKGRhdGEsIG9wdGlvbnMsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7RE9fU1VCTUlUfSR7U0VQQVJBVE9SfSR7b3B0aW9ucy5wYWdlfSR7U0VQQVJBVE9SfSR7Zm9ybU5hbWV9YCxcbiAgICBvcHRpb25zLFxuICAgIGRhdGEsXG4gICAgZm9ybU5hbWUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHN1Ym1pdEZvcm1GYWlsZWQoZXJyb3IsIHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX0ZBSUxFRH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgZXJyb3IsXG4gICAgZm9ybU5hbWUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHN1Ym1pdEZvcm1TdWNjZWVkKHJlc3VsdCwgcGFnZSwgZm9ybU5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBgJHtTVUJNSVRfU1VDQ0VFRH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgcmVzdWx0LFxuICAgIGZvcm1OYW1lLFxuICB9O1xufVxuXG5mdW5jdGlvbiBhY2tub3dsZWRnZShwYWdlLCBmb3JtTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1NVQk1JVF9BQ0tFRH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgZm9ybU5hbWUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNsZWFudXAocGFnZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke0hPQ19DTEVBUn0ke1NFUEFSQVRPUn0ke3BhZ2V9YCxcbiAgICBwYWdlLFxuICB9O1xufVxuXG5leHBvcnQgeyBzdWJtaXRGb3JtLCBzdWJtaXRGb3JtRmFpbGVkLCBzdWJtaXRGb3JtU3VjY2VlZCwgYWNrbm93bGVkZ2UsIGNsZWFudXAgfTtcbiJdfQ==