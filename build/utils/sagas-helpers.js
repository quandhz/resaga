'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyse = exports.doSubmit = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by quando on 13/7/17.
                                                                                                                                                                                                                                                                               */


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9zYWdhcy1oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImRvU3VibWl0IiwiYWN0aW9uIiwidHlwZSIsImluZGV4T2YiLCJhbmFseXNlIiwiZm9ybU5hbWUiLCJyZXF1ZXN0Iiwic3VibWl0Iiwib25TdWNjZXNzIiwib25FcnJvciIsInBvc3RTdWNjZXNzIiwiXyIsInBvc3RFcnJvciIsInN1Ym1pdEVhY2giLCJwb3N0U3VjY2Vzc0VhY2giLCJwb3N0RXJyb3JFYWNoIiwib25TdWNjZXNzRWFjaCIsIm9uRXJyb3JFYWNoIiwiQXJyYXkiLCJpc0FycmF5Iiwib25TdWJtaXRTdWNjZXNzIiwib25TdWJtaXRFcnJvciIsInBvc3RQcm9jZXNzIiwicG9zdFByb2Nlc3NFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs4UUFBQTs7Ozs7QUFHQTs7QUFDQTs7QUFFQTs7Ozs7QUFLTyxJQUFNQSw4QkFBVyxTQUFYQSxRQUFXLENBQUNDLE1BQUQ7QUFBQSxTQUFZQSxVQUFVQSxPQUFPQyxJQUFQLENBQVlDLE9BQVosMkJBQW1DLENBQUMsQ0FBMUQ7QUFBQSxDQUFqQjs7QUFFUDs7Ozs7Ozs7OztBQVVPLElBQU1DLDRCQUFVLFNBQVZBLE9BQVUsT0FPcEJDLFFBUG9CLEVBT1A7QUFBQSxNQU5OQyxPQU1NO0FBQUEsTUFMSkMsTUFLSTtBQUFBO0FBQUEsTUFKQUMsU0FJQSxtQ0FKWSxFQUlaO0FBQUE7QUFBQSxNQUhGQyxPQUdFLGlDQUhRLEVBR1I7QUFBQTtBQUFBLE1BRklDLFdBRUosdUNBRmtCLFVBQUNDLENBQUQ7QUFBQSxXQUFRQSxDQUFSO0FBQUEsR0FFbEI7QUFBQTtBQUFBLE1BREVDLFNBQ0YscUNBRGMsVUFBQ0QsQ0FBRDtBQUFBLFdBQVFBLENBQVI7QUFBQSxHQUNkOztBQUNkLE1BQUlFLGFBQWFOLE1BQWpCO0FBQ0EsTUFBSU8sa0JBQWtCSixXQUF0QjtBQUNBLE1BQUlLLGdCQUFnQkgsU0FBcEI7QUFDQSxNQUFJSSxnQkFBZ0JSLFNBQXBCO0FBQ0EsTUFBSVMsY0FBY1IsT0FBbEI7O0FBRUEsTUFBSSxRQUFPSSxVQUFQLHlDQUFPQSxVQUFQLE9BQXNCLFFBQTFCLEVBQW9DQSxhQUFhQSxXQUFXUixRQUFYLENBQWI7QUFDcEMsTUFBSSxRQUFPUyxlQUFQLHlDQUFPQSxlQUFQLE9BQTJCLFFBQS9CLEVBQXlDQSxrQkFBa0JBLGdCQUFnQlQsUUFBaEIsQ0FBbEI7QUFDekMsTUFBSSxRQUFPVSxhQUFQLHlDQUFPQSxhQUFQLE9BQXlCLFFBQTdCLEVBQXVDQSxnQkFBZ0JBLGNBQWNWLFFBQWQsQ0FBaEI7QUFDdkMsTUFBSSxDQUFDYSxNQUFNQyxPQUFOLENBQWNILGFBQWQsQ0FBTCxFQUFtQ0EsZ0JBQWdCQSxjQUFjWCxRQUFkLENBQWhCO0FBQ25DLE1BQUksQ0FBQ2EsTUFBTUMsT0FBTixDQUFjRixXQUFkLENBQUwsRUFBaUNBLGNBQWNBLFlBQVlaLFFBQVosQ0FBZDs7QUFFakMsU0FBTztBQUNMQyxvQkFESztBQUVMQyxZQUFRTSxVQUZIO0FBR0xPLHFCQUFpQkosYUFIWjtBQUlMSyxtQkFBZUosV0FKVjtBQUtMSyxpQkFBYVIsZUFMUjtBQU1MUyxzQkFBa0JSO0FBTmIsR0FBUDtBQVFELENBNUJNOztrQkErQlE7QUFDYmYsb0JBRGE7QUFFYkk7QUFGYSxDIiwiZmlsZSI6InNhZ2FzLWhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgcXVhbmRvIG9uIDEzLzcvMTcuXG4gKi9cbmltcG9ydCB7IERPX1NVQk1JVCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBIQU5ETEVfRVJST1IsIEhBTkRMRV9TVUNDRVNTLCBPTl9FUlJPUiwgT05fU1VDQ0VTUywgUEFHRSwgU1VCTUlUIH0gZnJvbSAnLi4vY29uZmlnJztcblxuLyoqXG4gKiBhY3Rpb24gdHlwZSB3aWxsIGJlIHNvbWV0aGluZyBsaWtlIGBIT0NfRE9fU1VCTUlUOjpjb250YWluZXJzL0Zvcm0vTG9naW46OmxvZ2luRm9ybWBcbiAqIFRoZSBwYXJ0IGFmdGVyIFNFUEFSQVRPUiAoOjopIGlzIGp1c3QgZm9yIGRlYnVnZ2luZyBwdXJwb3NlLCB3ZSBjYW4gaWdub3JlIHRoYXRcbiAqIEBwYXJhbSBhY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGRvU3VibWl0ID0gKGFjdGlvbikgPT4gYWN0aW9uICYmIGFjdGlvbi50eXBlLmluZGV4T2YoRE9fU1VCTUlUKSAhPT0gLTE7XG5cbi8qKlxuICogQHBhcmFtIHJlcXVlc3Q6IG5hbWUgb2YgdGhlIHN0b3JlLCBuZWVkIHRvIGJlIHVuaXF1ZSAqcmVxdWlyZWRcbiAqIEBwYXJhbSBzdWJtaXQ6IGhvdyB0byBzdWJtaXQgdGhlIGRhdGEgKnJlcXVpcmVkXG4gKiBAcGFyYW0gb25TdWNjZXNzOiBpZiB5b3Ugd2FudCB0byBkaXNwYXRjaCBzb21lIGFkZGl0aW9uYWwgYWN0aW9ucyBvbiBzdWNjZXNzXG4gKiBAcGFyYW0gb25FcnJvcjogaWYgeW91IHdhbnQgdG8gZGlzcGF0Y2ggc29tZSBhZGRpdGlvbmFsIGFjdGlvbnMgb24gZXJyb3JcbiAqIEBwYXJhbSBwb3N0UHJvY2VzczogcmVzdWx0IG1pZ2h0IG5lZWQgdG8gYmUgZm9ybWF0dGVkIGJlZm9yZSBzZW5kaW5nIHRvIHVzZXJcbiAqIEBwYXJhbSBwb3N0RXJyb3I6IGVycm9yIG1pZ2h0IG5lZWQgdG8gYmUgZm9ybWF0dGVkIGJlZm9yZSBzZW5kaW5nIHRvIHVzZXJcbiAqIEBwYXJhbSBmb3JtTmFtZVxuICogQHJldHVybnMge3tyZXF1ZXN0OiAqLCBzdWJtaXQ6ICosIG9uU3VjY2VzczogQXJyYXksIG9uRXJyb3I6IEFycmF5LCBwb3N0UHJvY2VzczogKGZ1bmN0aW9uKCopOiAqKSwgcG9zdFByb2Nlc3NFcnJvcjogKGZ1bmN0aW9uKCopOiAqKX19XG4gKi9cbmV4cG9ydCBjb25zdCBhbmFseXNlID0gKHtcbiAgW1BBR0VdOiByZXF1ZXN0LFxuICBbU1VCTUlUXTogc3VibWl0LFxuICBbT05fU1VDQ0VTU106IG9uU3VjY2VzcyA9IFtdLFxuICBbT05fRVJST1JdOiBvbkVycm9yID0gW10sXG4gIFtIQU5ETEVfU1VDQ0VTU106IHBvc3RTdWNjZXNzID0gKF8pID0+IChfKSxcbiAgW0hBTkRMRV9FUlJPUl06IHBvc3RFcnJvciA9IChfKSA9PiAoXyksXG59LCBmb3JtTmFtZSkgPT4ge1xuICBsZXQgc3VibWl0RWFjaCA9IHN1Ym1pdDtcbiAgbGV0IHBvc3RTdWNjZXNzRWFjaCA9IHBvc3RTdWNjZXNzO1xuICBsZXQgcG9zdEVycm9yRWFjaCA9IHBvc3RFcnJvcjtcbiAgbGV0IG9uU3VjY2Vzc0VhY2ggPSBvblN1Y2Nlc3M7XG4gIGxldCBvbkVycm9yRWFjaCA9IG9uRXJyb3I7XG5cbiAgaWYgKHR5cGVvZiBzdWJtaXRFYWNoID09PSAnb2JqZWN0Jykgc3VibWl0RWFjaCA9IHN1Ym1pdEVhY2hbZm9ybU5hbWVdO1xuICBpZiAodHlwZW9mIHBvc3RTdWNjZXNzRWFjaCA9PT0gJ29iamVjdCcpIHBvc3RTdWNjZXNzRWFjaCA9IHBvc3RTdWNjZXNzRWFjaFtmb3JtTmFtZV07XG4gIGlmICh0eXBlb2YgcG9zdEVycm9yRWFjaCA9PT0gJ29iamVjdCcpIHBvc3RFcnJvckVhY2ggPSBwb3N0RXJyb3JFYWNoW2Zvcm1OYW1lXTtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG9uU3VjY2Vzc0VhY2gpKSBvblN1Y2Nlc3NFYWNoID0gb25TdWNjZXNzRWFjaFtmb3JtTmFtZV07XG4gIGlmICghQXJyYXkuaXNBcnJheShvbkVycm9yRWFjaCkpIG9uRXJyb3JFYWNoID0gb25FcnJvckVhY2hbZm9ybU5hbWVdO1xuXG4gIHJldHVybiB7XG4gICAgcmVxdWVzdCxcbiAgICBzdWJtaXQ6IHN1Ym1pdEVhY2gsXG4gICAgb25TdWJtaXRTdWNjZXNzOiBvblN1Y2Nlc3NFYWNoLFxuICAgIG9uU3VibWl0RXJyb3I6IG9uRXJyb3JFYWNoLFxuICAgIHBvc3RQcm9jZXNzOiBwb3N0U3VjY2Vzc0VhY2gsXG4gICAgcG9zdFByb2Nlc3NFcnJvcjogcG9zdEVycm9yRWFjaCxcbiAgfTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBkb1N1Ym1pdCxcbiAgYW5hbHlzZSxcbn07XG4iXX0=