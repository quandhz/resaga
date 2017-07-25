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
/**
 * Created by quando on 13/7/17.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9jb21wb25lbnQtaGVscGVycy5qcyJdLCJuYW1lcyI6WyJhbmFseXNlUmVxdWVzdCIsInJlcXVlc3QiLCJwcm9wcyIsImVycm9yIiwic3VjY2VzcyIsInJlc3VsdCIsIm9uRXJyb3IiLCJvblN1Y2Nlc3MiLCJtYW51YWxseUFja25vd2xlZGdlIiwiYW5hbHlzZU5leHRQcm9wcyIsImFjdGlvbnMiLCJhY2tub3dsZWRnZSIsInN0b3JlIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZXF1ZXN0TmFtZSIsInJlcXVlc3ROZXh0UHJvcHMiLCJnZXQiLCJzaG91bGRBY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBOztBQUVBOzs7Ozs7O0FBT0EsSUFBTUEsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBb0I7QUFBQSxNQUNqQkMsS0FEaUIsR0FDc0NELEtBRHRDO0FBQUEsTUFDUUUsT0FEUixHQUNzQ0YsS0FEdEM7QUFBQSxNQUMyQkcsTUFEM0IsR0FDc0NILEtBRHRDOztBQUV6QyxNQUFJLE9BQU9ELE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakNBLFlBQVFDLEtBQVIsRUFEaUMsQ0FDakI7QUFDaEIsV0FBTyxLQUFQLENBRmlDLENBRW5CO0FBQ2Y7QUFDRDtBQUNBLE1BQUlDLFNBQVNGLFFBQVFLLE9BQXJCLEVBQThCTCxRQUFRSyxPQUFSLENBQWdCSCxLQUFoQjtBQUM5QixNQUFJQyxXQUFXSCxRQUFRTSxTQUF2QixFQUFrQ04sUUFBUU0sU0FBUixDQUFrQkYsTUFBbEI7QUFDbEMsU0FBTyxDQUFDSixRQUFRTyxtQkFBaEI7QUFDRCxDQVZEOztBQVlBOzs7Ozs7Ozs7QUF4QkE7OztBQWlDQSxJQUFNQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixPQUFxQkMsT0FBckIsRUFBOEJDLFdBQTlCLEVBQThDO0FBQUEsTUFBbENDLEtBQWtDOztBQUNyRSxNQUFJQSxLQUFKLEVBQVc7QUFDVEMsV0FBT0MsSUFBUCxDQUFZSixPQUFaLEVBQXFCSyxPQUFyQixDQUE2QixVQUFDQyxXQUFELEVBQWlCO0FBQzVDLFVBQU1mLFVBQVVTLFFBQVFNLFdBQVIsQ0FBaEI7QUFDQSxVQUFNQyxtQkFBbUJMLE1BQU1NLEdBQU4sQ0FBVUYsV0FBVixDQUF6QjtBQUNBLFVBQUlDLGdCQUFKLEVBQXNCO0FBQ3BCLFlBQU1FLFlBQVluQixlQUFlQyxPQUFmLEVBQXdCZ0IsZ0JBQXhCLENBQWxCO0FBQ0EsWUFBSUUsYUFBYSxPQUFPUixXQUFQLEtBQXVCLFVBQXhDLEVBQW9EO0FBQ2xEQSxzQkFBWUssV0FBWjtBQUNEO0FBQ0Y7QUFDRixLQVREO0FBVUQ7QUFDRixDQWJEOztrQkFlZTtBQUNiUCxvQ0FEYTtBQUViVDtBQUZhLEMiLCJmaWxlIjoiY29tcG9uZW50LWhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgcXVhbmRvIG9uIDEzLzcvMTcuXG4gKi9cbmltcG9ydCB7IFJFU1VMVCwgU0VSVkVSX0VSUk9SLCBTVE9SRSwgU1VCTUlUX1NVQ0NFU1MgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBwYXJhbSByZXF1ZXN0IGNhbiBiZSBvbmUgb2YgdGhlIDIgdHlwZXMgYmVsb3dcbiAqIC0gVHlwZSAxOiB7IHJlcXVlc3Q6IHsgb25TdWNjZXNzOiA8ZnVuY3Rpb24ocmVzdWx0KT4sIG9uRXJyb3I6IDxmdW5jdGlvbihlcnJvcik+LCBtYW51YWxseUFja25vd2xlZGdlOiA8Ym9vbD4gfSB9XG4gKiAtIFR5cGUgMjogeyByZXF1ZXN0OiA8ZnVuY3Rpb24+IH1cbiAqIEBwYXJhbSBwcm9wc1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGFuYWx5c2VSZXF1ZXN0ID0gKHJlcXVlc3QsIHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgW1NFUlZFUl9FUlJPUl06IGVycm9yLCBbU1VCTUlUX1NVQ0NFU1NdOiBzdWNjZXNzLCBbUkVTVUxUXTogcmVzdWx0IH0gPSBwcm9wcztcbiAgaWYgKHR5cGVvZiByZXF1ZXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVxdWVzdChwcm9wcyk7IC8vIHBhc3MgdGhyb3VnaCBwcm9wc1xuICAgIHJldHVybiBmYWxzZTsgLy8gaWYgeW91IHdhbnQgdG8gaGFuZGxlIGV2ZXJ5dGhpbmcgeW91cnNlbGYsIEkgYXNzdW1lIHlvdSBhbHNvIHdhbnQgdG8gbWFudWFsbHkgaGFuZGxlIHRoZSBhY2tub3dsZWRnZSBwcm9jZXNzXG4gIH1cbiAgLy8gb3IgY2FsbGluZyBmdW5jdGlvbnNcbiAgaWYgKGVycm9yICYmIHJlcXVlc3Qub25FcnJvcikgcmVxdWVzdC5vbkVycm9yKGVycm9yKTtcbiAgaWYgKHN1Y2Nlc3MgJiYgcmVxdWVzdC5vblN1Y2Nlc3MpIHJlcXVlc3Qub25TdWNjZXNzKHJlc3VsdCk7XG4gIHJldHVybiAhcmVxdWVzdC5tYW51YWxseUFja25vd2xlZGdlO1xufTtcblxuLyoqXG4gKiBmdW5jdGlvbnMgdG8gY2FsbCB3aGVuIHJlY2VpdmUgcHJvcHMgZnJvbSBvblN1Ym1pdEhPQ1xuICogQHBhcmFtIHN0b3JlIHRoaXMgaXMgeW91ciBgbmV4dFByb3BzYFxuICogQHBhcmFtIGFjdGlvbnMgY2FuIGJlIGVpdGhlciBvZiAyIGZvbGxvd2luZyBzdHJ1Y3R1cmU6XG4gKiAgLSBPcHRpb24gMTogeyBwcm9wTmFtZTogeyBvblN1Y2Nlc3M6IDxmdW5jdGlvbihyZXN1bHQpPiwgb25FcnJvcjogPGZ1bmN0aW9uKGVycm9yKT4gfSB9XG4gKiAgLSBPcHRpb24gMjogeyBwcm9wTmFtZTogPGZ1bmN0aW9uKHJlcXVlc3ROZXh0UHJvcHMpPiB9IGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGVpdGhlciBzdWNjZXNzIG9yIGVycm9yXG4gKiBAcGFyYW0gYWNrbm93bGVkZ2Ugc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgaW5qZWN0ZWQgYnkgb25TdWJtaXRIT0NcbiAqICAgaWYgeW91IHdhbnQgdG8gbWFudWFsbHkgYWNrbm93bGVkZ2UsIGRvIE5PVCBwYXNzIGluIHRoaXMgcGFyYW1ldGVyXG4gKi9cbmNvbnN0IGFuYWx5c2VOZXh0UHJvcHMgPSAoeyBbU1RPUkVdOiBzdG9yZSB9LCBhY3Rpb25zLCBhY2tub3dsZWRnZSkgPT4ge1xuICBpZiAoc3RvcmUpIHtcbiAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5mb3JFYWNoKChyZXF1ZXN0TmFtZSkgPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGFjdGlvbnNbcmVxdWVzdE5hbWVdO1xuICAgICAgY29uc3QgcmVxdWVzdE5leHRQcm9wcyA9IHN0b3JlLmdldChyZXF1ZXN0TmFtZSk7XG4gICAgICBpZiAocmVxdWVzdE5leHRQcm9wcykge1xuICAgICAgICBjb25zdCBzaG91bGRBY2sgPSBhbmFseXNlUmVxdWVzdChyZXF1ZXN0LCByZXF1ZXN0TmV4dFByb3BzKTtcbiAgICAgICAgaWYgKHNob3VsZEFjayAmJiB0eXBlb2YgYWNrbm93bGVkZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBhY2tub3dsZWRnZShyZXF1ZXN0TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBhbmFseXNlTmV4dFByb3BzLFxuICBhbmFseXNlUmVxdWVzdCxcbn07XG4iXX0=