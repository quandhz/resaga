'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _index = require('../index');

/**
 * @param request can be one of the 2 types below
 * - Type 1: { request: { onSuccess: <function(result)>, onError: <function(error)>, manuallyAcknowledge: <bool> } }
 * - Type 2: { request: <function> }
 * @param props
 * @param formName
 * @param dispatch
 * @returns {boolean}
 */
var analyseRequest = function analyseRequest(request, props, formName, dispatch) {
  var error = props[_constants.SERVER_ERROR],
      success = props[_constants.SUBMIT_SUCCESS],
      result = props[_constants.RESULT],
      payload = props[_constants.PAYLOAD],
      willLoad = props[_constants.WILL_LOAD],
      page = props.page;

  if (typeof request === 'function') {
    request(props); // pass through props
    return false;
  }
  // if request is beforeDispatch
  if (willLoad) {
    if (request.before) request.before(payload);
    var configs = (0, _index.getConfig)(page);
    // willLoad called, should dispatch
    dispatch(payload, configs, formName, page);
    return false;
  }
  // if request is error
  if (error && request.onError) request.onError(error, payload);
  // if request is success
  if (success && request.onSuccess) request.onSuccess(result, payload);
  return !request.manuallyAcknowledge;
};

/**
 * functions to call when receive props from onSubmitHOC
 * @param store this is your `nextProps`
 * @param requests can be either of 2 following structure:
 *  - Option 1: { propName: { onSuccess: <function(result)>, onError: <function(error)> } }
 *  - Option 2: { propName: <function(requestNextProps)> } function will be called either success or error
 * @param acknowledge should be automatically injected by onSubmitHOC
 *   if you want to manually acknowledge, do NOT pass in this parameter
 * @param dispatch should be automatically injected by onSubmitHOC
 */
var analyseNextProps = function analyseNextProps(_ref, requests, _ref2) {
  var store = _ref[_constants.STORE];
  var acknowledge = _ref2.acknowledge,
      dispatch = _ref2.dispatch;

  if (store) {
    Object.keys(requests).forEach(function (formName) {
      var props = store.get(formName);
      if (!props || props[_constants.IS_LOADING]) return false;

      var ack = analyseRequest(requests[formName], props, formName, dispatch);

      // dispatch called, should acknowledge
      if (ack && typeof acknowledge === 'function') acknowledge(formName);
      return true;
    });
  }
};

