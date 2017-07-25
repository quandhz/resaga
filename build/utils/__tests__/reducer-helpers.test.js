'use strict';

var _expect = require('expect');

var expect = _interopRequireWildcard(_expect);

var _constants = require('../../constants');

var _reducerHelpers = require('../reducer-helpers');

var _reducerHelpers2 = _interopRequireDefault(_reducerHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('utils/hoc/onSubmit/utils/reducer-helpers', function () {
  it('is defined', function () {
    expect(_reducerHelpers2.default).toBeDefined();
    expect(_reducerHelpers2.default.trim).toBeDefined();
  });
  describe('reducer.trim', function () {
    it('return original string if no separator found', function () {
      expect(_reducerHelpers2.default.trim(_constants.SUBMIT_SUCCEED)).toBe(_constants.SUBMIT_SUCCEED);
    });
    it('return trimmed string if separator found', function () {
      var type = '' + _constants.SUBMIT_SUCCEED + _constants.SEPARATOR + 'some/path';
      expect(_reducerHelpers2.default.trim(type)).toBe(_constants.SUBMIT_SUCCEED);
    });
  });
}); /**
     * Created by quando on 14/7/17.
     */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9fX3Rlc3RzX18vcmVkdWNlci1oZWxwZXJzLnRlc3QuanMiXSwibmFtZXMiOlsiZXhwZWN0IiwiZGVzY3JpYmUiLCJpdCIsInRvQmVEZWZpbmVkIiwidHJpbSIsInRvQmUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOztBQUlBOztJQUFZQSxNOztBQUNaOztBQUNBOzs7Ozs7OztBQUVBQyxTQUFTLDBDQUFULEVBQXFELFlBQU07QUFDekRDLEtBQUcsWUFBSCxFQUFpQixZQUFNO0FBQ3JCRixxQ0FBZ0JHLFdBQWhCO0FBQ0FILFdBQU8seUJBQVFJLElBQWYsRUFBcUJELFdBQXJCO0FBQ0QsR0FIRDtBQUlBRixXQUFTLGNBQVQsRUFBeUIsWUFBTTtBQUM3QkMsT0FBRyw4Q0FBSCxFQUFtRCxZQUFNO0FBQ3ZERixhQUFPLHlCQUFRSSxJQUFSLDJCQUFQLEVBQXFDQyxJQUFyQztBQUNELEtBRkQ7QUFHQUgsT0FBRywwQ0FBSCxFQUErQyxZQUFNO0FBQ25ELFVBQU1JLDBFQUFOO0FBQ0FOLGFBQU8seUJBQVFJLElBQVIsQ0FBYUUsSUFBYixDQUFQLEVBQTJCRCxJQUEzQjtBQUNELEtBSEQ7QUFJRCxHQVJEO0FBU0QsQ0FkRCxFLENBUkEiLCJmaWxlIjoicmVkdWNlci1oZWxwZXJzLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgcXVhbmRvIG9uIDE0LzcvMTcuXG4gKi9cblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJ2V4cGVjdCc7XG5pbXBvcnQgeyBTRVBBUkFUT1IsIFNVQk1JVF9TVUNDRUVEIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4uL3JlZHVjZXItaGVscGVycyc7XG5cbmRlc2NyaWJlKCd1dGlscy9ob2Mvb25TdWJtaXQvdXRpbHMvcmVkdWNlci1oZWxwZXJzJywgKCkgPT4ge1xuICBpdCgnaXMgZGVmaW5lZCcsICgpID0+IHtcbiAgICBleHBlY3QocmVkdWNlcikudG9CZURlZmluZWQoKTtcbiAgICBleHBlY3QocmVkdWNlci50cmltKS50b0JlRGVmaW5lZCgpO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3JlZHVjZXIudHJpbScsICgpID0+IHtcbiAgICBpdCgncmV0dXJuIG9yaWdpbmFsIHN0cmluZyBpZiBubyBzZXBhcmF0b3IgZm91bmQnLCAoKSA9PiB7XG4gICAgICBleHBlY3QocmVkdWNlci50cmltKFNVQk1JVF9TVUNDRUVEKSkudG9CZShTVUJNSVRfU1VDQ0VFRCk7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybiB0cmltbWVkIHN0cmluZyBpZiBzZXBhcmF0b3IgZm91bmQnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gYCR7U1VCTUlUX1NVQ0NFRUR9JHtTRVBBUkFUT1J9c29tZS9wYXRoYDtcbiAgICAgIGV4cGVjdChyZWR1Y2VyLnRyaW0odHlwZSkpLnRvQmUoU1VCTUlUX1NVQ0NFRUQpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19