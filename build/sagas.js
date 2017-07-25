'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRequest = handleRequest;
exports.saga = saga;

var _reactRouterRedux = require('react-router-redux');

var _effects = require('redux-saga/effects');

var _makeCallback = require('./utils/makeCallback');

var _actions = require('./actions');

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
          return (0, _effects.fork)(_effects.takeLatest, _sagasHelpers.doSubmit, handleRequest);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9zYWdhcy5qcyJdLCJuYW1lcyI6WyJoYW5kbGVSZXF1ZXN0Iiwic2FnYSIsImRhdGEiLCJvcHRpb25zIiwiZm9ybU5hbWUiLCJvcHRpb24iLCJzdWJtaXQiLCJyZXN1bHQiLCJvblN1Ym1pdFN1Y2Nlc3MiLCJwb3N0UHJvY2VzcyIsInJlcXVlc3QiLCJvblN1Ym1pdEVycm9yIiwicG9zdFByb2Nlc3NFcnJvciIsIndhdGNoZXIiXSwibWFwcGluZ3MiOiI7Ozs7O1FBWWlCQSxhLEdBQUFBLGE7UUFlQUMsSSxHQUFBQSxJOztBQTNCakI7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O2VBUWlCRCxhLEVBZUFDLEk7O0FBckJqQjs7Ozs7O0FBTU8sU0FBVUQsYUFBVjtBQUFBLE1BQTBCRSxJQUExQixRQUEwQkEsSUFBMUI7QUFBQSxNQUFnQ0MsT0FBaEMsUUFBZ0NBLE9BQWhDO0FBQUEsTUFBeUNDLFFBQXpDLFFBQXlDQSxRQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQ0MsZ0JBREQsR0FDVSwyQkFBUUYsT0FBUixFQUFpQkMsUUFBakIsQ0FEVjtBQUFBO0FBQUE7QUFBQSxpQkFHa0IsbUJBQUtDLE9BQU9DLE1BQVosRUFBb0JKLElBQXBCLENBSGxCOztBQUFBO0FBR0dLLGdCQUhIO0FBQUE7QUFBQSxpQkFJRyw0REFBZ0NGLE9BQU9HLGVBQXZDLEVBQXdESCxPQUFPSSxXQUFQLENBQW1CRixNQUFuQixDQUF4RCxFQUFvRkYsT0FBT0ssT0FBM0YsRUFBb0dOLFFBQXBHLENBSkg7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBTUcsMkRBQStCQyxPQUFPTSxhQUF0QyxFQUFxRE4sT0FBT08sZ0JBQVAsYUFBckQsRUFBcUZQLE9BQU9LLE9BQTVGLEVBQXFHTixRQUFyRyxDQU5IOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVQOzs7OztBQUtPLFNBQVVILElBQVY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFaUIsZ0VBQTJCRCxhQUEzQixDQUZqQjs7QUFBQTtBQUVDYSxpQkFGRDtBQUFBO0FBQUEsaUJBS0MscURBTEQ7O0FBQUE7QUFBQTtBQUFBLGlCQU1DLHFCQUFPQSxPQUFQLENBTkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBU1A7a0JBQ2UsQ0FBQ1osSUFBRCxDIiwiZmlsZSI6InNhZ2FzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTE9DQVRJT05fQ0hBTkdFIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4JztcbmltcG9ydCB7IGNhbGwsIGNhbmNlbCwgZm9yaywgdGFrZSwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgeyBtYWtlQ2FsbGJhY2sgfSBmcm9tICcuL3V0aWxzL21ha2VDYWxsYmFjayc7XG5pbXBvcnQgeyBzdWJtaXRGb3JtRmFpbGVkLCBzdWJtaXRGb3JtU3VjY2VlZCB9IGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgeyBhbmFseXNlLCBkb1N1Ym1pdCB9IGZyb20gJy4vdXRpbHMvc2FnYXMtaGVscGVycyc7XG5cbi8qKlxuICogaGFuZGxlIHN1Ym1pdCBzYWdhXG4gKiBAcGFyYW0gZGF0YTogZm9ybSBkYXRhXG4gKiBAcGFyYW0gb3B0aW9uczogQ09ORklHXG4gKiBAcGFyYW0gZm9ybU5hbWU6IHdvcmtzIGFzIGFuIElEIGluIHRoZSBzYW1lIHBhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBoYW5kbGVSZXF1ZXN0KHsgZGF0YSwgb3B0aW9ucywgZm9ybU5hbWUgfSkge1xuICBjb25zdCBvcHRpb24gPSBhbmFseXNlKG9wdGlvbnMsIGZvcm1OYW1lKTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSB5aWVsZCBjYWxsKG9wdGlvbi5zdWJtaXQsIGRhdGEpO1xuICAgIHlpZWxkIG1ha2VDYWxsYmFjayhzdWJtaXRGb3JtU3VjY2VlZCwgb3B0aW9uLm9uU3VibWl0U3VjY2Vzcywgb3B0aW9uLnBvc3RQcm9jZXNzKHJlc3VsdCksIG9wdGlvbi5yZXF1ZXN0LCBmb3JtTmFtZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgeWllbGQgbWFrZUNhbGxiYWNrKHN1Ym1pdEZvcm1GYWlsZWQsIG9wdGlvbi5vblN1Ym1pdEVycm9yLCBvcHRpb24ucG9zdFByb2Nlc3NFcnJvcihlcnJvciksIG9wdGlvbi5yZXF1ZXN0LCBmb3JtTmFtZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSb290IHNhZ2EgbWFuYWdlcyB3YXRjaGVyIGxpZmVjeWNsZVxuICogV2F0Y2hlcyBmb3IgRE9fU1VCTUlUIGFjdGlvbnMgYW5kIGNhbGxzIGBoYW5kbGVSZXF1ZXN0YCB3aGVuIG9uZSBjb21lcyBpbi5cbiAqIEJ5IHVzaW5nIGB0YWtlTGF0ZXN0YCBvbmx5IHRoZSByZXN1bHQgb2YgdGhlIGxhdGVzdCBBUEkgY2FsbCBpcyBhcHBsaWVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24qIHNhZ2EoKSB7XG4gIC8vIEZvcmsgd2F0Y2hlciBzbyB3ZSBjYW4gY29udGludWUgZXhlY3V0aW9uXG4gIGNvbnN0IHdhdGNoZXIgPSB5aWVsZCBmb3JrKHRha2VMYXRlc3QsIGRvU3VibWl0LCBoYW5kbGVSZXF1ZXN0KTtcblxuICAvLyBTdXNwZW5kIGV4ZWN1dGlvbiBpZiBsb2NhdGlvbiBjaGFuZ2VkXG4gIHlpZWxkIHRha2UoTE9DQVRJT05fQ0hBTkdFKTtcbiAgeWllbGQgY2FuY2VsKHdhdGNoZXIpO1xufVxuXG4vLyBCb290c3RyYXAgc2FnYXNcbmV4cG9ydCBkZWZhdWx0IFtzYWdhXTtcbiJdfQ==