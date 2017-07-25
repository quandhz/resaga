'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _immutable = require('immutable');

var _actions = require('../actions');

var _constants = require('../constants');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * Created by Yang on 8/11/16.
 */


describe('registerReducer', function () {
  var formName = 'testName';
  var pageName = 'testPage';
  var state = void 0;
  beforeEach(function () {
    state = (0, _immutable.fromJS)({});
  });

  it('should exist', function () {
    (0, _expect2.default)(_reducer2.default);
  });
  it('should set Server error correctly', function () {
    var _state$set;

    var serverError = 'error';
    var expectedResult = state.set(formName, (_state$set = {}, _defineProperty(_state$set, _constants.SERVER_ERROR, serverError), _defineProperty(_state$set, _constants.SUBMIT_SUCCESS, false), _state$set));
    (0, _expect2.default)((0, _reducer2.default)(state, (0, _actions.submitFormFailed)(serverError, pageName, formName))).toEqual(expectedResult);
  });
  it('should set Server success correctly', function () {
    var _state$set2;

    var expectedResult = state.set(formName, (_state$set2 = {}, _defineProperty(_state$set2, _constants.SERVER_ERROR, ''), _defineProperty(_state$set2, _constants.RESULT, ''), _defineProperty(_state$set2, _constants.SUBMIT_SUCCESS, true), _state$set2));
    (0, _expect2.default)((0, _reducer2.default)(state, (0, _actions.submitFormSucceed)('', pageName, formName))).toEqual(expectedResult);
  });
  it('should set submitForm correctly', function () {
    var _state$set3;

    var expectedResult = state.set(formName, (_state$set3 = {}, _defineProperty(_state$set3, _constants.SERVER_ERROR, ''), _defineProperty(_state$set3, _constants.SUBMIT_SUCCESS, false), _state$set3));
    (0, _expect2.default)((0, _reducer2.default)(state, (0, _actions.submitForm)({}, pageName, formName))).toEqual(expectedResult);
  });
  it('should set acknowledge correctly', function () {
    var expectedResult = state.delete(formName);
    (0, _expect2.default)((0, _reducer2.default)(state, (0, _actions.acknowledge)(formName))).toEqual(expectedResult);
  });
  it('should set cleanup correctly', function () {
    (0, _expect2.default)((0, _reducer2.default)(state, (0, _actions.cleanup)())).toEqual((0, _immutable.fromJS)({}));
  });
  it('should set other correctly', function () {
    var mockAction = { type: 'other' };
    (0, _expect2.default)((0, _reducer2.default)(state, mockAction)).toEqual(state);
  });
  it('should set other correctly', function () {
    var mockAction = { type: 'other' };
    (0, _expect2.default)((0, _reducer2.default)(undefined, mockAction)).toEqual(state);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vcmVkdWNlci50ZXN0LmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiZm9ybU5hbWUiLCJwYWdlTmFtZSIsInN0YXRlIiwiYmVmb3JlRWFjaCIsIml0Iiwic2VydmVyRXJyb3IiLCJleHBlY3RlZFJlc3VsdCIsInNldCIsInRvRXF1YWwiLCJkZWxldGUiLCJtb2NrQWN0aW9uIiwidHlwZSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7O0FBTkE7Ozs7O0FBUUFBLFNBQVMsaUJBQVQsRUFBNEIsWUFBTTtBQUNoQyxNQUFNQyxXQUFXLFVBQWpCO0FBQ0EsTUFBTUMsV0FBVyxVQUFqQjtBQUNBLE1BQUlDLGNBQUo7QUFDQUMsYUFBVyxZQUFNO0FBQ2ZELFlBQVEsdUJBQU8sRUFBUCxDQUFSO0FBQ0QsR0FGRDs7QUFJQUUsS0FBRyxjQUFILEVBQW1CLFlBQU07QUFDdkI7QUFDRCxHQUZEO0FBR0FBLEtBQUcsbUNBQUgsRUFBd0MsWUFBTTtBQUFBOztBQUM1QyxRQUFNQyxjQUFjLE9BQXBCO0FBQ0EsUUFBTUMsaUJBQWlCSixNQUFNSyxHQUFOLENBQVVQLFFBQVYseUVBQ0xLLFdBREssMERBRUgsS0FGRyxlQUF2QjtBQUlBLDBCQUNFLHVCQUFnQkgsS0FBaEIsRUFBdUIsK0JBQWlCRyxXQUFqQixFQUE4QkosUUFBOUIsRUFBd0NELFFBQXhDLENBQXZCLENBREYsRUFFRVEsT0FGRixDQUVVRixjQUZWO0FBR0QsR0FURDtBQVVBRixLQUFHLHFDQUFILEVBQTBDLFlBQU07QUFBQTs7QUFDOUMsUUFBTUUsaUJBQWlCSixNQUFNSyxHQUFOLENBQVVQLFFBQVYsMkVBQ0wsRUFESyxtREFFWCxFQUZXLDJEQUdILElBSEcsZ0JBQXZCO0FBS0EsMEJBQ0UsdUJBQWdCRSxLQUFoQixFQUF1QixnQ0FBa0IsRUFBbEIsRUFBc0JELFFBQXRCLEVBQWdDRCxRQUFoQyxDQUF2QixDQURGLEVBRUVRLE9BRkYsQ0FFVUYsY0FGVjtBQUdELEdBVEQ7QUFVQUYsS0FBRyxpQ0FBSCxFQUFzQyxZQUFNO0FBQUE7O0FBQzFDLFFBQU1FLGlCQUFpQkosTUFBTUssR0FBTixDQUFVUCxRQUFWLDJFQUNMLEVBREssMkRBRUgsS0FGRyxnQkFBdkI7QUFJQSwwQkFBTyx1QkFBZ0JFLEtBQWhCLEVBQXVCLHlCQUFXLEVBQVgsRUFBZUQsUUFBZixFQUF5QkQsUUFBekIsQ0FBdkIsQ0FBUCxFQUFtRVEsT0FBbkUsQ0FDRUYsY0FERjtBQUdELEdBUkQ7QUFTQUYsS0FBRyxrQ0FBSCxFQUF1QyxZQUFNO0FBQzNDLFFBQU1FLGlCQUFpQkosTUFBTU8sTUFBTixDQUFhVCxRQUFiLENBQXZCO0FBQ0EsMEJBQU8sdUJBQWdCRSxLQUFoQixFQUF1QiwwQkFBWUYsUUFBWixDQUF2QixDQUFQLEVBQXNEUSxPQUF0RCxDQUNFRixjQURGO0FBR0QsR0FMRDtBQU1BRixLQUFHLDhCQUFILEVBQW1DLFlBQU07QUFDdkMsMEJBQU8sdUJBQWdCRixLQUFoQixFQUF1Qix1QkFBdkIsQ0FBUCxFQUEwQ00sT0FBMUMsQ0FDRSx1QkFBTyxFQUFQLENBREY7QUFHRCxHQUpEO0FBS0FKLEtBQUcsNEJBQUgsRUFBaUMsWUFBTTtBQUNyQyxRQUFNTSxhQUFhLEVBQUVDLE1BQU0sT0FBUixFQUFuQjtBQUNBLDBCQUFPLHVCQUFnQlQsS0FBaEIsRUFBdUJRLFVBQXZCLENBQVAsRUFBMkNGLE9BQTNDLENBQW1ETixLQUFuRDtBQUNELEdBSEQ7QUFJQUUsS0FBRyw0QkFBSCxFQUFpQyxZQUFNO0FBQ3JDLFFBQU1NLGFBQWEsRUFBRUMsTUFBTSxPQUFSLEVBQW5CO0FBQ0EsMEJBQU8sdUJBQWdCQyxTQUFoQixFQUEyQkYsVUFBM0IsQ0FBUCxFQUErQ0YsT0FBL0MsQ0FBdUROLEtBQXZEO0FBQ0QsR0FIRDtBQUlELENBM0REIiwiZmlsZSI6InJlZHVjZXIudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHBlY3QgZnJvbSAnZXhwZWN0Jztcbi8qKlxuICogQ3JlYXRlZCBieSBZYW5nIG9uIDgvMTEvMTYuXG4gKi9cbmltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBhY2tub3dsZWRnZSwgY2xlYW51cCwgc3VibWl0Rm9ybSwgc3VibWl0Rm9ybUZhaWxlZCwgc3VibWl0Rm9ybVN1Y2NlZWQgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFJFU1VMVCwgU0VSVkVSX0VSUk9SLCBTVUJNSVRfU1VDQ0VTUyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgcmVnaXN0ZXJSZWR1Y2VyIGZyb20gJy4uL3JlZHVjZXInO1xuXG5kZXNjcmliZSgncmVnaXN0ZXJSZWR1Y2VyJywgKCkgPT4ge1xuICBjb25zdCBmb3JtTmFtZSA9ICd0ZXN0TmFtZSc7XG4gIGNvbnN0IHBhZ2VOYW1lID0gJ3Rlc3RQYWdlJztcbiAgbGV0IHN0YXRlO1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzdGF0ZSA9IGZyb21KUyh7fSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZXhpc3QnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcik7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBTZXJ2ZXIgZXJyb3IgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IHNlcnZlckVycm9yID0gJ2Vycm9yJztcbiAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IHN0YXRlLnNldChmb3JtTmFtZSwge1xuICAgICAgW1NFUlZFUl9FUlJPUl06IHNlcnZlckVycm9yLFxuICAgICAgW1NVQk1JVF9TVUNDRVNTXTogZmFsc2UsXG4gICAgfSk7XG4gICAgZXhwZWN0KFxuICAgICAgcmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBzdWJtaXRGb3JtRmFpbGVkKHNlcnZlckVycm9yLCBwYWdlTmFtZSwgZm9ybU5hbWUpKVxuICAgICkudG9FcXVhbChleHBlY3RlZFJlc3VsdCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBTZXJ2ZXIgc3VjY2VzcyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSBzdGF0ZS5zZXQoZm9ybU5hbWUsIHtcbiAgICAgIFtTRVJWRVJfRVJST1JdOiAnJyxcbiAgICAgIFtSRVNVTFRdOiAnJyxcbiAgICAgIFtTVUJNSVRfU1VDQ0VTU106IHRydWUsXG4gICAgfSk7XG4gICAgZXhwZWN0KFxuICAgICAgcmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBzdWJtaXRGb3JtU3VjY2VlZCgnJywgcGFnZU5hbWUsIGZvcm1OYW1lKSlcbiAgICApLnRvRXF1YWwoZXhwZWN0ZWRSZXN1bHQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgc3VibWl0Rm9ybSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSBzdGF0ZS5zZXQoZm9ybU5hbWUsIHtcbiAgICAgIFtTRVJWRVJfRVJST1JdOiAnJyxcbiAgICAgIFtTVUJNSVRfU1VDQ0VTU106IGZhbHNlLFxuICAgIH0pO1xuICAgIGV4cGVjdChyZWdpc3RlclJlZHVjZXIoc3RhdGUsIHN1Ym1pdEZvcm0oe30sIHBhZ2VOYW1lLCBmb3JtTmFtZSkpKS50b0VxdWFsKFxuICAgICAgZXhwZWN0ZWRSZXN1bHRcbiAgICApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgYWNrbm93bGVkZ2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IGV4cGVjdGVkUmVzdWx0ID0gc3RhdGUuZGVsZXRlKGZvcm1OYW1lKTtcbiAgICBleHBlY3QocmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBhY2tub3dsZWRnZShmb3JtTmFtZSkpKS50b0VxdWFsKFxuICAgICAgZXhwZWN0ZWRSZXN1bHRcbiAgICApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgY2xlYW51cCBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcihzdGF0ZSwgY2xlYW51cCgpKSkudG9FcXVhbChcbiAgICAgIGZyb21KUyh7fSlcbiAgICApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgb3RoZXIgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IG1vY2tBY3Rpb24gPSB7IHR5cGU6ICdvdGhlcicgfTtcbiAgICBleHBlY3QocmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBtb2NrQWN0aW9uKSkudG9FcXVhbChzdGF0ZSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBvdGhlciBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgbW9ja0FjdGlvbiA9IHsgdHlwZTogJ290aGVyJyB9O1xuICAgIGV4cGVjdChyZWdpc3RlclJlZHVjZXIodW5kZWZpbmVkLCBtb2NrQWN0aW9uKSkudG9FcXVhbChzdGF0ZSk7XG4gIH0pO1xufSk7XG4iXX0=