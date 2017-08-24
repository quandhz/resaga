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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbInN1Ym1pdEZvcm0iLCJzdWJtaXRGb3JtRmFpbGVkIiwic3VibWl0Rm9ybVN1Y2NlZWQiLCJhY2tub3dsZWRnZSIsImNsZWFudXAiLCJzZXRWYXJpYWJsZSIsInNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uIiwiZGF0YSIsIm9wdGlvbnMiLCJmb3JtTmFtZSIsInBhZ2VOYW1lIiwicGFnZSIsInR5cGUiLCJlcnJvciIsInBheWxvYWQiLCJyZXN1bHQiLCJrZXkiLCJ2YWx1ZSIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBS2dCQSxVLEdBQUFBLFU7UUFXQUMsZ0IsR0FBQUEsZ0I7UUFVQUMsaUIsR0FBQUEsaUI7UUFVQUMsVyxHQUFBQSxXO1FBUUFDLE8sR0FBQUEsTztRQU9BQyxXLEdBQUFBLFc7UUFTQUMsdUIsR0FBQUEsdUI7O0FBNURoQjs7OztBQUtPLFNBQVNOLFVBQVQsQ0FBb0JPLElBQXBCLEVBQTBCQyxPQUExQixFQUFtQ0MsUUFBbkMsRUFBNkNDLFFBQTdDLEVBQXVEO0FBQzVELE1BQU1DLE9BQU9ELFlBQVlGLFFBQVFHLElBQWpDO0FBQ0EsU0FBTztBQUNMQyw2REFBaUNELElBQWpDLDBCQUFvREYsUUFEL0M7QUFFTEUsY0FGSztBQUdMSCxvQkFISztBQUlMRCxjQUpLO0FBS0xFO0FBTEssR0FBUDtBQU9EOztBQUVNLFNBQVNSLGdCQUFULENBQTBCWSxLQUExQixFQUFpQ0MsT0FBakMsRUFBMENILElBQTFDLEVBQWdERixRQUFoRCxFQUEwRDtBQUMvRCxTQUFPO0FBQ0xHLGlFQUFxQ0QsSUFBckMsMEJBQXdERixRQURuRDtBQUVMRSxjQUZLO0FBR0xHLG9CQUhLO0FBSUxELGdCQUpLO0FBS0xKO0FBTEssR0FBUDtBQU9EOztBQUVNLFNBQVNQLGlCQUFULENBQTJCYSxNQUEzQixFQUFtQ0QsT0FBbkMsRUFBNENILElBQTVDLEVBQWtERixRQUFsRCxFQUE0RDtBQUNqRSxTQUFPO0FBQ0xHLGtFQUFzQ0QsSUFBdEMsMEJBQXlERixRQURwRDtBQUVMRSxjQUZLO0FBR0xHLG9CQUhLO0FBSUxDLGtCQUpLO0FBS0xOO0FBTEssR0FBUDtBQU9EOztBQUVNLFNBQVNOLFdBQVQsQ0FBcUJRLElBQXJCLEVBQTJCRixRQUEzQixFQUFxQztBQUMxQyxTQUFPO0FBQ0xHLGdFQUFvQ0QsSUFBcEMsMEJBQXVERixRQURsRDtBQUVMRSxjQUZLO0FBR0xGO0FBSEssR0FBUDtBQUtEOztBQUVNLFNBQVNMLE9BQVQsQ0FBaUJPLElBQWpCLEVBQXVCO0FBQzVCLFNBQU87QUFDTEMsNkRBQWlDRCxJQUQ1QjtBQUVMQTtBQUZLLEdBQVA7QUFJRDs7QUFFTSxTQUFTTixXQUFULENBQXFCTSxJQUFyQixFQUEyQkssR0FBM0IsRUFBZ0NDLEtBQWhDLEVBQXVDO0FBQzVDLFNBQU87QUFDTEwsNkRBQWlDRCxJQUFqQywwQkFBb0RLLEdBRC9DO0FBRUxMLGNBRks7QUFHTEssWUFISztBQUlMQztBQUpLLEdBQVA7QUFNRDs7QUFFTSxTQUFTWCx1QkFBVCxDQUFpQ0ssSUFBakMsRUFBdUNLLEdBQXZDLEVBQTRDRSxJQUE1QyxFQUFrRDtBQUN2RCxTQUFPO0FBQ0xOLGdFQUFvQ0QsSUFBcEMsMEJBQXVESyxHQURsRDtBQUVMTCxjQUZLO0FBR0xLLFlBSEs7QUFJTEU7QUFKSyxHQUFQO0FBTUQ7OztBQUdDbEIsd0I7QUFDQUMsb0M7QUFDQUMsc0M7QUFDQUMsMEI7QUFDQUM7bUVBQ2dCQyxXLHNFQUNHQyx1QiIsImZpbGUiOiJhY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU1VCTUlUX0ZBSUxFRCwgU1VCTUlUX1NVQ0NFRUQsIERPX1NVQk1JVCwgU1VCTUlUX0FDS0VELCBIT0NfQ0xFQVIsIFNFUEFSQVRPUiwgUkVEVVhfU0VULCBSRURVWF9TRVRfRk4sXG4gIFNFVF9WQVJJQUJMRSwgU0VUX1ZBUklBQkxFX0ZOLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXRGb3JtKGRhdGEsIG9wdGlvbnMsIGZvcm1OYW1lLCBwYWdlTmFtZSkge1xuICBjb25zdCBwYWdlID0gcGFnZU5hbWUgfHwgb3B0aW9ucy5wYWdlO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke0RPX1NVQk1JVH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgb3B0aW9ucyxcbiAgICBkYXRhLFxuICAgIGZvcm1OYW1lLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0Rm9ybUZhaWxlZChlcnJvciwgcGF5bG9hZCwgcGFnZSwgZm9ybU5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBgJHtTVUJNSVRfRkFJTEVEfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZSxcbiAgICBwYXlsb2FkLFxuICAgIGVycm9yLFxuICAgIGZvcm1OYW1lLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0Rm9ybVN1Y2NlZWQocmVzdWx0LCBwYXlsb2FkLCBwYWdlLCBmb3JtTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1NVQk1JVF9TVUNDRUVEfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZSxcbiAgICBwYXlsb2FkLFxuICAgIHJlc3VsdCxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFja25vd2xlZGdlKHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX0FDS0VEfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZSxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFudXAocGFnZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke0hPQ19DTEVBUn0ke1NFUEFSQVRPUn0ke3BhZ2V9YCxcbiAgICBwYWdlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUocGFnZSwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1JFRFVYX1NFVH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtrZXl9YCxcbiAgICBwYWdlLFxuICAgIGtleSxcbiAgICB2YWx1ZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uKHBhZ2UsIGtleSwgZnVuYykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1JFRFVYX1NFVF9GTn0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtrZXl9YCxcbiAgICBwYWdlLFxuICAgIGtleSxcbiAgICBmdW5jLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN1Ym1pdEZvcm0sXG4gIHN1Ym1pdEZvcm1GYWlsZWQsXG4gIHN1Ym1pdEZvcm1TdWNjZWVkLFxuICBhY2tub3dsZWRnZSxcbiAgY2xlYW51cCxcbiAgW1NFVF9WQVJJQUJMRV06IHNldFZhcmlhYmxlLFxuICBbU0VUX1ZBUklBQkxFX0ZOXTogc2V0VmFyaWFibGVXaXRoRnVuY3Rpb24sXG59O1xuXG4iXX0=