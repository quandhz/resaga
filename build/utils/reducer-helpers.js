'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

/**
 * action type will be something like `HOC_DO_SUBMIT::containers/Form/Login::loginForm`
 * The part after SEPARATOR is just for debugging purpose, we can ignore and trim that
 * @param type
 */
var trim = function trim(type) {
  return type.indexOf(_constants.SEPARATOR) !== -1 ? type.slice(0, type.indexOf(_constants.SEPARATOR)) : type;
};

exports.default = {
  trim: trim
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9yZWR1Y2VyLWhlbHBlcnMuanMiXSwibmFtZXMiOlsidHJpbSIsInR5cGUiLCJpbmRleE9mIiwic2xpY2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUVBOzs7OztBQUtBLElBQU1BLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxJQUFEO0FBQUEsU0FBV0EsS0FBS0MsT0FBTCwyQkFBNEIsQ0FBQyxDQUE3QixHQUFpQ0QsS0FBS0UsS0FBTCxDQUFXLENBQVgsRUFBY0YsS0FBS0MsT0FBTCxzQkFBZCxDQUFqQyxHQUEwRUQsSUFBckY7QUFBQSxDQUFiOztrQkFFZTtBQUNiRDtBQURhLEMiLCJmaWxlIjoicmVkdWNlci1oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU0VQQVJBVE9SIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBhY3Rpb24gdHlwZSB3aWxsIGJlIHNvbWV0aGluZyBsaWtlIGBIT0NfRE9fU1VCTUlUOjpjb250YWluZXJzL0Zvcm0vTG9naW46OmxvZ2luRm9ybWBcbiAqIFRoZSBwYXJ0IGFmdGVyIFNFUEFSQVRPUiBpcyBqdXN0IGZvciBkZWJ1Z2dpbmcgcHVycG9zZSwgd2UgY2FuIGlnbm9yZSBhbmQgdHJpbSB0aGF0XG4gKiBAcGFyYW0gdHlwZVxuICovXG5jb25zdCB0cmltID0gKHR5cGUpID0+ICh0eXBlLmluZGV4T2YoU0VQQVJBVE9SKSAhPT0gLTEgPyB0eXBlLnNsaWNlKDAsIHR5cGUuaW5kZXhPZihTRVBBUkFUT1IpKSA6IHR5cGUpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRyaW0sXG59O1xuIl19