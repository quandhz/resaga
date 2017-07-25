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
}; /**
    * Created by quando on 13/7/17.
    */
exports.default = {
  trim: trim
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9yZWR1Y2VyLWhlbHBlcnMuanMiXSwibmFtZXMiOlsidHJpbSIsInR5cGUiLCJpbmRleE9mIiwic2xpY2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBOztBQUVBOzs7OztBQUtBLElBQU1BLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxJQUFEO0FBQUEsU0FBV0EsS0FBS0MsT0FBTCwyQkFBNEIsQ0FBQyxDQUE3QixHQUFpQ0QsS0FBS0UsS0FBTCxDQUFXLENBQVgsRUFBY0YsS0FBS0MsT0FBTCxzQkFBZCxDQUFqQyxHQUEwRUQsSUFBckY7QUFBQSxDQUFiLEMsQ0FWQTs7O2tCQVllO0FBQ2JEO0FBRGEsQyIsImZpbGUiOiJyZWR1Y2VyLWhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgcXVhbmRvIG9uIDEzLzcvMTcuXG4gKi9cbmltcG9ydCB7IFNFUEFSQVRPUiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbi8qKlxuICogYWN0aW9uIHR5cGUgd2lsbCBiZSBzb21ldGhpbmcgbGlrZSBgSE9DX0RPX1NVQk1JVDo6Y29udGFpbmVycy9Gb3JtL0xvZ2luOjpsb2dpbkZvcm1gXG4gKiBUaGUgcGFydCBhZnRlciBTRVBBUkFUT1IgaXMganVzdCBmb3IgZGVidWdnaW5nIHB1cnBvc2UsIHdlIGNhbiBpZ25vcmUgYW5kIHRyaW0gdGhhdFxuICogQHBhcmFtIHR5cGVcbiAqL1xuY29uc3QgdHJpbSA9ICh0eXBlKSA9PiAodHlwZS5pbmRleE9mKFNFUEFSQVRPUikgIT09IC0xID8gdHlwZS5zbGljZSgwLCB0eXBlLmluZGV4T2YoU0VQQVJBVE9SKSkgOiB0eXBlKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0cmltLFxufTtcbiJdfQ==