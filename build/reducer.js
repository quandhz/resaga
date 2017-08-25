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
      console.log(_constants.BEFORE_DISPATCH);
      return state.set(action.formName, (_state$set = {}, _defineProperty(_state$set, _constants.PAYLOAD, action.payload || true), _defineProperty(_state$set, _constants.WILL_LOAD, true), _defineProperty(_state$set, 'formName', action.formName), _defineProperty(_state$set, 'page', action.page), _state$set));
    case _constants.DO_SUBMIT:
      console.log(_constants.DO_SUBMIT);
      return state.set(action.formName, _defineProperty({}, _constants.IS_LOADING, true));
    case _constants.SUBMIT_FAILED:
      console.log(_constants.SUBMIT_FAILED);
      return state.set(action.formName, (_state$set3 = {}, _defineProperty(_state$set3, _constants.SERVER_ERROR, action.error), _defineProperty(_state$set3, _constants.PAYLOAD, action.payload), _state$set3));
    case _constants.SUBMIT_SUCCEED:
      console.log(_constants.SUBMIT_SUCCEED);
      return state.set(action.formName, (_state$set4 = {}, _defineProperty(_state$set4, _constants.SUBMIT_SUCCESS, true), _defineProperty(_state$set4, _constants.RESULT, action.result), _defineProperty(_state$set4, _constants.PAYLOAD, action.payload), _state$set4));
    case _constants.SUBMIT_ACKED:
      console.log(_constants.SUBMIT_ACKED);
      return state.delete(action.formName);
    case _constants.HOC_CLEAR:
      return initialState;
    case _constants.REDUX_SET:
      console.log(_constants.REDUX_SET);
      return state.merge(_defineProperty({}, _constants.VARIABLES, state.get(_constants.VARIABLES).concat(_defineProperty({}, action.key, action.value))));
    case _constants.REDUX_SET_FN:
      return state.merge(_defineProperty({}, _constants.VARIABLES, state.get(_constants.VARIABLES).concat(_defineProperty({}, action.key, action.func(state.get(_constants.VARIABLES).get(action.key))))));
    default:
      return state;
  }
}

