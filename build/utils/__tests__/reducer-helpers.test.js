'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
  describe('reducer.wrapReducer', function () {
    var wrapReducer = void 0;
    var mockReducer = jest.fn();
    var name = 'testPage';
    var mockCustoms = { hi: jest.fn() };
    beforeAll(function () {
      expect(_typeof(_reducerHelpers2.default.wrapReducer)).toBe('function');
      wrapReducer = _reducerHelpers2.default.wrapReducer(mockReducer, name, mockCustoms);
      expect(typeof wrapReducer === 'undefined' ? 'undefined' : _typeof(wrapReducer)).toBe('function');
    });
    it('should call if page name matched', function () {
      var state = undefined;
      var action = { page: name };
      wrapReducer(state, action);
      expect(mockReducer).toBeCalledWith(state, action);
    });
    it('should call if page name not matched and is initialisation call', function () {
      var state = undefined;
      var action = { page: 'other name' };
      wrapReducer(state, action);
      expect(mockReducer).toBeCalled();
    });
    it('should not call if page name not matched and is not initialisation call', function () {
      var state = { hi: 'ho' };
      var action = { page: 'other name' };
      wrapReducer(state, action);
      expect(mockReducer).not.toBeCalledWith(state, action);
    });
    it('should call customs', function () {
      var state = { hi: 'ho' };
      var action = { page: 'other name', type: 'hi' };
      wrapReducer(state, action);
      expect(mockCustoms.hi).toBeCalledWith(state);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9fX3Rlc3RzX18vcmVkdWNlci1oZWxwZXJzLnRlc3QuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJpdCIsImV4cGVjdCIsInRvQmVEZWZpbmVkIiwidHJpbSIsInRvQmUiLCJ0eXBlIiwid3JhcFJlZHVjZXIiLCJtb2NrUmVkdWNlciIsImplc3QiLCJmbiIsIm5hbWUiLCJtb2NrQ3VzdG9tcyIsImhpIiwiYmVmb3JlQWxsIiwic3RhdGUiLCJ1bmRlZmluZWQiLCJhY3Rpb24iLCJwYWdlIiwidG9CZUNhbGxlZFdpdGgiLCJ0b0JlQ2FsbGVkIiwibm90Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBQSxTQUFTLDBDQUFULEVBQXFELFlBQU07QUFDekRDLEtBQUcsWUFBSCxFQUFpQixZQUFNO0FBQ3JCQyxxQ0FBZ0JDLFdBQWhCO0FBQ0FELFdBQU8seUJBQVFFLElBQWYsRUFBcUJELFdBQXJCO0FBQ0QsR0FIRDtBQUlBSCxXQUFTLGNBQVQsRUFBeUIsWUFBTTtBQUM3QkMsT0FBRyw4Q0FBSCxFQUFtRCxZQUFNO0FBQ3ZEQyxhQUFPLHlCQUFRRSxJQUFSLDJCQUFQLEVBQXFDQyxJQUFyQztBQUNELEtBRkQ7QUFHQUosT0FBRywwQ0FBSCxFQUErQyxZQUFNO0FBQ25ELFVBQU1LLDBFQUFOO0FBQ0FKLGFBQU8seUJBQVFFLElBQVIsQ0FBYUUsSUFBYixDQUFQLEVBQTJCRCxJQUEzQjtBQUNELEtBSEQ7QUFJRCxHQVJEO0FBU0FMLFdBQVMscUJBQVQsRUFBZ0MsWUFBTTtBQUNwQyxRQUFJTyxvQkFBSjtBQUNBLFFBQU1DLGNBQWNDLEtBQUtDLEVBQUwsRUFBcEI7QUFDQSxRQUFNQyxPQUFPLFVBQWI7QUFDQSxRQUFNQyxjQUFjLEVBQUVDLElBQUlKLEtBQUtDLEVBQUwsRUFBTixFQUFwQjtBQUNBSSxjQUFVLFlBQU07QUFDZFoscUJBQWMseUJBQVFLLFdBQXRCLEdBQW1DRixJQUFuQyxDQUF3QyxVQUF4QztBQUNBRSxvQkFBYyx5QkFBUUEsV0FBUixDQUFvQkMsV0FBcEIsRUFBaUNHLElBQWpDLEVBQXVDQyxXQUF2QyxDQUFkO0FBQ0FWLG9CQUFjSyxXQUFkLHlDQUFjQSxXQUFkLEdBQTJCRixJQUEzQixDQUFnQyxVQUFoQztBQUNELEtBSkQ7QUFLQUosT0FBRyxrQ0FBSCxFQUF1QyxZQUFNO0FBQzNDLFVBQU1jLFFBQVFDLFNBQWQ7QUFDQSxVQUFNQyxTQUFTLEVBQUVDLE1BQU1QLElBQVIsRUFBZjtBQUNBSixrQkFBWVEsS0FBWixFQUFtQkUsTUFBbkI7QUFDQWYsYUFBT00sV0FBUCxFQUFvQlcsY0FBcEIsQ0FBbUNKLEtBQW5DLEVBQTBDRSxNQUExQztBQUNELEtBTEQ7QUFNQWhCLE9BQUcsaUVBQUgsRUFBc0UsWUFBTTtBQUMxRSxVQUFNYyxRQUFRQyxTQUFkO0FBQ0EsVUFBTUMsU0FBUyxFQUFFQyxNQUFNLFlBQVIsRUFBZjtBQUNBWCxrQkFBWVEsS0FBWixFQUFtQkUsTUFBbkI7QUFDQWYsYUFBT00sV0FBUCxFQUFvQlksVUFBcEI7QUFDRCxLQUxEO0FBTUFuQixPQUFHLHlFQUFILEVBQThFLFlBQU07QUFDbEYsVUFBTWMsUUFBUSxFQUFFRixJQUFJLElBQU4sRUFBZDtBQUNBLFVBQU1JLFNBQVMsRUFBRUMsTUFBTSxZQUFSLEVBQWY7QUFDQVgsa0JBQVlRLEtBQVosRUFBbUJFLE1BQW5CO0FBQ0FmLGFBQU9NLFdBQVAsRUFBb0JhLEdBQXBCLENBQXdCRixjQUF4QixDQUF1Q0osS0FBdkMsRUFBOENFLE1BQTlDO0FBQ0QsS0FMRDtBQU1BaEIsT0FBRyxxQkFBSCxFQUEwQixZQUFNO0FBQzlCLFVBQU1jLFFBQVEsRUFBRUYsSUFBSSxJQUFOLEVBQWQ7QUFDQSxVQUFNSSxTQUFTLEVBQUVDLE1BQU0sWUFBUixFQUFzQlosTUFBTSxJQUE1QixFQUFmO0FBQ0FDLGtCQUFZUSxLQUFaLEVBQW1CRSxNQUFuQjtBQUNBZixhQUFPVSxZQUFZQyxFQUFuQixFQUF1Qk0sY0FBdkIsQ0FBc0NKLEtBQXRDO0FBQ0QsS0FMRDtBQU1ELEdBbENEO0FBbUNELENBakREIiwiZmlsZSI6InJlZHVjZXItaGVscGVycy50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU0VQQVJBVE9SLCBTVUJNSVRfU1VDQ0VFRCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgcmVkdWNlciBmcm9tICcuLi9yZWR1Y2VyLWhlbHBlcnMnO1xuXG5kZXNjcmliZSgndXRpbHMvaG9jL29uU3VibWl0L3V0aWxzL3JlZHVjZXItaGVscGVycycsICgpID0+IHtcbiAgaXQoJ2lzIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHJlZHVjZXIpLnRvQmVEZWZpbmVkKCk7XG4gICAgZXhwZWN0KHJlZHVjZXIudHJpbSkudG9CZURlZmluZWQoKTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdyZWR1Y2VyLnRyaW0nLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybiBvcmlnaW5hbCBzdHJpbmcgaWYgbm8gc2VwYXJhdG9yIGZvdW5kJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHJlZHVjZXIudHJpbShTVUJNSVRfU1VDQ0VFRCkpLnRvQmUoU1VCTUlUX1NVQ0NFRUQpO1xuICAgIH0pO1xuICAgIGl0KCdyZXR1cm4gdHJpbW1lZCBzdHJpbmcgaWYgc2VwYXJhdG9yIGZvdW5kJywgKCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IGAke1NVQk1JVF9TVUNDRUVEfSR7U0VQQVJBVE9SfXNvbWUvcGF0aGA7XG4gICAgICBleHBlY3QocmVkdWNlci50cmltKHR5cGUpKS50b0JlKFNVQk1JVF9TVUNDRUVEKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdyZWR1Y2VyLndyYXBSZWR1Y2VyJywgKCkgPT4ge1xuICAgIGxldCB3cmFwUmVkdWNlcjtcbiAgICBjb25zdCBtb2NrUmVkdWNlciA9IGplc3QuZm4oKTtcbiAgICBjb25zdCBuYW1lID0gJ3Rlc3RQYWdlJztcbiAgICBjb25zdCBtb2NrQ3VzdG9tcyA9IHsgaGk6IGplc3QuZm4oKSB9O1xuICAgIGJlZm9yZUFsbCgoKSA9PiB7XG4gICAgICBleHBlY3QodHlwZW9mIHJlZHVjZXIud3JhcFJlZHVjZXIpLnRvQmUoJ2Z1bmN0aW9uJyk7XG4gICAgICB3cmFwUmVkdWNlciA9IHJlZHVjZXIud3JhcFJlZHVjZXIobW9ja1JlZHVjZXIsIG5hbWUsIG1vY2tDdXN0b21zKTtcbiAgICAgIGV4cGVjdCh0eXBlb2Ygd3JhcFJlZHVjZXIpLnRvQmUoJ2Z1bmN0aW9uJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIGlmIHBhZ2UgbmFtZSBtYXRjaGVkJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7IHBhZ2U6IG5hbWUgfTtcbiAgICAgIHdyYXBSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICAgICAgZXhwZWN0KG1vY2tSZWR1Y2VyKS50b0JlQ2FsbGVkV2l0aChzdGF0ZSwgYWN0aW9uKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGNhbGwgaWYgcGFnZSBuYW1lIG5vdCBtYXRjaGVkIGFuZCBpcyBpbml0aWFsaXNhdGlvbiBjYWxsJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7IHBhZ2U6ICdvdGhlciBuYW1lJyB9O1xuICAgICAgd3JhcFJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgICBleHBlY3QobW9ja1JlZHVjZXIpLnRvQmVDYWxsZWQoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIGlmIHBhZ2UgbmFtZSBub3QgbWF0Y2hlZCBhbmQgaXMgbm90IGluaXRpYWxpc2F0aW9uIGNhbGwnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHsgaGk6ICdobycgfTtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHsgcGFnZTogJ290aGVyIG5hbWUnIH07XG4gICAgICB3cmFwUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAgICAgIGV4cGVjdChtb2NrUmVkdWNlcikubm90LnRvQmVDYWxsZWRXaXRoKHN0YXRlLCBhY3Rpb24pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2FsbCBjdXN0b21zJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB7IGhpOiAnaG8nIH07XG4gICAgICBjb25zdCBhY3Rpb24gPSB7IHBhZ2U6ICdvdGhlciBuYW1lJywgdHlwZTogJ2hpJyB9O1xuICAgICAgd3JhcFJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgICBleHBlY3QobW9ja0N1c3RvbXMuaGkpLnRvQmVDYWxsZWRXaXRoKHN0YXRlKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==