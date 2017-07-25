'use strict';

var _expect = require('expect');

var expect = _interopRequireWildcard(_expect);

var _immutable = require('immutable');

var _constants = require('../../constants');

var _reducer = require('../../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _testHelpers = require('../test-helpers');

var _testHelpers2 = _interopRequireDefault(_testHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * Created by quando on 14/7/17.
 */


describe('utils/hoc/onSubmit/utils/test-helpers', function () {
  var mockString = 'this is string';

  it('to be defined', function () {
    expect(_testHelpers2.default).toBeDefined();
    expect(_testHelpers2.default.generate).toBeDefined();
    expect(_testHelpers2.default.generate.propsError).toBeDefined();
    expect(_testHelpers2.default.generate.propsSuccess).toBeDefined();
    expect(_testHelpers2.default.generate.propsNeither).toBeDefined();
    expect(_testHelpers2.default.generate.stateError).toBeDefined();
    expect(_testHelpers2.default.generate.stateSuccess).toBeDefined();
    expect(_testHelpers2.default.generate.stateNeither).toBeDefined();
  });
  it('test.generate.propsError', function () {
    var _expected;

    var expected = (_expected = {}, _defineProperty(_expected, _constants.SERVER_ERROR, mockString), _defineProperty(_expected, _constants.SUBMIT_SUCCESS, false), _expected);
    expect(_testHelpers2.default.generate.propsError(mockString)).toEqual(expected);
  });
  it('test.generate.propsSuccess', function () {
    var _expected2;

    var expected = (_expected2 = {}, _defineProperty(_expected2, _constants.SERVER_ERROR, ''), _defineProperty(_expected2, _constants.SUBMIT_SUCCESS, true), _defineProperty(_expected2, _constants.RESULT, mockString), _expected2);
    expect(_testHelpers2.default.generate.propsSuccess(mockString)).toEqual(expected);
  });
  it('test.generate.propsNeither', function () {
    var _expected3;

    var expected = (_expected3 = {}, _defineProperty(_expected3, _constants.SERVER_ERROR, ''), _defineProperty(_expected3, _constants.SUBMIT_SUCCESS, false), _expected3);
    expect(_testHelpers2.default.generate.propsNeither()).toEqual(expected);
  });
  it('test.generate.stateError', function () {
    var expected = (0, _reducer2.default)((0, _immutable.fromJS)({}), { formName: mockString, type: _constants.SUBMIT_FAILED });
    expect(_testHelpers2.default.generate.stateError(mockString)).toEqual(expected);
  });
  it('test.generate.stateSuccess', function () {
    var expected = (0, _reducer2.default)((0, _immutable.fromJS)({}), { formName: mockString, type: _constants.SUBMIT_SUCCEED });
    expect(_testHelpers2.default.generate.stateSuccess(mockString)).toEqual(expected);
  });
  it('test.generate.stateNeither', function () {
    var expected = (0, _reducer2.default)((0, _immutable.fromJS)({}), { formName: mockString, type: _constants.SUBMIT_SUCCEED });
    expect(_testHelpers2.default.generate.stateNeither(mockString)).not.toEqual(expected);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9fX3Rlc3RzX18vdGVzdC1oZWxwZXJzLnRlc3QuanMiXSwibmFtZXMiOlsiZXhwZWN0IiwiZGVzY3JpYmUiLCJtb2NrU3RyaW5nIiwiaXQiLCJ0b0JlRGVmaW5lZCIsImdlbmVyYXRlIiwicHJvcHNFcnJvciIsInByb3BzU3VjY2VzcyIsInByb3BzTmVpdGhlciIsInN0YXRlRXJyb3IiLCJzdGF0ZVN1Y2Nlc3MiLCJzdGF0ZU5laXRoZXIiLCJleHBlY3RlZCIsInRvRXF1YWwiLCJmb3JtTmFtZSIsInR5cGUiLCJub3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0lBQVlBLE07O0FBSVo7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7O0FBTkE7Ozs7O0FBU0FDLFNBQVMsdUNBQVQsRUFBa0QsWUFBTTtBQUN0RCxNQUFNQyxhQUFhLGdCQUFuQjs7QUFFQUMsS0FBRyxlQUFILEVBQW9CLFlBQU07QUFDeEJILGtDQUFhSSxXQUFiO0FBQ0FKLFdBQU8sc0JBQUtLLFFBQVosRUFBc0JELFdBQXRCO0FBQ0FKLFdBQU8sc0JBQUtLLFFBQUwsQ0FBY0MsVUFBckIsRUFBaUNGLFdBQWpDO0FBQ0FKLFdBQU8sc0JBQUtLLFFBQUwsQ0FBY0UsWUFBckIsRUFBbUNILFdBQW5DO0FBQ0FKLFdBQU8sc0JBQUtLLFFBQUwsQ0FBY0csWUFBckIsRUFBbUNKLFdBQW5DO0FBQ0FKLFdBQU8sc0JBQUtLLFFBQUwsQ0FBY0ksVUFBckIsRUFBaUNMLFdBQWpDO0FBQ0FKLFdBQU8sc0JBQUtLLFFBQUwsQ0FBY0ssWUFBckIsRUFBbUNOLFdBQW5DO0FBQ0FKLFdBQU8sc0JBQUtLLFFBQUwsQ0FBY00sWUFBckIsRUFBbUNQLFdBQW5DO0FBQ0QsR0FURDtBQVVBRCxLQUFHLDBCQUFILEVBQStCLFlBQU07QUFBQTs7QUFDbkMsUUFBTVMsZ0ZBQTZCVixVQUE3Qix5REFBMkQsS0FBM0QsYUFBTjtBQUNBRixXQUFPLHNCQUFLSyxRQUFMLENBQWNDLFVBQWQsQ0FBeUJKLFVBQXpCLENBQVAsRUFBNkNXLE9BQTdDLENBQXFERCxRQUFyRDtBQUNELEdBSEQ7QUFJQVQsS0FBRyw0QkFBSCxFQUFpQyxZQUFNO0FBQUE7O0FBQ3JDLFFBQU1TLGtGQUE2QixFQUE3QiwwREFBbUQsSUFBbkQsa0RBQW1FVixVQUFuRSxjQUFOO0FBQ0FGLFdBQU8sc0JBQUtLLFFBQUwsQ0FBY0UsWUFBZCxDQUEyQkwsVUFBM0IsQ0FBUCxFQUErQ1csT0FBL0MsQ0FBdURELFFBQXZEO0FBQ0QsR0FIRDtBQUlBVCxLQUFHLDRCQUFILEVBQWlDLFlBQU07QUFBQTs7QUFDckMsUUFBTVMsa0ZBQTZCLEVBQTdCLDBEQUFtRCxLQUFuRCxjQUFOO0FBQ0FaLFdBQU8sc0JBQUtLLFFBQUwsQ0FBY0csWUFBZCxFQUFQLEVBQXFDSyxPQUFyQyxDQUE2Q0QsUUFBN0M7QUFDRCxHQUhEO0FBSUFULEtBQUcsMEJBQUgsRUFBK0IsWUFBTTtBQUNuQyxRQUFNUyxXQUFXLHVCQUFRLHVCQUFPLEVBQVAsQ0FBUixFQUFvQixFQUFFRSxVQUFVWixVQUFaLEVBQXdCYSw4QkFBeEIsRUFBcEIsQ0FBakI7QUFDQWYsV0FBTyxzQkFBS0ssUUFBTCxDQUFjSSxVQUFkLENBQXlCUCxVQUF6QixDQUFQLEVBQTZDVyxPQUE3QyxDQUFxREQsUUFBckQ7QUFDRCxHQUhEO0FBSUFULEtBQUcsNEJBQUgsRUFBaUMsWUFBTTtBQUNyQyxRQUFNUyxXQUFXLHVCQUFRLHVCQUFPLEVBQVAsQ0FBUixFQUFvQixFQUFFRSxVQUFVWixVQUFaLEVBQXdCYSwrQkFBeEIsRUFBcEIsQ0FBakI7QUFDQWYsV0FBTyxzQkFBS0ssUUFBTCxDQUFjSyxZQUFkLENBQTJCUixVQUEzQixDQUFQLEVBQStDVyxPQUEvQyxDQUF1REQsUUFBdkQ7QUFDRCxHQUhEO0FBSUFULEtBQUcsNEJBQUgsRUFBaUMsWUFBTTtBQUNyQyxRQUFNUyxXQUFXLHVCQUFRLHVCQUFPLEVBQVAsQ0FBUixFQUFvQixFQUFFRSxVQUFVWixVQUFaLEVBQXdCYSwrQkFBeEIsRUFBcEIsQ0FBakI7QUFDQWYsV0FBTyxzQkFBS0ssUUFBTCxDQUFjTSxZQUFkLENBQTJCVCxVQUEzQixDQUFQLEVBQStDYyxHQUEvQyxDQUFtREgsT0FBbkQsQ0FBMkRELFFBQTNEO0FBQ0QsR0FIRDtBQUlELENBckNEIiwiZmlsZSI6InRlc3QtaGVscGVycy50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJ2V4cGVjdCc7XG4vKipcbiAqIENyZWF0ZWQgYnkgcXVhbmRvIG9uIDE0LzcvMTcuXG4gKi9cbmltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBSRVNVTFQsIFNFUlZFUl9FUlJPUiwgU1VCTUlUX0ZBSUxFRCwgU1VCTUlUX1NVQ0NFRUQsIFNVQk1JVF9TVUNDRVNTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4uLy4uL3JlZHVjZXInO1xuaW1wb3J0IHRlc3QgZnJvbSAnLi4vdGVzdC1oZWxwZXJzJztcblxuXG5kZXNjcmliZSgndXRpbHMvaG9jL29uU3VibWl0L3V0aWxzL3Rlc3QtaGVscGVycycsICgpID0+IHtcbiAgY29uc3QgbW9ja1N0cmluZyA9ICd0aGlzIGlzIHN0cmluZyc7XG5cbiAgaXQoJ3RvIGJlIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHRlc3QpLnRvQmVEZWZpbmVkKCk7XG4gICAgZXhwZWN0KHRlc3QuZ2VuZXJhdGUpLnRvQmVEZWZpbmVkKCk7XG4gICAgZXhwZWN0KHRlc3QuZ2VuZXJhdGUucHJvcHNFcnJvcikudG9CZURlZmluZWQoKTtcbiAgICBleHBlY3QodGVzdC5nZW5lcmF0ZS5wcm9wc1N1Y2Nlc3MpLnRvQmVEZWZpbmVkKCk7XG4gICAgZXhwZWN0KHRlc3QuZ2VuZXJhdGUucHJvcHNOZWl0aGVyKS50b0JlRGVmaW5lZCgpO1xuICAgIGV4cGVjdCh0ZXN0LmdlbmVyYXRlLnN0YXRlRXJyb3IpLnRvQmVEZWZpbmVkKCk7XG4gICAgZXhwZWN0KHRlc3QuZ2VuZXJhdGUuc3RhdGVTdWNjZXNzKS50b0JlRGVmaW5lZCgpO1xuICAgIGV4cGVjdCh0ZXN0LmdlbmVyYXRlLnN0YXRlTmVpdGhlcikudG9CZURlZmluZWQoKTtcbiAgfSk7XG4gIGl0KCd0ZXN0LmdlbmVyYXRlLnByb3BzRXJyb3InLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSB7IFtTRVJWRVJfRVJST1JdOiBtb2NrU3RyaW5nLCBbU1VCTUlUX1NVQ0NFU1NdOiBmYWxzZSB9O1xuICAgIGV4cGVjdCh0ZXN0LmdlbmVyYXRlLnByb3BzRXJyb3IobW9ja1N0cmluZykpLnRvRXF1YWwoZXhwZWN0ZWQpO1xuICB9KTtcbiAgaXQoJ3Rlc3QuZ2VuZXJhdGUucHJvcHNTdWNjZXNzJywgKCkgPT4ge1xuICAgIGNvbnN0IGV4cGVjdGVkID0geyBbU0VSVkVSX0VSUk9SXTogJycsIFtTVUJNSVRfU1VDQ0VTU106IHRydWUsIFtSRVNVTFRdOiBtb2NrU3RyaW5nIH07XG4gICAgZXhwZWN0KHRlc3QuZ2VuZXJhdGUucHJvcHNTdWNjZXNzKG1vY2tTdHJpbmcpKS50b0VxdWFsKGV4cGVjdGVkKTtcbiAgfSk7XG4gIGl0KCd0ZXN0LmdlbmVyYXRlLnByb3BzTmVpdGhlcicsICgpID0+IHtcbiAgICBjb25zdCBleHBlY3RlZCA9IHsgW1NFUlZFUl9FUlJPUl06ICcnLCBbU1VCTUlUX1NVQ0NFU1NdOiBmYWxzZSB9O1xuICAgIGV4cGVjdCh0ZXN0LmdlbmVyYXRlLnByb3BzTmVpdGhlcigpKS50b0VxdWFsKGV4cGVjdGVkKTtcbiAgfSk7XG4gIGl0KCd0ZXN0LmdlbmVyYXRlLnN0YXRlRXJyb3InLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSByZWR1Y2VyKGZyb21KUyh7fSksIHsgZm9ybU5hbWU6IG1vY2tTdHJpbmcsIHR5cGU6IFNVQk1JVF9GQUlMRUQgfSk7XG4gICAgZXhwZWN0KHRlc3QuZ2VuZXJhdGUuc3RhdGVFcnJvcihtb2NrU3RyaW5nKSkudG9FcXVhbChleHBlY3RlZCk7XG4gIH0pO1xuICBpdCgndGVzdC5nZW5lcmF0ZS5zdGF0ZVN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSByZWR1Y2VyKGZyb21KUyh7fSksIHsgZm9ybU5hbWU6IG1vY2tTdHJpbmcsIHR5cGU6IFNVQk1JVF9TVUNDRUVEIH0pO1xuICAgIGV4cGVjdCh0ZXN0LmdlbmVyYXRlLnN0YXRlU3VjY2Vzcyhtb2NrU3RyaW5nKSkudG9FcXVhbChleHBlY3RlZCk7XG4gIH0pO1xuICBpdCgndGVzdC5nZW5lcmF0ZS5zdGF0ZU5laXRoZXInLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSByZWR1Y2VyKGZyb21KUyh7fSksIHsgZm9ybU5hbWU6IG1vY2tTdHJpbmcsIHR5cGU6IFNVQk1JVF9TVUNDRUVEIH0pO1xuICAgIGV4cGVjdCh0ZXN0LmdlbmVyYXRlLnN0YXRlTmVpdGhlcihtb2NrU3RyaW5nKSkubm90LnRvRXF1YWwoZXhwZWN0ZWQpO1xuICB9KTtcbn0pO1xuIl19