exports.default = reducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInRyaW1tZWRUeXBlIiwidHJpbSIsInR5cGUiLCJjb25zb2xlIiwibG9nIiwic2V0IiwiZm9ybU5hbWUiLCJwYXlsb2FkIiwicGFnZSIsImVycm9yIiwicmVzdWx0IiwiZGVsZXRlIiwibWVyZ2UiLCJnZXQiLCJjb25jYXQiLCJrZXkiLCJ2YWx1ZSIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQWlCQTs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLGVBQWUsaUVBQ04sRUFETSxFQUFyQjs7QUFJQTs7Ozs7OztBQU9BLFNBQVNDLE9BQVQsR0FBK0M7QUFBQTs7QUFBQSxNQUE5QkMsS0FBOEIsdUVBQXRCRixZQUFzQjtBQUFBLE1BQVJHLE1BQVE7O0FBQzdDLE1BQU1DLGNBQWMseUJBQU1DLElBQU4sQ0FBV0YsT0FBT0csSUFBbEIsQ0FBcEI7O0FBRUEsVUFBUUYsV0FBUjtBQUNFO0FBQ0VHLGNBQVFDLEdBQVI7QUFDQSxhQUFPTixNQUFNTyxHQUFOLENBQVVOLE9BQU9PLFFBQWpCLG9FQUNNUCxPQUFPUSxPQUFQLElBQWtCLElBRHhCLHFEQUVRLElBRlIsMkNBR0tSLE9BQU9PLFFBSFosdUNBSUNQLE9BQU9TLElBSlIsZUFBUDtBQU1GO0FBQ0VMLGNBQVFDLEdBQVI7QUFDQSxhQUFPTixNQUFNTyxHQUFOLENBQVVOLE9BQU9PLFFBQWpCLDZDQUNTLElBRFQsRUFBUDtBQUdGO0FBQ0VILGNBQVFDLEdBQVI7QUFDQSxhQUFPTixNQUFNTyxHQUFOLENBQVVOLE9BQU9PLFFBQWpCLDJFQUNXUCxPQUFPVSxLQURsQixvREFFTVYsT0FBT1EsT0FGYixnQkFBUDtBQUlGO0FBQ0VKLGNBQVFDLEdBQVI7QUFDQSxhQUFPTixNQUFNTyxHQUFOLENBQVVOLE9BQU9PLFFBQWpCLDZFQUNhLElBRGIsbURBRUtQLE9BQU9XLE1BRlosb0RBR01YLE9BQU9RLE9BSGIsZ0JBQVA7QUFLRjtBQUNFSixjQUFRQyxHQUFSO0FBQ0EsYUFBT04sTUFBTWEsTUFBTixDQUFhWixPQUFPTyxRQUFwQixDQUFQO0FBQ0Y7QUFDRSxhQUFPVixZQUFQO0FBQ0Y7QUFDRU8sY0FBUUMsR0FBUjtBQUNBLGFBQU9OLE1BQU1jLEtBQU4sMkNBQ1FkLE1BQU1lLEdBQU4sdUJBQXFCQyxNQUFyQixxQkFBK0JmLE9BQU9nQixHQUF0QyxFQUE0Q2hCLE9BQU9pQixLQUFuRCxFQURSLEVBQVA7QUFHRjtBQUNFLGFBQU9sQixNQUFNYyxLQUFOLDJDQUNRZCxNQUFNZSxHQUFOLHVCQUFxQkMsTUFBckIscUJBQ1ZmLE9BQU9nQixHQURHLEVBQ0doQixPQUFPa0IsSUFBUCxDQUFZbkIsTUFBTWUsR0FBTix1QkFBcUJBLEdBQXJCLENBQXlCZCxPQUFPZ0IsR0FBaEMsQ0FBWixDQURILEVBRFIsRUFBUDtBQUtGO0FBQ0UsYUFBT2pCLEtBQVA7QUE1Q0o7QUE4Q0Q7O2tCQUVjRCxPIiwiZmlsZSI6InJlZHVjZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHtcbiAgQkVGT1JFX0RJU1BBVENILFxuICBET19TVUJNSVQsXG4gIEhPQ19DTEVBUixcbiAgUkVTVUxULFxuICBTRVJWRVJfRVJST1IsXG4gIFNVQk1JVF9BQ0tFRCxcbiAgU1VCTUlUX0ZBSUxFRCxcbiAgU1VCTUlUX1NVQ0NFRUQsXG4gIFNVQk1JVF9TVUNDRVNTLFxuICBSRURVWF9TRVQsXG4gIFJFRFVYX1NFVF9GTixcbiAgVkFSSUFCTEVTLFxuICBJU19MT0FESU5HLFxuICBXSUxMX0xPQUQsXG4gIFBBWUxPQUQsXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzL3JlZHVjZXItaGVscGVycyc7XG5cbi8vIFRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBBcHBcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IGZyb21KUyh7XG4gIFtWQVJJQUJMRVNdOiB7fSxcbn0pO1xuXG4vKipcbiAqIHdlIHN0b3JlIGRpZmZlcmVudCBmb3JtcyBpbiBhIHBhZ2Ugc2VwYXJhdGVseSwgZGlzdGluZ3Vpc2ggYnkgdGhlaXIgYGZvcm1OYW1lYFxuICogYW5kIGVhY2ggZm9ybSB3aWxsIGhhdmUgdGhlaXIgb3duIGVycm9yIGFuZCBzdWNjZXNzIHN0YXR1c1xuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiByZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3QgdHJpbW1lZFR5cGUgPSB1dGlscy50cmltKGFjdGlvbi50eXBlKTtcblxuICBzd2l0Y2ggKHRyaW1tZWRUeXBlKSB7XG4gICAgY2FzZSBCRUZPUkVfRElTUEFUQ0g6XG4gICAgICBjb25zb2xlLmxvZyhCRUZPUkVfRElTUEFUQ0gpO1xuICAgICAgcmV0dXJuIHN0YXRlLnNldChhY3Rpb24uZm9ybU5hbWUsIHtcbiAgICAgICAgW1BBWUxPQURdOiBhY3Rpb24ucGF5bG9hZCB8fCB0cnVlLFxuICAgICAgICBbV0lMTF9MT0FEXTogdHJ1ZSxcbiAgICAgICAgZm9ybU5hbWU6IGFjdGlvbi5mb3JtTmFtZSxcbiAgICAgICAgcGFnZTogYWN0aW9uLnBhZ2UsXG4gICAgICB9KTtcbiAgICBjYXNlIERPX1NVQk1JVDpcbiAgICAgIGNvbnNvbGUubG9nKERPX1NVQk1JVCk7XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KGFjdGlvbi5mb3JtTmFtZSwge1xuICAgICAgICBbSVNfTE9BRElOR106IHRydWUsXG4gICAgICB9KTtcbiAgICBjYXNlIFNVQk1JVF9GQUlMRUQ6XG4gICAgICBjb25zb2xlLmxvZyhTVUJNSVRfRkFJTEVEKTtcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoYWN0aW9uLmZvcm1OYW1lLCB7XG4gICAgICAgIFtTRVJWRVJfRVJST1JdOiBhY3Rpb24uZXJyb3IsXG4gICAgICAgIFtQQVlMT0FEXTogYWN0aW9uLnBheWxvYWQsXG4gICAgICB9KTtcbiAgICBjYXNlIFNVQk1JVF9TVUNDRUVEOlxuICAgICAgY29uc29sZS5sb2coU1VCTUlUX1NVQ0NFRUQpO1xuICAgICAgcmV0dXJuIHN0YXRlLnNldChhY3Rpb24uZm9ybU5hbWUsIHtcbiAgICAgICAgW1NVQk1JVF9TVUNDRVNTXTogdHJ1ZSxcbiAgICAgICAgW1JFU1VMVF06IGFjdGlvbi5yZXN1bHQsXG4gICAgICAgIFtQQVlMT0FEXTogYWN0aW9uLnBheWxvYWQsXG4gICAgICB9KTtcbiAgICBjYXNlIFNVQk1JVF9BQ0tFRDpcbiAgICAgIGNvbnNvbGUubG9nKFNVQk1JVF9BQ0tFRCk7XG4gICAgICByZXR1cm4gc3RhdGUuZGVsZXRlKGFjdGlvbi5mb3JtTmFtZSk7XG4gICAgY2FzZSBIT0NfQ0xFQVI6XG4gICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICAgIGNhc2UgUkVEVVhfU0VUOlxuICAgICAgY29uc29sZS5sb2coUkVEVVhfU0VUKTtcbiAgICAgIHJldHVybiBzdGF0ZS5tZXJnZSh7XG4gICAgICAgIFtWQVJJQUJMRVNdOiBzdGF0ZS5nZXQoVkFSSUFCTEVTKS5jb25jYXQoeyBbYWN0aW9uLmtleV06IGFjdGlvbi52YWx1ZSB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgUkVEVVhfU0VUX0ZOOlxuICAgICAgcmV0dXJuIHN0YXRlLm1lcmdlKHtcbiAgICAgICAgW1ZBUklBQkxFU106IHN0YXRlLmdldChWQVJJQUJMRVMpLmNvbmNhdCh7XG4gICAgICAgICAgW2FjdGlvbi5rZXldOiBhY3Rpb24uZnVuYyhzdGF0ZS5nZXQoVkFSSUFCTEVTKS5nZXQoYWN0aW9uLmtleSkpLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVkdWNlcjtcbiJdfQ==