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
 * @param page
 */
function handleRequest(_ref) {
  var payload = _ref.payload,
      configs = _ref.configs,
      formName = _ref.formName,
      page = _ref.page;
  var option, result;
  return regeneratorRuntime.wrap(function handleRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(configs.page === page)) {
            _context.next = 14;
            break;
          }

          option = (0, _sagasHelpers.analyse)(configs, formName);
          _context.prev = 2;
          _context.next = 5;
          return (0, _effects.call)(option.submit, payload);

        case 5:
          result = _context.sent;
          _context.next = 8;
          return (0, _makeCallback.makeCallback)(_actions.submitFormSucceed, option.onSubmitSuccess, option.postProcess(result), payload, option.request, formName);

        case 8:
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context['catch'](2);
          _context.next = 14;
          return (0, _makeCallback.makeCallback)(_actions.submitFormFailed, option.onSubmitError, option.postProcessError(_context.t0), payload, option.request, formName);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9zYWdhcy5qcyJdLCJuYW1lcyI6WyJoYW5kbGVSZXF1ZXN0Iiwic2FnYSIsInBheWxvYWQiLCJjb25maWdzIiwiZm9ybU5hbWUiLCJwYWdlIiwib3B0aW9uIiwic3VibWl0IiwicmVzdWx0Iiwib25TdWJtaXRTdWNjZXNzIiwicG9zdFByb2Nlc3MiLCJyZXF1ZXN0Iiwib25TdWJtaXRFcnJvciIsInBvc3RQcm9jZXNzRXJyb3IiLCJ3YXRjaGVyIl0sIm1hcHBpbmdzIjoiOzs7OztRQWFpQkEsYSxHQUFBQSxhO1FBaUJBQyxJLEdBQUFBLEk7O0FBOUJqQjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7ZUFTaUJELGEsRUFpQkFDLEk7O0FBeEJqQjs7Ozs7OztBQU9PLFNBQVVELGFBQVY7QUFBQSxNQUEwQkUsT0FBMUIsUUFBMEJBLE9BQTFCO0FBQUEsTUFBbUNDLE9BQW5DLFFBQW1DQSxPQUFuQztBQUFBLE1BQTRDQyxRQUE1QyxRQUE0Q0EsUUFBNUM7QUFBQSxNQUFzREMsSUFBdEQsUUFBc0RBLElBQXREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUNERixRQUFRRSxJQUFSLEtBQWlCQSxJQURoQjtBQUFBO0FBQUE7QUFBQTs7QUFFR0MsZ0JBRkgsR0FFWSwyQkFBUUgsT0FBUixFQUFpQkMsUUFBakIsQ0FGWjtBQUFBO0FBQUE7QUFBQSxpQkFJb0IsbUJBQUtFLE9BQU9DLE1BQVosRUFBb0JMLE9BQXBCLENBSnBCOztBQUFBO0FBSUtNLGdCQUpMO0FBQUE7QUFBQSxpQkFLSyw0REFBZ0NGLE9BQU9HLGVBQXZDLEVBQXdESCxPQUFPSSxXQUFQLENBQW1CRixNQUFuQixDQUF4RCxFQUFvRk4sT0FBcEYsRUFBNkZJLE9BQU9LLE9BQXBHLEVBQTZHUCxRQUE3RyxDQUxMOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQU9LLDJEQUErQkUsT0FBT00sYUFBdEMsRUFBcUROLE9BQU9PLGdCQUFQLGFBQXJELEVBQXFGWCxPQUFyRixFQUE4RkksT0FBT0ssT0FBckcsRUFBOEdQLFFBQTlHLENBUEw7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBWVA7Ozs7O0FBS08sU0FBVUgsSUFBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVpQiwrREFBMEJELGFBQTFCLENBRmpCOztBQUFBO0FBRUNjLGlCQUZEO0FBQUE7QUFBQSxpQkFLQyxxREFMRDs7QUFBQTtBQUFBO0FBQUEsaUJBTUMscUJBQU9BLE9BQVAsQ0FORDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTUDtrQkFDZSxDQUFDYixJQUFELEMiLCJmaWxlIjoic2FnYXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMT0NBVElPTl9DSEFOR0UgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xuaW1wb3J0IHsgY2FsbCwgY2FuY2VsLCBmb3JrLCB0YWtlLCB0YWtlRXZlcnkgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgc3VibWl0Rm9ybUZhaWxlZCwgc3VibWl0Rm9ybVN1Y2NlZWQgfSBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0IHsgbWFrZUNhbGxiYWNrIH0gZnJvbSAnLi91dGlscy9tYWtlQ2FsbGJhY2snO1xuaW1wb3J0IHsgYW5hbHlzZSwgZG9TdWJtaXQgfSBmcm9tICcuL3V0aWxzL3NhZ2FzLWhlbHBlcnMnO1xuXG4vKipcbiAqIGhhbmRsZSBzdWJtaXQgc2FnYVxuICogQHBhcmFtIGRhdGE6IGZvcm0gZGF0YVxuICogQHBhcmFtIG9wdGlvbnM6IENPTkZJR1xuICogQHBhcmFtIGZvcm1OYW1lOiB3b3JrcyBhcyBhbiBJRCBpbiB0aGUgc2FtZSBwYWdlXG4gKiBAcGFyYW0gcGFnZVxuICovXG5leHBvcnQgZnVuY3Rpb24qIGhhbmRsZVJlcXVlc3QoeyBwYXlsb2FkLCBjb25maWdzLCBmb3JtTmFtZSwgcGFnZSB9KSB7XG4gIGlmIChjb25maWdzLnBhZ2UgPT09IHBhZ2UpIHtcbiAgICBjb25zdCBvcHRpb24gPSBhbmFseXNlKGNvbmZpZ3MsIGZvcm1OYW1lKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgY2FsbChvcHRpb24uc3VibWl0LCBwYXlsb2FkKTtcbiAgICAgIHlpZWxkIG1ha2VDYWxsYmFjayhzdWJtaXRGb3JtU3VjY2VlZCwgb3B0aW9uLm9uU3VibWl0U3VjY2Vzcywgb3B0aW9uLnBvc3RQcm9jZXNzKHJlc3VsdCksIHBheWxvYWQsIG9wdGlvbi5yZXF1ZXN0LCBmb3JtTmFtZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHlpZWxkIG1ha2VDYWxsYmFjayhzdWJtaXRGb3JtRmFpbGVkLCBvcHRpb24ub25TdWJtaXRFcnJvciwgb3B0aW9uLnBvc3RQcm9jZXNzRXJyb3IoZXJyb3IpLCBwYXlsb2FkLCBvcHRpb24ucmVxdWVzdCwgZm9ybU5hbWUpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJvb3Qgc2FnYSBtYW5hZ2VzIHdhdGNoZXIgbGlmZWN5Y2xlXG4gKiBXYXRjaGVzIGZvciBET19TVUJNSVQgYWN0aW9ucyBhbmQgY2FsbHMgYGhhbmRsZVJlcXVlc3RgIHdoZW4gb25lIGNvbWVzIGluLlxuICogQnkgdXNpbmcgYHRha2VMYXRlc3RgIG9ubHkgdGhlIHJlc3VsdCBvZiB0aGUgbGF0ZXN0IEFQSSBjYWxsIGlzIGFwcGxpZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogc2FnYSgpIHtcbiAgLy8gRm9yayB3YXRjaGVyIHNvIHdlIGNhbiBjb250aW51ZSBleGVjdXRpb25cbiAgY29uc3Qgd2F0Y2hlciA9IHlpZWxkIGZvcmsodGFrZUV2ZXJ5LCBkb1N1Ym1pdCwgaGFuZGxlUmVxdWVzdCk7XG5cbiAgLy8gU3VzcGVuZCBleGVjdXRpb24gaWYgbG9jYXRpb24gY2hhbmdlZFxuICB5aWVsZCB0YWtlKExPQ0FUSU9OX0NIQU5HRSk7XG4gIHlpZWxkIGNhbmNlbCh3YXRjaGVyKTtcbn1cblxuLy8gQm9vdHN0cmFwIHNhZ2FzXG5leHBvcnQgZGVmYXVsdCBbc2FnYV07XG4iXX0=