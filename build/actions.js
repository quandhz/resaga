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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbInN1Ym1pdEZvcm0iLCJzdWJtaXRGb3JtRmFpbGVkIiwic3VibWl0Rm9ybVN1Y2NlZWQiLCJhY2tub3dsZWRnZSIsImNsZWFudXAiLCJzZXRWYXJpYWJsZSIsInNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uIiwiZGF0YSIsIm9wdGlvbnMiLCJmb3JtTmFtZSIsInR5cGUiLCJwYWdlIiwiZXJyb3IiLCJwYXlsb2FkIiwicmVzdWx0Iiwia2V5IiwidmFsdWUiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQUtnQkEsVSxHQUFBQSxVO1FBVUFDLGdCLEdBQUFBLGdCO1FBVUFDLGlCLEdBQUFBLGlCO1FBVUFDLFcsR0FBQUEsVztRQVFBQyxPLEdBQUFBLE87UUFPQUMsVyxHQUFBQSxXO1FBU0FDLHVCLEdBQUFBLHVCOztBQTNEaEI7Ozs7QUFLTyxTQUFTTixVQUFULENBQW9CTyxJQUFwQixFQUEwQkMsT0FBMUIsRUFBbUNDLFFBQW5DLEVBQTZDO0FBQ2xELFNBQU87QUFDTEMsNkRBQWlDRixRQUFRRyxJQUF6QywwQkFBNERGLFFBRHZEO0FBRUxFLFVBQU1ILFFBQVFHLElBRlQ7QUFHTEgsb0JBSEs7QUFJTEQsY0FKSztBQUtMRTtBQUxLLEdBQVA7QUFPRDs7QUFFTSxTQUFTUixnQkFBVCxDQUEwQlcsS0FBMUIsRUFBaUNDLE9BQWpDLEVBQTBDRixJQUExQyxFQUFnREYsUUFBaEQsRUFBMEQ7QUFDL0QsU0FBTztBQUNMQyxpRUFBcUNDLElBQXJDLDBCQUF3REYsUUFEbkQ7QUFFTEUsY0FGSztBQUdMRSxvQkFISztBQUlMRCxnQkFKSztBQUtMSDtBQUxLLEdBQVA7QUFPRDs7QUFFTSxTQUFTUCxpQkFBVCxDQUEyQlksTUFBM0IsRUFBbUNELE9BQW5DLEVBQTRDRixJQUE1QyxFQUFrREYsUUFBbEQsRUFBNEQ7QUFDakUsU0FBTztBQUNMQyxrRUFBc0NDLElBQXRDLDBCQUF5REYsUUFEcEQ7QUFFTEUsY0FGSztBQUdMRSxvQkFISztBQUlMQyxrQkFKSztBQUtMTDtBQUxLLEdBQVA7QUFPRDs7QUFFTSxTQUFTTixXQUFULENBQXFCUSxJQUFyQixFQUEyQkYsUUFBM0IsRUFBcUM7QUFDMUMsU0FBTztBQUNMQyxnRUFBb0NDLElBQXBDLDBCQUF1REYsUUFEbEQ7QUFFTEUsY0FGSztBQUdMRjtBQUhLLEdBQVA7QUFLRDs7QUFFTSxTQUFTTCxPQUFULENBQWlCTyxJQUFqQixFQUF1QjtBQUM1QixTQUFPO0FBQ0xELDZEQUFpQ0MsSUFENUI7QUFFTEE7QUFGSyxHQUFQO0FBSUQ7O0FBRU0sU0FBU04sV0FBVCxDQUFxQk0sSUFBckIsRUFBMkJJLEdBQTNCLEVBQWdDQyxLQUFoQyxFQUF1QztBQUM1QyxTQUFPO0FBQ0xOLDZEQUFpQ0MsSUFBakMsMEJBQW9ESSxHQUQvQztBQUVMSixjQUZLO0FBR0xJLFlBSEs7QUFJTEM7QUFKSyxHQUFQO0FBTUQ7O0FBRU0sU0FBU1YsdUJBQVQsQ0FBaUNLLElBQWpDLEVBQXVDSSxHQUF2QyxFQUE0Q0UsSUFBNUMsRUFBa0Q7QUFDdkQsU0FBTztBQUNMUCxnRUFBb0NDLElBQXBDLDBCQUF1REksR0FEbEQ7QUFFTEosY0FGSztBQUdMSSxZQUhLO0FBSUxFO0FBSkssR0FBUDtBQU1EOzs7QUFHQ2pCLHdCO0FBQ0FDLG9DO0FBQ0FDLHNDO0FBQ0FDLDBCO0FBQ0FDO21FQUNnQkMsVyxzRUFDR0MsdUIiLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNVQk1JVF9GQUlMRUQsIFNVQk1JVF9TVUNDRUVELCBET19TVUJNSVQsIFNVQk1JVF9BQ0tFRCwgSE9DX0NMRUFSLCBTRVBBUkFUT1IsIFJFRFVYX1NFVCwgUkVEVVhfU0VUX0ZOLFxuICBTRVRfVkFSSUFCTEUsIFNFVF9WQVJJQUJMRV9GTixcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0Rm9ybShkYXRhLCBvcHRpb25zLCBmb3JtTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke0RPX1NVQk1JVH0ke1NFUEFSQVRPUn0ke29wdGlvbnMucGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZTogb3B0aW9ucy5wYWdlLFxuICAgIG9wdGlvbnMsXG4gICAgZGF0YSxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEZvcm1GYWlsZWQoZXJyb3IsIHBheWxvYWQsIHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX0ZBSUxFRH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgcGF5bG9hZCxcbiAgICBlcnJvcixcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEZvcm1TdWNjZWVkKHJlc3VsdCwgcGF5bG9hZCwgcGFnZSwgZm9ybU5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBgJHtTVUJNSVRfU1VDQ0VFRH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgcGF5bG9hZCxcbiAgICByZXN1bHQsXG4gICAgZm9ybU5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhY2tub3dsZWRnZShwYWdlLCBmb3JtTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1NVQk1JVF9BQ0tFRH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgZm9ybU5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbnVwKHBhZ2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBgJHtIT0NfQ0xFQVJ9JHtTRVBBUkFUT1J9JHtwYWdlfWAsXG4gICAgcGFnZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZhcmlhYmxlKHBhZ2UsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBgJHtSRURVWF9TRVR9JHtTRVBBUkFUT1J9JHtwYWdlfSR7U0VQQVJBVE9SfSR7a2V5fWAsXG4gICAgcGFnZSxcbiAgICBrZXksXG4gICAgdmFsdWUsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZVdpdGhGdW5jdGlvbihwYWdlLCBrZXksIGZ1bmMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBgJHtSRURVWF9TRVRfRk59JHtTRVBBUkFUT1J9JHtwYWdlfSR7U0VQQVJBVE9SfSR7a2V5fWAsXG4gICAgcGFnZSxcbiAgICBrZXksXG4gICAgZnVuYyxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdWJtaXRGb3JtLFxuICBzdWJtaXRGb3JtRmFpbGVkLFxuICBzdWJtaXRGb3JtU3VjY2VlZCxcbiAgYWNrbm93bGVkZ2UsXG4gIGNsZWFudXAsXG4gIFtTRVRfVkFSSUFCTEVdOiBzZXRWYXJpYWJsZSxcbiAgW1NFVF9WQVJJQUJMRV9GTl06IHNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uLFxufTtcblxuIl19