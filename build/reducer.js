'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('./constants');

var _reducerHelpers = require('./utils/reducer-helpers');

var _reducerHelpers2 = _interopRequireDefault(_reducerHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// The initial state of the App
var initialState = (0, _immutable.fromJS)(_defineProperty({}, _constants.VARIABLES, {}));

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
      return state.set(action.formName, (_state$set = {}, _defineProperty(_state$set, _constants.SERVER_ERROR, ''), _defineProperty(_state$set, _constants.SUBMIT_SUCCESS, false), _defineProperty(_state$set, _constants.RESULT, false), _defineProperty(_state$set, _constants.IS_LOADING, true), _state$set));
    case _constants.SUBMIT_FAILED:
      return state.set(action.formName, (_state$set2 = {}, _defineProperty(_state$set2, _constants.SERVER_ERROR, action.error), _defineProperty(_state$set2, _constants.SUBMIT_SUCCESS, false), _defineProperty(_state$set2, _constants.IS_LOADING, false), _state$set2));
    case _constants.SUBMIT_SUCCEED:
      return state.set(action.formName, (_state$set3 = {}, _defineProperty(_state$set3, _constants.SERVER_ERROR, ''), _defineProperty(_state$set3, _constants.SUBMIT_SUCCESS, true), _defineProperty(_state$set3, _constants.RESULT, action.result), _defineProperty(_state$set3, _constants.IS_LOADING, false), _state$set3));
    case _constants.SUBMIT_ACKED:
      return state.delete(action.formName);
    case _constants.HOC_CLEAR:
      return initialState;
    case _constants.REDUX_SET:
      return state.merge(_defineProperty({}, _constants.VARIABLES, state.get(_constants.VARIABLES).concat(_defineProperty({}, action.key, action.value))));
    case _constants.REDUX_SET_FN:
      return state.merge(_defineProperty({}, _constants.VARIABLES, state.get(_constants.VARIABLES).concat(_defineProperty({}, action.key, action.func(state.get(_constants.VARIABLES).get(action.key))))));
    default:
      return state;
  }
}

