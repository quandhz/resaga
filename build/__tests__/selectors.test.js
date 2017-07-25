'use strict';

var _immutable = require('immutable');

var _expect = require('expect');

var expect = _interopRequireWildcard(_expect);

var _constants = require('../constants');

var _selectors = require('../selectors');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by Yang on 8/11/16.
                                                                                                                                                                                                                   */
/**
 * Created by Yang on 29/10/16.
 */


var PAGE = 'mockTestPage';

describe('selectPage', function () {
  var registerSelector = (0, _selectors.selectPage)(PAGE);
  it('should select the register state', function () {
    var registerState = (0, _immutable.fromJS)({
      userData: {}
    });
    var mockedState = (0, _immutable.fromJS)(_defineProperty({}, PAGE, registerState));
    expect(registerSelector(mockedState)).toEqual(registerState);
  });
});

describe('selectServerValidationeError', function () {
  var selector = (0, _selectors.selectErrors)(PAGE);
  it('should select the selectServerValidation state', function () {
    var expectedResult = 'error';
    var mockedState = (0, _immutable.fromJS)(_defineProperty({}, PAGE, _defineProperty({}, _constants.SERVER_ERROR, expectedResult)));
    expect(selector(mockedState)).toEqual(expectedResult);
  });
});

describe('selectIsSubmitSuccess', function () {
  var selector = (0, _selectors.selectIsSubmitSuccess)(PAGE);
  it('should select the selectIsSubmitSuccess state', function () {
    var expectedResult = false;
    var mockedState = (0, _immutable.fromJS)(_defineProperty({}, PAGE, _defineProperty({}, _constants.SUBMIT_SUCCESS, expectedResult)));
    expect(selector(mockedState)).toEqual(expectedResult);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vc2VsZWN0b3JzLnRlc3QuanMiXSwibmFtZXMiOlsiZXhwZWN0IiwiUEFHRSIsImRlc2NyaWJlIiwicmVnaXN0ZXJTZWxlY3RvciIsIml0IiwicmVnaXN0ZXJTdGF0ZSIsInVzZXJEYXRhIiwibW9ja2VkU3RhdGUiLCJ0b0VxdWFsIiwic2VsZWN0b3IiLCJleHBlY3RlZFJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7QUFDQTs7SUFBWUEsTTs7QUFDWjs7QUFJQTs7OztrTkFaQTs7O0FBR0E7Ozs7O0FBZUEsSUFBTUMsT0FBTyxjQUFiOztBQUVBQyxTQUFTLFlBQVQsRUFBdUIsWUFBTTtBQUMzQixNQUFNQyxtQkFBbUIsMkJBQVdGLElBQVgsQ0FBekI7QUFDQUcsS0FBRyxrQ0FBSCxFQUF1QyxZQUFNO0FBQzNDLFFBQU1DLGdCQUFnQix1QkFBTztBQUMzQkMsZ0JBQVU7QUFEaUIsS0FBUCxDQUF0QjtBQUdBLFFBQU1DLGNBQWMsMkNBQ2pCTixJQURpQixFQUNWSSxhQURVLEVBQXBCO0FBR0FMLFdBQU9HLGlCQUFpQkksV0FBakIsQ0FBUCxFQUFzQ0MsT0FBdEMsQ0FBOENILGFBQTlDO0FBQ0QsR0FSRDtBQVNELENBWEQ7O0FBYUFILFNBQVMsOEJBQVQsRUFBeUMsWUFBTTtBQUM3QyxNQUFNTyxXQUFXLDZCQUFhUixJQUFiLENBQWpCO0FBQ0FHLEtBQUcsZ0RBQUgsRUFBcUQsWUFBTTtBQUN6RCxRQUFNTSxpQkFBaUIsT0FBdkI7QUFDQSxRQUFNSCxjQUFjLDJDQUNqQk4sSUFEaUIsK0NBRUFTLGNBRkEsR0FBcEI7QUFLQVYsV0FBT1MsU0FBU0YsV0FBVCxDQUFQLEVBQThCQyxPQUE5QixDQUFzQ0UsY0FBdEM7QUFDRCxHQVJEO0FBU0QsQ0FYRDs7QUFhQVIsU0FBUyx1QkFBVCxFQUFrQyxZQUFNO0FBQ3RDLE1BQU1PLFdBQVcsc0NBQXNCUixJQUF0QixDQUFqQjtBQUNBRyxLQUFHLCtDQUFILEVBQW9ELFlBQU07QUFDeEQsUUFBTU0saUJBQWlCLEtBQXZCO0FBQ0EsUUFBTUgsY0FBYywyQ0FDakJOLElBRGlCLGlEQUVFUyxjQUZGLEdBQXBCO0FBS0FWLFdBQU9TLFNBQVNGLFdBQVQsQ0FBUCxFQUE4QkMsT0FBOUIsQ0FBc0NFLGNBQXRDO0FBQ0QsR0FSRDtBQVNELENBWEQiLCJmaWxlIjoic2VsZWN0b3JzLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgWWFuZyBvbiA4LzExLzE2LlxuICovXG4vKipcbiAqIENyZWF0ZWQgYnkgWWFuZyBvbiAyOS8xMC8xNi5cbiAqL1xuaW1wb3J0IHsgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICdleHBlY3QnO1xuaW1wb3J0IHtcbiAgU0VSVkVSX0VSUk9SLFxuICBTVUJNSVRfU1VDQ0VTUyxcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIHNlbGVjdFBhZ2UsXG4gIHNlbGVjdEVycm9ycyxcbiAgc2VsZWN0SXNTdWJtaXRTdWNjZXNzLFxufSBmcm9tICcuLi9zZWxlY3RvcnMnO1xuXG5jb25zdCBQQUdFID0gJ21vY2tUZXN0UGFnZSc7XG5cbmRlc2NyaWJlKCdzZWxlY3RQYWdlJywgKCkgPT4ge1xuICBjb25zdCByZWdpc3RlclNlbGVjdG9yID0gc2VsZWN0UGFnZShQQUdFKTtcbiAgaXQoJ3Nob3VsZCBzZWxlY3QgdGhlIHJlZ2lzdGVyIHN0YXRlJywgKCkgPT4ge1xuICAgIGNvbnN0IHJlZ2lzdGVyU3RhdGUgPSBmcm9tSlMoe1xuICAgICAgdXNlckRhdGE6IHt9LFxuICAgIH0pO1xuICAgIGNvbnN0IG1vY2tlZFN0YXRlID0gZnJvbUpTKHtcbiAgICAgIFtQQUdFXTogcmVnaXN0ZXJTdGF0ZSxcbiAgICB9KTtcbiAgICBleHBlY3QocmVnaXN0ZXJTZWxlY3Rvcihtb2NrZWRTdGF0ZSkpLnRvRXF1YWwocmVnaXN0ZXJTdGF0ZSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdzZWxlY3RTZXJ2ZXJWYWxpZGF0aW9uZUVycm9yJywgKCkgPT4ge1xuICBjb25zdCBzZWxlY3RvciA9IHNlbGVjdEVycm9ycyhQQUdFKTtcbiAgaXQoJ3Nob3VsZCBzZWxlY3QgdGhlIHNlbGVjdFNlcnZlclZhbGlkYXRpb24gc3RhdGUnLCAoKSA9PiB7XG4gICAgY29uc3QgZXhwZWN0ZWRSZXN1bHQgPSAnZXJyb3InO1xuICAgIGNvbnN0IG1vY2tlZFN0YXRlID0gZnJvbUpTKHtcbiAgICAgIFtQQUdFXToge1xuICAgICAgICBbU0VSVkVSX0VSUk9SXTogZXhwZWN0ZWRSZXN1bHQsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGV4cGVjdChzZWxlY3Rvcihtb2NrZWRTdGF0ZSkpLnRvRXF1YWwoZXhwZWN0ZWRSZXN1bHQpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnc2VsZWN0SXNTdWJtaXRTdWNjZXNzJywgKCkgPT4ge1xuICBjb25zdCBzZWxlY3RvciA9IHNlbGVjdElzU3VibWl0U3VjY2VzcyhQQUdFKTtcbiAgaXQoJ3Nob3VsZCBzZWxlY3QgdGhlIHNlbGVjdElzU3VibWl0U3VjY2VzcyBzdGF0ZScsICgpID0+IHtcbiAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IGZhbHNlO1xuICAgIGNvbnN0IG1vY2tlZFN0YXRlID0gZnJvbUpTKHtcbiAgICAgIFtQQUdFXToge1xuICAgICAgICBbU1VCTUlUX1NVQ0NFU1NdOiBleHBlY3RlZFJlc3VsdCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgZXhwZWN0KHNlbGVjdG9yKG1vY2tlZFN0YXRlKSkudG9FcXVhbChleHBlY3RlZFJlc3VsdCk7XG4gIH0pO1xufSk7XG4iXX0=