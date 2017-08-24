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
  var payload = 'payload';
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
    var expectedResult = state.set(formName, (_state$set = {}, _defineProperty(_state$set, _constants.SERVER_ERROR, serverError), _defineProperty(_state$set, _constants.SUBMIT_SUCCESS, false), _defineProperty(_state$set, _constants.PAYLOAD, payload), _defineProperty(_state$set, _constants.IS_LOADING, false), _state$set));
    expect((0, _reducer2.default)(state, (0, _actions.submitFormFailed)(serverError, payload, pageName, formName))).toEqual(expectedResult);
  });
  it('should set Server success correctly', function () {
    var _state$set2;

    var expectedResult = state.set(formName, (_state$set2 = {}, _defineProperty(_state$set2, _constants.SERVER_ERROR, ''), _defineProperty(_state$set2, _constants.RESULT, ''), _defineProperty(_state$set2, _constants.PAYLOAD, payload), _defineProperty(_state$set2, _constants.SUBMIT_SUCCESS, true), _defineProperty(_state$set2, _constants.IS_LOADING, false), _state$set2));
    expect((0, _reducer2.default)(state, (0, _actions.submitFormSucceed)('', payload, pageName, formName))).toEqual(expectedResult);
  });
  it('should set submitForm correctly', function () {
    var _state$set3;

    var expectedResult = state.set(formName, (_state$set3 = {}, _defineProperty(_state$set3, _constants.SERVER_ERROR, ''), _defineProperty(_state$set3, _constants.SUBMIT_SUCCESS, false), _defineProperty(_state$set3, _constants.RESULT, false), _defineProperty(_state$set3, _constants.IS_LOADING, true), _state$set3));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vcmVkdWNlci50ZXN0LmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiZm9ybU5hbWUiLCJwYWdlTmFtZSIsInBheWxvYWQiLCJzdGF0ZSIsImJlZm9yZUVhY2giLCJpdCIsImV4cGVjdCIsInNlcnZlckVycm9yIiwiZXhwZWN0ZWRSZXN1bHQiLCJzZXQiLCJ0b0VxdWFsIiwiZGVsZXRlIiwibW9ja0FjdGlvbiIsInR5cGUiLCJ1bmRlZmluZWQiLCJrZXkiLCJ2YWx1ZSIsIm1lcmdlIiwiZ2V0IiwiY29uY2F0IiwiZnVuYyIsImRhdGEiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUFBLFNBQVMsaUJBQVQsRUFBNEIsWUFBTTtBQUNoQyxNQUFNQyxXQUFXLFVBQWpCO0FBQ0EsTUFBTUMsV0FBVyxVQUFqQjtBQUNBLE1BQU1DLFVBQVUsU0FBaEI7QUFDQSxNQUFJQyxjQUFKO0FBQ0FDLGFBQVcsWUFBTTtBQUNmRCxZQUFRLGlFQUNPLEVBRFAsRUFBUjtBQUdELEdBSkQ7O0FBTUFFLEtBQUcsY0FBSCxFQUFtQixZQUFNO0FBQ3ZCQztBQUNELEdBRkQ7QUFHQUQsS0FBRyxtQ0FBSCxFQUF3QyxZQUFNO0FBQUE7O0FBQzVDLFFBQU1FLGNBQWMsT0FBcEI7QUFDQSxRQUFNQyxpQkFBaUJMLE1BQU1NLEdBQU4sQ0FBVVQsUUFBVix5RUFDTE8sV0FESywwREFFSCxLQUZHLG1EQUdWTCxPQUhVLHNEQUlQLEtBSk8sZUFBdkI7QUFNQUksV0FDRSx1QkFBZ0JILEtBQWhCLEVBQXVCLCtCQUFpQkksV0FBakIsRUFBOEJMLE9BQTlCLEVBQXVDRCxRQUF2QyxFQUFpREQsUUFBakQsQ0FBdkIsQ0FERixFQUVFVSxPQUZGLENBRVVGLGNBRlY7QUFHRCxHQVhEO0FBWUFILEtBQUcscUNBQUgsRUFBMEMsWUFBTTtBQUFBOztBQUM5QyxRQUFNRyxpQkFBaUJMLE1BQU1NLEdBQU4sQ0FBVVQsUUFBViwyRUFDTCxFQURLLG1EQUVYLEVBRlcsb0RBR1ZFLE9BSFUsMkRBSUgsSUFKRyx1REFLUCxLQUxPLGdCQUF2QjtBQU9BSSxXQUNFLHVCQUFnQkgsS0FBaEIsRUFBdUIsZ0NBQWtCLEVBQWxCLEVBQXNCRCxPQUF0QixFQUErQkQsUUFBL0IsRUFBeUNELFFBQXpDLENBQXZCLENBREYsRUFFRVUsT0FGRixDQUVVRixjQUZWO0FBR0QsR0FYRDtBQVlBSCxLQUFHLGlDQUFILEVBQXNDLFlBQU07QUFBQTs7QUFDMUMsUUFBTUcsaUJBQWlCTCxNQUFNTSxHQUFOLENBQVVULFFBQVYsMkVBQ0wsRUFESywyREFFSCxLQUZHLG1EQUdYLEtBSFcsdURBSVAsSUFKTyxnQkFBdkI7QUFNQU0sV0FBTyx1QkFBZ0JILEtBQWhCLEVBQXVCLHlCQUFXLEVBQVgsRUFBZUYsUUFBZixFQUF5QkQsUUFBekIsQ0FBdkIsQ0FBUCxFQUFtRVUsT0FBbkUsQ0FDRUYsY0FERjtBQUdELEdBVkQ7QUFXQUgsS0FBRyxrQ0FBSCxFQUF1QyxZQUFNO0FBQzNDLFFBQU1HLGlCQUFpQkwsTUFBTVEsTUFBTixDQUFhWCxRQUFiLENBQXZCO0FBQ0FNLFdBQU8sdUJBQWdCSCxLQUFoQixFQUF1QiwwQkFBWUgsUUFBWixDQUF2QixDQUFQLEVBQXNEVSxPQUF0RCxDQUNFRixjQURGO0FBR0QsR0FMRDtBQU1BSCxLQUFHLDhCQUFILEVBQW1DLFlBQU07QUFDdkNDLFdBQU8sdUJBQWdCSCxLQUFoQixFQUF1Qix1QkFBdkIsQ0FBUCxFQUEwQ08sT0FBMUMsQ0FDRSxpRUFBc0IsRUFBdEIsRUFERjtBQUdELEdBSkQ7QUFLQUwsS0FBRyw0QkFBSCxFQUFpQyxZQUFNO0FBQ3JDLFFBQU1PLGFBQWEsRUFBRUMsTUFBTSxPQUFSLEVBQW5CO0FBQ0FQLFdBQU8sdUJBQWdCSCxLQUFoQixFQUF1QlMsVUFBdkIsQ0FBUCxFQUEyQ0YsT0FBM0MsQ0FBbURQLEtBQW5EO0FBQ0QsR0FIRDtBQUlBRSxLQUFHLDRCQUFILEVBQWlDLFlBQU07QUFDckMsUUFBTU8sYUFBYSxFQUFFQyxNQUFNLE9BQVIsRUFBbkI7QUFDQVAsV0FBTyx1QkFBZ0JRLFNBQWhCLEVBQTJCRixVQUEzQixDQUFQLEVBQStDRixPQUEvQyxDQUF1RFAsS0FBdkQ7QUFDRCxHQUhEO0FBSUFFLEtBQUcsZ0NBQUgsRUFBcUMsWUFBTTtBQUN6QyxRQUFNVSxNQUFNLE9BQVo7QUFDQSxRQUFNQyxRQUFRLFNBQWQ7O0FBRUEsUUFBTVIsaUJBQWlCTCxNQUFNYyxLQUFOLDJDQUNSZCxNQUFNZSxHQUFOLHVCQUFxQkMsTUFBckIscUJBQStCSixHQUEvQixFQUFxQ0MsS0FBckMsRUFEUSxFQUF2QjtBQUdBLFFBQU1KLGFBQWEsRUFBRUMsTUFBTSxXQUFSLEVBQXFCRSxRQUFyQixFQUEwQkMsWUFBMUIsRUFBbkI7QUFDQVYsV0FBTyx1QkFBZ0JILEtBQWhCLEVBQXVCUyxVQUF2QixDQUFQLEVBQTJDRixPQUEzQyxDQUFtREYsY0FBbkQ7QUFDRCxHQVREO0FBVUFILEtBQUcsbUNBQUgsRUFBd0MsWUFBTTtBQUM1QyxRQUFNVSxNQUFNLE9BQVo7QUFDQSxRQUFNSyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsSUFBRDtBQUFBLGFBQVVBLElBQVY7QUFBQSxLQUFiOztBQUVBLFFBQU1iLGlCQUFpQkwsTUFBTWMsS0FBTiwyQ0FDUmQsTUFBTWUsR0FBTix1QkFBcUJDLE1BQXJCLHFCQUNWSixHQURVLEVBQ0pLLEtBQUtqQixNQUFNZSxHQUFOLHVCQUFxQkEsR0FBckIsQ0FBeUJILEdBQXpCLENBQUwsQ0FESSxFQURRLEVBQXZCO0FBS0EsUUFBTUgsYUFBYSxFQUFFQyxNQUFNLGNBQVIsRUFBd0JFLFFBQXhCLEVBQTZCSyxVQUE3QixFQUFuQjtBQUNBZCxXQUFPLHVCQUFnQkgsS0FBaEIsRUFBdUJTLFVBQXZCLENBQVAsRUFBMkNGLE9BQTNDLENBQW1ERixjQUFuRDtBQUNELEdBWEQ7QUFZRCxDQTFGRCIsImZpbGUiOiJyZWR1Y2VyLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgYWNrbm93bGVkZ2UsIGNsZWFudXAsIHN1Ym1pdEZvcm0sIHN1Ym1pdEZvcm1GYWlsZWQsIHN1Ym1pdEZvcm1TdWNjZWVkIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBSRVNVTFQsIFNFUlZFUl9FUlJPUiwgU1VCTUlUX1NVQ0NFU1MsIFZBUklBQkxFUywgSVNfTE9BRElORywgUEFZTE9BRCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgcmVnaXN0ZXJSZWR1Y2VyIGZyb20gJy4uL3JlZHVjZXInO1xuXG5kZXNjcmliZSgncmVnaXN0ZXJSZWR1Y2VyJywgKCkgPT4ge1xuICBjb25zdCBmb3JtTmFtZSA9ICd0ZXN0TmFtZSc7XG4gIGNvbnN0IHBhZ2VOYW1lID0gJ3Rlc3RQYWdlJztcbiAgY29uc3QgcGF5bG9hZCA9ICdwYXlsb2FkJztcbiAgbGV0IHN0YXRlO1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzdGF0ZSA9IGZyb21KUyh7XG4gICAgICBbVkFSSUFCTEVTXToge30sXG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZXhpc3QnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcik7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBTZXJ2ZXIgZXJyb3IgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IHNlcnZlckVycm9yID0gJ2Vycm9yJztcbiAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IHN0YXRlLnNldChmb3JtTmFtZSwge1xuICAgICAgW1NFUlZFUl9FUlJPUl06IHNlcnZlckVycm9yLFxuICAgICAgW1NVQk1JVF9TVUNDRVNTXTogZmFsc2UsXG4gICAgICBbUEFZTE9BRF06IHBheWxvYWQsXG4gICAgICBbSVNfTE9BRElOR106IGZhbHNlLFxuICAgIH0pO1xuICAgIGV4cGVjdChcbiAgICAgIHJlZ2lzdGVyUmVkdWNlcihzdGF0ZSwgc3VibWl0Rm9ybUZhaWxlZChzZXJ2ZXJFcnJvciwgcGF5bG9hZCwgcGFnZU5hbWUsIGZvcm1OYW1lKSlcbiAgICApLnRvRXF1YWwoZXhwZWN0ZWRSZXN1bHQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgU2VydmVyIHN1Y2Nlc3MgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IGV4cGVjdGVkUmVzdWx0ID0gc3RhdGUuc2V0KGZvcm1OYW1lLCB7XG4gICAgICBbU0VSVkVSX0VSUk9SXTogJycsXG4gICAgICBbUkVTVUxUXTogJycsXG4gICAgICBbUEFZTE9BRF06IHBheWxvYWQsXG4gICAgICBbU1VCTUlUX1NVQ0NFU1NdOiB0cnVlLFxuICAgICAgW0lTX0xPQURJTkddOiBmYWxzZSxcbiAgICB9KTtcbiAgICBleHBlY3QoXG4gICAgICByZWdpc3RlclJlZHVjZXIoc3RhdGUsIHN1Ym1pdEZvcm1TdWNjZWVkKCcnLCBwYXlsb2FkLCBwYWdlTmFtZSwgZm9ybU5hbWUpKVxuICAgICkudG9FcXVhbChleHBlY3RlZFJlc3VsdCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBzdWJtaXRGb3JtIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IHN0YXRlLnNldChmb3JtTmFtZSwge1xuICAgICAgW1NFUlZFUl9FUlJPUl06ICcnLFxuICAgICAgW1NVQk1JVF9TVUNDRVNTXTogZmFsc2UsXG4gICAgICBbUkVTVUxUXTogZmFsc2UsXG4gICAgICBbSVNfTE9BRElOR106IHRydWUsXG4gICAgfSk7XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcihzdGF0ZSwgc3VibWl0Rm9ybSh7fSwgcGFnZU5hbWUsIGZvcm1OYW1lKSkpLnRvRXF1YWwoXG4gICAgICBleHBlY3RlZFJlc3VsdFxuICAgICk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBhY2tub3dsZWRnZSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSBzdGF0ZS5kZWxldGUoZm9ybU5hbWUpO1xuICAgIGV4cGVjdChyZWdpc3RlclJlZHVjZXIoc3RhdGUsIGFja25vd2xlZGdlKGZvcm1OYW1lKSkpLnRvRXF1YWwoXG4gICAgICBleHBlY3RlZFJlc3VsdFxuICAgICk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBjbGVhbnVwIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBleHBlY3QocmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBjbGVhbnVwKCkpKS50b0VxdWFsKFxuICAgICAgZnJvbUpTKHsgW1ZBUklBQkxFU106IHt9IH0pXG4gICAgKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2V0IG90aGVyIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBjb25zdCBtb2NrQWN0aW9uID0geyB0eXBlOiAnb3RoZXInIH07XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcihzdGF0ZSwgbW9ja0FjdGlvbikpLnRvRXF1YWwoc3RhdGUpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgb3RoZXIgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IG1vY2tBY3Rpb24gPSB7IHR5cGU6ICdvdGhlcicgfTtcbiAgICBleHBlY3QocmVnaXN0ZXJSZWR1Y2VyKHVuZGVmaW5lZCwgbW9ja0FjdGlvbikpLnRvRXF1YWwoc3RhdGUpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgUkVEVVhfU0VUIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBjb25zdCBrZXkgPSAna2V5eXknO1xuICAgIGNvbnN0IHZhbHVlID0gJ3ZhbHVlZWUnO1xuXG4gICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSBzdGF0ZS5tZXJnZSh7XG4gICAgICBbVkFSSUFCTEVTXTogc3RhdGUuZ2V0KFZBUklBQkxFUykuY29uY2F0KHsgW2tleV06IHZhbHVlIH0pLFxuICAgIH0pO1xuICAgIGNvbnN0IG1vY2tBY3Rpb24gPSB7IHR5cGU6ICdSRURVWF9TRVQnLCBrZXksIHZhbHVlIH07XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcihzdGF0ZSwgbW9ja0FjdGlvbikpLnRvRXF1YWwoZXhwZWN0ZWRSZXN1bHQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgUkVEVVhfU0VUX0ZOIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBjb25zdCBrZXkgPSAna2V5eXknO1xuICAgIGNvbnN0IGZ1bmMgPSAoZGF0YSkgPT4gZGF0YTtcblxuICAgIGNvbnN0IGV4cGVjdGVkUmVzdWx0ID0gc3RhdGUubWVyZ2Uoe1xuICAgICAgW1ZBUklBQkxFU106IHN0YXRlLmdldChWQVJJQUJMRVMpLmNvbmNhdCh7XG4gICAgICAgIFtrZXldOiBmdW5jKHN0YXRlLmdldChWQVJJQUJMRVMpLmdldChrZXkpKSxcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIGNvbnN0IG1vY2tBY3Rpb24gPSB7IHR5cGU6ICdSRURVWF9TRVRfRk4nLCBrZXksIGZ1bmMgfTtcbiAgICBleHBlY3QocmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBtb2NrQWN0aW9uKSkudG9FcXVhbChleHBlY3RlZFJlc3VsdCk7XG4gIH0pO1xufSk7XG4iXX0=