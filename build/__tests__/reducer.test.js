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
    var expectedResult = state.set(formName, (_state$set = {}, _defineProperty(_state$set, _constants.SERVER_ERROR, serverError), _defineProperty(_state$set, _constants.SUBMIT_SUCCESS, false), _defineProperty(_state$set, _constants.IS_LOADING, false), _state$set));
    expect((0, _reducer2.default)(state, (0, _actions.submitFormFailed)(serverError, pageName, formName))).toEqual(expectedResult);
  });
  it('should set Server success correctly', function () {
    var _state$set2;

    var expectedResult = state.set(formName, (_state$set2 = {}, _defineProperty(_state$set2, _constants.SERVER_ERROR, ''), _defineProperty(_state$set2, _constants.RESULT, ''), _defineProperty(_state$set2, _constants.SUBMIT_SUCCESS, true), _defineProperty(_state$set2, _constants.IS_LOADING, false), _state$set2));
    expect((0, _reducer2.default)(state, (0, _actions.submitFormSucceed)('', pageName, formName))).toEqual(expectedResult);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vcmVkdWNlci50ZXN0LmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiZm9ybU5hbWUiLCJwYWdlTmFtZSIsInN0YXRlIiwiYmVmb3JlRWFjaCIsIml0IiwiZXhwZWN0Iiwic2VydmVyRXJyb3IiLCJleHBlY3RlZFJlc3VsdCIsInNldCIsInRvRXF1YWwiLCJkZWxldGUiLCJtb2NrQWN0aW9uIiwidHlwZSIsInVuZGVmaW5lZCIsImtleSIsInZhbHVlIiwibWVyZ2UiLCJnZXQiLCJjb25jYXQiLCJmdW5jIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQUEsU0FBUyxpQkFBVCxFQUE0QixZQUFNO0FBQ2hDLE1BQU1DLFdBQVcsVUFBakI7QUFDQSxNQUFNQyxXQUFXLFVBQWpCO0FBQ0EsTUFBSUMsY0FBSjtBQUNBQyxhQUFXLFlBQU07QUFDZkQsWUFBUSxpRUFDTyxFQURQLEVBQVI7QUFHRCxHQUpEOztBQU1BRSxLQUFHLGNBQUgsRUFBbUIsWUFBTTtBQUN2QkM7QUFDRCxHQUZEO0FBR0FELEtBQUcsbUNBQUgsRUFBd0MsWUFBTTtBQUFBOztBQUM1QyxRQUFNRSxjQUFjLE9BQXBCO0FBQ0EsUUFBTUMsaUJBQWlCTCxNQUFNTSxHQUFOLENBQVVSLFFBQVYseUVBQ0xNLFdBREssMERBRUgsS0FGRyxzREFHUCxLQUhPLGVBQXZCO0FBS0FELFdBQ0UsdUJBQWdCSCxLQUFoQixFQUF1QiwrQkFBaUJJLFdBQWpCLEVBQThCTCxRQUE5QixFQUF3Q0QsUUFBeEMsQ0FBdkIsQ0FERixFQUVFUyxPQUZGLENBRVVGLGNBRlY7QUFHRCxHQVZEO0FBV0FILEtBQUcscUNBQUgsRUFBMEMsWUFBTTtBQUFBOztBQUM5QyxRQUFNRyxpQkFBaUJMLE1BQU1NLEdBQU4sQ0FBVVIsUUFBViwyRUFDTCxFQURLLG1EQUVYLEVBRlcsMkRBR0gsSUFIRyx1REFJUCxLQUpPLGdCQUF2QjtBQU1BSyxXQUNFLHVCQUFnQkgsS0FBaEIsRUFBdUIsZ0NBQWtCLEVBQWxCLEVBQXNCRCxRQUF0QixFQUFnQ0QsUUFBaEMsQ0FBdkIsQ0FERixFQUVFUyxPQUZGLENBRVVGLGNBRlY7QUFHRCxHQVZEO0FBV0FILEtBQUcsaUNBQUgsRUFBc0MsWUFBTTtBQUFBOztBQUMxQyxRQUFNRyxpQkFBaUJMLE1BQU1NLEdBQU4sQ0FBVVIsUUFBViwyRUFDTCxFQURLLDJEQUVILEtBRkcsbURBR1gsS0FIVyx1REFJUCxJQUpPLGdCQUF2QjtBQU1BSyxXQUFPLHVCQUFnQkgsS0FBaEIsRUFBdUIseUJBQVcsRUFBWCxFQUFlRCxRQUFmLEVBQXlCRCxRQUF6QixDQUF2QixDQUFQLEVBQW1FUyxPQUFuRSxDQUNFRixjQURGO0FBR0QsR0FWRDtBQVdBSCxLQUFHLGtDQUFILEVBQXVDLFlBQU07QUFDM0MsUUFBTUcsaUJBQWlCTCxNQUFNUSxNQUFOLENBQWFWLFFBQWIsQ0FBdkI7QUFDQUssV0FBTyx1QkFBZ0JILEtBQWhCLEVBQXVCLDBCQUFZRixRQUFaLENBQXZCLENBQVAsRUFBc0RTLE9BQXRELENBQ0VGLGNBREY7QUFHRCxHQUxEO0FBTUFILEtBQUcsOEJBQUgsRUFBbUMsWUFBTTtBQUN2Q0MsV0FBTyx1QkFBZ0JILEtBQWhCLEVBQXVCLHVCQUF2QixDQUFQLEVBQTBDTyxPQUExQyxDQUNFLGlFQUFzQixFQUF0QixFQURGO0FBR0QsR0FKRDtBQUtBTCxLQUFHLDRCQUFILEVBQWlDLFlBQU07QUFDckMsUUFBTU8sYUFBYSxFQUFFQyxNQUFNLE9BQVIsRUFBbkI7QUFDQVAsV0FBTyx1QkFBZ0JILEtBQWhCLEVBQXVCUyxVQUF2QixDQUFQLEVBQTJDRixPQUEzQyxDQUFtRFAsS0FBbkQ7QUFDRCxHQUhEO0FBSUFFLEtBQUcsNEJBQUgsRUFBaUMsWUFBTTtBQUNyQyxRQUFNTyxhQUFhLEVBQUVDLE1BQU0sT0FBUixFQUFuQjtBQUNBUCxXQUFPLHVCQUFnQlEsU0FBaEIsRUFBMkJGLFVBQTNCLENBQVAsRUFBK0NGLE9BQS9DLENBQXVEUCxLQUF2RDtBQUNELEdBSEQ7QUFJQUUsS0FBRyxnQ0FBSCxFQUFxQyxZQUFNO0FBQ3pDLFFBQU1VLE1BQU0sT0FBWjtBQUNBLFFBQU1DLFFBQVEsU0FBZDs7QUFFQSxRQUFNUixpQkFBaUJMLE1BQU1jLEtBQU4sMkNBQ1JkLE1BQU1lLEdBQU4sdUJBQXFCQyxNQUFyQixxQkFBK0JKLEdBQS9CLEVBQXFDQyxLQUFyQyxFQURRLEVBQXZCO0FBR0EsUUFBTUosYUFBYSxFQUFFQyxNQUFNLFdBQVIsRUFBcUJFLFFBQXJCLEVBQTBCQyxZQUExQixFQUFuQjtBQUNBVixXQUFPLHVCQUFnQkgsS0FBaEIsRUFBdUJTLFVBQXZCLENBQVAsRUFBMkNGLE9BQTNDLENBQW1ERixjQUFuRDtBQUNELEdBVEQ7QUFVQUgsS0FBRyxtQ0FBSCxFQUF3QyxZQUFNO0FBQzVDLFFBQU1VLE1BQU0sT0FBWjtBQUNBLFFBQU1LLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxJQUFEO0FBQUEsYUFBVUEsSUFBVjtBQUFBLEtBQWI7O0FBRUEsUUFBTWIsaUJBQWlCTCxNQUFNYyxLQUFOLDJDQUNSZCxNQUFNZSxHQUFOLHVCQUFxQkMsTUFBckIscUJBQ1ZKLEdBRFUsRUFDSkssS0FBS2pCLE1BQU1lLEdBQU4sdUJBQXFCQSxHQUFyQixDQUF5QkgsR0FBekIsQ0FBTCxDQURJLEVBRFEsRUFBdkI7QUFLQSxRQUFNSCxhQUFhLEVBQUVDLE1BQU0sY0FBUixFQUF3QkUsUUFBeEIsRUFBNkJLLFVBQTdCLEVBQW5CO0FBQ0FkLFdBQU8sdUJBQWdCSCxLQUFoQixFQUF1QlMsVUFBdkIsQ0FBUCxFQUEyQ0YsT0FBM0MsQ0FBbURGLGNBQW5EO0FBQ0QsR0FYRDtBQVlELENBdkZEIiwiZmlsZSI6InJlZHVjZXIudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBhY2tub3dsZWRnZSwgY2xlYW51cCwgc3VibWl0Rm9ybSwgc3VibWl0Rm9ybUZhaWxlZCwgc3VibWl0Rm9ybVN1Y2NlZWQgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFJFU1VMVCwgU0VSVkVSX0VSUk9SLCBTVUJNSVRfU1VDQ0VTUywgVkFSSUFCTEVTLCBJU19MT0FESU5HIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCByZWdpc3RlclJlZHVjZXIgZnJvbSAnLi4vcmVkdWNlcic7XG5cbmRlc2NyaWJlKCdyZWdpc3RlclJlZHVjZXInLCAoKSA9PiB7XG4gIGNvbnN0IGZvcm1OYW1lID0gJ3Rlc3ROYW1lJztcbiAgY29uc3QgcGFnZU5hbWUgPSAndGVzdFBhZ2UnO1xuICBsZXQgc3RhdGU7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHN0YXRlID0gZnJvbUpTKHtcbiAgICAgIFtWQVJJQUJMRVNdOiB7fSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBleGlzdCcsICgpID0+IHtcbiAgICBleHBlY3QocmVnaXN0ZXJSZWR1Y2VyKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2V0IFNlcnZlciBlcnJvciBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3Qgc2VydmVyRXJyb3IgPSAnZXJyb3InO1xuICAgIGNvbnN0IGV4cGVjdGVkUmVzdWx0ID0gc3RhdGUuc2V0KGZvcm1OYW1lLCB7XG4gICAgICBbU0VSVkVSX0VSUk9SXTogc2VydmVyRXJyb3IsXG4gICAgICBbU1VCTUlUX1NVQ0NFU1NdOiBmYWxzZSxcbiAgICAgIFtJU19MT0FESU5HXTogZmFsc2UsXG4gICAgfSk7XG4gICAgZXhwZWN0KFxuICAgICAgcmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBzdWJtaXRGb3JtRmFpbGVkKHNlcnZlckVycm9yLCBwYWdlTmFtZSwgZm9ybU5hbWUpKVxuICAgICkudG9FcXVhbChleHBlY3RlZFJlc3VsdCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBTZXJ2ZXIgc3VjY2VzcyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSBzdGF0ZS5zZXQoZm9ybU5hbWUsIHtcbiAgICAgIFtTRVJWRVJfRVJST1JdOiAnJyxcbiAgICAgIFtSRVNVTFRdOiAnJyxcbiAgICAgIFtTVUJNSVRfU1VDQ0VTU106IHRydWUsXG4gICAgICBbSVNfTE9BRElOR106IGZhbHNlLFxuICAgIH0pO1xuICAgIGV4cGVjdChcbiAgICAgIHJlZ2lzdGVyUmVkdWNlcihzdGF0ZSwgc3VibWl0Rm9ybVN1Y2NlZWQoJycsIHBhZ2VOYW1lLCBmb3JtTmFtZSkpXG4gICAgKS50b0VxdWFsKGV4cGVjdGVkUmVzdWx0KTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2V0IHN1Ym1pdEZvcm0gY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IGV4cGVjdGVkUmVzdWx0ID0gc3RhdGUuc2V0KGZvcm1OYW1lLCB7XG4gICAgICBbU0VSVkVSX0VSUk9SXTogJycsXG4gICAgICBbU1VCTUlUX1NVQ0NFU1NdOiBmYWxzZSxcbiAgICAgIFtSRVNVTFRdOiBmYWxzZSxcbiAgICAgIFtJU19MT0FESU5HXTogdHJ1ZSxcbiAgICB9KTtcbiAgICBleHBlY3QocmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBzdWJtaXRGb3JtKHt9LCBwYWdlTmFtZSwgZm9ybU5hbWUpKSkudG9FcXVhbChcbiAgICAgIGV4cGVjdGVkUmVzdWx0XG4gICAgKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2V0IGFja25vd2xlZGdlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IHN0YXRlLmRlbGV0ZShmb3JtTmFtZSk7XG4gICAgZXhwZWN0KHJlZ2lzdGVyUmVkdWNlcihzdGF0ZSwgYWNrbm93bGVkZ2UoZm9ybU5hbWUpKSkudG9FcXVhbChcbiAgICAgIGV4cGVjdGVkUmVzdWx0XG4gICAgKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2V0IGNsZWFudXAgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGV4cGVjdChyZWdpc3RlclJlZHVjZXIoc3RhdGUsIGNsZWFudXAoKSkpLnRvRXF1YWwoXG4gICAgICBmcm9tSlMoeyBbVkFSSUFCTEVTXToge30gfSlcbiAgICApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZXQgb3RoZXIgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IG1vY2tBY3Rpb24gPSB7IHR5cGU6ICdvdGhlcicgfTtcbiAgICBleHBlY3QocmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBtb2NrQWN0aW9uKSkudG9FcXVhbChzdGF0ZSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBvdGhlciBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgbW9ja0FjdGlvbiA9IHsgdHlwZTogJ290aGVyJyB9O1xuICAgIGV4cGVjdChyZWdpc3RlclJlZHVjZXIodW5kZWZpbmVkLCBtb2NrQWN0aW9uKSkudG9FcXVhbChzdGF0ZSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBSRURVWF9TRVQgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IGtleSA9ICdrZXl5eSc7XG4gICAgY29uc3QgdmFsdWUgPSAndmFsdWVlZSc7XG5cbiAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IHN0YXRlLm1lcmdlKHtcbiAgICAgIFtWQVJJQUJMRVNdOiBzdGF0ZS5nZXQoVkFSSUFCTEVTKS5jb25jYXQoeyBba2V5XTogdmFsdWUgfSksXG4gICAgfSk7XG4gICAgY29uc3QgbW9ja0FjdGlvbiA9IHsgdHlwZTogJ1JFRFVYX1NFVCcsIGtleSwgdmFsdWUgfTtcbiAgICBleHBlY3QocmVnaXN0ZXJSZWR1Y2VyKHN0YXRlLCBtb2NrQWN0aW9uKSkudG9FcXVhbChleHBlY3RlZFJlc3VsdCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBSRURVWF9TRVRfRk4gY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IGtleSA9ICdrZXl5eSc7XG4gICAgY29uc3QgZnVuYyA9IChkYXRhKSA9PiBkYXRhO1xuXG4gICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSBzdGF0ZS5tZXJnZSh7XG4gICAgICBbVkFSSUFCTEVTXTogc3RhdGUuZ2V0KFZBUklBQkxFUykuY29uY2F0KHtcbiAgICAgICAgW2tleV06IGZ1bmMoc3RhdGUuZ2V0KFZBUklBQkxFUykuZ2V0KGtleSkpLFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgY29uc3QgbW9ja0FjdGlvbiA9IHsgdHlwZTogJ1JFRFVYX1NFVF9GTicsIGtleSwgZnVuYyB9O1xuICAgIGV4cGVjdChyZWdpc3RlclJlZHVjZXIoc3RhdGUsIG1vY2tBY3Rpb24pKS50b0VxdWFsKGV4cGVjdGVkUmVzdWx0KTtcbiAgfSk7XG59KTtcbiJdfQ==