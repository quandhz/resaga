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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbInN1Ym1pdEZvcm0iLCJzdWJtaXRGb3JtRmFpbGVkIiwic3VibWl0Rm9ybVN1Y2NlZWQiLCJhY2tub3dsZWRnZSIsImNsZWFudXAiLCJzZXRWYXJpYWJsZSIsInNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uIiwiZGF0YSIsIm9wdGlvbnMiLCJmb3JtTmFtZSIsInR5cGUiLCJwYWdlIiwiZXJyb3IiLCJyZXN1bHQiLCJrZXkiLCJ2YWx1ZSIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBS2dCQSxVLEdBQUFBLFU7UUFTQUMsZ0IsR0FBQUEsZ0I7UUFTQUMsaUIsR0FBQUEsaUI7UUFTQUMsVyxHQUFBQSxXO1FBUUFDLE8sR0FBQUEsTztRQU9BQyxXLEdBQUFBLFc7UUFTQUMsdUIsR0FBQUEsdUI7O0FBeERoQjs7OztBQUtPLFNBQVNOLFVBQVQsQ0FBb0JPLElBQXBCLEVBQTBCQyxPQUExQixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDbEQsU0FBTztBQUNMQyw2REFBaUNGLFFBQVFHLElBQXpDLDBCQUE0REYsUUFEdkQ7QUFFTEQsb0JBRks7QUFHTEQsY0FISztBQUlMRTtBQUpLLEdBQVA7QUFNRDs7QUFFTSxTQUFTUixnQkFBVCxDQUEwQlcsS0FBMUIsRUFBaUNELElBQWpDLEVBQXVDRixRQUF2QyxFQUFpRDtBQUN0RCxTQUFPO0FBQ0xDLGlFQUFxQ0MsSUFBckMsMEJBQXdERixRQURuRDtBQUVMRSxjQUZLO0FBR0xDLGdCQUhLO0FBSUxIO0FBSkssR0FBUDtBQU1EOztBQUVNLFNBQVNQLGlCQUFULENBQTJCVyxNQUEzQixFQUFtQ0YsSUFBbkMsRUFBeUNGLFFBQXpDLEVBQW1EO0FBQ3hELFNBQU87QUFDTEMsa0VBQXNDQyxJQUF0QywwQkFBeURGLFFBRHBEO0FBRUxFLGNBRks7QUFHTEUsa0JBSEs7QUFJTEo7QUFKSyxHQUFQO0FBTUQ7O0FBRU0sU0FBU04sV0FBVCxDQUFxQlEsSUFBckIsRUFBMkJGLFFBQTNCLEVBQXFDO0FBQzFDLFNBQU87QUFDTEMsZ0VBQW9DQyxJQUFwQywwQkFBdURGLFFBRGxEO0FBRUxFLGNBRks7QUFHTEY7QUFISyxHQUFQO0FBS0Q7O0FBRU0sU0FBU0wsT0FBVCxDQUFpQk8sSUFBakIsRUFBdUI7QUFDNUIsU0FBTztBQUNMRCw2REFBaUNDLElBRDVCO0FBRUxBO0FBRkssR0FBUDtBQUlEOztBQUVNLFNBQVNOLFdBQVQsQ0FBcUJNLElBQXJCLEVBQTJCRyxHQUEzQixFQUFnQ0MsS0FBaEMsRUFBdUM7QUFDNUMsU0FBTztBQUNMTCw2REFBaUNDLElBQWpDLDBCQUFvREcsR0FEL0M7QUFFTEgsY0FGSztBQUdMRyxZQUhLO0FBSUxDO0FBSkssR0FBUDtBQU1EOztBQUVNLFNBQVNULHVCQUFULENBQWlDSyxJQUFqQyxFQUF1Q0csR0FBdkMsRUFBNENFLElBQTVDLEVBQWtEO0FBQ3ZELFNBQU87QUFDTE4sZ0VBQW9DQyxJQUFwQywwQkFBdURHLEdBRGxEO0FBRUxILGNBRks7QUFHTEcsWUFISztBQUlMRTtBQUpLLEdBQVA7QUFNRDs7O0FBR0NoQix3QjtBQUNBQyxvQztBQUNBQyxzQztBQUNBQywwQjtBQUNBQzttRUFDZ0JDLFcsc0VBQ0dDLHVCIiwiZmlsZSI6ImFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTVUJNSVRfRkFJTEVELCBTVUJNSVRfU1VDQ0VFRCwgRE9fU1VCTUlULCBTVUJNSVRfQUNLRUQsIEhPQ19DTEVBUiwgU0VQQVJBVE9SLCBSRURVWF9TRVQsIFJFRFVYX1NFVF9GTixcbiAgU0VUX1ZBUklBQkxFLCBTRVRfVkFSSUFCTEVfRk4sXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEZvcm0oZGF0YSwgb3B0aW9ucywgZm9ybU5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBgJHtET19TVUJNSVR9JHtTRVBBUkFUT1J9JHtvcHRpb25zLnBhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIG9wdGlvbnMsXG4gICAgZGF0YSxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEZvcm1GYWlsZWQoZXJyb3IsIHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX0ZBSUxFRH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgZXJyb3IsXG4gICAgZm9ybU5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXRGb3JtU3VjY2VlZChyZXN1bHQsIHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX1NVQ0NFRUR9JHtTRVBBUkFUT1J9JHtwYWdlfSR7U0VQQVJBVE9SfSR7Zm9ybU5hbWV9YCxcbiAgICBwYWdlLFxuICAgIHJlc3VsdCxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFja25vd2xlZGdlKHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX0FDS0VEfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZSxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFudXAocGFnZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke0hPQ19DTEVBUn0ke1NFUEFSQVRPUn0ke3BhZ2V9YCxcbiAgICBwYWdlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUocGFnZSwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1JFRFVYX1NFVH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtrZXl9YCxcbiAgICBwYWdlLFxuICAgIGtleSxcbiAgICB2YWx1ZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uKHBhZ2UsIGtleSwgZnVuYykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1JFRFVYX1NFVF9GTn0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtrZXl9YCxcbiAgICBwYWdlLFxuICAgIGtleSxcbiAgICBmdW5jLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN1Ym1pdEZvcm0sXG4gIHN1Ym1pdEZvcm1GYWlsZWQsXG4gIHN1Ym1pdEZvcm1TdWNjZWVkLFxuICBhY2tub3dsZWRnZSxcbiAgY2xlYW51cCxcbiAgW1NFVF9WQVJJQUJMRV06IHNldFZhcmlhYmxlLFxuICBbU0VUX1ZBUklBQkxFX0ZOXTogc2V0VmFyaWFibGVXaXRoRnVuY3Rpb24sXG59O1xuXG4iXX0=