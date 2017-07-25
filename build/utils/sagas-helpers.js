'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyse = exports.doSubmit = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _constants = require('../constants');

var _config = require('../config');

/**
 * action type will be something like `HOC_DO_SUBMIT::containers/Form/Login::loginForm`
 * The part after SEPARATOR (::) is just for debugging purpose, we can ignore that
 * @param action
 */
var doSubmit = exports.doSubmit = function doSubmit(action) {
  return action && action.type.indexOf(_constants.DO_SUBMIT) !== -1;
};

/**
 * @param request: name of the store, need to be unique *required
 * @param submit: how to submit the data *required
 * @param onSuccess: if you want to dispatch some additional actions on success
 * @param onError: if you want to dispatch some additional actions on error
 * @param postProcess: result might need to be formatted before sending to user
 * @param postError: error might need to be formatted before sending to user
 * @param formName
 * @returns {{request: *, submit: *, onSuccess: Array, onError: Array, postProcess: (function(*): *), postProcessError: (function(*): *)}}
 */
var analyse = exports.analyse = function analyse(_ref, formName) {
  var request = _ref[_config.PAGE],
      submit = _ref[_config.SUBMIT],
      _ref$ON_SUCCESS = _ref[_config.ON_SUCCESS],
      onSuccess = _ref$ON_SUCCESS === undefined ? [] : _ref$ON_SUCCESS,
      _ref$ON_ERROR = _ref[_config.ON_ERROR],
      onError = _ref$ON_ERROR === undefined ? [] : _ref$ON_ERROR,
      _ref$HANDLE_SUCCESS = _ref[_config.HANDLE_SUCCESS],
      postSuccess = _ref$HANDLE_SUCCESS === undefined ? function (_) {
    return _;
  } : _ref$HANDLE_SUCCESS,
      _ref$HANDLE_ERROR = _ref[_config.HANDLE_ERROR],
      postError = _ref$HANDLE_ERROR === undefined ? function (_) {
    return _;
  } : _ref$HANDLE_ERROR;

  var submitEach = submit;
  var postSuccessEach = postSuccess;
  var postErrorEach = postError;
  var onSuccessEach = onSuccess;
  var onErrorEach = onError;

  if ((typeof submitEach === 'undefined' ? 'undefined' : _typeof(submitEach)) === 'object') submitEach = submitEach[formName];
  if ((typeof postSuccessEach === 'undefined' ? 'undefined' : _typeof(postSuccessEach)) === 'object') postSuccessEach = postSuccessEach[formName];
  if ((typeof postErrorEach === 'undefined' ? 'undefined' : _typeof(postErrorEach)) === 'object') postErrorEach = postErrorEach[formName];
  if (!Array.isArray(onSuccessEach)) onSuccessEach = onSuccessEach[formName];
  if (!Array.isArray(onErrorEach)) onErrorEach = onErrorEach[formName];

  return {
    request: request,
    submit: submitEach,
    onSubmitSuccess: onSuccessEach,
    onSubmitError: onErrorEach,
    postProcess: postSuccessEach,
    postProcessError: postErrorEach
  };
};

