'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _actions = require('../actions');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var page = 'mockTestPage'; /**
                            * Created by Yang on 8/11/16.
                            */


describe('Register Actions', function () {
  describe('register server validation', function () {
    it('submitFormSucceed should return the correct type and success response', function () {
      var fixture = 'data';
      var expectedResult = {
        type: _constants.SUBMIT_SUCCEED,
        page: page,
        result: fixture
      };
      var actualResult = (0, _actions.submitFormSucceed)(fixture, page);
      (0, _expect2.default)(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      (0, _expect2.default)(actualResult.page).toEqual(expectedResult.page);
      (0, _expect2.default)(actualResult.result).toEqual(expectedResult.result);
    });
    it('submitFormFailed should return the correct type and error', function () {
      var fixture = 'some error';
      var expectedResult = {
        type: _constants.SUBMIT_FAILED,
        page: page,
        error: fixture
      };
      var actualResult = (0, _actions.submitFormFailed)(fixture, page);
      (0, _expect2.default)(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      (0, _expect2.default)(actualResult.page).toEqual(expectedResult.page);
      (0, _expect2.default)(actualResult.result).toEqual(expectedResult.result);
    });
    it('submitForm should return the correct type', function () {
      var fixture = 'data';
      var expectedResult = {
        type: _constants.DO_SUBMIT,
        options: { page: page },
        data: fixture
      };
      var actualResult = (0, _actions.submitForm)(fixture, page);
      (0, _expect2.default)(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      (0, _expect2.default)(actualResult.page).toEqual(expectedResult.page);
      (0, _expect2.default)(actualResult.result).toEqual(expectedResult.result);
    });
    it('cleanup should return the correct type', function () {
      var expectedResult = {
        type: _constants.HOC_CLEAR,
        page: page
      };
      var actualResult = (0, _actions.cleanup)(page);
      (0, _expect2.default)(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      (0, _expect2.default)(actualResult.page).toEqual(expectedResult.page);
    });
    it('cleanup should return the correct type', function () {
      var fixture = 'data';
      var expectedResult = {
        type: _constants.SUBMIT_ACKED,
        page: page
      };
      var actualResult = (0, _actions.acknowledge)(page, fixture);
      (0, _expect2.default)(actualResult.type.indexOf(expectedResult.type)).not.toEqual(-1);
      (0, _expect2.default)(actualResult.page).toEqual(expectedResult.page);
      (0, _expect2.default)(actualResult.formName).toEqual(fixture);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vYWN0aW9ucy50ZXN0LmpzIl0sIm5hbWVzIjpbInBhZ2UiLCJkZXNjcmliZSIsIml0IiwiZml4dHVyZSIsImV4cGVjdGVkUmVzdWx0IiwidHlwZSIsInJlc3VsdCIsImFjdHVhbFJlc3VsdCIsImluZGV4T2YiLCJub3QiLCJ0b0VxdWFsIiwiZXJyb3IiLCJvcHRpb25zIiwiZGF0YSIsImZvcm1OYW1lIl0sIm1hcHBpbmdzIjoiOztBQUdBOzs7O0FBQ0E7O0FBUUE7Ozs7QUFRQSxJQUFNQSxPQUFPLGNBQWIsQyxDQXBCQTs7Ozs7QUFzQkFDLFNBQVMsa0JBQVQsRUFBNkIsWUFBTTtBQUNqQ0EsV0FBUyw0QkFBVCxFQUF1QyxZQUFNO0FBQzNDQyxPQUFHLHVFQUFILEVBQTRFLFlBQU07QUFDaEYsVUFBTUMsVUFBVSxNQUFoQjtBQUNBLFVBQU1DLGlCQUFpQjtBQUNyQkMsdUNBRHFCO0FBRXJCTCxrQkFGcUI7QUFHckJNLGdCQUFRSDtBQUhhLE9BQXZCO0FBS0EsVUFBTUksZUFBZSxnQ0FBa0JKLE9BQWxCLEVBQTJCSCxJQUEzQixDQUFyQjtBQUNBLDRCQUFPTyxhQUFhRixJQUFiLENBQWtCRyxPQUFsQixDQUEwQkosZUFBZUMsSUFBekMsQ0FBUCxFQUF1REksR0FBdkQsQ0FBMkRDLE9BQTNELENBQW1FLENBQUMsQ0FBcEU7QUFDQSw0QkFBT0gsYUFBYVAsSUFBcEIsRUFBMEJVLE9BQTFCLENBQWtDTixlQUFlSixJQUFqRDtBQUNBLDRCQUFPTyxhQUFhRCxNQUFwQixFQUE0QkksT0FBNUIsQ0FBb0NOLGVBQWVFLE1BQW5EO0FBQ0QsS0FYRDtBQVlBSixPQUFHLDJEQUFILEVBQWdFLFlBQU07QUFDcEUsVUFBTUMsVUFBVSxZQUFoQjtBQUNBLFVBQU1DLGlCQUFpQjtBQUNyQkMsc0NBRHFCO0FBRXJCTCxrQkFGcUI7QUFHckJXLGVBQU9SO0FBSGMsT0FBdkI7QUFLQSxVQUFNSSxlQUFlLCtCQUFpQkosT0FBakIsRUFBMEJILElBQTFCLENBQXJCO0FBQ0EsNEJBQU9PLGFBQWFGLElBQWIsQ0FBa0JHLE9BQWxCLENBQTBCSixlQUFlQyxJQUF6QyxDQUFQLEVBQXVESSxHQUF2RCxDQUEyREMsT0FBM0QsQ0FBbUUsQ0FBQyxDQUFwRTtBQUNBLDRCQUFPSCxhQUFhUCxJQUFwQixFQUEwQlUsT0FBMUIsQ0FBa0NOLGVBQWVKLElBQWpEO0FBQ0EsNEJBQU9PLGFBQWFELE1BQXBCLEVBQTRCSSxPQUE1QixDQUFvQ04sZUFBZUUsTUFBbkQ7QUFDRCxLQVhEO0FBWUFKLE9BQUcsMkNBQUgsRUFBZ0QsWUFBTTtBQUNwRCxVQUFNQyxVQUFVLE1BQWhCO0FBQ0EsVUFBTUMsaUJBQWlCO0FBQ3JCQyxrQ0FEcUI7QUFFckJPLGlCQUFTLEVBQUVaLFVBQUYsRUFGWTtBQUdyQmEsY0FBTVY7QUFIZSxPQUF2QjtBQUtBLFVBQU1JLGVBQWUseUJBQVdKLE9BQVgsRUFBb0JILElBQXBCLENBQXJCO0FBQ0EsNEJBQU9PLGFBQWFGLElBQWIsQ0FBa0JHLE9BQWxCLENBQTBCSixlQUFlQyxJQUF6QyxDQUFQLEVBQXVESSxHQUF2RCxDQUEyREMsT0FBM0QsQ0FBbUUsQ0FBQyxDQUFwRTtBQUNBLDRCQUFPSCxhQUFhUCxJQUFwQixFQUEwQlUsT0FBMUIsQ0FBa0NOLGVBQWVKLElBQWpEO0FBQ0EsNEJBQU9PLGFBQWFELE1BQXBCLEVBQTRCSSxPQUE1QixDQUFvQ04sZUFBZUUsTUFBbkQ7QUFDRCxLQVhEO0FBWUFKLE9BQUcsd0NBQUgsRUFBNkMsWUFBTTtBQUNqRCxVQUFNRSxpQkFBaUI7QUFDckJDLGtDQURxQjtBQUVyQkw7QUFGcUIsT0FBdkI7QUFJQSxVQUFNTyxlQUFlLHNCQUFRUCxJQUFSLENBQXJCO0FBQ0EsNEJBQU9PLGFBQWFGLElBQWIsQ0FBa0JHLE9BQWxCLENBQTBCSixlQUFlQyxJQUF6QyxDQUFQLEVBQXVESSxHQUF2RCxDQUEyREMsT0FBM0QsQ0FBbUUsQ0FBQyxDQUFwRTtBQUNBLDRCQUFPSCxhQUFhUCxJQUFwQixFQUEwQlUsT0FBMUIsQ0FBa0NOLGVBQWVKLElBQWpEO0FBQ0QsS0FSRDtBQVNBRSxPQUFHLHdDQUFILEVBQTZDLFlBQU07QUFDakQsVUFBTUMsVUFBVSxNQUFoQjtBQUNBLFVBQU1DLGlCQUFpQjtBQUNyQkMscUNBRHFCO0FBRXJCTDtBQUZxQixPQUF2QjtBQUlBLFVBQU1PLGVBQWUsMEJBQVlQLElBQVosRUFBa0JHLE9BQWxCLENBQXJCO0FBQ0EsNEJBQU9JLGFBQWFGLElBQWIsQ0FBa0JHLE9BQWxCLENBQTBCSixlQUFlQyxJQUF6QyxDQUFQLEVBQXVESSxHQUF2RCxDQUEyREMsT0FBM0QsQ0FBbUUsQ0FBQyxDQUFwRTtBQUNBLDRCQUFPSCxhQUFhUCxJQUFwQixFQUEwQlUsT0FBMUIsQ0FBa0NOLGVBQWVKLElBQWpEO0FBQ0EsNEJBQU9PLGFBQWFPLFFBQXBCLEVBQThCSixPQUE5QixDQUFzQ1AsT0FBdEM7QUFDRCxLQVZEO0FBV0QsR0F6REQ7QUEwREQsQ0EzREQiLCJmaWxlIjoiYWN0aW9ucy50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IFlhbmcgb24gOC8xMS8xNi5cbiAqL1xuaW1wb3J0IGV4cGVjdCBmcm9tICdleHBlY3QnO1xuaW1wb3J0IHtcbiAgc3VibWl0Rm9ybUZhaWxlZCxcbiAgc3VibWl0Rm9ybVN1Y2NlZWQsXG4gIHN1Ym1pdEZvcm0sXG4gIGFja25vd2xlZGdlLFxuICBjbGVhbnVwLFxufSBmcm9tICcuLi9hY3Rpb25zJztcblxuaW1wb3J0IHtcbiAgRE9fU1VCTUlULFxuICBTVUJNSVRfRkFJTEVELFxuICBTVUJNSVRfU1VDQ0VFRCxcbiAgU1VCTUlUX0FDS0VELFxuICBIT0NfQ0xFQVIsXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmNvbnN0IHBhZ2UgPSAnbW9ja1Rlc3RQYWdlJztcblxuZGVzY3JpYmUoJ1JlZ2lzdGVyIEFjdGlvbnMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdyZWdpc3RlciBzZXJ2ZXIgdmFsaWRhdGlvbicsICgpID0+IHtcbiAgICBpdCgnc3VibWl0Rm9ybVN1Y2NlZWQgc2hvdWxkIHJldHVybiB0aGUgY29ycmVjdCB0eXBlIGFuZCBzdWNjZXNzIHJlc3BvbnNlJywgKCkgPT4ge1xuICAgICAgY29uc3QgZml4dHVyZSA9ICdkYXRhJztcbiAgICAgIGNvbnN0IGV4cGVjdGVkUmVzdWx0ID0ge1xuICAgICAgICB0eXBlOiBTVUJNSVRfU1VDQ0VFRCxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgcmVzdWx0OiBmaXh0dXJlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGFjdHVhbFJlc3VsdCA9IHN1Ym1pdEZvcm1TdWNjZWVkKGZpeHR1cmUsIHBhZ2UpO1xuICAgICAgZXhwZWN0KGFjdHVhbFJlc3VsdC50eXBlLmluZGV4T2YoZXhwZWN0ZWRSZXN1bHQudHlwZSkpLm5vdC50b0VxdWFsKC0xKTtcbiAgICAgIGV4cGVjdChhY3R1YWxSZXN1bHQucGFnZSkudG9FcXVhbChleHBlY3RlZFJlc3VsdC5wYWdlKTtcbiAgICAgIGV4cGVjdChhY3R1YWxSZXN1bHQucmVzdWx0KS50b0VxdWFsKGV4cGVjdGVkUmVzdWx0LnJlc3VsdCk7XG4gICAgfSk7XG4gICAgaXQoJ3N1Ym1pdEZvcm1GYWlsZWQgc2hvdWxkIHJldHVybiB0aGUgY29ycmVjdCB0eXBlIGFuZCBlcnJvcicsICgpID0+IHtcbiAgICAgIGNvbnN0IGZpeHR1cmUgPSAnc29tZSBlcnJvcic7XG4gICAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IHtcbiAgICAgICAgdHlwZTogU1VCTUlUX0ZBSUxFRCxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgZXJyb3I6IGZpeHR1cmUsXG4gICAgICB9O1xuICAgICAgY29uc3QgYWN0dWFsUmVzdWx0ID0gc3VibWl0Rm9ybUZhaWxlZChmaXh0dXJlLCBwYWdlKTtcbiAgICAgIGV4cGVjdChhY3R1YWxSZXN1bHQudHlwZS5pbmRleE9mKGV4cGVjdGVkUmVzdWx0LnR5cGUpKS5ub3QudG9FcXVhbCgtMSk7XG4gICAgICBleHBlY3QoYWN0dWFsUmVzdWx0LnBhZ2UpLnRvRXF1YWwoZXhwZWN0ZWRSZXN1bHQucGFnZSk7XG4gICAgICBleHBlY3QoYWN0dWFsUmVzdWx0LnJlc3VsdCkudG9FcXVhbChleHBlY3RlZFJlc3VsdC5yZXN1bHQpO1xuICAgIH0pO1xuICAgIGl0KCdzdWJtaXRGb3JtIHNob3VsZCByZXR1cm4gdGhlIGNvcnJlY3QgdHlwZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGZpeHR1cmUgPSAnZGF0YSc7XG4gICAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IHtcbiAgICAgICAgdHlwZTogRE9fU1VCTUlULFxuICAgICAgICBvcHRpb25zOiB7IHBhZ2UgfSxcbiAgICAgICAgZGF0YTogZml4dHVyZSxcbiAgICAgIH07XG4gICAgICBjb25zdCBhY3R1YWxSZXN1bHQgPSBzdWJtaXRGb3JtKGZpeHR1cmUsIHBhZ2UpO1xuICAgICAgZXhwZWN0KGFjdHVhbFJlc3VsdC50eXBlLmluZGV4T2YoZXhwZWN0ZWRSZXN1bHQudHlwZSkpLm5vdC50b0VxdWFsKC0xKTtcbiAgICAgIGV4cGVjdChhY3R1YWxSZXN1bHQucGFnZSkudG9FcXVhbChleHBlY3RlZFJlc3VsdC5wYWdlKTtcbiAgICAgIGV4cGVjdChhY3R1YWxSZXN1bHQucmVzdWx0KS50b0VxdWFsKGV4cGVjdGVkUmVzdWx0LnJlc3VsdCk7XG4gICAgfSk7XG4gICAgaXQoJ2NsZWFudXAgc2hvdWxkIHJldHVybiB0aGUgY29ycmVjdCB0eXBlJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSB7XG4gICAgICAgIHR5cGU6IEhPQ19DTEVBUixcbiAgICAgICAgcGFnZSxcbiAgICAgIH07XG4gICAgICBjb25zdCBhY3R1YWxSZXN1bHQgPSBjbGVhbnVwKHBhZ2UpO1xuICAgICAgZXhwZWN0KGFjdHVhbFJlc3VsdC50eXBlLmluZGV4T2YoZXhwZWN0ZWRSZXN1bHQudHlwZSkpLm5vdC50b0VxdWFsKC0xKTtcbiAgICAgIGV4cGVjdChhY3R1YWxSZXN1bHQucGFnZSkudG9FcXVhbChleHBlY3RlZFJlc3VsdC5wYWdlKTtcbiAgICB9KTtcbiAgICBpdCgnY2xlYW51cCBzaG91bGQgcmV0dXJuIHRoZSBjb3JyZWN0IHR5cGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBmaXh0dXJlID0gJ2RhdGEnO1xuICAgICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSB7XG4gICAgICAgIHR5cGU6IFNVQk1JVF9BQ0tFRCxcbiAgICAgICAgcGFnZSxcbiAgICAgIH07XG4gICAgICBjb25zdCBhY3R1YWxSZXN1bHQgPSBhY2tub3dsZWRnZShwYWdlLCBmaXh0dXJlKTtcbiAgICAgIGV4cGVjdChhY3R1YWxSZXN1bHQudHlwZS5pbmRleE9mKGV4cGVjdGVkUmVzdWx0LnR5cGUpKS5ub3QudG9FcXVhbCgtMSk7XG4gICAgICBleHBlY3QoYWN0dWFsUmVzdWx0LnBhZ2UpLnRvRXF1YWwoZXhwZWN0ZWRSZXN1bHQucGFnZSk7XG4gICAgICBleHBlY3QoYWN0dWFsUmVzdWx0LmZvcm1OYW1lKS50b0VxdWFsKGZpeHR1cmUpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19