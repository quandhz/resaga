'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _submitForm$submitFor;

exports.beforeSubmitForm = beforeSubmitForm;
exports.submitForm = submitForm;
exports.submitFormFailed = submitFormFailed;
exports.submitFormSucceed = submitFormSucceed;
exports.acknowledge = acknowledge;
exports.cleanup = cleanup;
exports.setVariable = setVariable;
exports.setVariableWithFunction = setVariableWithFunction;

var _constants = require('./constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function beforeSubmitForm(payload, configs, formName, pageName) {
  var page = pageName || configs.page;
  return {
    type: '' + _constants.BEFORE_DISPATCH + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    payload: payload,
    configs: configs,
    formName: formName
  };
}

function submitForm(data, options, formName, pageName) {
  var page = pageName || options.page;
  return {
    type: '' + _constants.DO_SUBMIT + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    options: options,
    data: data,
    formName: formName
  };
}

function submitFormFailed(error, payload, page, formName) {
  return {
    type: '' + _constants.SUBMIT_FAILED + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    payload: payload,
    error: error,
    formName: formName
  };
}

function submitFormSucceed(result, payload, page, formName) {
  return {
    type: '' + _constants.SUBMIT_SUCCEED + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    payload: payload,
    result: result,
    formName: formName
  };
}

