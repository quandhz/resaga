'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

/**
 * @param request can be one of the 2 types below
 * - Type 1: { request: { onSuccess: <function(result)>, onError: <function(error)>, manuallyAcknowledge: <bool> } }
 * - Type 2: { request: <function> }
 * @param props
 * @returns {boolean}
 */
var analyseRequest = function analyseRequest(request, props) {
  var error = props[_constants.SERVER_ERROR],
      success = props[_constants.SUBMIT_SUCCESS],
      result = props[_constants.RESULT];

  if (typeof request === 'function') {
    request(props); // pass through props
    return false; // if you want to handle everything yourself, I assume you also want to manually handle the acknowledge process
  }
  // or calling functions
  if (error && request.onError) request.onError(error);
  if (success && request.onSuccess) request.onSuccess(result);
  return !request.manuallyAcknowledge;
};

/**
 * functions to call when receive props from onSubmitHOC
 * @param store this is your `nextProps`
 * @param actions can be either of 2 following structure:
 *  - Option 1: { propName: { onSuccess: <function(result)>, onError: <function(error)> } }
 *  - Option 2: { propName: <function(requestNextProps)> } function will be called either success or error
 * @param acknowledge should be automatically injected by onSubmitHOC
 *   if you want to manually acknowledge, do NOT pass in this parameter
 */
var analyseNextProps = function analyseNextProps(_ref, actions, acknowledge) {
  var store = _ref[_constants.STORE];

  if (store) {
    Object.keys(actions).forEach(function (requestName) {
      var request = actions[requestName];
      var requestNextProps = store.get(requestName);
      if (requestNextProps) {
        var shouldAck = analyseRequest(request, requestNextProps);
        if (shouldAck && typeof acknowledge === 'function') {
          acknowledge(requestName);
        }
      }
    });
  }
};

