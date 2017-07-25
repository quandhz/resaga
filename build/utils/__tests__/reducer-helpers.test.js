'use strict';

var _constants = require('../../constants');

var _reducerHelpers = require('../reducer-helpers');

var _reducerHelpers2 = _interopRequireDefault(_reducerHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9fX3Rlc3RzX18vcmVkdWNlci1oZWxwZXJzLnRlc3QuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJpdCIsImV4cGVjdCIsInRvQmVEZWZpbmVkIiwidHJpbSIsInRvQmUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7Ozs7QUFFQUEsU0FBUywwQ0FBVCxFQUFxRCxZQUFNO0FBQ3pEQyxLQUFHLFlBQUgsRUFBaUIsWUFBTTtBQUNyQkMscUNBQWdCQyxXQUFoQjtBQUNBRCxXQUFPLHlCQUFRRSxJQUFmLEVBQXFCRCxXQUFyQjtBQUNELEdBSEQ7QUFJQUgsV0FBUyxjQUFULEVBQXlCLFlBQU07QUFDN0JDLE9BQUcsOENBQUgsRUFBbUQsWUFBTTtBQUN2REMsYUFBTyx5QkFBUUUsSUFBUiwyQkFBUCxFQUFxQ0MsSUFBckM7QUFDRCxLQUZEO0FBR0FKLE9BQUcsMENBQUgsRUFBK0MsWUFBTTtBQUNuRCxVQUFNSywwRUFBTjtBQUNBSixhQUFPLHlCQUFRRSxJQUFSLENBQWFFLElBQWIsQ0FBUCxFQUEyQkQsSUFBM0I7QUFDRCxLQUhEO0FBSUQsR0FSRDtBQVNELENBZEQiLCJmaWxlIjoicmVkdWNlci1oZWxwZXJzLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTRVBBUkFUT1IsIFNVQk1JVF9TVUNDRUVEIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4uL3JlZHVjZXItaGVscGVycyc7XG5cbmRlc2NyaWJlKCd1dGlscy9ob2Mvb25TdWJtaXQvdXRpbHMvcmVkdWNlci1oZWxwZXJzJywgKCkgPT4ge1xuICBpdCgnaXMgZGVmaW5lZCcsICgpID0+IHtcbiAgICBleHBlY3QocmVkdWNlcikudG9CZURlZmluZWQoKTtcbiAgICBleHBlY3QocmVkdWNlci50cmltKS50b0JlRGVmaW5lZCgpO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3JlZHVjZXIudHJpbScsICgpID0+IHtcbiAgICBpdCgncmV0dXJuIG9yaWdpbmFsIHN0cmluZyBpZiBubyBzZXBhcmF0b3IgZm91bmQnLCAoKSA9PiB7XG4gICAgICBleHBlY3QocmVkdWNlci50cmltKFNVQk1JVF9TVUNDRUVEKSkudG9CZShTVUJNSVRfU1VDQ0VFRCk7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybiB0cmltbWVkIHN0cmluZyBpZiBzZXBhcmF0b3IgZm91bmQnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gYCR7U1VCTUlUX1NVQ0NFRUR9JHtTRVBBUkFUT1J9c29tZS9wYXRoYDtcbiAgICAgIGV4cGVjdChyZWR1Y2VyLnRyaW0odHlwZSkpLnRvQmUoU1VCTUlUX1NVQ0NFRUQpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19