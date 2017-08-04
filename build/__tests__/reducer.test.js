'use strict';

var _immutable = require('immutable');

var _actions = require('../actions');

var _constants = require('../constants');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('registerReducer', function () {
  var formName = 'testName';
  var pageName = 'testPage';
  var state = void 0;
  beforeEach(function () {
    state = (0, _immutable.fromJS)(_defineProperty({}, _constants.VARIABLES, {}));
  });

  it('should exist', function () {
    expect(_reducer2.default);
  });
  it('should set Server error correctly', function () {
    var _state$set;

    var serverError = 'error';
    var expectedResult = state.set(formName, (_state$set = {}, _defineProperty(_state$set, _constants.SERVER_ERROR, serverError), _defineProperty(_state$set, _constants.SUBMIT_SUCCESS, false), _state$set));
    expect((0, _reducer2.default)(state, (0, _actions.submitFormFailed)(serverError, pageName, formName))).toEqual(expectedResult);
  });
  it('should set Server success correctly', function () {
    var _state$set2;

    var expectedResult = state.set(formName, (_state$set2 = {}, _defineProperty(_state$set2, _constants.SERVER_ERROR, ''), _defineProperty(_state$set2, _constants.RESULT, ''), _defineProperty(_state$set2, _constants.SUBMIT_SUCCESS, true), _state$set2));
    expect((0, _reducer2.default)(state, (0, _actions.submitFormSucceed)('', pageName, formName))).toEqual(expectedResult);
  });
  it('should set submitForm correctly', function () {
    var _state$set3;

    var expectedResult = state.set(formName, (_state$set3 = {}, _defineProperty(_state$set3, _constants.SERVER_ERROR, ''), _defineProperty(_state$set3, _constants.SUBMIT_SUCCESS, false), _state$set3));
    expect((0, _reducer2.default)(state, (0, _actions.submitForm)({}, pageName, formName))).toEqual(expectedResult);
  });
  it('should set acknowledge correctly', function () {
    var expectedResult = state.delete(formName);
    expect((0, _reducer2.default)(state, (0, _actions.acknowledge)(formName))).toEqual(expectedResult);
  });
  it('should set cleanup correctly', function () {
    expect((0, _reducer2.default)(state, (0, _actions.cleanup)())).toEqual((0, _immutable.fromJS)(_defineProperty({}, _constants.VARIABLES, {})));
  });
  it('should set other correctly', function () {
    var mockAction = { type: 'other' };
    expect((0, _reducer2.default)(state, mockAction)).toEqual(state);
  });
  it('should set other correctly', function () {
    var mockAction = { type: 'other' };
    expect((0, _reducer2.default)(undefined, mockAction)).toEqual(state);
  });
  it('should set REDUX_SET correctly', function () {
    var key = 'keyyy';
    var value = 'valueee';

    var expectedResult = state.merge(_defineProperty({}, _constants.VARIABLES, state.get(_constants.VARIABLES).concat(_defineProperty({}, key, value))));
    var mockAction = { type: 'REDUX_SET', key: key, value: value };
    expect((0, _reducer2.default)(state, mockAction)).toEqual(expectedResult);
  });
  it('should set REDUX_SET_FN correctly', function () {
    var key = 'keyyy';
    var func = function func(data) {
      return data;
    };

    var expectedResult = state.merge(_defineProperty({}, _constants.VARIABLES, state.get(_constants.VARIABLES).concat(_defineProperty({}, key, func(state.get(_constants.VARIABLES).get(key))))));
    var mockAction = { type: 'REDUX_SET_FN', key: key, func: func };
    expect((0, _reducer2.default)(state, mockAction)).toEqual(expectedResult);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vcmVkdWNlci50ZXN0LmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiZm9ybU5hbWUiLCJwYWdlTmFtZSIsInN0YXRlIiwiYmVmb3JlRWFjaCIsIml0IiwiZXhwZWN0Iiwic2VydmVyRXJyb3IiLCJleHBlY3RlZFJlc3VsdCIsInNldCIsInRvRXF1YWwiLCJkZWxldGUiLCJtb2NrQWN0aW9uIiwidHlwZSIsInVuZGVmaW5lZCIsImtleSIsInZhbHVlIiwibWVyZ2UiLCJnZXQiLCJjb25jYXQiLCJmdW5jIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQUEsU0FBUyxpQkFBVCxFQUE0QixZQUFNO0FBQ2hDLE1BQU1DLFdBQVcsVUFBakI7QUFDQSxNQUFNQyxXQUFXLFVBQWpCO0FBQ0EsTUFBSUMsY0FBSjtBQUNBQyxhQUFXLFlBQU07QUFDZkQsWUFBUSxpRUFDTyxFQURQLEVBQVI7QUFHRCxHQUpEOztBQU1BRSxLQUFHLGNBQUgsRUFBbUIsWUFBTTtBQUN2QkM7QUFDRCxHQUZEO0FBR0FELEtBQUcsbUNBQUgsRUFBd0MsWUFBTTtBQUFBOztBQUM1QyxRQUFNRSxjQUFjLE9BQXBCO0FBQ0EsUUFBTUMsaUJBQWlCTCxNQUFNTSxHQUFOLENBQVVSLFFBQVYseUVBQ0xNLFdBREssMERBRUgsS0FGRyxlQUF2QjtBQUlBRCxXQUNFLHVCQUFnQkgsS0FBaEIsRUFBdUIsK0JBQWlCSSxXQUFqQixFQUE4QkwsUUFBOUIsRUFBd0NELFFBQXhDLENBQXZCLENBREYsRUFFRVMsT0FGRixDQUVVRixjQUZWO0FBR0QsR0FURDtBQVVBSCxLQUFHLHFDQUFILEVBQTBDLFlBQU07QUFBQTs7QUFDOUMsUUFBTUcsaUJBQWlCTCxNQUFNTSxHQUFOLENBQVVSLFFBQVYsMkVBQ0wsRUFESyxtREFFWCxFQUZXLDJEQUdILElBSEcsZ0JBQXZCO0FBS0FLLFdBQ0UsdUJBQWdCSCxLQUFoQixFQUF1QixnQ0FBa0IsRUFBbEIsRUFBc0JELFFBQXRCLEVBQWdDRCxRQUFoQyxDQUF2QixDQURGLEVBRUVTLE9BRkYsQ0FFVUYsY0FGVjtBQUdELEdBVEQ7QUFVQUgsS0FBRyxpQ0FBSCxFQUFzQyxZQUFNO0FBQUE7O0FBQzFDLFFBQU1HLGlCQUFpQkwsTUFBTU0sR0FBTixDQUFVUixRQUFWLDJFQUNMLEVBREssMkRBRUgsS0FGRyxnQkFBdkI7QUFJQUssV0FBTyx1QkFBZ0JILEtBQWhCLEVBQXVCLHlCQUFXLEVBQVgsRUFBZUQsUUFBZixFQUF5QkQsUUFBekIsQ0FBdkIsQ0FBUCxFQUFtRVMsT0FBbkUsQ0FDRUYsY0FERjtBQUdELEdBUkQ7QUFTQUgsS0FBRyxrQ0FBSCxFQUF1QyxZQUFNO0FBQzNDLFFBQU1HLGlCQUFpQkwsTUFBTVEsTUFBTixDQUFhVixRQUFiLENBQXZCO0FBQ0FLLFdBQU8sdUJBQWdCSCxLQUFoQixFQUF1QiwwQkFBWUYsUUFBWixDQUF2QixDQUFQLEVBQXNEUyxPQUF0RCxDQUNFRixjQURGO0FBR0QsR0FMRDtBQU1BSCxLQUFHLDhCQUFILEVBQW1DLFlBQU07QUFDdkNDLFdBQU8sdUJBQWdCSCxLQUFoQixFQUF1Qix1QkFBdkIsQ0FBUCxFQUEwQ08sT0FBMUMsQ0FDRSxpRUFBc0IsRUFBdEIsRUFERjtBQUdELEdBSkQ7QUFLQUwsS0FBRyw0QkFBSCxFQUFpQyxZQUFNO0FBQ3JDLFFBQU1PLGFBQWEsRUFBRUMsTUFBTSxPQUFSLEVBQW5CO0FBQ0FQLFdBQU8sdUJBQWdCSCxLQUFoQixFQUF1QlMsVUFBdkIsQ0FBUCxFQUEyQ0YsT0FBM0MsQ0FBbURQLEtBQW5EO0FBQ0QsR0FIRDtBQUlBRSxLQUFHLDRCQUFILEVBQWlDLFlBQU07QUFDckMsUUFBTU8sYUFBYSxFQUFFQyxNQUFNLE9BQVIsRUFBbkI7QUFDQVAsV0FBTyx1QkFBZ0JRLFNBQWhCLEVBQTJCRixVQUEzQixDQUFQLEVBQStDRixPQUEvQyxDQUF1RFAsS0FBdkQ7QUFDRCxHQUhEO0FBSUFFLEtBQUcsZ0NBQUgsRUFBcUMsWUFBTTtBQUN6QyxRQUFNVSxNQUFNLE9BQVo7QUFDQSxRQUFNQyxRQUFRLFNBQWQ7O0FBRUEsUUFBTVIsaUJBQWlCTCxNQUFNYyxLQUFOLDJDQUNSZCxNQUFNZSxHQUFOLHVCQUFxQkMsTUFBckIscUJBQStCSixHQUEvQixFQUFxQ0MsS0FBckMsRUFEUSxFQUF2QjtBQUdBLFFBQU1KLGFBQWEsRUFBRUMsTUFBTSxXQUFSLEVBQXFCRSxRQUFyQixFQUEwQkMsWUFBMUIsRUFBbkI7QUFDQVYsV0FBTyx1QkFBZ0JILEtBQWhCLEVBQXVCUyxVQUF2QixDQUFQLEVBQTJDRixPQUEzQyxDQUFtREYsY0FBbkQ7QUFDRCxHQVREO0FBVUFILEtBQUcsbUNBQUgsRUFBd0MsWUFBTTtBQUM1QyxRQUFNVSxNQUFNLE9BQVo7QUFDQSxRQUFNSyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsSUFBRDtBQUFBLGFBQVVBLElBQVY7QUFBQSxLQUFiOztBQUVBLFFBQU1iLGlCQUFpQkwsTUFBTWMsS0FBTiwyQ0FDUmQsTUFBTWUsR0FBTix1QkFBcUJDLE1BQXJCLHFCQUNWSixHQURVLEVBQ0pLLEtBQUtqQixNQUFNZSxHQUFOLHVCQUFxQkEsR0FBckIsQ0FBeUJILEdBQXpCLENBQUwsQ0FESSxFQURRLEVBQXZCO0FBS0EsUUFBTUgsYUFBYSxFQUFFQyxNQUFNLGNBQVIsRUFBd0JFLFFBQXhCLEVBQTZCSyxVQUE3QixFQUFuQjtBQUNBZCxXQUFPLHVCQUFnQkgsS0FBaEIsRUFBdUJTLFVBQXZCLENBQVAsRUFBMkNGLE9BQTNDLENBQW1ERixjQUFuRDtBQUNELEdBWEQ7QUFZRCxDQW5GRCIsImZpbGUiOiJyZWR1Y2VyLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgYWNrbm93bGVkZ2UsIGNsZWFudXAsIHN1Ym1pdEZvcm0sIHN1Ym1pdEZvcm1GYWlsZWQsIHN1Ym1pdEZvcm1TdWNjZWVkIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBSRVNVTFQsIFNFUlZFUl9FUlJPUiwgU1VCTUlUX1NVQ0NFU1MsIFZBUklBQkxFUyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgcmVnaXN0ZXJSZWR1Y2VyIGZyb20gJy4uL3JlZHVjZXInO1xuXG5kZXNjcmliZSgncmVnaXN0ZXJSZWR1Y2VyJywgKCkgPT4ge1xuICBjb25zdCBmb3JtTmFtZSA9ICd0ZXN0TmFtZSc7XG4gIGNvbnN0IHBhZ2VOYW1lID0gJ3Rlc3RQYWdlJztcbiAgbGV0IHN0YXRlO1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzdGF0ZSA9IGZyb21KUyh7XG4gICAgICBbVkFSSUFCTEVTXToge30sXG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZXhpc3QnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcik7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBTZXJ2ZXIgZXJyb3IgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IHNlcnZlckVycm9yID0gJ2Vycm9yJztcbiAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IHN0YXRlLnNldChmb3JtTmFtZSwge1xuICAgICAgW1NFUlZFUl9FUlJPUl06IHNlcnZlckVycm9yLFxuICAgICAgW1NVQk1JVF9TVUNDRVNTXTogZmFsc2UsXG4gICAgfSk7XG4gICAgZXhwZWN0KFxuICAgICAgcmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBzdWJtaXRGb3JtRmFpbGVkKHNlcnZlckVycm9yLCBwYWdlTmFtZSwgZm9ybU5hbWUpKVxuICAgICkudG9FcXVhbChleHBlY3RlZFJlc3VsdCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBTZXJ2ZXIgc3VjY2VzcyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSBzdGF0ZS5zZXQoZm9ybU5hbWUsIHtcbiAgICAgIFtTRVJWRVJfRVJST1JdOiAnJyxcbiAgICAgIFtSRVNVTFRdOiAnJyxcbiAgICAgIFtTVUJNSVRfU1VDQ0VTU106IHRydWUsXG4gICAgfSk7XG4gICAgZXhwZWN0KFxuICAgICAgcmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBzdWJtaXRGb3JtU3VjY2VlZCgnJywgcGFnZU5hbWUsIGZvcm1OYW1lKSlcbiAgICApLnRvRXF1YWwoZXhwZWN0ZWRSZXN1bHQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgc3VibWl0Rm9ybSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSBzdGF0ZS5zZXQoZm9ybU5hbWUsIHtcbiAgICAgIFtTRVJWRVJfRVJST1JdOiAnJyxcbiAgICAgIFtTVUJNSVRfU1VDQ0VTU106IGZhbHNlLFxuICAgIH0pO1xuICAgIGV4cGVjdChyZWdpc3RlclJlZHVjZXIoc3RhdGUsIHN1Ym1pdEZvcm0oe30sIHBhZ2VOYW1lLCBmb3JtTmFtZSkpKS50b0VxdWFsKFxuICAgICAgZXhwZWN0ZWRSZXN1bHRcbiAgICApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgYWNrbm93bGVkZ2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IGV4cGVjdGVkUmVzdWx0ID0gc3RhdGUuZGVsZXRlKGZvcm1OYW1lKTtcbiAgICBleHBlY3QocmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBhY2tub3dsZWRnZShmb3JtTmFtZSkpKS50b0VxdWFsKFxuICAgICAgZXhwZWN0ZWRSZXN1bHRcbiAgICApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgY2xlYW51cCBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcihzdGF0ZSwgY2xlYW51cCgpKSkudG9FcXVhbChcbiAgICAgIGZyb21KUyh7IFtWQVJJQUJMRVNdOiB7fSB9KVxuICAgICk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBvdGhlciBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgbW9ja0FjdGlvbiA9IHsgdHlwZTogJ290aGVyJyB9O1xuICAgIGV4cGVjdChyZWdpc3RlclJlZHVjZXIoc3RhdGUsIG1vY2tBY3Rpb24pKS50b0VxdWFsKHN0YXRlKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2V0IG90aGVyIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBjb25zdCBtb2NrQWN0aW9uID0geyB0eXBlOiAnb3RoZXInIH07XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcih1bmRlZmluZWQsIG1vY2tBY3Rpb24pKS50b0VxdWFsKHN0YXRlKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2V0IFJFRFVYX1NFVCBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gJ2tleXl5JztcbiAgICBjb25zdCB2YWx1ZSA9ICd2YWx1ZWVlJztcblxuICAgIGNvbnN0IGV4cGVjdGVkUmVzdWx0ID0gc3RhdGUubWVyZ2Uoe1xuICAgICAgW1ZBUklBQkxFU106IHN0YXRlLmdldChWQVJJQUJMRVMpLmNvbmNhdCh7IFtrZXldOiB2YWx1ZSB9KSxcbiAgICB9KTtcbiAgICBjb25zdCBtb2NrQWN0aW9uID0geyB0eXBlOiAnUkVEVVhfU0VUJywga2V5LCB2YWx1ZSB9O1xuICAgIGV4cGVjdChyZWdpc3RlclJlZHVjZXIoc3RhdGUsIG1vY2tBY3Rpb24pKS50b0VxdWFsKGV4cGVjdGVkUmVzdWx0KTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2V0IFJFRFVYX1NFVF9GTiBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gJ2tleXl5JztcbiAgICBjb25zdCBmdW5jID0gKGRhdGEpID0+IGRhdGE7XG5cbiAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IHN0YXRlLm1lcmdlKHtcbiAgICAgIFtWQVJJQUJMRVNdOiBzdGF0ZS5nZXQoVkFSSUFCTEVTKS5jb25jYXQoe1xuICAgICAgICBba2V5XTogZnVuYyhzdGF0ZS5nZXQoVkFSSUFCTEVTKS5nZXQoa2V5KSksXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBjb25zdCBtb2NrQWN0aW9uID0geyB0eXBlOiAnUkVEVVhfU0VUX0ZOJywga2V5LCBmdW5jIH07XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcihzdGF0ZSwgbW9ja0FjdGlvbikpLnRvRXF1YWwoZXhwZWN0ZWRSZXN1bHQpO1xuICB9KTtcbn0pO1xuIl19