exports.default = reducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInRyaW1tZWRUeXBlIiwidHJpbSIsInR5cGUiLCJzZXQiLCJmb3JtTmFtZSIsImVycm9yIiwicmVzdWx0IiwiZGVsZXRlIiwibWVyZ2UiLCJnZXQiLCJjb25jYXQiLCJrZXkiLCJ2YWx1ZSIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQWNBOzs7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsZUFBZSxpRUFDTixFQURNLEVBQXJCOztBQUlBOzs7Ozs7O0FBT0EsU0FBU0MsT0FBVCxHQUErQztBQUFBOztBQUFBLE1BQTlCQyxLQUE4Qix1RUFBdEJGLFlBQXNCO0FBQUEsTUFBUkcsTUFBUTs7QUFDN0MsTUFBTUMsY0FBYyx5QkFBTUMsSUFBTixDQUFXRixPQUFPRyxJQUFsQixDQUFwQjs7QUFFQSxVQUFRRixXQUFSO0FBQ0U7QUFDRSxhQUFPRixNQUFNSyxHQUFOLENBQVVKLE9BQU9LLFFBQWpCLHlFQUNXLEVBRFgsMERBRWEsS0FGYixrREFHSyxLQUhMLHNEQUlTLElBSlQsZUFBUDtBQU1GO0FBQ0UsYUFBT04sTUFBTUssR0FBTixDQUFVSixPQUFPSyxRQUFqQiwyRUFDV0wsT0FBT00sS0FEbEIsMkRBRWEsS0FGYix1REFHUyxLQUhULGdCQUFQO0FBS0Y7QUFDRSxhQUFPUCxNQUFNSyxHQUFOLENBQVVKLE9BQU9LLFFBQWpCLDJFQUNXLEVBRFgsMkRBRWEsSUFGYixtREFHS0wsT0FBT08sTUFIWix1REFJUyxLQUpULGdCQUFQO0FBTUY7QUFDRSxhQUFPUixNQUFNUyxNQUFOLENBQWFSLE9BQU9LLFFBQXBCLENBQVA7QUFDRjtBQUNFLGFBQU9SLFlBQVA7QUFDRjtBQUNFLGFBQU9FLE1BQU1VLEtBQU4sMkNBQ1FWLE1BQU1XLEdBQU4sdUJBQXFCQyxNQUFyQixxQkFBK0JYLE9BQU9ZLEdBQXRDLEVBQTRDWixPQUFPYSxLQUFuRCxFQURSLEVBQVA7QUFHRjtBQUNFLGFBQU9kLE1BQU1VLEtBQU4sMkNBQ1FWLE1BQU1XLEdBQU4sdUJBQXFCQyxNQUFyQixxQkFDVlgsT0FBT1ksR0FERyxFQUNHWixPQUFPYyxJQUFQLENBQVlmLE1BQU1XLEdBQU4sdUJBQXFCQSxHQUFyQixDQUF5QlYsT0FBT1ksR0FBaEMsQ0FBWixDQURILEVBRFIsRUFBUDtBQUtGO0FBQ0UsYUFBT2IsS0FBUDtBQXBDSjtBQXNDRDs7a0JBRWNELE8iLCJmaWxlIjoicmVkdWNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQge1xuICBET19TVUJNSVQsXG4gIEhPQ19DTEVBUixcbiAgUkVTVUxULFxuICBTRVJWRVJfRVJST1IsXG4gIFNVQk1JVF9BQ0tFRCxcbiAgU1VCTUlUX0ZBSUxFRCxcbiAgU1VCTUlUX1NVQ0NFRUQsXG4gIFNVQk1JVF9TVUNDRVNTLFxuICBSRURVWF9TRVQsXG4gIFJFRFVYX1NFVF9GTixcbiAgVkFSSUFCTEVTLFxuICBJU19MT0FESU5HLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy9yZWR1Y2VyLWhlbHBlcnMnO1xuXG4vLyBUaGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgQXBwXG5jb25zdCBpbml0aWFsU3RhdGUgPSBmcm9tSlMoe1xuICBbVkFSSUFCTEVTXToge30sXG59KTtcblxuLyoqXG4gKiB3ZSBzdG9yZSBkaWZmZXJlbnQgZm9ybXMgaW4gYSBwYWdlIHNlcGFyYXRlbHksIGRpc3Rpbmd1aXNoIGJ5IHRoZWlyIGBmb3JtTmFtZWBcbiAqIGFuZCBlYWNoIGZvcm0gd2lsbCBoYXZlIHRoZWlyIG93biBlcnJvciBhbmQgc3VjY2VzcyBzdGF0dXNcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHBhcmFtIGFjdGlvblxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gcmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHRyaW1tZWRUeXBlID0gdXRpbHMudHJpbShhY3Rpb24udHlwZSk7XG5cbiAgc3dpdGNoICh0cmltbWVkVHlwZSkge1xuICAgIGNhc2UgRE9fU1VCTUlUOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldChhY3Rpb24uZm9ybU5hbWUsIHtcbiAgICAgICAgW1NFUlZFUl9FUlJPUl06ICcnLFxuICAgICAgICBbU1VCTUlUX1NVQ0NFU1NdOiBmYWxzZSxcbiAgICAgICAgW1JFU1VMVF06IGZhbHNlLFxuICAgICAgICBbSVNfTE9BRElOR106IHRydWUsXG4gICAgICB9KTtcbiAgICBjYXNlIFNVQk1JVF9GQUlMRUQ6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KGFjdGlvbi5mb3JtTmFtZSwge1xuICAgICAgICBbU0VSVkVSX0VSUk9SXTogYWN0aW9uLmVycm9yLFxuICAgICAgICBbU1VCTUlUX1NVQ0NFU1NdOiBmYWxzZSxcbiAgICAgICAgW0lTX0xPQURJTkddOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIGNhc2UgU1VCTUlUX1NVQ0NFRUQ6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KGFjdGlvbi5mb3JtTmFtZSwge1xuICAgICAgICBbU0VSVkVSX0VSUk9SXTogJycsXG4gICAgICAgIFtTVUJNSVRfU1VDQ0VTU106IHRydWUsXG4gICAgICAgIFtSRVNVTFRdOiBhY3Rpb24ucmVzdWx0LFxuICAgICAgICBbSVNfTE9BRElOR106IGZhbHNlLFxuICAgICAgfSk7XG4gICAgY2FzZSBTVUJNSVRfQUNLRUQ6XG4gICAgICByZXR1cm4gc3RhdGUuZGVsZXRlKGFjdGlvbi5mb3JtTmFtZSk7XG4gICAgY2FzZSBIT0NfQ0xFQVI6XG4gICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICAgIGNhc2UgUkVEVVhfU0VUOlxuICAgICAgcmV0dXJuIHN0YXRlLm1lcmdlKHtcbiAgICAgICAgW1ZBUklBQkxFU106IHN0YXRlLmdldChWQVJJQUJMRVMpLmNvbmNhdCh7IFthY3Rpb24ua2V5XTogYWN0aW9uLnZhbHVlIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBSRURVWF9TRVRfRk46XG4gICAgICByZXR1cm4gc3RhdGUubWVyZ2Uoe1xuICAgICAgICBbVkFSSUFCTEVTXTogc3RhdGUuZ2V0KFZBUklBQkxFUykuY29uY2F0KHtcbiAgICAgICAgICBbYWN0aW9uLmtleV06IGFjdGlvbi5mdW5jKHN0YXRlLmdldChWQVJJQUJMRVMpLmdldChhY3Rpb24ua2V5KSksXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZWR1Y2VyO1xuIl19