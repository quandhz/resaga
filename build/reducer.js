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
      return state.set(action.formName, (_state$set = {}, _defineProperty(_state$set, _constants.SERVER_ERROR, ''), _defineProperty(_state$set, _constants.SUBMIT_SUCCESS, false), _state$set));
    case _constants.SUBMIT_FAILED:
      return state.set(action.formName, (_state$set2 = {}, _defineProperty(_state$set2, _constants.SERVER_ERROR, action.error), _defineProperty(_state$set2, _constants.SUBMIT_SUCCESS, false), _state$set2));
    case _constants.SUBMIT_SUCCEED:
      return state.set(action.formName, (_state$set3 = {}, _defineProperty(_state$set3, _constants.SERVER_ERROR, ''), _defineProperty(_state$set3, _constants.SUBMIT_SUCCESS, true), _defineProperty(_state$set3, _constants.RESULT, action.result), _state$set3));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInRyaW1tZWRUeXBlIiwidHJpbSIsInR5cGUiLCJzZXQiLCJmb3JtTmFtZSIsImVycm9yIiwicmVzdWx0IiwiZGVsZXRlIiwibWVyZ2UiLCJnZXQiLCJjb25jYXQiLCJrZXkiLCJ2YWx1ZSIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQWFBOzs7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsZUFBZSxpRUFDTixFQURNLEVBQXJCOztBQUlBOzs7Ozs7O0FBT0EsU0FBU0MsT0FBVCxHQUErQztBQUFBOztBQUFBLE1BQTlCQyxLQUE4Qix1RUFBdEJGLFlBQXNCO0FBQUEsTUFBUkcsTUFBUTs7QUFDN0MsTUFBTUMsY0FBYyx5QkFBTUMsSUFBTixDQUFXRixPQUFPRyxJQUFsQixDQUFwQjs7QUFFQSxVQUFRRixXQUFSO0FBQ0U7QUFDRSxhQUFPRixNQUFNSyxHQUFOLENBQVVKLE9BQU9LLFFBQWpCLHlFQUNXLEVBRFgsMERBRWEsS0FGYixlQUFQO0FBSUY7QUFDRSxhQUFPTixNQUFNSyxHQUFOLENBQVVKLE9BQU9LLFFBQWpCLDJFQUNXTCxPQUFPTSxLQURsQiwyREFFYSxLQUZiLGdCQUFQO0FBSUY7QUFDRSxhQUFPUCxNQUFNSyxHQUFOLENBQVVKLE9BQU9LLFFBQWpCLDJFQUNXLEVBRFgsMkRBRWEsSUFGYixtREFHS0wsT0FBT08sTUFIWixnQkFBUDtBQUtGO0FBQ0UsYUFBT1IsTUFBTVMsTUFBTixDQUFhUixPQUFPSyxRQUFwQixDQUFQO0FBQ0Y7QUFDRSxhQUFPUixZQUFQO0FBQ0Y7QUFDRSxhQUFPRSxNQUFNVSxLQUFOLDJDQUNRVixNQUFNVyxHQUFOLHVCQUFxQkMsTUFBckIscUJBQStCWCxPQUFPWSxHQUF0QyxFQUE0Q1osT0FBT2EsS0FBbkQsRUFEUixFQUFQO0FBR0Y7QUFDRSxhQUFPZCxNQUFNVSxLQUFOLDJDQUNRVixNQUFNVyxHQUFOLHVCQUFxQkMsTUFBckIscUJBQ1ZYLE9BQU9ZLEdBREcsRUFDR1osT0FBT2MsSUFBUCxDQUFZZixNQUFNVyxHQUFOLHVCQUFxQkEsR0FBckIsQ0FBeUJWLE9BQU9ZLEdBQWhDLENBQVosQ0FESCxFQURSLEVBQVA7QUFLRjtBQUNFLGFBQU9iLEtBQVA7QUFoQ0o7QUFrQ0Q7O2tCQUVjRCxPIiwiZmlsZSI6InJlZHVjZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHtcbiAgRE9fU1VCTUlULFxuICBIT0NfQ0xFQVIsXG4gIFJFU1VMVCxcbiAgU0VSVkVSX0VSUk9SLFxuICBTVUJNSVRfQUNLRUQsXG4gIFNVQk1JVF9GQUlMRUQsXG4gIFNVQk1JVF9TVUNDRUVELFxuICBTVUJNSVRfU1VDQ0VTUyxcbiAgUkVEVVhfU0VULFxuICBSRURVWF9TRVRfRk4sXG4gIFZBUklBQkxFUyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMvcmVkdWNlci1oZWxwZXJzJztcblxuLy8gVGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIEFwcFxuY29uc3QgaW5pdGlhbFN0YXRlID0gZnJvbUpTKHtcbiAgW1ZBUklBQkxFU106IHt9LFxufSk7XG5cbi8qKlxuICogd2Ugc3RvcmUgZGlmZmVyZW50IGZvcm1zIGluIGEgcGFnZSBzZXBhcmF0ZWx5LCBkaXN0aW5ndWlzaCBieSB0aGVpciBgZm9ybU5hbWVgXG4gKiBhbmQgZWFjaCBmb3JtIHdpbGwgaGF2ZSB0aGVpciBvd24gZXJyb3IgYW5kIHN1Y2Nlc3Mgc3RhdHVzXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIHJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB0cmltbWVkVHlwZSA9IHV0aWxzLnRyaW0oYWN0aW9uLnR5cGUpO1xuXG4gIHN3aXRjaCAodHJpbW1lZFR5cGUpIHtcbiAgICBjYXNlIERPX1NVQk1JVDpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoYWN0aW9uLmZvcm1OYW1lLCB7XG4gICAgICAgIFtTRVJWRVJfRVJST1JdOiAnJyxcbiAgICAgICAgW1NVQk1JVF9TVUNDRVNTXTogZmFsc2UsXG4gICAgICB9KTtcbiAgICBjYXNlIFNVQk1JVF9GQUlMRUQ6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KGFjdGlvbi5mb3JtTmFtZSwge1xuICAgICAgICBbU0VSVkVSX0VSUk9SXTogYWN0aW9uLmVycm9yLFxuICAgICAgICBbU1VCTUlUX1NVQ0NFU1NdOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIGNhc2UgU1VCTUlUX1NVQ0NFRUQ6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KGFjdGlvbi5mb3JtTmFtZSwge1xuICAgICAgICBbU0VSVkVSX0VSUk9SXTogJycsXG4gICAgICAgIFtTVUJNSVRfU1VDQ0VTU106IHRydWUsXG4gICAgICAgIFtSRVNVTFRdOiBhY3Rpb24ucmVzdWx0LFxuICAgICAgfSk7XG4gICAgY2FzZSBTVUJNSVRfQUNLRUQ6XG4gICAgICByZXR1cm4gc3RhdGUuZGVsZXRlKGFjdGlvbi5mb3JtTmFtZSk7XG4gICAgY2FzZSBIT0NfQ0xFQVI6XG4gICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICAgIGNhc2UgUkVEVVhfU0VUOlxuICAgICAgcmV0dXJuIHN0YXRlLm1lcmdlKHtcbiAgICAgICAgW1ZBUklBQkxFU106IHN0YXRlLmdldChWQVJJQUJMRVMpLmNvbmNhdCh7IFthY3Rpb24ua2V5XTogYWN0aW9uLnZhbHVlIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBSRURVWF9TRVRfRk46XG4gICAgICByZXR1cm4gc3RhdGUubWVyZ2Uoe1xuICAgICAgICBbVkFSSUFCTEVTXTogc3RhdGUuZ2V0KFZBUklBQkxFUykuY29uY2F0KHtcbiAgICAgICAgICBbYWN0aW9uLmtleV06IGFjdGlvbi5mdW5jKHN0YXRlLmdldChWQVJJQUJMRVMpLmdldChhY3Rpb24ua2V5KSksXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZWR1Y2VyO1xuIl19