function acknowledge(page, formName, isLoading) {
  return {
    type: '' + _constants.SUBMIT_ACKED + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    formName: formName,
    isLoading: isLoading
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbImJlZm9yZVN1Ym1pdEZvcm0iLCJzdWJtaXRGb3JtIiwic3VibWl0Rm9ybUZhaWxlZCIsInN1Ym1pdEZvcm1TdWNjZWVkIiwiYWNrbm93bGVkZ2UiLCJjbGVhbnVwIiwic2V0VmFyaWFibGUiLCJzZXRWYXJpYWJsZVdpdGhGdW5jdGlvbiIsInBheWxvYWQiLCJjb25maWdzIiwiZm9ybU5hbWUiLCJwYWdlTmFtZSIsInBhZ2UiLCJ0eXBlIiwiZGF0YSIsIm9wdGlvbnMiLCJlcnJvciIsInJlc3VsdCIsImlzTG9hZGluZyIsImtleSIsInZhbHVlIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7UUFLZ0JBLGdCLEdBQUFBLGdCO1FBV0FDLFUsR0FBQUEsVTtRQVdBQyxnQixHQUFBQSxnQjtRQVVBQyxpQixHQUFBQSxpQjtRQVVBQyxXLEdBQUFBLFc7UUFTQUMsTyxHQUFBQSxPO1FBT0FDLFcsR0FBQUEsVztRQVNBQyx1QixHQUFBQSx1Qjs7QUF4RWhCOzs7O0FBS08sU0FBU1AsZ0JBQVQsQ0FBMEJRLE9BQTFCLEVBQW1DQyxPQUFuQyxFQUE0Q0MsUUFBNUMsRUFBc0RDLFFBQXRELEVBQWdFO0FBQ3JFLE1BQU1DLE9BQU9ELFlBQVlGLFFBQVFHLElBQWpDO0FBQ0EsU0FBTztBQUNMQyxtRUFBdUNELElBQXZDLDBCQUEwREYsUUFEckQ7QUFFTEUsY0FGSztBQUdMSixvQkFISztBQUlMQyxvQkFKSztBQUtMQztBQUxLLEdBQVA7QUFPRDs7QUFFTSxTQUFTVCxVQUFULENBQW9CYSxJQUFwQixFQUEwQkMsT0FBMUIsRUFBbUNMLFFBQW5DLEVBQTZDQyxRQUE3QyxFQUF1RDtBQUM1RCxNQUFNQyxPQUFPRCxZQUFZSSxRQUFRSCxJQUFqQztBQUNBLFNBQU87QUFDTEMsNkRBQWlDRCxJQUFqQywwQkFBb0RGLFFBRC9DO0FBRUxFLGNBRks7QUFHTEcsb0JBSEs7QUFJTEQsY0FKSztBQUtMSjtBQUxLLEdBQVA7QUFPRDs7QUFFTSxTQUFTUixnQkFBVCxDQUEwQmMsS0FBMUIsRUFBaUNSLE9BQWpDLEVBQTBDSSxJQUExQyxFQUFnREYsUUFBaEQsRUFBMEQ7QUFDL0QsU0FBTztBQUNMRyxpRUFBcUNELElBQXJDLDBCQUF3REYsUUFEbkQ7QUFFTEUsY0FGSztBQUdMSixvQkFISztBQUlMUSxnQkFKSztBQUtMTjtBQUxLLEdBQVA7QUFPRDs7QUFFTSxTQUFTUCxpQkFBVCxDQUEyQmMsTUFBM0IsRUFBbUNULE9BQW5DLEVBQTRDSSxJQUE1QyxFQUFrREYsUUFBbEQsRUFBNEQ7QUFDakUsU0FBTztBQUNMRyxrRUFBc0NELElBQXRDLDBCQUF5REYsUUFEcEQ7QUFFTEUsY0FGSztBQUdMSixvQkFISztBQUlMUyxrQkFKSztBQUtMUDtBQUxLLEdBQVA7QUFPRDs7QUFFTSxTQUFTTixXQUFULENBQXFCUSxJQUFyQixFQUEyQkYsUUFBM0IsRUFBcUNRLFNBQXJDLEVBQWdEO0FBQ3JELFNBQU87QUFDTEwsZ0VBQW9DRCxJQUFwQywwQkFBdURGLFFBRGxEO0FBRUxFLGNBRks7QUFHTEYsc0JBSEs7QUFJTFE7QUFKSyxHQUFQO0FBTUQ7O0FBRU0sU0FBU2IsT0FBVCxDQUFpQk8sSUFBakIsRUFBdUI7QUFDNUIsU0FBTztBQUNMQyw2REFBaUNELElBRDVCO0FBRUxBO0FBRkssR0FBUDtBQUlEOztBQUVNLFNBQVNOLFdBQVQsQ0FBcUJNLElBQXJCLEVBQTJCTyxHQUEzQixFQUFnQ0MsS0FBaEMsRUFBdUM7QUFDNUMsU0FBTztBQUNMUCw2REFBaUNELElBQWpDLDBCQUFvRE8sR0FEL0M7QUFFTFAsY0FGSztBQUdMTyxZQUhLO0FBSUxDO0FBSkssR0FBUDtBQU1EOztBQUVNLFNBQVNiLHVCQUFULENBQWlDSyxJQUFqQyxFQUF1Q08sR0FBdkMsRUFBNENFLElBQTVDLEVBQWtEO0FBQ3ZELFNBQU87QUFDTFIsZ0VBQW9DRCxJQUFwQywwQkFBdURPLEdBRGxEO0FBRUxQLGNBRks7QUFHTE8sWUFISztBQUlMRTtBQUpLLEdBQVA7QUFNRDs7O0FBR0NwQix3QjtBQUNBQyxvQztBQUNBQyxzQztBQUNBQywwQjtBQUNBQzttRUFDZ0JDLFcsc0VBQ0dDLHVCIiwiZmlsZSI6ImFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTVUJNSVRfRkFJTEVELCBTVUJNSVRfU1VDQ0VFRCwgQkVGT1JFX0RJU1BBVENILCBET19TVUJNSVQsIFNVQk1JVF9BQ0tFRCwgSE9DX0NMRUFSLCBTRVBBUkFUT1IsIFJFRFVYX1NFVCwgUkVEVVhfU0VUX0ZOLFxuICBTRVRfVkFSSUFCTEUsIFNFVF9WQVJJQUJMRV9GTixcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlU3VibWl0Rm9ybShwYXlsb2FkLCBjb25maWdzLCBmb3JtTmFtZSwgcGFnZU5hbWUpIHtcbiAgY29uc3QgcGFnZSA9IHBhZ2VOYW1lIHx8IGNvbmZpZ3MucGFnZTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBgJHtCRUZPUkVfRElTUEFUQ0h9JHtTRVBBUkFUT1J9JHtwYWdlfSR7U0VQQVJBVE9SfSR7Zm9ybU5hbWV9YCxcbiAgICBwYWdlLFxuICAgIHBheWxvYWQsXG4gICAgY29uZmlncyxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEZvcm0oZGF0YSwgb3B0aW9ucywgZm9ybU5hbWUsIHBhZ2VOYW1lKSB7XG4gIGNvbnN0IHBhZ2UgPSBwYWdlTmFtZSB8fCBvcHRpb25zLnBhZ2U7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7RE9fU1VCTUlUfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZSxcbiAgICBvcHRpb25zLFxuICAgIGRhdGEsXG4gICAgZm9ybU5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXRGb3JtRmFpbGVkKGVycm9yLCBwYXlsb2FkLCBwYWdlLCBmb3JtTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1NVQk1JVF9GQUlMRUR9JHtTRVBBUkFUT1J9JHtwYWdlfSR7U0VQQVJBVE9SfSR7Zm9ybU5hbWV9YCxcbiAgICBwYWdlLFxuICAgIHBheWxvYWQsXG4gICAgZXJyb3IsXG4gICAgZm9ybU5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXRGb3JtU3VjY2VlZChyZXN1bHQsIHBheWxvYWQsIHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX1NVQ0NFRUR9JHtTRVBBUkFUT1J9JHtwYWdlfSR7U0VQQVJBVE9SfSR7Zm9ybU5hbWV9YCxcbiAgICBwYWdlLFxuICAgIHBheWxvYWQsXG4gICAgcmVzdWx0LFxuICAgIGZvcm1OYW1lLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWNrbm93bGVkZ2UocGFnZSwgZm9ybU5hbWUsIGlzTG9hZGluZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1NVQk1JVF9BQ0tFRH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgZm9ybU5hbWUsXG4gICAgaXNMb2FkaW5nLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYW51cChwYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7SE9DX0NMRUFSfSR7U0VQQVJBVE9SfSR7cGFnZX1gLFxuICAgIHBhZ2UsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZShwYWdlLCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7UkVEVVhfU0VUfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2tleX1gLFxuICAgIHBhZ2UsXG4gICAga2V5LFxuICAgIHZhbHVlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGVXaXRoRnVuY3Rpb24ocGFnZSwga2V5LCBmdW5jKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7UkVEVVhfU0VUX0ZOfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2tleX1gLFxuICAgIHBhZ2UsXG4gICAga2V5LFxuICAgIGZ1bmMsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3VibWl0Rm9ybSxcbiAgc3VibWl0Rm9ybUZhaWxlZCxcbiAgc3VibWl0Rm9ybVN1Y2NlZWQsXG4gIGFja25vd2xlZGdlLFxuICBjbGVhbnVwLFxuICBbU0VUX1ZBUklBQkxFXTogc2V0VmFyaWFibGUsXG4gIFtTRVRfVkFSSUFCTEVfRk5dOiBzZXRWYXJpYWJsZVdpdGhGdW5jdGlvbixcbn07XG5cbiJdfQ==