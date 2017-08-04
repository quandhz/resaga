'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRequest = handleRequest;
exports.saga = saga;

var _reactRouterRedux = require('react-router-redux');

var _effects = require('redux-saga/effects');

var _actions = require('./actions');

var _makeCallback = require('./utils/makeCallback');

var _sagasHelpers = require('./utils/sagas-helpers');

var _marked = [handleRequest, saga].map(regeneratorRuntime.mark);

/**
 * handle submit saga
 * @param data: form data
 * @param options: CONFIG
 * @param formName: works as an ID in the same page
 */
function handleRequest(_ref) {
  var data = _ref.data,
      options = _ref.options,
      formName = _ref.formName;
  var option, result;
  return regeneratorRuntime.wrap(function handleRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          option = (0, _sagasHelpers.analyse)(options, formName);
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(option.submit, data);

        case 4:
          result = _context.sent;
          _context.next = 7;
          return (0, _makeCallback.makeCallback)(_actions.submitFormSucceed, option.onSubmitSuccess, option.postProcess(result), option.request, formName);

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context['catch'](1);
          _context.next = 13;
          return (0, _makeCallback.makeCallback)(_actions.submitFormFailed, option.onSubmitError, option.postProcessError(_context.t0), option.request, formName);

        case 13:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[1, 9]]);
}

