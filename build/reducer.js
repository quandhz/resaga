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
  var _state$set, _state$set3, _state$set4;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var trimmedType = _reducerHelpers2.default.trim(action.type);

  switch (trimmedType) {
    case _constants.BEFORE_DISPATCH:
      return state.set(action.formName, (_state$set = {}, _defineProperty(_state$set, _constants.PAYLOAD, action.payload || true), _defineProperty(_state$set, _constants.WILL_LOAD, true), _defineProperty(_state$set, 'formName', action.formName), _defineProperty(_state$set, 'page', action.page), _state$set));
    case _constants.DO_SUBMIT:
      return state.set(action.formName, _defineProperty({}, _constants.IS_LOADING, true));
    case _constants.SUBMIT_FAILED:
      return state.set(action.formName, (_state$set3 = {}, _defineProperty(_state$set3, _constants.SERVER_ERROR, action.error), _defineProperty(_state$set3, _constants.PAYLOAD, action.payload), _state$set3));
    case _constants.SUBMIT_SUCCEED:
      return state.set(action.formName, (_state$set4 = {}, _defineProperty(_state$set4, _constants.SUBMIT_SUCCESS, true), _defineProperty(_state$set4, _constants.RESULT, action.result), _defineProperty(_state$set4, _constants.PAYLOAD, action.payload), _state$set4));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInRyaW1tZWRUeXBlIiwidHJpbSIsInR5cGUiLCJzZXQiLCJmb3JtTmFtZSIsInBheWxvYWQiLCJwYWdlIiwiZXJyb3IiLCJyZXN1bHQiLCJkZWxldGUiLCJtZXJnZSIsImdldCIsImNvbmNhdCIsImtleSIsInZhbHVlIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBaUJBOzs7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsZUFBZSxpRUFDTixFQURNLEVBQXJCOztBQUlBOzs7Ozs7O0FBT0EsU0FBU0MsT0FBVCxHQUErQztBQUFBOztBQUFBLE1BQTlCQyxLQUE4Qix1RUFBdEJGLFlBQXNCO0FBQUEsTUFBUkcsTUFBUTs7QUFDN0MsTUFBTUMsY0FBYyx5QkFBTUMsSUFBTixDQUFXRixPQUFPRyxJQUFsQixDQUFwQjs7QUFFQSxVQUFRRixXQUFSO0FBQ0U7QUFDRSxhQUFPRixNQUFNSyxHQUFOLENBQVVKLE9BQU9LLFFBQWpCLG9FQUNNTCxPQUFPTSxPQUFQLElBQWtCLElBRHhCLHFEQUVRLElBRlIsMkNBR0tOLE9BQU9LLFFBSFosdUNBSUNMLE9BQU9PLElBSlIsZUFBUDtBQU1GO0FBQ0UsYUFBT1IsTUFBTUssR0FBTixDQUFVSixPQUFPSyxRQUFqQiw2Q0FDUyxJQURULEVBQVA7QUFHRjtBQUNFLGFBQU9OLE1BQU1LLEdBQU4sQ0FBVUosT0FBT0ssUUFBakIsMkVBQ1dMLE9BQU9RLEtBRGxCLG9EQUVNUixPQUFPTSxPQUZiLGdCQUFQO0FBSUY7QUFDRSxhQUFPUCxNQUFNSyxHQUFOLENBQVVKLE9BQU9LLFFBQWpCLDZFQUNhLElBRGIsbURBRUtMLE9BQU9TLE1BRlosb0RBR01ULE9BQU9NLE9BSGIsZ0JBQVA7QUFLRjtBQUNFLGFBQU9QLE1BQU1XLE1BQU4sQ0FBYVYsT0FBT0ssUUFBcEIsQ0FBUDtBQUNGO0FBQ0UsYUFBT1IsWUFBUDtBQUNGO0FBQ0UsYUFBT0UsTUFBTVksS0FBTiwyQ0FDUVosTUFBTWEsR0FBTix1QkFBcUJDLE1BQXJCLHFCQUErQmIsT0FBT2MsR0FBdEMsRUFBNENkLE9BQU9lLEtBQW5ELEVBRFIsRUFBUDtBQUdGO0FBQ0UsYUFBT2hCLE1BQU1ZLEtBQU4sMkNBQ1FaLE1BQU1hLEdBQU4sdUJBQXFCQyxNQUFyQixxQkFDVmIsT0FBT2MsR0FERyxFQUNHZCxPQUFPZ0IsSUFBUCxDQUFZakIsTUFBTWEsR0FBTix1QkFBcUJBLEdBQXJCLENBQXlCWixPQUFPYyxHQUFoQyxDQUFaLENBREgsRUFEUixFQUFQO0FBS0Y7QUFDRSxhQUFPZixLQUFQO0FBdENKO0FBd0NEOztrQkFFY0QsTyIsImZpbGUiOiJyZWR1Y2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7XG4gIEJFRk9SRV9ESVNQQVRDSCxcbiAgRE9fU1VCTUlULFxuICBIT0NfQ0xFQVIsXG4gIFJFU1VMVCxcbiAgU0VSVkVSX0VSUk9SLFxuICBTVUJNSVRfQUNLRUQsXG4gIFNVQk1JVF9GQUlMRUQsXG4gIFNVQk1JVF9TVUNDRUVELFxuICBTVUJNSVRfU1VDQ0VTUyxcbiAgUkVEVVhfU0VULFxuICBSRURVWF9TRVRfRk4sXG4gIFZBUklBQkxFUyxcbiAgSVNfTE9BRElORyxcbiAgV0lMTF9MT0FELFxuICBQQVlMT0FELFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy9yZWR1Y2VyLWhlbHBlcnMnO1xuXG4vLyBUaGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgQXBwXG5jb25zdCBpbml0aWFsU3RhdGUgPSBmcm9tSlMoe1xuICBbVkFSSUFCTEVTXToge30sXG59KTtcblxuLyoqXG4gKiB3ZSBzdG9yZSBkaWZmZXJlbnQgZm9ybXMgaW4gYSBwYWdlIHNlcGFyYXRlbHksIGRpc3Rpbmd1aXNoIGJ5IHRoZWlyIGBmb3JtTmFtZWBcbiAqIGFuZCBlYWNoIGZvcm0gd2lsbCBoYXZlIHRoZWlyIG93biBlcnJvciBhbmQgc3VjY2VzcyBzdGF0dXNcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHBhcmFtIGFjdGlvblxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gcmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHRyaW1tZWRUeXBlID0gdXRpbHMudHJpbShhY3Rpb24udHlwZSk7XG5cbiAgc3dpdGNoICh0cmltbWVkVHlwZSkge1xuICAgIGNhc2UgQkVGT1JFX0RJU1BBVENIOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldChhY3Rpb24uZm9ybU5hbWUsIHtcbiAgICAgICAgW1BBWUxPQURdOiBhY3Rpb24ucGF5bG9hZCB8fCB0cnVlLFxuICAgICAgICBbV0lMTF9MT0FEXTogdHJ1ZSxcbiAgICAgICAgZm9ybU5hbWU6IGFjdGlvbi5mb3JtTmFtZSxcbiAgICAgICAgcGFnZTogYWN0aW9uLnBhZ2UsXG4gICAgICB9KTtcbiAgICBjYXNlIERPX1NVQk1JVDpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoYWN0aW9uLmZvcm1OYW1lLCB7XG4gICAgICAgIFtJU19MT0FESU5HXTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIGNhc2UgU1VCTUlUX0ZBSUxFRDpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoYWN0aW9uLmZvcm1OYW1lLCB7XG4gICAgICAgIFtTRVJWRVJfRVJST1JdOiBhY3Rpb24uZXJyb3IsXG4gICAgICAgIFtQQVlMT0FEXTogYWN0aW9uLnBheWxvYWQsXG4gICAgICB9KTtcbiAgICBjYXNlIFNVQk1JVF9TVUNDRUVEOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldChhY3Rpb24uZm9ybU5hbWUsIHtcbiAgICAgICAgW1NVQk1JVF9TVUNDRVNTXTogdHJ1ZSxcbiAgICAgICAgW1JFU1VMVF06IGFjdGlvbi5yZXN1bHQsXG4gICAgICAgIFtQQVlMT0FEXTogYWN0aW9uLnBheWxvYWQsXG4gICAgICB9KTtcbiAgICBjYXNlIFNVQk1JVF9BQ0tFRDpcbiAgICAgIHJldHVybiBzdGF0ZS5kZWxldGUoYWN0aW9uLmZvcm1OYW1lKTtcbiAgICBjYXNlIEhPQ19DTEVBUjpcbiAgICAgIHJldHVybiBpbml0aWFsU3RhdGU7XG4gICAgY2FzZSBSRURVWF9TRVQ6XG4gICAgICByZXR1cm4gc3RhdGUubWVyZ2Uoe1xuICAgICAgICBbVkFSSUFCTEVTXTogc3RhdGUuZ2V0KFZBUklBQkxFUykuY29uY2F0KHsgW2FjdGlvbi5rZXldOiBhY3Rpb24udmFsdWUgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIFJFRFVYX1NFVF9GTjpcbiAgICAgIHJldHVybiBzdGF0ZS5tZXJnZSh7XG4gICAgICAgIFtWQVJJQUJMRVNdOiBzdGF0ZS5nZXQoVkFSSUFCTEVTKS5jb25jYXQoe1xuICAgICAgICAgIFthY3Rpb24ua2V5XTogYWN0aW9uLmZ1bmMoc3RhdGUuZ2V0KFZBUklBQkxFUykuZ2V0KGFjdGlvbi5rZXkpKSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlZHVjZXI7XG4iXX0=