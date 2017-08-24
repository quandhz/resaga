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
          return (0, _makeCallback.makeCallback)(_actions.submitFormSucceed, option.onSubmitSuccess, option.postProcess(result), data, option.request, formName);

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context['catch'](1);
          _context.next = 13;
          return (0, _makeCallback.makeCallback)(_actions.submitFormFailed, option.onSubmitError, option.postProcessError(_context.t0), data, option.request, formName);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9zYWdhcy5qcyJdLCJuYW1lcyI6WyJoYW5kbGVSZXF1ZXN0Iiwic2FnYSIsImRhdGEiLCJvcHRpb25zIiwiZm9ybU5hbWUiLCJvcHRpb24iLCJzdWJtaXQiLCJyZXN1bHQiLCJvblN1Ym1pdFN1Y2Nlc3MiLCJwb3N0UHJvY2VzcyIsInJlcXVlc3QiLCJvblN1Ym1pdEVycm9yIiwicG9zdFByb2Nlc3NFcnJvciIsIndhdGNoZXIiXSwibWFwcGluZ3MiOiI7Ozs7O1FBWWlCQSxhLEdBQUFBLGE7UUFlQUMsSSxHQUFBQSxJOztBQTNCakI7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O2VBUWlCRCxhLEVBZUFDLEk7O0FBckJqQjs7Ozs7O0FBTU8sU0FBVUQsYUFBVjtBQUFBLE1BQTBCRSxJQUExQixRQUEwQkEsSUFBMUI7QUFBQSxNQUFnQ0MsT0FBaEMsUUFBZ0NBLE9BQWhDO0FBQUEsTUFBeUNDLFFBQXpDLFFBQXlDQSxRQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQ0MsZ0JBREQsR0FDVSwyQkFBUUYsT0FBUixFQUFpQkMsUUFBakIsQ0FEVjtBQUFBO0FBQUE7QUFBQSxpQkFHa0IsbUJBQUtDLE9BQU9DLE1BQVosRUFBb0JKLElBQXBCLENBSGxCOztBQUFBO0FBR0dLLGdCQUhIO0FBQUE7QUFBQSxpQkFJRyw0REFBZ0NGLE9BQU9HLGVBQXZDLEVBQXdESCxPQUFPSSxXQUFQLENBQW1CRixNQUFuQixDQUF4RCxFQUFvRkwsSUFBcEYsRUFBMEZHLE9BQU9LLE9BQWpHLEVBQTBHTixRQUExRyxDQUpIOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQU1HLDJEQUErQkMsT0FBT00sYUFBdEMsRUFBcUROLE9BQU9PLGdCQUFQLGFBQXJELEVBQXFGVixJQUFyRixFQUEyRkcsT0FBT0ssT0FBbEcsRUFBMkdOLFFBQTNHLENBTkg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVVA7Ozs7O0FBS08sU0FBVUgsSUFBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVpQiwrREFBMEJELGFBQTFCLENBRmpCOztBQUFBO0FBRUNhLGlCQUZEO0FBQUE7QUFBQSxpQkFLQyxxREFMRDs7QUFBQTtBQUFBO0FBQUEsaUJBTUMscUJBQU9BLE9BQVAsQ0FORDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTUDtrQkFDZSxDQUFDWixJQUFELEMiLCJmaWxlIjoic2FnYXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMT0NBVElPTl9DSEFOR0UgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xuaW1wb3J0IHsgY2FsbCwgY2FuY2VsLCBmb3JrLCB0YWtlLCB0YWtlRXZlcnkgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgc3VibWl0Rm9ybUZhaWxlZCwgc3VibWl0Rm9ybVN1Y2NlZWQgfSBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0IHsgbWFrZUNhbGxiYWNrIH0gZnJvbSAnLi91dGlscy9tYWtlQ2FsbGJhY2snO1xuaW1wb3J0IHsgYW5hbHlzZSwgZG9TdWJtaXQgfSBmcm9tICcuL3V0aWxzL3NhZ2FzLWhlbHBlcnMnO1xuXG4vKipcbiAqIGhhbmRsZSBzdWJtaXQgc2FnYVxuICogQHBhcmFtIGRhdGE6IGZvcm0gZGF0YVxuICogQHBhcmFtIG9wdGlvbnM6IENPTkZJR1xuICogQHBhcmFtIGZvcm1OYW1lOiB3b3JrcyBhcyBhbiBJRCBpbiB0aGUgc2FtZSBwYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogaGFuZGxlUmVxdWVzdCh7IGRhdGEsIG9wdGlvbnMsIGZvcm1OYW1lIH0pIHtcbiAgY29uc3Qgb3B0aW9uID0gYW5hbHlzZShvcHRpb25zLCBmb3JtTmFtZSk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0geWllbGQgY2FsbChvcHRpb24uc3VibWl0LCBkYXRhKTtcbiAgICB5aWVsZCBtYWtlQ2FsbGJhY2soc3VibWl0Rm9ybVN1Y2NlZWQsIG9wdGlvbi5vblN1Ym1pdFN1Y2Nlc3MsIG9wdGlvbi5wb3N0UHJvY2VzcyhyZXN1bHQpLCBkYXRhLCBvcHRpb24ucmVxdWVzdCwgZm9ybU5hbWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHlpZWxkIG1ha2VDYWxsYmFjayhzdWJtaXRGb3JtRmFpbGVkLCBvcHRpb24ub25TdWJtaXRFcnJvciwgb3B0aW9uLnBvc3RQcm9jZXNzRXJyb3IoZXJyb3IpLCBkYXRhLCBvcHRpb24ucmVxdWVzdCwgZm9ybU5hbWUpO1xuICB9XG59XG5cbi8qKlxuICogUm9vdCBzYWdhIG1hbmFnZXMgd2F0Y2hlciBsaWZlY3ljbGVcbiAqIFdhdGNoZXMgZm9yIERPX1NVQk1JVCBhY3Rpb25zIGFuZCBjYWxscyBgaGFuZGxlUmVxdWVzdGAgd2hlbiBvbmUgY29tZXMgaW4uXG4gKiBCeSB1c2luZyBgdGFrZUxhdGVzdGAgb25seSB0aGUgcmVzdWx0IG9mIHRoZSBsYXRlc3QgQVBJIGNhbGwgaXMgYXBwbGllZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBzYWdhKCkge1xuICAvLyBGb3JrIHdhdGNoZXIgc28gd2UgY2FuIGNvbnRpbnVlIGV4ZWN1dGlvblxuICBjb25zdCB3YXRjaGVyID0geWllbGQgZm9yayh0YWtlRXZlcnksIGRvU3VibWl0LCBoYW5kbGVSZXF1ZXN0KTtcblxuICAvLyBTdXNwZW5kIGV4ZWN1dGlvbiBpZiBsb2NhdGlvbiBjaGFuZ2VkXG4gIHlpZWxkIHRha2UoTE9DQVRJT05fQ0hBTkdFKTtcbiAgeWllbGQgY2FuY2VsKHdhdGNoZXIpO1xufVxuXG4vLyBCb290c3RyYXAgc2FnYXNcbmV4cG9ydCBkZWZhdWx0IFtzYWdhXTtcbiJdfQ==