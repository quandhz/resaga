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
    configs: configs,
    formName: formName,
    payload: payload
  };
}

function submitForm(payload, configs, formName, pageName) {
  var page = pageName || configs.page;
  return {
    type: '' + _constants.DO_SUBMIT + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    configs: configs,
    formName: formName,
    payload: payload
  };
}

function submitFormFailed(error, payload, page, formName) {
  return {
    type: '' + _constants.SUBMIT_FAILED + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    formName: formName,
    payload: payload,
    error: error
  };
}

function submitFormSucceed(result, payload, page, formName) {
  return {
    type: '' + _constants.SUBMIT_SUCCEED + _constants.SEPARATOR + page + _constants.SEPARATOR + formName,
    page: page,
    formName: formName,
    payload: payload,
    result: result
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbImJlZm9yZVN1Ym1pdEZvcm0iLCJzdWJtaXRGb3JtIiwic3VibWl0Rm9ybUZhaWxlZCIsInN1Ym1pdEZvcm1TdWNjZWVkIiwiYWNrbm93bGVkZ2UiLCJjbGVhbnVwIiwic2V0VmFyaWFibGUiLCJzZXRWYXJpYWJsZVdpdGhGdW5jdGlvbiIsInBheWxvYWQiLCJjb25maWdzIiwiZm9ybU5hbWUiLCJwYWdlTmFtZSIsInBhZ2UiLCJ0eXBlIiwiZXJyb3IiLCJyZXN1bHQiLCJrZXkiLCJ2YWx1ZSIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBS2dCQSxnQixHQUFBQSxnQjtRQVdBQyxVLEdBQUFBLFU7UUFXQUMsZ0IsR0FBQUEsZ0I7UUFVQUMsaUIsR0FBQUEsaUI7UUFVQUMsVyxHQUFBQSxXO1FBUUFDLE8sR0FBQUEsTztRQU9BQyxXLEdBQUFBLFc7UUFTQUMsdUIsR0FBQUEsdUI7O0FBdkVoQjs7OztBQUtPLFNBQVNQLGdCQUFULENBQTBCUSxPQUExQixFQUFtQ0MsT0FBbkMsRUFBNENDLFFBQTVDLEVBQXNEQyxRQUF0RCxFQUFnRTtBQUNyRSxNQUFNQyxPQUFPRCxZQUFZRixRQUFRRyxJQUFqQztBQUNBLFNBQU87QUFDTEMsbUVBQXVDRCxJQUF2QywwQkFBMERGLFFBRHJEO0FBRUxFLGNBRks7QUFHTEgsb0JBSEs7QUFJTEMsc0JBSks7QUFLTEY7QUFMSyxHQUFQO0FBT0Q7O0FBRU0sU0FBU1AsVUFBVCxDQUFvQk8sT0FBcEIsRUFBNkJDLE9BQTdCLEVBQXNDQyxRQUF0QyxFQUFnREMsUUFBaEQsRUFBMEQ7QUFDL0QsTUFBTUMsT0FBT0QsWUFBWUYsUUFBUUcsSUFBakM7QUFDQSxTQUFPO0FBQ0xDLDZEQUFpQ0QsSUFBakMsMEJBQW9ERixRQUQvQztBQUVMRSxjQUZLO0FBR0xILG9CQUhLO0FBSUxDLHNCQUpLO0FBS0xGO0FBTEssR0FBUDtBQU9EOztBQUVNLFNBQVNOLGdCQUFULENBQTBCWSxLQUExQixFQUFpQ04sT0FBakMsRUFBMENJLElBQTFDLEVBQWdERixRQUFoRCxFQUEwRDtBQUMvRCxTQUFPO0FBQ0xHLGlFQUFxQ0QsSUFBckMsMEJBQXdERixRQURuRDtBQUVMRSxjQUZLO0FBR0xGLHNCQUhLO0FBSUxGLG9CQUpLO0FBS0xNO0FBTEssR0FBUDtBQU9EOztBQUVNLFNBQVNYLGlCQUFULENBQTJCWSxNQUEzQixFQUFtQ1AsT0FBbkMsRUFBNENJLElBQTVDLEVBQWtERixRQUFsRCxFQUE0RDtBQUNqRSxTQUFPO0FBQ0xHLGtFQUFzQ0QsSUFBdEMsMEJBQXlERixRQURwRDtBQUVMRSxjQUZLO0FBR0xGLHNCQUhLO0FBSUxGLG9CQUpLO0FBS0xPO0FBTEssR0FBUDtBQU9EOztBQUVNLFNBQVNYLFdBQVQsQ0FBcUJRLElBQXJCLEVBQTJCRixRQUEzQixFQUFxQztBQUMxQyxTQUFPO0FBQ0xHLGdFQUFvQ0QsSUFBcEMsMEJBQXVERixRQURsRDtBQUVMRSxjQUZLO0FBR0xGO0FBSEssR0FBUDtBQUtEOztBQUVNLFNBQVNMLE9BQVQsQ0FBaUJPLElBQWpCLEVBQXVCO0FBQzVCLFNBQU87QUFDTEMsNkRBQWlDRCxJQUQ1QjtBQUVMQTtBQUZLLEdBQVA7QUFJRDs7QUFFTSxTQUFTTixXQUFULENBQXFCTSxJQUFyQixFQUEyQkksR0FBM0IsRUFBZ0NDLEtBQWhDLEVBQXVDO0FBQzVDLFNBQU87QUFDTEosNkRBQWlDRCxJQUFqQywwQkFBb0RJLEdBRC9DO0FBRUxKLGNBRks7QUFHTEksWUFISztBQUlMQztBQUpLLEdBQVA7QUFNRDs7QUFFTSxTQUFTVix1QkFBVCxDQUFpQ0ssSUFBakMsRUFBdUNJLEdBQXZDLEVBQTRDRSxJQUE1QyxFQUFrRDtBQUN2RCxTQUFPO0FBQ0xMLGdFQUFvQ0QsSUFBcEMsMEJBQXVESSxHQURsRDtBQUVMSixjQUZLO0FBR0xJLFlBSEs7QUFJTEU7QUFKSyxHQUFQO0FBTUQ7OztBQUdDakIsd0I7QUFDQUMsb0M7QUFDQUMsc0M7QUFDQUMsMEI7QUFDQUM7bUVBQ2dCQyxXLHNFQUNHQyx1QiIsImZpbGUiOiJhY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU1VCTUlUX0ZBSUxFRCwgU1VCTUlUX1NVQ0NFRUQsIEJFRk9SRV9ESVNQQVRDSCwgRE9fU1VCTUlULCBTVUJNSVRfQUNLRUQsIEhPQ19DTEVBUiwgU0VQQVJBVE9SLCBSRURVWF9TRVQsIFJFRFVYX1NFVF9GTixcbiAgU0VUX1ZBUklBQkxFLCBTRVRfVkFSSUFCTEVfRk4sXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZVN1Ym1pdEZvcm0ocGF5bG9hZCwgY29uZmlncywgZm9ybU5hbWUsIHBhZ2VOYW1lKSB7XG4gIGNvbnN0IHBhZ2UgPSBwYWdlTmFtZSB8fCBjb25maWdzLnBhZ2U7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7QkVGT1JFX0RJU1BBVENIfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZSxcbiAgICBjb25maWdzLFxuICAgIGZvcm1OYW1lLFxuICAgIHBheWxvYWQsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXRGb3JtKHBheWxvYWQsIGNvbmZpZ3MsIGZvcm1OYW1lLCBwYWdlTmFtZSkge1xuICBjb25zdCBwYWdlID0gcGFnZU5hbWUgfHwgY29uZmlncy5wYWdlO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke0RPX1NVQk1JVH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtmb3JtTmFtZX1gLFxuICAgIHBhZ2UsXG4gICAgY29uZmlncyxcbiAgICBmb3JtTmFtZSxcbiAgICBwYXlsb2FkLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0Rm9ybUZhaWxlZChlcnJvciwgcGF5bG9hZCwgcGFnZSwgZm9ybU5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBgJHtTVUJNSVRfRkFJTEVEfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZSxcbiAgICBmb3JtTmFtZSxcbiAgICBwYXlsb2FkLFxuICAgIGVycm9yLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0Rm9ybVN1Y2NlZWQocmVzdWx0LCBwYXlsb2FkLCBwYWdlLCBmb3JtTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1NVQk1JVF9TVUNDRUVEfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZSxcbiAgICBmb3JtTmFtZSxcbiAgICBwYXlsb2FkLFxuICAgIHJlc3VsdCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFja25vd2xlZGdlKHBhZ2UsIGZvcm1OYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYCR7U1VCTUlUX0FDS0VEfSR7U0VQQVJBVE9SfSR7cGFnZX0ke1NFUEFSQVRPUn0ke2Zvcm1OYW1lfWAsXG4gICAgcGFnZSxcbiAgICBmb3JtTmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFudXAocGFnZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke0hPQ19DTEVBUn0ke1NFUEFSQVRPUn0ke3BhZ2V9YCxcbiAgICBwYWdlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUocGFnZSwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1JFRFVYX1NFVH0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtrZXl9YCxcbiAgICBwYWdlLFxuICAgIGtleSxcbiAgICB2YWx1ZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZhcmlhYmxlV2l0aEZ1bmN0aW9uKHBhZ2UsIGtleSwgZnVuYykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGAke1JFRFVYX1NFVF9GTn0ke1NFUEFSQVRPUn0ke3BhZ2V9JHtTRVBBUkFUT1J9JHtrZXl9YCxcbiAgICBwYWdlLFxuICAgIGtleSxcbiAgICBmdW5jLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN1Ym1pdEZvcm0sXG4gIHN1Ym1pdEZvcm1GYWlsZWQsXG4gIHN1Ym1pdEZvcm1TdWNjZWVkLFxuICBhY2tub3dsZWRnZSxcbiAgY2xlYW51cCxcbiAgW1NFVF9WQVJJQUJMRV06IHNldFZhcmlhYmxlLFxuICBbU0VUX1ZBUklBQkxFX0ZOXTogc2V0VmFyaWFibGVXaXRoRnVuY3Rpb24sXG59O1xuXG4iXX0=