exports.default = {
  doSubmit: doSubmit,
  analyse: analyse
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9zYWdhcy1oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImRvU3VibWl0IiwiYWN0aW9uIiwidHlwZSIsImluZGV4T2YiLCJhbmFseXNlIiwiZm9ybU5hbWUiLCJyZXF1ZXN0Iiwic3VibWl0Iiwib25TdWNjZXNzIiwib25FcnJvciIsInBvc3RTdWNjZXNzIiwiXyIsInBvc3RFcnJvciIsInN1Ym1pdEVhY2giLCJwb3N0U3VjY2Vzc0VhY2giLCJwb3N0RXJyb3JFYWNoIiwib25TdWNjZXNzRWFjaCIsIm9uRXJyb3JFYWNoIiwiQXJyYXkiLCJpc0FycmF5Iiwib25TdWJtaXRTdWNjZXNzIiwib25TdWJtaXRFcnJvciIsInBvc3RQcm9jZXNzIiwicG9zdFByb2Nlc3NFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7Ozs7O0FBS08sSUFBTUEsOEJBQVcsU0FBWEEsUUFBVyxDQUFDQyxNQUFEO0FBQUEsU0FBWUEsVUFBVUEsT0FBT0MsSUFBUCxDQUFZQyxPQUFaLDJCQUFtQyxDQUFDLENBQTFEO0FBQUEsQ0FBakI7O0FBRVA7Ozs7Ozs7Ozs7QUFVTyxJQUFNQyw0QkFBVSxTQUFWQSxPQUFVLE9BT3BCQyxRQVBvQixFQU9QO0FBQUEsTUFOTkMsT0FNTTtBQUFBLE1BTEpDLE1BS0k7QUFBQTtBQUFBLE1BSkFDLFNBSUEsbUNBSlksRUFJWjtBQUFBO0FBQUEsTUFIRkMsT0FHRSxpQ0FIUSxFQUdSO0FBQUE7QUFBQSxNQUZJQyxXQUVKLHVDQUZrQixVQUFDQyxDQUFEO0FBQUEsV0FBUUEsQ0FBUjtBQUFBLEdBRWxCO0FBQUE7QUFBQSxNQURFQyxTQUNGLHFDQURjLFVBQUNELENBQUQ7QUFBQSxXQUFRQSxDQUFSO0FBQUEsR0FDZDs7QUFDZCxNQUFJRSxhQUFhTixNQUFqQjtBQUNBLE1BQUlPLGtCQUFrQkosV0FBdEI7QUFDQSxNQUFJSyxnQkFBZ0JILFNBQXBCO0FBQ0EsTUFBSUksZ0JBQWdCUixTQUFwQjtBQUNBLE1BQUlTLGNBQWNSLE9BQWxCOztBQUVBLE1BQUksUUFBT0ksVUFBUCx5Q0FBT0EsVUFBUCxPQUFzQixRQUExQixFQUFvQ0EsYUFBYUEsV0FBV1IsUUFBWCxDQUFiO0FBQ3BDLE1BQUksUUFBT1MsZUFBUCx5Q0FBT0EsZUFBUCxPQUEyQixRQUEvQixFQUF5Q0Esa0JBQWtCQSxnQkFBZ0JULFFBQWhCLENBQWxCO0FBQ3pDLE1BQUksUUFBT1UsYUFBUCx5Q0FBT0EsYUFBUCxPQUF5QixRQUE3QixFQUF1Q0EsZ0JBQWdCQSxjQUFjVixRQUFkLENBQWhCO0FBQ3ZDLE1BQUksQ0FBQ2EsTUFBTUMsT0FBTixDQUFjSCxhQUFkLENBQUwsRUFBbUNBLGdCQUFnQkEsY0FBY1gsUUFBZCxDQUFoQjtBQUNuQyxNQUFJLENBQUNhLE1BQU1DLE9BQU4sQ0FBY0YsV0FBZCxDQUFMLEVBQWlDQSxjQUFjQSxZQUFZWixRQUFaLENBQWQ7O0FBRWpDLFNBQU87QUFDTEMsb0JBREs7QUFFTEMsWUFBUU0sVUFGSDtBQUdMTyxxQkFBaUJKLGFBSFo7QUFJTEssbUJBQWVKLFdBSlY7QUFLTEssaUJBQWFSLGVBTFI7QUFNTFMsc0JBQWtCUjtBQU5iLEdBQVA7QUFRRCxDQTVCTTs7a0JBK0JRO0FBQ2JmLG9CQURhO0FBRWJJO0FBRmEsQyIsImZpbGUiOiJzYWdhcy1oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9fU1VCTUlUIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IEhBTkRMRV9FUlJPUiwgSEFORExFX1NVQ0NFU1MsIE9OX0VSUk9SLCBPTl9TVUNDRVNTLCBQQUdFLCBTVUJNSVQgfSBmcm9tICcuLi9jb25maWcnO1xuXG4vKipcbiAqIGFjdGlvbiB0eXBlIHdpbGwgYmUgc29tZXRoaW5nIGxpa2UgYEhPQ19ET19TVUJNSVQ6OmNvbnRhaW5lcnMvRm9ybS9Mb2dpbjo6bG9naW5Gb3JtYFxuICogVGhlIHBhcnQgYWZ0ZXIgU0VQQVJBVE9SICg6OikgaXMganVzdCBmb3IgZGVidWdnaW5nIHB1cnBvc2UsIHdlIGNhbiBpZ25vcmUgdGhhdFxuICogQHBhcmFtIGFjdGlvblxuICovXG5leHBvcnQgY29uc3QgZG9TdWJtaXQgPSAoYWN0aW9uKSA9PiBhY3Rpb24gJiYgYWN0aW9uLnR5cGUuaW5kZXhPZihET19TVUJNSVQpICE9PSAtMTtcblxuLyoqXG4gKiBAcGFyYW0gcmVxdWVzdDogbmFtZSBvZiB0aGUgc3RvcmUsIG5lZWQgdG8gYmUgdW5pcXVlICpyZXF1aXJlZFxuICogQHBhcmFtIHN1Ym1pdDogaG93IHRvIHN1Ym1pdCB0aGUgZGF0YSAqcmVxdWlyZWRcbiAqIEBwYXJhbSBvblN1Y2Nlc3M6IGlmIHlvdSB3YW50IHRvIGRpc3BhdGNoIHNvbWUgYWRkaXRpb25hbCBhY3Rpb25zIG9uIHN1Y2Nlc3NcbiAqIEBwYXJhbSBvbkVycm9yOiBpZiB5b3Ugd2FudCB0byBkaXNwYXRjaCBzb21lIGFkZGl0aW9uYWwgYWN0aW9ucyBvbiBlcnJvclxuICogQHBhcmFtIHBvc3RQcm9jZXNzOiByZXN1bHQgbWlnaHQgbmVlZCB0byBiZSBmb3JtYXR0ZWQgYmVmb3JlIHNlbmRpbmcgdG8gdXNlclxuICogQHBhcmFtIHBvc3RFcnJvcjogZXJyb3IgbWlnaHQgbmVlZCB0byBiZSBmb3JtYXR0ZWQgYmVmb3JlIHNlbmRpbmcgdG8gdXNlclxuICogQHBhcmFtIGZvcm1OYW1lXG4gKiBAcmV0dXJucyB7e3JlcXVlc3Q6ICosIHN1Ym1pdDogKiwgb25TdWNjZXNzOiBBcnJheSwgb25FcnJvcjogQXJyYXksIHBvc3RQcm9jZXNzOiAoZnVuY3Rpb24oKik6ICopLCBwb3N0UHJvY2Vzc0Vycm9yOiAoZnVuY3Rpb24oKik6ICopfX1cbiAqL1xuZXhwb3J0IGNvbnN0IGFuYWx5c2UgPSAoe1xuICBbUEFHRV06IHJlcXVlc3QsXG4gIFtTVUJNSVRdOiBzdWJtaXQsXG4gIFtPTl9TVUNDRVNTXTogb25TdWNjZXNzID0gW10sXG4gIFtPTl9FUlJPUl06IG9uRXJyb3IgPSBbXSxcbiAgW0hBTkRMRV9TVUNDRVNTXTogcG9zdFN1Y2Nlc3MgPSAoXykgPT4gKF8pLFxuICBbSEFORExFX0VSUk9SXTogcG9zdEVycm9yID0gKF8pID0+IChfKSxcbn0sIGZvcm1OYW1lKSA9PiB7XG4gIGxldCBzdWJtaXRFYWNoID0gc3VibWl0O1xuICBsZXQgcG9zdFN1Y2Nlc3NFYWNoID0gcG9zdFN1Y2Nlc3M7XG4gIGxldCBwb3N0RXJyb3JFYWNoID0gcG9zdEVycm9yO1xuICBsZXQgb25TdWNjZXNzRWFjaCA9IG9uU3VjY2VzcztcbiAgbGV0IG9uRXJyb3JFYWNoID0gb25FcnJvcjtcblxuICBpZiAodHlwZW9mIHN1Ym1pdEVhY2ggPT09ICdvYmplY3QnKSBzdWJtaXRFYWNoID0gc3VibWl0RWFjaFtmb3JtTmFtZV07XG4gIGlmICh0eXBlb2YgcG9zdFN1Y2Nlc3NFYWNoID09PSAnb2JqZWN0JykgcG9zdFN1Y2Nlc3NFYWNoID0gcG9zdFN1Y2Nlc3NFYWNoW2Zvcm1OYW1lXTtcbiAgaWYgKHR5cGVvZiBwb3N0RXJyb3JFYWNoID09PSAnb2JqZWN0JykgcG9zdEVycm9yRWFjaCA9IHBvc3RFcnJvckVhY2hbZm9ybU5hbWVdO1xuICBpZiAoIUFycmF5LmlzQXJyYXkob25TdWNjZXNzRWFjaCkpIG9uU3VjY2Vzc0VhY2ggPSBvblN1Y2Nlc3NFYWNoW2Zvcm1OYW1lXTtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG9uRXJyb3JFYWNoKSkgb25FcnJvckVhY2ggPSBvbkVycm9yRWFjaFtmb3JtTmFtZV07XG5cbiAgcmV0dXJuIHtcbiAgICByZXF1ZXN0LFxuICAgIHN1Ym1pdDogc3VibWl0RWFjaCxcbiAgICBvblN1Ym1pdFN1Y2Nlc3M6IG9uU3VjY2Vzc0VhY2gsXG4gICAgb25TdWJtaXRFcnJvcjogb25FcnJvckVhY2gsXG4gICAgcG9zdFByb2Nlc3M6IHBvc3RTdWNjZXNzRWFjaCxcbiAgICBwb3N0UHJvY2Vzc0Vycm9yOiBwb3N0RXJyb3JFYWNoLFxuICB9O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRvU3VibWl0LFxuICBhbmFseXNlLFxufTtcbiJdfQ==