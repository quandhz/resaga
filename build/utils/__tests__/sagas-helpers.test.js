'use strict';

var _config = require('../../config');

var _constants = require('../../constants');

var _sagasHelpers = require('../sagas-helpers');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('utils/hoc/onSubmit/utils/sagas-helpers', function () {
  describe('doSubmit()', function () {
    it('should return true', function () {
      var action = { type: _constants.DO_SUBMIT + '::something' };
      expect((0, _sagasHelpers.doSubmit)(action)).toBe(true);
    });
    it('should return false', function () {
      var action = { type: _constants.HOC_CLEAR + '::something' };
      expect((0, _sagasHelpers.doSubmit)(action)).toBe(false);
    });
  });
  describe('analyse()', function () {
    var _mock;

    var formName = 'testForm';
    var mock = (_mock = {}, _defineProperty(_mock, _config.HANDLE_SUCCESS, _defineProperty({}, formName, 'success')), _defineProperty(_mock, _config.HANDLE_ERROR, _defineProperty({}, formName, 'error')), _mock);
    it('should return correct values', function () {
      var res = (0, _sagasHelpers.analyse)(mock, formName);
      expect(res.postProcess).toBe('success');
      expect(res.postProcessError).toBe('error');
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9fX3Rlc3RzX18vc2FnYXMtaGVscGVycy50ZXN0LmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiaXQiLCJhY3Rpb24iLCJ0eXBlIiwiZXhwZWN0IiwidG9CZSIsImZvcm1OYW1lIiwibW9jayIsInJlcyIsInBvc3RQcm9jZXNzIiwicG9zdFByb2Nlc3NFcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUVBQSxTQUFTLHdDQUFULEVBQW1ELFlBQU07QUFDdkRBLFdBQVMsWUFBVCxFQUF1QixZQUFNO0FBQzNCQyxPQUFHLG9CQUFILEVBQXlCLFlBQU07QUFDN0IsVUFBTUMsU0FBUyxFQUFFQywwQ0FBRixFQUFmO0FBQ0FDLGFBQU8sNEJBQVNGLE1BQVQsQ0FBUCxFQUF5QkcsSUFBekIsQ0FBOEIsSUFBOUI7QUFDRCxLQUhEO0FBSUFKLE9BQUcscUJBQUgsRUFBMEIsWUFBTTtBQUM5QixVQUFNQyxTQUFTLEVBQUVDLDBDQUFGLEVBQWY7QUFDQUMsYUFBTyw0QkFBU0YsTUFBVCxDQUFQLEVBQXlCRyxJQUF6QixDQUE4QixLQUE5QjtBQUNELEtBSEQ7QUFJRCxHQVREO0FBVUFMLFdBQVMsV0FBVCxFQUFzQixZQUFNO0FBQUE7O0FBQzFCLFFBQU1NLFdBQVcsVUFBakI7QUFDQSxRQUFNQyx1RkFDaUJELFFBRGpCLEVBQzRCLFNBRDVCLHFFQUVlQSxRQUZmLEVBRTBCLE9BRjFCLFVBQU47QUFJQUwsT0FBRyw4QkFBSCxFQUFtQyxZQUFNO0FBQ3ZDLFVBQU1PLE1BQU0sMkJBQVFELElBQVIsRUFBY0QsUUFBZCxDQUFaO0FBQ0FGLGFBQU9JLElBQUlDLFdBQVgsRUFBd0JKLElBQXhCLENBQTZCLFNBQTdCO0FBQ0FELGFBQU9JLElBQUlFLGdCQUFYLEVBQTZCTCxJQUE3QixDQUFrQyxPQUFsQztBQUNELEtBSkQ7QUFLRCxHQVhEO0FBWUQsQ0F2QkQiLCJmaWxlIjoic2FnYXMtaGVscGVycy50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSEFORExFX0VSUk9SLCBIQU5ETEVfU1VDQ0VTUyB9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBET19TVUJNSVQsIEhPQ19DTEVBUiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBhbmFseXNlLCBkb1N1Ym1pdCB9IGZyb20gJy4uL3NhZ2FzLWhlbHBlcnMnO1xuXG5kZXNjcmliZSgndXRpbHMvaG9jL29uU3VibWl0L3V0aWxzL3NhZ2FzLWhlbHBlcnMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdkb1N1Ym1pdCgpJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7IHR5cGU6IGAke0RPX1NVQk1JVH06OnNvbWV0aGluZ2AgfTtcbiAgICAgIGV4cGVjdChkb1N1Ym1pdChhY3Rpb24pKS50b0JlKHRydWUpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uID0geyB0eXBlOiBgJHtIT0NfQ0xFQVJ9Ojpzb21ldGhpbmdgIH07XG4gICAgICBleHBlY3QoZG9TdWJtaXQoYWN0aW9uKSkudG9CZShmYWxzZSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnYW5hbHlzZSgpJywgKCkgPT4ge1xuICAgIGNvbnN0IGZvcm1OYW1lID0gJ3Rlc3RGb3JtJztcbiAgICBjb25zdCBtb2NrID0ge1xuICAgICAgW0hBTkRMRV9TVUNDRVNTXTogeyBbZm9ybU5hbWVdOiAnc3VjY2VzcycgfSxcbiAgICAgIFtIQU5ETEVfRVJST1JdOiB7IFtmb3JtTmFtZV06ICdlcnJvcicgfSxcbiAgICB9O1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvcnJlY3QgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gYW5hbHlzZShtb2NrLCBmb3JtTmFtZSk7XG4gICAgICBleHBlY3QocmVzLnBvc3RQcm9jZXNzKS50b0JlKCdzdWNjZXNzJyk7XG4gICAgICBleHBlY3QocmVzLnBvc3RQcm9jZXNzRXJyb3IpLnRvQmUoJ2Vycm9yJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=