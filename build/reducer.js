'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _reducerHelpers = require('./utils/reducer-helpers');

var _reducerHelpers2 = _interopRequireDefault(_reducerHelpers);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// The initial state of the App
var initialState = (0, _immutable.fromJS)({});

/**
 * we store different forms in a page separately, distinguish by their `formName`
 * and each form will have their own error and success status
 * @param state
 * @param action
 * @returns {any}
 */
function reducer() {
  var _state$set, _state$set2, _state$set3;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var trimmedType = _reducerHelpers2.default.trim(action.type);

  switch (trimmedType) {
    case _constants.DO_SUBMIT:
      return state.set(action.formName, (_state$set = {}, _defineProperty(_state$set, _constants.SERVER_ERROR, ''), _defineProperty(_state$set, _constants.SUBMIT_SUCCESS, false), _state$set));
    case _constants.SUBMIT_FAILED:
      return state.set(action.formName, (_state$set2 = {}, _defineProperty(_state$set2, _constants.SERVER_ERROR, action.error), _defineProperty(_state$set2, _constants.SUBMIT_SUCCESS, false), _state$set2));
    case _constants.SUBMIT_SUCCEED:
      return state.set(action.formName, (_state$set3 = {}, _defineProperty(_state$set3, _constants.SERVER_ERROR, ''), _defineProperty(_state$set3, _constants.SUBMIT_SUCCESS, true), _defineProperty(_state$set3, _constants.RESULT, action.result), _state$set3));
    case _constants.SUBMIT_ACKED:
      return state.delete(action.formName);
    case _constants.HOC_CLEAR:
      return initialState;
    default:
      return state;
  }
}

exports.default = reducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInRyaW1tZWRUeXBlIiwidHJpbSIsInR5cGUiLCJzZXQiLCJmb3JtTmFtZSIsImVycm9yIiwicmVzdWx0IiwiZGVsZXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFXQTtBQUNBLElBQU1BLGVBQWUsdUJBQU8sRUFBUCxDQUFyQjs7QUFFQTs7Ozs7OztBQU9BLFNBQVNDLE9BQVQsR0FBK0M7QUFBQTs7QUFBQSxNQUE5QkMsS0FBOEIsdUVBQXRCRixZQUFzQjtBQUFBLE1BQVJHLE1BQVE7O0FBQzdDLE1BQU1DLGNBQWMseUJBQU1DLElBQU4sQ0FBV0YsT0FBT0csSUFBbEIsQ0FBcEI7O0FBRUEsVUFBUUYsV0FBUjtBQUNFO0FBQ0UsYUFBT0YsTUFBTUssR0FBTixDQUFVSixPQUFPSyxRQUFqQix5RUFDVyxFQURYLDBEQUVhLEtBRmIsZUFBUDtBQUlGO0FBQ0UsYUFBT04sTUFBTUssR0FBTixDQUFVSixPQUFPSyxRQUFqQiwyRUFDV0wsT0FBT00sS0FEbEIsMkRBRWEsS0FGYixnQkFBUDtBQUlGO0FBQ0UsYUFBT1AsTUFBTUssR0FBTixDQUFVSixPQUFPSyxRQUFqQiwyRUFDVyxFQURYLDJEQUVhLElBRmIsbURBR0tMLE9BQU9PLE1BSFosZ0JBQVA7QUFLRjtBQUNFLGFBQU9SLE1BQU1TLE1BQU4sQ0FBYVIsT0FBT0ssUUFBcEIsQ0FBUDtBQUNGO0FBQ0UsYUFBT1IsWUFBUDtBQUNGO0FBQ0UsYUFBT0UsS0FBUDtBQXRCSjtBQXdCRDs7a0JBRWNELE8iLCJmaWxlIjoicmVkdWNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy9yZWR1Y2VyLWhlbHBlcnMnO1xuaW1wb3J0IHtcbiAgRE9fU1VCTUlULFxuICBSRVNVTFQsXG4gIFNFUlZFUl9FUlJPUixcbiAgU1VCTUlUX0FDS0VELFxuICBIT0NfQ0xFQVIsXG4gIFNVQk1JVF9GQUlMRUQsXG4gIFNVQk1JVF9TVUNDRUVELFxuICBTVUJNSVRfU1VDQ0VTUyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vLyBUaGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgQXBwXG5jb25zdCBpbml0aWFsU3RhdGUgPSBmcm9tSlMoe30pO1xuXG4vKipcbiAqIHdlIHN0b3JlIGRpZmZlcmVudCBmb3JtcyBpbiBhIHBhZ2Ugc2VwYXJhdGVseSwgZGlzdGluZ3Vpc2ggYnkgdGhlaXIgYGZvcm1OYW1lYFxuICogYW5kIGVhY2ggZm9ybSB3aWxsIGhhdmUgdGhlaXIgb3duIGVycm9yIGFuZCBzdWNjZXNzIHN0YXR1c1xuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiByZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3QgdHJpbW1lZFR5cGUgPSB1dGlscy50cmltKGFjdGlvbi50eXBlKTtcblxuICBzd2l0Y2ggKHRyaW1tZWRUeXBlKSB7XG4gICAgY2FzZSBET19TVUJNSVQ6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KGFjdGlvbi5mb3JtTmFtZSwge1xuICAgICAgICBbU0VSVkVSX0VSUk9SXTogJycsXG4gICAgICAgIFtTVUJNSVRfU1VDQ0VTU106IGZhbHNlLFxuICAgICAgfSk7XG4gICAgY2FzZSBTVUJNSVRfRkFJTEVEOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldChhY3Rpb24uZm9ybU5hbWUsIHtcbiAgICAgICAgW1NFUlZFUl9FUlJPUl06IGFjdGlvbi5lcnJvcixcbiAgICAgICAgW1NVQk1JVF9TVUNDRVNTXTogZmFsc2UsXG4gICAgICB9KTtcbiAgICBjYXNlIFNVQk1JVF9TVUNDRUVEOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldChhY3Rpb24uZm9ybU5hbWUsIHtcbiAgICAgICAgW1NFUlZFUl9FUlJPUl06ICcnLFxuICAgICAgICBbU1VCTUlUX1NVQ0NFU1NdOiB0cnVlLFxuICAgICAgICBbUkVTVUxUXTogYWN0aW9uLnJlc3VsdCxcbiAgICAgIH0pO1xuICAgIGNhc2UgU1VCTUlUX0FDS0VEOlxuICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZShhY3Rpb24uZm9ybU5hbWUpO1xuICAgIGNhc2UgSE9DX0NMRUFSOlxuICAgICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlZHVjZXI7XG4iXX0=