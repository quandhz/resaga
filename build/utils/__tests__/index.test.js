'use strict';

var _expect = require('expect');

var expect = _interopRequireWildcard(_expect);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by quando on 14/7/17.
 */

describe('utils/hoc/onSubmit/utils/index', function () {
  it('utils.component is defined', function () {
    expect(_index2.default.component).toBeDefined();
  });
  it('utils.reducer is defined', function () {
    expect(_index2.default.reducer).toBeDefined();
  });
  it('utils.test is defined', function () {
    expect(_index2.default.test).toBeDefined();
  });
  it('utils.sagas is defined', function () {
    expect(_index2.default.sagas).toBeDefined();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9fX3Rlc3RzX18vaW5kZXgudGVzdC5qcyJdLCJuYW1lcyI6WyJleHBlY3QiLCJkZXNjcmliZSIsIml0IiwiY29tcG9uZW50IiwidG9CZURlZmluZWQiLCJyZWR1Y2VyIiwidGVzdCIsInNhZ2FzIl0sIm1hcHBpbmdzIjoiOztBQUlBOztJQUFZQSxNOztBQUNaOzs7Ozs7OztBQUxBOzs7O0FBT0FDLFNBQVMsZ0NBQVQsRUFBMkMsWUFBTTtBQUMvQ0MsS0FBRyw0QkFBSCxFQUFpQyxZQUFNO0FBQ3JDRixXQUFPLGdCQUFNRyxTQUFiLEVBQXdCQyxXQUF4QjtBQUNELEdBRkQ7QUFHQUYsS0FBRywwQkFBSCxFQUErQixZQUFNO0FBQ25DRixXQUFPLGdCQUFNSyxPQUFiLEVBQXNCRCxXQUF0QjtBQUNELEdBRkQ7QUFHQUYsS0FBRyx1QkFBSCxFQUE0QixZQUFNO0FBQ2hDRixXQUFPLGdCQUFNTSxJQUFiLEVBQW1CRixXQUFuQjtBQUNELEdBRkQ7QUFHQUYsS0FBRyx3QkFBSCxFQUE2QixZQUFNO0FBQ2pDRixXQUFPLGdCQUFNTyxLQUFiLEVBQW9CSCxXQUFwQjtBQUNELEdBRkQ7QUFHRCxDQWJEIiwiZmlsZSI6ImluZGV4LnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgcXVhbmRvIG9uIDE0LzcvMTcuXG4gKi9cblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJ2V4cGVjdCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vaW5kZXgnO1xuXG5kZXNjcmliZSgndXRpbHMvaG9jL29uU3VibWl0L3V0aWxzL2luZGV4JywgKCkgPT4ge1xuICBpdCgndXRpbHMuY29tcG9uZW50IGlzIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHV0aWxzLmNvbXBvbmVudCkudG9CZURlZmluZWQoKTtcbiAgfSk7XG4gIGl0KCd1dGlscy5yZWR1Y2VyIGlzIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHV0aWxzLnJlZHVjZXIpLnRvQmVEZWZpbmVkKCk7XG4gIH0pO1xuICBpdCgndXRpbHMudGVzdCBpcyBkZWZpbmVkJywgKCkgPT4ge1xuICAgIGV4cGVjdCh1dGlscy50ZXN0KS50b0JlRGVmaW5lZCgpO1xuICB9KTtcbiAgaXQoJ3V0aWxzLnNhZ2FzIGlzIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHV0aWxzLnNhZ2FzKS50b0JlRGVmaW5lZCgpO1xuICB9KTtcbn0pO1xuIl19