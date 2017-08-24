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
      formName = _ref.formName,
      page = _ref.page;
  var option, result;
  return regeneratorRuntime.wrap(function handleRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(options.page === page)) {
            _context.next = 14;
            break;
          }

          option = (0, _sagasHelpers.analyse)(options, formName);
          _context.prev = 2;
          _context.next = 5;
          return (0, _effects.call)(option.submit, data);

        case 5:
          result = _context.sent;
          _context.next = 8;
          return (0, _makeCallback.makeCallback)(_actions.submitFormSucceed, option.onSubmitSuccess, option.postProcess(result), data, option.request, formName);

        case 8:
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context['catch'](2);
          _context.next = 14;
          return (0, _makeCallback.makeCallback)(_actions.submitFormFailed, option.onSubmitError, option.postProcessError(_context.t0), data, option.request, formName);

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[2, 10]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9zYWdhcy5qcyJdLCJuYW1lcyI6WyJoYW5kbGVSZXF1ZXN0Iiwic2FnYSIsImRhdGEiLCJvcHRpb25zIiwiZm9ybU5hbWUiLCJwYWdlIiwib3B0aW9uIiwic3VibWl0IiwicmVzdWx0Iiwib25TdWJtaXRTdWNjZXNzIiwicG9zdFByb2Nlc3MiLCJyZXF1ZXN0Iiwib25TdWJtaXRFcnJvciIsInBvc3RQcm9jZXNzRXJyb3IiLCJ3YXRjaGVyIl0sIm1hcHBpbmdzIjoiOzs7OztRQVlpQkEsYSxHQUFBQSxhO1FBaUJBQyxJLEdBQUFBLEk7O0FBN0JqQjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7ZUFRaUJELGEsRUFpQkFDLEk7O0FBdkJqQjs7Ozs7O0FBTU8sU0FBVUQsYUFBVjtBQUFBLE1BQTBCRSxJQUExQixRQUEwQkEsSUFBMUI7QUFBQSxNQUFnQ0MsT0FBaEMsUUFBZ0NBLE9BQWhDO0FBQUEsTUFBeUNDLFFBQXpDLFFBQXlDQSxRQUF6QztBQUFBLE1BQW1EQyxJQUFuRCxRQUFtREEsSUFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ0RGLFFBQVFFLElBQVIsS0FBaUJBLElBRGhCO0FBQUE7QUFBQTtBQUFBOztBQUVHQyxnQkFGSCxHQUVZLDJCQUFRSCxPQUFSLEVBQWlCQyxRQUFqQixDQUZaO0FBQUE7QUFBQTtBQUFBLGlCQUlvQixtQkFBS0UsT0FBT0MsTUFBWixFQUFvQkwsSUFBcEIsQ0FKcEI7O0FBQUE7QUFJS00sZ0JBSkw7QUFBQTtBQUFBLGlCQUtLLDREQUFnQ0YsT0FBT0csZUFBdkMsRUFBd0RILE9BQU9JLFdBQVAsQ0FBbUJGLE1BQW5CLENBQXhELEVBQW9GTixJQUFwRixFQUEwRkksT0FBT0ssT0FBakcsRUFBMEdQLFFBQTFHLENBTEw7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBT0ssMkRBQStCRSxPQUFPTSxhQUF0QyxFQUFxRE4sT0FBT08sZ0JBQVAsYUFBckQsRUFBcUZYLElBQXJGLEVBQTJGSSxPQUFPSyxPQUFsRyxFQUEyR1AsUUFBM0csQ0FQTDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFZUDs7Ozs7QUFLTyxTQUFVSCxJQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRWlCLCtEQUEwQkQsYUFBMUIsQ0FGakI7O0FBQUE7QUFFQ2MsaUJBRkQ7QUFBQTtBQUFBLGlCQUtDLHFEQUxEOztBQUFBO0FBQUE7QUFBQSxpQkFNQyxxQkFBT0EsT0FBUCxDQU5EOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVNQO2tCQUNlLENBQUNiLElBQUQsQyIsImZpbGUiOiJzYWdhcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExPQ0FUSU9OX0NIQU5HRSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XG5pbXBvcnQgeyBjYWxsLCBjYW5jZWwsIGZvcmssIHRha2UsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgeyBzdWJtaXRGb3JtRmFpbGVkLCBzdWJtaXRGb3JtU3VjY2VlZCB9IGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgeyBtYWtlQ2FsbGJhY2sgfSBmcm9tICcuL3V0aWxzL21ha2VDYWxsYmFjayc7XG5pbXBvcnQgeyBhbmFseXNlLCBkb1N1Ym1pdCB9IGZyb20gJy4vdXRpbHMvc2FnYXMtaGVscGVycyc7XG5cbi8qKlxuICogaGFuZGxlIHN1Ym1pdCBzYWdhXG4gKiBAcGFyYW0gZGF0YTogZm9ybSBkYXRhXG4gKiBAcGFyYW0gb3B0aW9uczogQ09ORklHXG4gKiBAcGFyYW0gZm9ybU5hbWU6IHdvcmtzIGFzIGFuIElEIGluIHRoZSBzYW1lIHBhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBoYW5kbGVSZXF1ZXN0KHsgZGF0YSwgb3B0aW9ucywgZm9ybU5hbWUsIHBhZ2UgfSkge1xuICBpZiAob3B0aW9ucy5wYWdlID09PSBwYWdlKSB7XG4gICAgY29uc3Qgb3B0aW9uID0gYW5hbHlzZShvcHRpb25zLCBmb3JtTmFtZSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIGNhbGwob3B0aW9uLnN1Ym1pdCwgZGF0YSk7XG4gICAgICB5aWVsZCBtYWtlQ2FsbGJhY2soc3VibWl0Rm9ybVN1Y2NlZWQsIG9wdGlvbi5vblN1Ym1pdFN1Y2Nlc3MsIG9wdGlvbi5wb3N0UHJvY2VzcyhyZXN1bHQpLCBkYXRhLCBvcHRpb24ucmVxdWVzdCwgZm9ybU5hbWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB5aWVsZCBtYWtlQ2FsbGJhY2soc3VibWl0Rm9ybUZhaWxlZCwgb3B0aW9uLm9uU3VibWl0RXJyb3IsIG9wdGlvbi5wb3N0UHJvY2Vzc0Vycm9yKGVycm9yKSwgZGF0YSwgb3B0aW9uLnJlcXVlc3QsIGZvcm1OYW1lKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSb290IHNhZ2EgbWFuYWdlcyB3YXRjaGVyIGxpZmVjeWNsZVxuICogV2F0Y2hlcyBmb3IgRE9fU1VCTUlUIGFjdGlvbnMgYW5kIGNhbGxzIGBoYW5kbGVSZXF1ZXN0YCB3aGVuIG9uZSBjb21lcyBpbi5cbiAqIEJ5IHVzaW5nIGB0YWtlTGF0ZXN0YCBvbmx5IHRoZSByZXN1bHQgb2YgdGhlIGxhdGVzdCBBUEkgY2FsbCBpcyBhcHBsaWVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24qIHNhZ2EoKSB7XG4gIC8vIEZvcmsgd2F0Y2hlciBzbyB3ZSBjYW4gY29udGludWUgZXhlY3V0aW9uXG4gIGNvbnN0IHdhdGNoZXIgPSB5aWVsZCBmb3JrKHRha2VFdmVyeSwgZG9TdWJtaXQsIGhhbmRsZVJlcXVlc3QpO1xuXG4gIC8vIFN1c3BlbmQgZXhlY3V0aW9uIGlmIGxvY2F0aW9uIGNoYW5nZWRcbiAgeWllbGQgdGFrZShMT0NBVElPTl9DSEFOR0UpO1xuICB5aWVsZCBjYW5jZWwod2F0Y2hlcik7XG59XG5cbi8vIEJvb3RzdHJhcCBzYWdhc1xuZXhwb3J0IGRlZmF1bHQgW3NhZ2FdO1xuIl19