exports.default = {
  analyseNextProps: analyseNextProps,
  analyseRequest: analyseRequest
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9jb21wb25lbnQtaGVscGVycy5qcyJdLCJuYW1lcyI6WyJhbmFseXNlUmVxdWVzdCIsInJlcXVlc3QiLCJwcm9wcyIsImZvcm1OYW1lIiwiZGlzcGF0Y2giLCJlcnJvciIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJwYXlsb2FkIiwid2lsbExvYWQiLCJwYWdlIiwiYmVmb3JlIiwiY29uZmlncyIsIm9uRXJyb3IiLCJvblN1Y2Nlc3MiLCJtYW51YWxseUFja25vd2xlZGdlIiwiYW5hbHlzZU5leHRQcm9wcyIsInJlcXVlc3RzIiwic3RvcmUiLCJhY2tub3dsZWRnZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZ2V0IiwiYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FBU0EsSUFBTUEsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBaUJDLFFBQWpCLEVBQTJCQyxRQUEzQixFQUF3QztBQUFBLE1BQ3JDQyxLQURxQyxHQUNtRUgsS0FEbkU7QUFBQSxNQUNaSSxPQURZLEdBQ21FSixLQURuRTtBQUFBLE1BQ09LLE1BRFAsR0FDbUVMLEtBRG5FO0FBQUEsTUFDMEJNLE9BRDFCLEdBQ21FTixLQURuRTtBQUFBLE1BQ2dETyxRQURoRCxHQUNtRVAsS0FEbkU7QUFBQSxNQUMwRFEsSUFEMUQsR0FDbUVSLEtBRG5FLENBQzBEUSxJQUQxRDs7QUFFN0QsTUFBSSxPQUFPVCxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDQSxZQUFRQyxLQUFSLEVBRGlDLENBQ2pCO0FBQ2hCLFdBQU8sS0FBUDtBQUNEO0FBQ0Q7QUFDQSxNQUFJTyxRQUFKLEVBQWM7QUFDWixRQUFJUixRQUFRVSxNQUFaLEVBQW9CVixRQUFRVSxNQUFSLENBQWVILE9BQWY7QUFDcEIsUUFBTUksVUFBVSxzQkFBVUYsSUFBVixDQUFoQjtBQUNBO0FBQ0FOLGFBQVNJLE9BQVQsRUFBa0JJLE9BQWxCLEVBQTJCVCxRQUEzQixFQUFxQ08sSUFBckM7QUFDQSxXQUFPLEtBQVA7QUFDRDtBQUNEO0FBQ0EsTUFBSUwsU0FBU0osUUFBUVksT0FBckIsRUFBOEJaLFFBQVFZLE9BQVIsQ0FBZ0JSLEtBQWhCLEVBQXVCRyxPQUF2QjtBQUM5QjtBQUNBLE1BQUlGLFdBQVdMLFFBQVFhLFNBQXZCLEVBQWtDYixRQUFRYSxTQUFSLENBQWtCUCxNQUFsQixFQUEwQkMsT0FBMUI7QUFDbEMsU0FBTyxDQUFDUCxRQUFRYyxtQkFBaEI7QUFDRCxDQW5CRDs7QUFxQkE7Ozs7Ozs7Ozs7QUFVQSxJQUFNQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixPQUFxQkMsUUFBckIsU0FBNkQ7QUFBQSxNQUFqREMsS0FBaUQ7QUFBQSxNQUE1QkMsV0FBNEIsU0FBNUJBLFdBQTRCO0FBQUEsTUFBZmYsUUFBZSxTQUFmQSxRQUFlOztBQUNwRixNQUFJYyxLQUFKLEVBQVc7QUFDVEUsV0FBT0MsSUFBUCxDQUFZSixRQUFaLEVBQXNCSyxPQUF0QixDQUE4QixVQUFDbkIsUUFBRCxFQUFjO0FBQzFDLFVBQU1ELFFBQVFnQixNQUFNSyxHQUFOLENBQVVwQixRQUFWLENBQWQ7QUFDQSxVQUFJLENBQUNELEtBQUQsSUFBVUEsNEJBQWQsRUFBaUMsT0FBTyxLQUFQOztBQUVqQyxVQUFNc0IsTUFBTXhCLGVBQWVpQixTQUFTZCxRQUFULENBQWYsRUFBbUNELEtBQW5DLEVBQTBDQyxRQUExQyxFQUFvREMsUUFBcEQsQ0FBWjs7QUFFQTtBQUNBLFVBQUlvQixPQUFPLE9BQU9MLFdBQVAsS0FBdUIsVUFBbEMsRUFBOENBLFlBQVloQixRQUFaO0FBQzlDLGFBQU8sSUFBUDtBQUNELEtBVEQ7QUFVRDtBQUNGLENBYkQ7O2tCQWVlO0FBQ2JhLG9DQURhO0FBRWJoQjtBQUZhLEMiLCJmaWxlIjoiY29tcG9uZW50LWhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSRVNVTFQsIFNFUlZFUl9FUlJPUiwgU1RPUkUsIFNVQk1JVF9TVUNDRVNTLCBJU19MT0FESU5HLCBXSUxMX0xPQUQsIFBBWUxPQUQgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0Q29uZmlnIH0gZnJvbSAnLi4vaW5kZXgnO1xuXG4vKipcbiAqIEBwYXJhbSByZXF1ZXN0IGNhbiBiZSBvbmUgb2YgdGhlIDIgdHlwZXMgYmVsb3dcbiAqIC0gVHlwZSAxOiB7IHJlcXVlc3Q6IHsgb25TdWNjZXNzOiA8ZnVuY3Rpb24ocmVzdWx0KT4sIG9uRXJyb3I6IDxmdW5jdGlvbihlcnJvcik+LCBtYW51YWxseUFja25vd2xlZGdlOiA8Ym9vbD4gfSB9XG4gKiAtIFR5cGUgMjogeyByZXF1ZXN0OiA8ZnVuY3Rpb24+IH1cbiAqIEBwYXJhbSBwcm9wc1xuICogQHBhcmFtIGZvcm1OYW1lXG4gKiBAcGFyYW0gZGlzcGF0Y2hcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBhbmFseXNlUmVxdWVzdCA9IChyZXF1ZXN0LCBwcm9wcywgZm9ybU5hbWUsIGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IHsgW1NFUlZFUl9FUlJPUl06IGVycm9yLCBbU1VCTUlUX1NVQ0NFU1NdOiBzdWNjZXNzLCBbUkVTVUxUXTogcmVzdWx0LCBbUEFZTE9BRF06IHBheWxvYWQsIFtXSUxMX0xPQURdOiB3aWxsTG9hZCwgcGFnZSB9ID0gcHJvcHM7XG4gIGlmICh0eXBlb2YgcmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlcXVlc3QocHJvcHMpOyAvLyBwYXNzIHRocm91Z2ggcHJvcHNcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gaWYgcmVxdWVzdCBpcyBiZWZvcmVEaXNwYXRjaFxuICBpZiAod2lsbExvYWQpIHtcbiAgICBpZiAocmVxdWVzdC5iZWZvcmUpIHJlcXVlc3QuYmVmb3JlKHBheWxvYWQpO1xuICAgIGNvbnN0IGNvbmZpZ3MgPSBnZXRDb25maWcocGFnZSk7XG4gICAgLy8gd2lsbExvYWQgY2FsbGVkLCBzaG91bGQgZGlzcGF0Y2hcbiAgICBkaXNwYXRjaChwYXlsb2FkLCBjb25maWdzLCBmb3JtTmFtZSwgcGFnZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIGlmIHJlcXVlc3QgaXMgZXJyb3JcbiAgaWYgKGVycm9yICYmIHJlcXVlc3Qub25FcnJvcikgcmVxdWVzdC5vbkVycm9yKGVycm9yLCBwYXlsb2FkKTtcbiAgLy8gaWYgcmVxdWVzdCBpcyBzdWNjZXNzXG4gIGlmIChzdWNjZXNzICYmIHJlcXVlc3Qub25TdWNjZXNzKSByZXF1ZXN0Lm9uU3VjY2VzcyhyZXN1bHQsIHBheWxvYWQpO1xuICByZXR1cm4gIXJlcXVlc3QubWFudWFsbHlBY2tub3dsZWRnZTtcbn07XG5cbi8qKlxuICogZnVuY3Rpb25zIHRvIGNhbGwgd2hlbiByZWNlaXZlIHByb3BzIGZyb20gb25TdWJtaXRIT0NcbiAqIEBwYXJhbSBzdG9yZSB0aGlzIGlzIHlvdXIgYG5leHRQcm9wc2BcbiAqIEBwYXJhbSByZXF1ZXN0cyBjYW4gYmUgZWl0aGVyIG9mIDIgZm9sbG93aW5nIHN0cnVjdHVyZTpcbiAqICAtIE9wdGlvbiAxOiB7IHByb3BOYW1lOiB7IG9uU3VjY2VzczogPGZ1bmN0aW9uKHJlc3VsdCk+LCBvbkVycm9yOiA8ZnVuY3Rpb24oZXJyb3IpPiB9IH1cbiAqICAtIE9wdGlvbiAyOiB7IHByb3BOYW1lOiA8ZnVuY3Rpb24ocmVxdWVzdE5leHRQcm9wcyk+IH0gZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgZWl0aGVyIHN1Y2Nlc3Mgb3IgZXJyb3JcbiAqIEBwYXJhbSBhY2tub3dsZWRnZSBzaG91bGQgYmUgYXV0b21hdGljYWxseSBpbmplY3RlZCBieSBvblN1Ym1pdEhPQ1xuICogICBpZiB5b3Ugd2FudCB0byBtYW51YWxseSBhY2tub3dsZWRnZSwgZG8gTk9UIHBhc3MgaW4gdGhpcyBwYXJhbWV0ZXJcbiAqIEBwYXJhbSBkaXNwYXRjaCBzaG91bGQgYmUgYXV0b21hdGljYWxseSBpbmplY3RlZCBieSBvblN1Ym1pdEhPQ1xuICovXG5jb25zdCBhbmFseXNlTmV4dFByb3BzID0gKHsgW1NUT1JFXTogc3RvcmUgfSwgcmVxdWVzdHMsIHsgYWNrbm93bGVkZ2UsIGRpc3BhdGNoIH0pID0+IHtcbiAgaWYgKHN0b3JlKSB7XG4gICAgT2JqZWN0LmtleXMocmVxdWVzdHMpLmZvckVhY2goKGZvcm1OYW1lKSA9PiB7XG4gICAgICBjb25zdCBwcm9wcyA9IHN0b3JlLmdldChmb3JtTmFtZSk7XG4gICAgICBpZiAoIXByb3BzIHx8IHByb3BzW0lTX0xPQURJTkddKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGNvbnN0IGFjayA9IGFuYWx5c2VSZXF1ZXN0KHJlcXVlc3RzW2Zvcm1OYW1lXSwgcHJvcHMsIGZvcm1OYW1lLCBkaXNwYXRjaCk7XG5cbiAgICAgIC8vIGRpc3BhdGNoIGNhbGxlZCwgc2hvdWxkIGFja25vd2xlZGdlXG4gICAgICBpZiAoYWNrICYmIHR5cGVvZiBhY2tub3dsZWRnZSA9PT0gJ2Z1bmN0aW9uJykgYWNrbm93bGVkZ2UoZm9ybU5hbWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYW5hbHlzZU5leHRQcm9wcyxcbiAgYW5hbHlzZVJlcXVlc3QsXG59O1xuIl19