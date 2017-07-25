'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCallback = makeCallback;

var _effects = require('redux-saga/effects');

/**
 * this function return an array of dispatch actions,
 * which is combined by a defaultCallback and additionCallbacks
 * every single action will be called with all params given by the caller
 * @param defaultCallback
 * @param additionCallbacks
 * @param params
 * @returns {Array}
 */
function makeCallback() {
  var defaultCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var additionCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var callbacks = [];

  for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  if (defaultCallback) {
    callbacks = callbacks.concat((0, _effects.put)(defaultCallback.apply(undefined, params)));
  }
  for (var i = 0; i < additionCallbacks.length; i += 1) {
    callbacks = callbacks.concat((0, _effects.put)(additionCallbacks[i].apply(additionCallbacks, params)));
  }
  return callbacks;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9tYWtlQ2FsbGJhY2suanMiXSwibmFtZXMiOlsibWFrZUNhbGxiYWNrIiwiZGVmYXVsdENhbGxiYWNrIiwiYWRkaXRpb25DYWxsYmFja3MiLCJjYWxsYmFja3MiLCJwYXJhbXMiLCJjb25jYXQiLCJpIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7OztRQVdnQkEsWSxHQUFBQSxZOztBQVhoQjs7QUFFQTs7Ozs7Ozs7O0FBU08sU0FBU0EsWUFBVCxHQUFpRjtBQUFBLE1BQTNEQyxlQUEyRCx1RUFBekMsSUFBeUM7QUFBQSxNQUFuQ0MsaUJBQW1DLHVFQUFmLEVBQWU7O0FBQ3RGLE1BQUlDLFlBQVksRUFBaEI7O0FBRHNGLG9DQUFSQyxNQUFRO0FBQVJBLFVBQVE7QUFBQTs7QUFFdEYsTUFBSUgsZUFBSixFQUFxQjtBQUNuQkUsZ0JBQVlBLFVBQVVFLE1BQVYsQ0FBaUIsa0JBQUlKLGlDQUFtQkcsTUFBbkIsQ0FBSixDQUFqQixDQUFaO0FBQ0Q7QUFDRCxPQUFLLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSUosa0JBQWtCSyxNQUF0QyxFQUE4Q0QsS0FBSyxDQUFuRCxFQUFzRDtBQUNwREgsZ0JBQVlBLFVBQVVFLE1BQVYsQ0FBaUIsa0JBQUlILGtCQUFrQkksQ0FBbEIsMkJBQXdCRixNQUF4QixDQUFKLENBQWpCLENBQVo7QUFDRDtBQUNELFNBQU9ELFNBQVA7QUFDRCIsImZpbGUiOiJtYWtlQ2FsbGJhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwdXQgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gcmV0dXJuIGFuIGFycmF5IG9mIGRpc3BhdGNoIGFjdGlvbnMsXG4gKiB3aGljaCBpcyBjb21iaW5lZCBieSBhIGRlZmF1bHRDYWxsYmFjayBhbmQgYWRkaXRpb25DYWxsYmFja3NcbiAqIGV2ZXJ5IHNpbmdsZSBhY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCBhbGwgcGFyYW1zIGdpdmVuIGJ5IHRoZSBjYWxsZXJcbiAqIEBwYXJhbSBkZWZhdWx0Q2FsbGJhY2tcbiAqIEBwYXJhbSBhZGRpdGlvbkNhbGxiYWNrc1xuICogQHBhcmFtIHBhcmFtc1xuICogQHJldHVybnMge0FycmF5fVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNhbGxiYWNrKGRlZmF1bHRDYWxsYmFjayA9IG51bGwsIGFkZGl0aW9uQ2FsbGJhY2tzID0gW10sIC4uLnBhcmFtcykge1xuICBsZXQgY2FsbGJhY2tzID0gW107XG4gIGlmIChkZWZhdWx0Q2FsbGJhY2spIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3MuY29uY2F0KHB1dChkZWZhdWx0Q2FsbGJhY2soLi4ucGFyYW1zKSkpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkaXRpb25DYWxsYmFja3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3MuY29uY2F0KHB1dChhZGRpdGlvbkNhbGxiYWNrc1tpXSguLi5wYXJhbXMpKSk7XG4gIH1cbiAgcmV0dXJuIGNhbGxiYWNrcztcbn1cbiJdfQ==