/**
 * Root saga manages watcher lifecycle
 * Watches for DO_SUBMIT actions and calls `handleRequest` when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
function saga() {
  var watcher;
  return regeneratorRuntime.wrap(function saga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.fork)(_effects.takeEvery, _sagasHelpers.doSubmit, handleRequest);

        case 2:
          watcher = _context2.sent;
          _context2.next = 5;
          return (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);

        case 5:
          _context2.next = 7;
          return (0, _effects.cancel)(watcher);

        case 7:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

// Bootstrap sagas
exports.default = [saga];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9zYWdhcy5qcyJdLCJuYW1lcyI6WyJoYW5kbGVSZXF1ZXN0Iiwic2FnYSIsImRhdGEiLCJvcHRpb25zIiwiZm9ybU5hbWUiLCJvcHRpb24iLCJzdWJtaXQiLCJyZXN1bHQiLCJvblN1Ym1pdFN1Y2Nlc3MiLCJwb3N0UHJvY2VzcyIsInJlcXVlc3QiLCJvblN1Ym1pdEVycm9yIiwicG9zdFByb2Nlc3NFcnJvciIsIndhdGNoZXIiXSwibWFwcGluZ3MiOiI7Ozs7O1FBWWlCQSxhLEdBQUFBLGE7UUFlQUMsSSxHQUFBQSxJOztBQTNCakI7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O2VBUWlCRCxhLEVBZUFDLEk7O0FBckJqQjs7Ozs7O0FBTU8sU0FBVUQsYUFBVjtBQUFBLE1BQTBCRSxJQUExQixRQUEwQkEsSUFBMUI7QUFBQSxNQUFnQ0MsT0FBaEMsUUFBZ0NBLE9BQWhDO0FBQUEsTUFBeUNDLFFBQXpDLFFBQXlDQSxRQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQ0MsZ0JBREQsR0FDVSwyQkFBUUYsT0FBUixFQUFpQkMsUUFBakIsQ0FEVjtBQUFBO0FBQUE7QUFBQSxpQkFHa0IsbUJBQUtDLE9BQU9DLE1BQVosRUFBb0JKLElBQXBCLENBSGxCOztBQUFBO0FBR0dLLGdCQUhIO0FBQUE7QUFBQSxpQkFJRyw0REFBZ0NGLE9BQU9HLGVBQXZDLEVBQXdESCxPQUFPSSxXQUFQLENBQW1CRixNQUFuQixDQUF4RCxFQUFvRkYsT0FBT0ssT0FBM0YsRUFBb0dOLFFBQXBHLENBSkg7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBTUcsMkRBQStCQyxPQUFPTSxhQUF0QyxFQUFxRE4sT0FBT08sZ0JBQVAsYUFBckQsRUFBcUZQLE9BQU9LLE9BQTVGLEVBQXFHTixRQUFyRyxDQU5IOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVQOzs7OztBQUtPLFNBQVVILElBQVY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFaUIsK0RBQTBCRCxhQUExQixDQUZqQjs7QUFBQTtBQUVDYSxpQkFGRDtBQUFBO0FBQUEsaUJBS0MscURBTEQ7O0FBQUE7QUFBQTtBQUFBLGlCQU1DLHFCQUFPQSxPQUFQLENBTkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBU1A7a0JBQ2UsQ0FBQ1osSUFBRCxDIiwiZmlsZSI6InNhZ2FzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTE9DQVRJT05fQ0hBTkdFIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4JztcbmltcG9ydCB7IGNhbGwsIGNhbmNlbCwgZm9yaywgdGFrZSwgdGFrZUV2ZXJ5IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCB7IHN1Ym1pdEZvcm1GYWlsZWQsIHN1Ym1pdEZvcm1TdWNjZWVkIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IG1ha2VDYWxsYmFjayB9IGZyb20gJy4vdXRpbHMvbWFrZUNhbGxiYWNrJztcbmltcG9ydCB7IGFuYWx5c2UsIGRvU3VibWl0IH0gZnJvbSAnLi91dGlscy9zYWdhcy1oZWxwZXJzJztcblxuLyoqXG4gKiBoYW5kbGUgc3VibWl0IHNhZ2FcbiAqIEBwYXJhbSBkYXRhOiBmb3JtIGRhdGFcbiAqIEBwYXJhbSBvcHRpb25zOiBDT05GSUdcbiAqIEBwYXJhbSBmb3JtTmFtZTogd29ya3MgYXMgYW4gSUQgaW4gdGhlIHNhbWUgcGFnZVxuICovXG5leHBvcnQgZnVuY3Rpb24qIGhhbmRsZVJlcXVlc3QoeyBkYXRhLCBvcHRpb25zLCBmb3JtTmFtZSB9KSB7XG4gIGNvbnN0IG9wdGlvbiA9IGFuYWx5c2Uob3B0aW9ucywgZm9ybU5hbWUpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIGNhbGwob3B0aW9uLnN1Ym1pdCwgZGF0YSk7XG4gICAgeWllbGQgbWFrZUNhbGxiYWNrKHN1Ym1pdEZvcm1TdWNjZWVkLCBvcHRpb24ub25TdWJtaXRTdWNjZXNzLCBvcHRpb24ucG9zdFByb2Nlc3MocmVzdWx0KSwgb3B0aW9uLnJlcXVlc3QsIGZvcm1OYW1lKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB5aWVsZCBtYWtlQ2FsbGJhY2soc3VibWl0Rm9ybUZhaWxlZCwgb3B0aW9uLm9uU3VibWl0RXJyb3IsIG9wdGlvbi5wb3N0UHJvY2Vzc0Vycm9yKGVycm9yKSwgb3B0aW9uLnJlcXVlc3QsIGZvcm1OYW1lKTtcbiAgfVxufVxuXG4vKipcbiAqIFJvb3Qgc2FnYSBtYW5hZ2VzIHdhdGNoZXIgbGlmZWN5Y2xlXG4gKiBXYXRjaGVzIGZvciBET19TVUJNSVQgYWN0aW9ucyBhbmQgY2FsbHMgYGhhbmRsZVJlcXVlc3RgIHdoZW4gb25lIGNvbWVzIGluLlxuICogQnkgdXNpbmcgYHRha2VMYXRlc3RgIG9ubHkgdGhlIHJlc3VsdCBvZiB0aGUgbGF0ZXN0IEFQSSBjYWxsIGlzIGFwcGxpZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogc2FnYSgpIHtcbiAgLy8gRm9yayB3YXRjaGVyIHNvIHdlIGNhbiBjb250aW51ZSBleGVjdXRpb25cbiAgY29uc3Qgd2F0Y2hlciA9IHlpZWxkIGZvcmsodGFrZUV2ZXJ5LCBkb1N1Ym1pdCwgaGFuZGxlUmVxdWVzdCk7XG5cbiAgLy8gU3VzcGVuZCBleGVjdXRpb24gaWYgbG9jYXRpb24gY2hhbmdlZFxuICB5aWVsZCB0YWtlKExPQ0FUSU9OX0NIQU5HRSk7XG4gIHlpZWxkIGNhbmNlbCh3YXRjaGVyKTtcbn1cblxuLy8gQm9vdHN0cmFwIHNhZ2FzXG5leHBvcnQgZGVmYXVsdCBbc2FnYV07XG4iXX0=