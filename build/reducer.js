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
      return state.set(action.formName, (_state$set2 = {}, _defineProperty(_state$set2, _constants.SERVER_ERROR, action.error), _defineProperty(_state$set2, _constants.PAYLOAD, action.payload), _defineProperty(_state$set2, _constants.SUBMIT_SUCCESS, false), _defineProperty(_state$set2, _constants.IS_LOADING, false), _state$set2));
    case _constants.SUBMIT_SUCCEED:
      return state.set(action.formName, (_state$set3 = {}, _defineProperty(_state$set3, _constants.SERVER_ERROR, ''), _defineProperty(_state$set3, _constants.SUBMIT_SUCCESS, true), _defineProperty(_state$set3, _constants.RESULT, action.result), _defineProperty(_state$set3, _constants.PAYLOAD, action.payload), _defineProperty(_state$set3, _constants.IS_LOADING, false), _state$set3));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInRyaW1tZWRUeXBlIiwidHJpbSIsInR5cGUiLCJzZXQiLCJmb3JtTmFtZSIsImVycm9yIiwicGF5bG9hZCIsInJlc3VsdCIsImRlbGV0ZSIsIm1lcmdlIiwiZ2V0IiwiY29uY2F0Iiwia2V5IiwidmFsdWUiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFlQTs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLGVBQWUsaUVBQ04sRUFETSxFQUFyQjs7QUFJQTs7Ozs7OztBQU9BLFNBQVNDLE9BQVQsR0FBK0M7QUFBQTs7QUFBQSxNQUE5QkMsS0FBOEIsdUVBQXRCRixZQUFzQjtBQUFBLE1BQVJHLE1BQVE7O0FBQzdDLE1BQU1DLGNBQWMseUJBQU1DLElBQU4sQ0FBV0YsT0FBT0csSUFBbEIsQ0FBcEI7O0FBRUEsVUFBUUYsV0FBUjtBQUNFO0FBQ0UsYUFBT0YsTUFBTUssR0FBTixDQUFVSixPQUFPSyxRQUFqQix5RUFDVyxFQURYLDBEQUVhLEtBRmIsa0RBR0ssS0FITCxzREFJUyxJQUpULGVBQVA7QUFNRjtBQUNFLGFBQU9OLE1BQU1LLEdBQU4sQ0FBVUosT0FBT0ssUUFBakIsMkVBQ1dMLE9BQU9NLEtBRGxCLG9EQUVNTixPQUFPTyxPQUZiLDJEQUdhLEtBSGIsdURBSVMsS0FKVCxnQkFBUDtBQU1GO0FBQ0UsYUFBT1IsTUFBTUssR0FBTixDQUFVSixPQUFPSyxRQUFqQiwyRUFDVyxFQURYLDJEQUVhLElBRmIsbURBR0tMLE9BQU9RLE1BSFosb0RBSU1SLE9BQU9PLE9BSmIsdURBS1MsS0FMVCxnQkFBUDtBQU9GO0FBQ0UsYUFBT1IsTUFBTVUsTUFBTixDQUFhVCxPQUFPSyxRQUFwQixDQUFQO0FBQ0Y7QUFDRSxhQUFPUixZQUFQO0FBQ0Y7QUFDRSxhQUFPRSxNQUFNVyxLQUFOLDJDQUNRWCxNQUFNWSxHQUFOLHVCQUFxQkMsTUFBckIscUJBQStCWixPQUFPYSxHQUF0QyxFQUE0Q2IsT0FBT2MsS0FBbkQsRUFEUixFQUFQO0FBR0Y7QUFDRSxhQUFPZixNQUFNVyxLQUFOLDJDQUNRWCxNQUFNWSxHQUFOLHVCQUFxQkMsTUFBckIscUJBQ1ZaLE9BQU9hLEdBREcsRUFDR2IsT0FBT2UsSUFBUCxDQUFZaEIsTUFBTVksR0FBTix1QkFBcUJBLEdBQXJCLENBQXlCWCxPQUFPYSxHQUFoQyxDQUFaLENBREgsRUFEUixFQUFQO0FBS0Y7QUFDRSxhQUFPZCxLQUFQO0FBdENKO0FBd0NEOztrQkFFY0QsTyIsImZpbGUiOiJyZWR1Y2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7XG4gIERPX1NVQk1JVCxcbiAgSE9DX0NMRUFSLFxuICBSRVNVTFQsXG4gIFNFUlZFUl9FUlJPUixcbiAgU1VCTUlUX0FDS0VELFxuICBTVUJNSVRfRkFJTEVELFxuICBTVUJNSVRfU1VDQ0VFRCxcbiAgU1VCTUlUX1NVQ0NFU1MsXG4gIFJFRFVYX1NFVCxcbiAgUkVEVVhfU0VUX0ZOLFxuICBWQVJJQUJMRVMsXG4gIElTX0xPQURJTkcsXG4gIFBBWUxPQUQsXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzL3JlZHVjZXItaGVscGVycyc7XG5cbi8vIFRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBBcHBcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IGZyb21KUyh7XG4gIFtWQVJJQUJMRVNdOiB7fSxcbn0pO1xuXG4vKipcbiAqIHdlIHN0b3JlIGRpZmZlcmVudCBmb3JtcyBpbiBhIHBhZ2Ugc2VwYXJhdGVseSwgZGlzdGluZ3Vpc2ggYnkgdGhlaXIgYGZvcm1OYW1lYFxuICogYW5kIGVhY2ggZm9ybSB3aWxsIGhhdmUgdGhlaXIgb3duIGVycm9yIGFuZCBzdWNjZXNzIHN0YXR1c1xuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiByZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3QgdHJpbW1lZFR5cGUgPSB1dGlscy50cmltKGFjdGlvbi50eXBlKTtcblxuICBzd2l0Y2ggKHRyaW1tZWRUeXBlKSB7XG4gICAgY2FzZSBET19TVUJNSVQ6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KGFjdGlvbi5mb3JtTmFtZSwge1xuICAgICAgICBbU0VSVkVSX0VSUk9SXTogJycsXG4gICAgICAgIFtTVUJNSVRfU1VDQ0VTU106IGZhbHNlLFxuICAgICAgICBbUkVTVUxUXTogZmFsc2UsXG4gICAgICAgIFtJU19MT0FESU5HXTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIGNhc2UgU1VCTUlUX0ZBSUxFRDpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoYWN0aW9uLmZvcm1OYW1lLCB7XG4gICAgICAgIFtTRVJWRVJfRVJST1JdOiBhY3Rpb24uZXJyb3IsXG4gICAgICAgIFtQQVlMT0FEXTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIFtTVUJNSVRfU1VDQ0VTU106IGZhbHNlLFxuICAgICAgICBbSVNfTE9BRElOR106IGZhbHNlLFxuICAgICAgfSk7XG4gICAgY2FzZSBTVUJNSVRfU1VDQ0VFRDpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoYWN0aW9uLmZvcm1OYW1lLCB7XG4gICAgICAgIFtTRVJWRVJfRVJST1JdOiAnJyxcbiAgICAgICAgW1NVQk1JVF9TVUNDRVNTXTogdHJ1ZSxcbiAgICAgICAgW1JFU1VMVF06IGFjdGlvbi5yZXN1bHQsXG4gICAgICAgIFtQQVlMT0FEXTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIFtJU19MT0FESU5HXTogZmFsc2UsXG4gICAgICB9KTtcbiAgICBjYXNlIFNVQk1JVF9BQ0tFRDpcbiAgICAgIHJldHVybiBzdGF0ZS5kZWxldGUoYWN0aW9uLmZvcm1OYW1lKTtcbiAgICBjYXNlIEhPQ19DTEVBUjpcbiAgICAgIHJldHVybiBpbml0aWFsU3RhdGU7XG4gICAgY2FzZSBSRURVWF9TRVQ6XG4gICAgICByZXR1cm4gc3RhdGUubWVyZ2Uoe1xuICAgICAgICBbVkFSSUFCTEVTXTogc3RhdGUuZ2V0KFZBUklBQkxFUykuY29uY2F0KHsgW2FjdGlvbi5rZXldOiBhY3Rpb24udmFsdWUgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIFJFRFVYX1NFVF9GTjpcbiAgICAgIHJldHVybiBzdGF0ZS5tZXJnZSh7XG4gICAgICAgIFtWQVJJQUJMRVNdOiBzdGF0ZS5nZXQoVkFSSUFCTEVTKS5jb25jYXQoe1xuICAgICAgICAgIFthY3Rpb24ua2V5XTogYWN0aW9uLmZ1bmMoc3RhdGUuZ2V0KFZBUklBQkxFUykuZ2V0KGFjdGlvbi5rZXkpKSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlZHVjZXI7XG4iXX0=