'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _submitForm$submitFor;

exports.submitForm = submitForm;
exports.submitFormFailed = submitFormFailed;
exports.submitFormSucceed = submitFormSucceed;
exports.acknowledge = acknowledge;
exports.cleanup = cleanup;
exports.setVariable = setVariable;
exports.setVariableWithFunction = setVariableWithFunction;

var _constants = require('./constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function submitForm(data, options, formName) {
  return {
    type: '' + _constants.DO_SUBMIT + _constants.SEPARATOR + options.page + _constants.SEPARATOR + formName,
    page: options.page,
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

function setVariable(page, key, value) {
  return {
    type: '' + _constants.REDUX_SET + _constants.SEPARATOR + page + _constants.SEPARATOR + key,
    page: page,
    key: key,
    value: value
  };
}

function setVariableWithFunction(page, key, func) {
  return {
    type: '' + _constants.REDUX_SET_FN + _constants.SEPARATOR + page + _constants.SEPARATOR + key,
    page: page,
    key: key,
    func: func
  };
}

exports.default = (_submitForm$submitFor = {
  submitForm: submitForm,
  submitFormFailed: submitFormFailed,
  submitFormSucceed: submitFormSucceed,
  acknowledge: acknowledge,
  cleanup: cleanup
}, _defineProperty(_submitForm$submitFor, _constants.SET_VARIABLE, setVariable), _defineProperty(_submitForm$submitFor, _constants.SET_VARIABLE_FN, setVariableWithFunction), _submitForm$submitFor);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbInN1Ym1pdEZvcm0iLCJzdWJtaXRGb3JtRmFpbGVkIiwic3VibWl0Rm9ybVN1Y2NlZWQiLCJhY2tub3dsZWRnZSIsImNsZWFudXAiLCJzZXRWYXJpYWJsZSIsInNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uIiwiZGF0YSIsIm9wdGlvbnMiLCJmb3JtTmFtZSIsInR5cGUiLCJwYWdlIiwiZXJyb3IiLCJyZXN1bHQiLCJrZXkiLCJ2YWx1ZSIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBS2dCQSxVLEdBQUFBLFU7UUFVQUMsZ0IsR0FBQUEsZ0I7UUFTQUMsaUIsR0FBQUEsaUI7UUFTQUMsVyxHQUFBQSxXO1FBUUFDLE8sR0FBQUEsTztRQU9BQyxXLEdBQUFBLFc7UUFTQUMsdUIsR0FBQUEsdUI7O0FBekRoQjs7OztBQUtPLFNBQVNOLFVBQVQsQ0FBb0JPLElBQXBCLEVBQTBCQyxPQUExQixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDbEQsU0FBTztBQUNMQyw2REFBaUNGLFFBQVFHLElBQXpDLDBCQUE0REYsUUFEdkQ7QUFFTEUsVUFBTUgsUUFBUUcsSUFGVDtBQUdMSCxvQkFISztBQUlMRCxjQUpLO0FBS0xFO0FBTEssR0FBUDtBQU9EOztBQUVNLFNBQVNSLGdCQUFULENBQTBCVyxLQUExQixFQUFpQ0QsSUFBakMsRUFBdUNGLFFBQXZDLEVBQWlEO0FBQ3RELFNBQU87QUFDTEMsaUVBQXFDQyxJQUFyQywwQkFBd0RGLFFBRG5EO0FBRUxFLGNBRks7QUFHTEMsZ0JBSEs7QUFJTEg7QUFKSyxHQUFQO0FBTUQ7O0FBRU0sU0FBU1AsaUJBQVQsQ0FBMkJXLE1BQTNCLEVBQW1DRixJQUFuQyxFQUF5Q0YsUUFBekMsRUFBbUQ7QUFDeEQsU0FBTztBQUNMQyxrRUFBc0NDLElBQXRDLDBCQUF5REYsUUFEcEQ7QUFFTEUsY0FGSztBQUdMRSxrQkFISztBQUlMSjtBQUpLLEdBQVA7QUFNRDs7QUFFTSxTQUFTTixXQUFULENBQXFCUSxJQUFyQixFQUEyQkYsUUFBM0IsRUFBcUM7QUFDMUMsU0FBTztBQUNMQyxnRUFBb0NDLElBQXBDLDBCQUF1REYsUUFEbEQ7QUFFTEUsY0FGSztBQUdMRjtBQUhLLEdBQVA7QUFLRDs7QUFFTSxTQUFTTCxPQUFULENBQWlCTyxJQUFqQixFQUF1QjtBQUM1QixTQUFPO0FBQ0xELDZEQUFpQ0MsSUFENUI7QUFFTEE7QUFGSyxHQUFQO0FBSUQ7O0FBRU0sU0FBU04sV0FBVCxDQUFxQk0sSUFBckIsRUFBMkJHLEdBQTNCLEVBQWdDQyxLQUFoQyxFQUF1QztBQUM1QyxTQUFPO0FBQ0xMLDZEQUFpQ0MsSUFBakMsMEJBQW9ERyxHQUQvQztBQUVMSCxjQUZLO0FBR0xHLFlBSEs7QUFJTEM7QUFKSyxHQUFQO0FBTUQ7O0FBRU0sU0FBU1QsdUJBQVQsQ0FBaUNLLElBQWpDLEVBQXVDRyxHQUF2QyxFQUE0Q0UsSUFBNUMsRUFBa0Q7QUFDdkQsU0FBTztBQUNMTixnRUFBb0NDLElBQXBDLDBCQUF1REcsR0FEbEQ7QUFFTEgsY0FGSztBQUdMRyxZQUhLO0FBSUxFO0FBSkssR0FBUDtBQU1EOzs7QUFHQ2hCLHdCO0FBQ0FDLG9DO0FBQ0FDLHNDO0FBQ0FDLDBCO0FBQ0FDO21FQUNnQkMsVyxzRUFDR0MsdUIiLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNVQk1JVF9GQUlMRUQsIFNVQk1JVF9TVUNDRUVELCBET19TVUJNSVQsIFNVQk1JVF9BQ0tFRCwgSE9DX0NMRUFSLCBTRVBBUkFUT1IsIFJFRFVYX1NFVCwgUkVEVVhfU0VUX0ZOLFxuICBTRVRfVkFSSUFCTEUsIFNFVF9WQVJJQUJMRV9GTixcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0Rm9ybShkYXRhLCBvcHRpb25zLCBmb3JtTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke0RPX1NVQk1JVH0ke1NFUEFSQVRPUn0ke29wdGlvbnMucGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZTogb3B0aW9ucy5wYWdlLFxuICAgIG9wdGlvbnMsXG4gICAgZGF0YSxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEZvcm1GYWlsZWQoZXJyb3IsIHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX0ZBSUxFRH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgZXJyb3IsXG4gICAgZm9ybU5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXRGb3JtU3VjY2VlZChyZXN1bHQsIHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX1NVQ0NFRUR9JHtTRVBBUkFUT1J9JHtwYWdlfSR7U0VQQVJBVE9SfSR7Zm9ybU5hbWV9YCxcbiAgICBwYWdlLFxuICAgIHJlc3VsdCxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFja25vd2xlZGdlKHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX0FDS0VEfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZSxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFudXAocGFnZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke0hPQ19DTEVBUn0ke1NFUEFSQVRPUn0ke3BhZ2V9YCxcbiAgICBwYWdlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUocGFnZSwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1JFRFVYX1NFVH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtrZXl9YCxcbiAgICBwYWdlLFxuICAgIGtleSxcbiAgICB2YWx1ZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uKHBhZ2UsIGtleSwgZnVuYykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1JFRFVYX1NFVF9GTn0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtrZXl9YCxcbiAgICBwYWdlLFxuICAgIGtleSxcbiAgICBmdW5jLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN1Ym1pdEZvcm0sXG4gIHN1Ym1pdEZvcm1GYWlsZWQsXG4gIHN1Ym1pdEZvcm1TdWNjZWVkLFxuICBhY2tub3dsZWRnZSxcbiAgY2xlYW51cCxcbiAgW1NFVF9WQVJJQUJMRV06IHNldFZhcmlhYmxlLFxuICBbU0VUX1ZBUklBQkxFX0ZOXTogc2V0VmFyaWFibGVXaXRoRnVuY3Rpb24sXG59O1xuXG4iXX0=