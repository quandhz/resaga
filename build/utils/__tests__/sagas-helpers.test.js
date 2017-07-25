'use strict';

var _expect = require('expect');

var expect = _interopRequireWildcard(_expect);

var _config = require('../../config');

var _constants = require('../../constants');

var _sagasHelpers = require('../sagas-helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * Created by quando on 14/7/17.
 */


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9fX3Rlc3RzX18vc2FnYXMtaGVscGVycy50ZXN0LmpzIl0sIm5hbWVzIjpbImV4cGVjdCIsImRlc2NyaWJlIiwiaXQiLCJhY3Rpb24iLCJ0eXBlIiwidG9CZSIsImZvcm1OYW1lIiwibW9jayIsInJlcyIsInBvc3RQcm9jZXNzIiwicG9zdFByb2Nlc3NFcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7SUFBWUEsTTs7QUFDWjs7QUFJQTs7QUFDQTs7Ozs7QUFKQTs7Ozs7QUFNQUMsU0FBUyx3Q0FBVCxFQUFtRCxZQUFNO0FBQ3ZEQSxXQUFTLFlBQVQsRUFBdUIsWUFBTTtBQUMzQkMsT0FBRyxvQkFBSCxFQUF5QixZQUFNO0FBQzdCLFVBQU1DLFNBQVMsRUFBRUMsMENBQUYsRUFBZjtBQUNBSixhQUFPLDRCQUFTRyxNQUFULENBQVAsRUFBeUJFLElBQXpCLENBQThCLElBQTlCO0FBQ0QsS0FIRDtBQUlBSCxPQUFHLHFCQUFILEVBQTBCLFlBQU07QUFDOUIsVUFBTUMsU0FBUyxFQUFFQywwQ0FBRixFQUFmO0FBQ0FKLGFBQU8sNEJBQVNHLE1BQVQsQ0FBUCxFQUF5QkUsSUFBekIsQ0FBOEIsS0FBOUI7QUFDRCxLQUhEO0FBSUQsR0FURDtBQVVBSixXQUFTLFdBQVQsRUFBc0IsWUFBTTtBQUFBOztBQUMxQixRQUFNSyxXQUFXLFVBQWpCO0FBQ0EsUUFBTUMsdUZBQ2lCRCxRQURqQixFQUM0QixTQUQ1QixxRUFFZUEsUUFGZixFQUUwQixPQUYxQixVQUFOO0FBSUFKLE9BQUcsOEJBQUgsRUFBbUMsWUFBTTtBQUN2QyxVQUFNTSxNQUFNLDJCQUFRRCxJQUFSLEVBQWNELFFBQWQsQ0FBWjtBQUNBTixhQUFPUSxJQUFJQyxXQUFYLEVBQXdCSixJQUF4QixDQUE2QixTQUE3QjtBQUNBTCxhQUFPUSxJQUFJRSxnQkFBWCxFQUE2QkwsSUFBN0IsQ0FBa0MsT0FBbEM7QUFDRCxLQUpEO0FBS0QsR0FYRDtBQVlELENBdkJEIiwiZmlsZSI6InNhZ2FzLWhlbHBlcnMudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICdleHBlY3QnO1xuaW1wb3J0IHsgSEFORExFX0VSUk9SLCBIQU5ETEVfU1VDQ0VTUyB9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG4vKipcbiAqIENyZWF0ZWQgYnkgcXVhbmRvIG9uIDE0LzcvMTcuXG4gKi9cbmltcG9ydCB7IERPX1NVQk1JVCwgSE9DX0NMRUFSIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGFuYWx5c2UsIGRvU3VibWl0IH0gZnJvbSAnLi4vc2FnYXMtaGVscGVycyc7XG5cbmRlc2NyaWJlKCd1dGlscy9ob2Mvb25TdWJtaXQvdXRpbHMvc2FnYXMtaGVscGVycycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2RvU3VibWl0KCknLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHsgdHlwZTogYCR7RE9fU1VCTUlUfTo6c29tZXRoaW5nYCB9O1xuICAgICAgZXhwZWN0KGRvU3VibWl0KGFjdGlvbikpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7IHR5cGU6IGAke0hPQ19DTEVBUn06OnNvbWV0aGluZ2AgfTtcbiAgICAgIGV4cGVjdChkb1N1Ym1pdChhY3Rpb24pKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdhbmFseXNlKCknLCAoKSA9PiB7XG4gICAgY29uc3QgZm9ybU5hbWUgPSAndGVzdEZvcm0nO1xuICAgIGNvbnN0IG1vY2sgPSB7XG4gICAgICBbSEFORExFX1NVQ0NFU1NdOiB7IFtmb3JtTmFtZV06ICdzdWNjZXNzJyB9LFxuICAgICAgW0hBTkRMRV9FUlJPUl06IHsgW2Zvcm1OYW1lXTogJ2Vycm9yJyB9LFxuICAgIH07XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBhbmFseXNlKG1vY2ssIGZvcm1OYW1lKTtcbiAgICAgIGV4cGVjdChyZXMucG9zdFByb2Nlc3MpLnRvQmUoJ3N1Y2Nlc3MnKTtcbiAgICAgIGV4cGVjdChyZXMucG9zdFByb2Nlc3NFcnJvcikudG9CZSgnZXJyb3InKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==