exports.default = {
  analyseNextProps: analyseNextProps,
  analyseRequest: analyseRequest
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9jb21wb25lbnQtaGVscGVycy5qcyJdLCJuYW1lcyI6WyJhbmFseXNlUmVxdWVzdCIsInJlcXVlc3QiLCJwcm9wcyIsImVycm9yIiwic3VjY2VzcyIsInJlc3VsdCIsIm9uRXJyb3IiLCJvblN1Y2Nlc3MiLCJtYW51YWxseUFja25vd2xlZGdlIiwiYW5hbHlzZU5leHRQcm9wcyIsImFjdGlvbnMiLCJhY2tub3dsZWRnZSIsInN0b3JlIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZXF1ZXN0TmFtZSIsInJlcXVlc3ROZXh0UHJvcHMiLCJnZXQiLCJzaG91bGRBY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUVBOzs7Ozs7O0FBT0EsSUFBTUEsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBb0I7QUFBQSxNQUNqQkMsS0FEaUIsR0FDc0NELEtBRHRDO0FBQUEsTUFDUUUsT0FEUixHQUNzQ0YsS0FEdEM7QUFBQSxNQUMyQkcsTUFEM0IsR0FDc0NILEtBRHRDOztBQUV6QyxNQUFJLE9BQU9ELE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakNBLFlBQVFDLEtBQVIsRUFEaUMsQ0FDakI7QUFDaEIsV0FBTyxLQUFQLENBRmlDLENBRW5CO0FBQ2Y7QUFDRDtBQUNBLE1BQUlDLFNBQVNGLFFBQVFLLE9BQXJCLEVBQThCTCxRQUFRSyxPQUFSLENBQWdCSCxLQUFoQjtBQUM5QixNQUFJQyxXQUFXSCxRQUFRTSxTQUF2QixFQUFrQ04sUUFBUU0sU0FBUixDQUFrQkYsTUFBbEI7QUFDbEMsU0FBTyxDQUFDSixRQUFRTyxtQkFBaEI7QUFDRCxDQVZEOztBQVlBOzs7Ozs7Ozs7QUFTQSxJQUFNQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixPQUFxQkMsT0FBckIsRUFBOEJDLFdBQTlCLEVBQThDO0FBQUEsTUFBbENDLEtBQWtDOztBQUNyRSxNQUFJQSxLQUFKLEVBQVc7QUFDVEMsV0FBT0MsSUFBUCxDQUFZSixPQUFaLEVBQXFCSyxPQUFyQixDQUE2QixVQUFDQyxXQUFELEVBQWlCO0FBQzVDLFVBQU1mLFVBQVVTLFFBQVFNLFdBQVIsQ0FBaEI7QUFDQSxVQUFNQyxtQkFBbUJMLE1BQU1NLEdBQU4sQ0FBVUYsV0FBVixDQUF6QjtBQUNBLFVBQUlDLGdCQUFKLEVBQXNCO0FBQ3BCLFlBQU1FLFlBQVluQixlQUFlQyxPQUFmLEVBQXdCZ0IsZ0JBQXhCLENBQWxCO0FBQ0EsWUFBSUUsYUFBYSxPQUFPUixXQUFQLEtBQXVCLFVBQXhDLEVBQW9EO0FBQ2xEQSxzQkFBWUssV0FBWjtBQUNEO0FBQ0Y7QUFDRixLQVREO0FBVUQ7QUFDRixDQWJEOztrQkFlZTtBQUNiUCxvQ0FEYTtBQUViVDtBQUZhLEMiLCJmaWxlIjoiY29tcG9uZW50LWhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSRVNVTFQsIFNFUlZFUl9FUlJPUiwgU1RPUkUsIFNVQk1JVF9TVUNDRVNTIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAcGFyYW0gcmVxdWVzdCBjYW4gYmUgb25lIG9mIHRoZSAyIHR5cGVzIGJlbG93XG4gKiAtIFR5cGUgMTogeyByZXF1ZXN0OiB7IG9uU3VjY2VzczogPGZ1bmN0aW9uKHJlc3VsdCk+LCBvbkVycm9yOiA8ZnVuY3Rpb24oZXJyb3IpPiwgbWFudWFsbHlBY2tub3dsZWRnZTogPGJvb2w+IH0gfVxuICogLSBUeXBlIDI6IHsgcmVxdWVzdDogPGZ1bmN0aW9uPiB9XG4gKiBAcGFyYW0gcHJvcHNcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBhbmFseXNlUmVxdWVzdCA9IChyZXF1ZXN0LCBwcm9wcykgPT4ge1xuICBjb25zdCB7IFtTRVJWRVJfRVJST1JdOiBlcnJvciwgW1NVQk1JVF9TVUNDRVNTXTogc3VjY2VzcywgW1JFU1VMVF06IHJlc3VsdCB9ID0gcHJvcHM7XG4gIGlmICh0eXBlb2YgcmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlcXVlc3QocHJvcHMpOyAvLyBwYXNzIHRocm91Z2ggcHJvcHNcbiAgICByZXR1cm4gZmFsc2U7IC8vIGlmIHlvdSB3YW50IHRvIGhhbmRsZSBldmVyeXRoaW5nIHlvdXJzZWxmLCBJIGFzc3VtZSB5b3UgYWxzbyB3YW50IHRvIG1hbnVhbGx5IGhhbmRsZSB0aGUgYWNrbm93bGVkZ2UgcHJvY2Vzc1xuICB9XG4gIC8vIG9yIGNhbGxpbmcgZnVuY3Rpb25zXG4gIGlmIChlcnJvciAmJiByZXF1ZXN0Lm9uRXJyb3IpIHJlcXVlc3Qub25FcnJvcihlcnJvcik7XG4gIGlmIChzdWNjZXNzICYmIHJlcXVlc3Qub25TdWNjZXNzKSByZXF1ZXN0Lm9uU3VjY2VzcyhyZXN1bHQpO1xuICByZXR1cm4gIXJlcXVlc3QubWFudWFsbHlBY2tub3dsZWRnZTtcbn07XG5cbi8qKlxuICogZnVuY3Rpb25zIHRvIGNhbGwgd2hlbiByZWNlaXZlIHByb3BzIGZyb20gb25TdWJtaXRIT0NcbiAqIEBwYXJhbSBzdG9yZSB0aGlzIGlzIHlvdXIgYG5leHRQcm9wc2BcbiAqIEBwYXJhbSBhY3Rpb25zIGNhbiBiZSBlaXRoZXIgb2YgMiBmb2xsb3dpbmcgc3RydWN0dXJlOlxuICogIC0gT3B0aW9uIDE6IHsgcHJvcE5hbWU6IHsgb25TdWNjZXNzOiA8ZnVuY3Rpb24ocmVzdWx0KT4sIG9uRXJyb3I6IDxmdW5jdGlvbihlcnJvcik+IH0gfVxuICogIC0gT3B0aW9uIDI6IHsgcHJvcE5hbWU6IDxmdW5jdGlvbihyZXF1ZXN0TmV4dFByb3BzKT4gfSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBlaXRoZXIgc3VjY2VzcyBvciBlcnJvclxuICogQHBhcmFtIGFja25vd2xlZGdlIHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5IGluamVjdGVkIGJ5IG9uU3VibWl0SE9DXG4gKiAgIGlmIHlvdSB3YW50IHRvIG1hbnVhbGx5IGFja25vd2xlZGdlLCBkbyBOT1QgcGFzcyBpbiB0aGlzIHBhcmFtZXRlclxuICovXG5jb25zdCBhbmFseXNlTmV4dFByb3BzID0gKHsgW1NUT1JFXTogc3RvcmUgfSwgYWN0aW9ucywgYWNrbm93bGVkZ2UpID0+IHtcbiAgaWYgKHN0b3JlKSB7XG4gICAgT2JqZWN0LmtleXMoYWN0aW9ucykuZm9yRWFjaCgocmVxdWVzdE5hbWUpID0+IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBhY3Rpb25zW3JlcXVlc3ROYW1lXTtcbiAgICAgIGNvbnN0IHJlcXVlc3ROZXh0UHJvcHMgPSBzdG9yZS5nZXQocmVxdWVzdE5hbWUpO1xuICAgICAgaWYgKHJlcXVlc3ROZXh0UHJvcHMpIHtcbiAgICAgICAgY29uc3Qgc2hvdWxkQWNrID0gYW5hbHlzZVJlcXVlc3QocmVxdWVzdCwgcmVxdWVzdE5leHRQcm9wcyk7XG4gICAgICAgIGlmIChzaG91bGRBY2sgJiYgdHlwZW9mIGFja25vd2xlZGdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgYWNrbm93bGVkZ2UocmVxdWVzdE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYW5hbHlzZU5leHRQcm9wcyxcbiAgYW5hbHlzZVJlcXVlc3QsXG59O1xuIl19