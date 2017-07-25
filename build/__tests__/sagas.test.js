'use strict';

var _reactRouterRedux = require('react-router-redux');

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _utils = require('redux-saga/lib/utils');

var _makeCallback = require('../utils/makeCallback');

var _actions = require('../actions');

var _config = require('../config');

var _sagas = require('../sagas');

var _sagasHelpers = require('../utils/sagas-helpers');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by quando on 4/4/17.
                                                                                                                                                                                                                   */


describe('utils/hoc/onSubmit/sagas', function () {
  var _options;

  var onSuccessCallback = function onSuccessCallback() {
    return { type: 'SUCCESS_ACTION' };
  };
  var onErrorCallback = function onErrorCallback() {
    return { type: 'ERROR_ACTION' };
  };
  var mockRes = { res: 'Some result.' };
  var mockErr = { error: 'Some error.' };
  var handleError = function handleError(e) {
    return e.error;
  };
  var handleSuccess = function handleSuccess(r) {
    return r.res;
  };
  var data = { hi: 'ho' };

  var mockSubmit = function mockSubmit() {
    return mockRes;
  };
  var params = {
    data: data,
    options: (_options = {}, _defineProperty(_options, _config.PAGE, 'testPage'), _defineProperty(_options, _config.SUBMIT, mockSubmit), _defineProperty(_options, _config.ON_SUCCESS, onSuccessCallback), _defineProperty(_options, _config.ON_ERROR, onErrorCallback), _defineProperty(_options, _config.HANDLE_ERROR, handleError), _defineProperty(_options, _config.HANDLE_SUCCESS, handleSuccess), _options),
    formName: 'testForm'
  };

  describe('saga()', function () {
    var generator = (0, _sagas.saga)();

    it('should fork getWatcher()', function () {
      var expectedYield = (0, _effects.fork)(_reduxSaga.takeLatest, _sagasHelpers.doSubmit, _sagas.handleRequest);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should cancel on LOCATION_CHANGE action', function () {
      var mockTask = (0, _utils.createMockTask)();
      // take LOCATION_CHANGE
      var expectedTakeYield = (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE);
      expect(generator.next(mockTask).value).toEqual(expectedTakeYield);
      // cancel
      var expectedCancelYield = (0, _effects.cancel)(mockTask);
      expect(generator.next().value).toEqual(expectedCancelYield);
    });
  });

  describe('handleRequest() with minimum params - promise success', function () {
    var _options2;

    var minParams = {
      data: {},
      options: (_options2 = {}, _defineProperty(_options2, _config.PAGE, 'testPage'), _defineProperty(_options2, _config.SUBMIT, mockSubmit), _options2),
      formName: 'testForm'
    };
    var generator = (0, _sagas.handleRequest)(minParams);

    it('should call submit with data', function () {
      var expectedYield = (0, _effects.call)(mockSubmit, minParams.data);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should return onSuccess', function () {
      var expectedYield = (0, _makeCallback.makeCallback)(_actions.submitFormSucceed, onSuccessCallback, mockRes, 'testPage', 'testForm');
      expect(generator.next(mockRes).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() with minimum params - promise fail', function () {
    var _options3;

    var minParams = {
      data: {},
      options: (_options3 = {}, _defineProperty(_options3, _config.PAGE, 'testPage'), _defineProperty(_options3, _config.SUBMIT, mockSubmit), _options3),
      formName: 'testForm'
    };
    var generator = (0, _sagas.handleRequest)(minParams);

    it('should call submit with data', function () {
      var expectedYield = (0, _effects.call)(mockSubmit, minParams.data);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should throw onError', function () {
      var expectedYield = (0, _makeCallback.makeCallback)(_actions.submitFormFailed, onErrorCallback, mockErr, 'testPage', 'testForm');
      expect(generator.throw(mockErr).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() with submit as object params - promise fail', function () {
    var _options4;

    var formName = 'testForm';
    var minParams = {
      data: {},
      options: (_options4 = {}, _defineProperty(_options4, _config.PAGE, 'testPage'), _defineProperty(_options4, _config.SUBMIT, _defineProperty({}, formName, mockSubmit)), _options4),
      formName: formName
    };
    var generator = (0, _sagas.handleRequest)(minParams);

    it('should call submit with data', function () {
      var expectedYield = (0, _effects.call)(mockSubmit, minParams.data);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should throw onError', function () {
      var expectedYield = (0, _makeCallback.makeCallback)(_actions.submitFormFailed, onErrorCallback, mockErr, 'testPage', formName);
      expect(generator.throw(mockErr).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() - promise success', function () {
    var generator = (0, _sagas.handleRequest)(params);

    it('should call submit with data', function () {
      var expectedYield = (0, _effects.call)(mockSubmit, data);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should callback onSuccess', function () {
      var expectedYield = (0, _makeCallback.makeCallback)(_actions.submitFormSucceed, onSuccessCallback, handleSuccess(mockRes), 'testPage', 'testForm');
      expect(generator.next(mockRes).value).toEqual(expectedYield);
    });
  });

  describe('handleRequest() - promise fail', function () {
    var generator = (0, _sagas.handleRequest)(params);

    it('should call submit with data', function () {
      var expectedYield = (0, _effects.call)(mockSubmit, data);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('should throw onError', function () {
      var expectedYield = (0, _makeCallback.makeCallback)(_actions.submitFormFailed, onErrorCallback, handleError(mockErr), 'testPage', 'testForm');
      expect(generator.throw(mockErr).value).toEqual(expectedYield);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vc2FnYXMudGVzdC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIm9uU3VjY2Vzc0NhbGxiYWNrIiwidHlwZSIsIm9uRXJyb3JDYWxsYmFjayIsIm1vY2tSZXMiLCJyZXMiLCJtb2NrRXJyIiwiZXJyb3IiLCJoYW5kbGVFcnJvciIsImUiLCJoYW5kbGVTdWNjZXNzIiwiciIsImRhdGEiLCJoaSIsIm1vY2tTdWJtaXQiLCJwYXJhbXMiLCJvcHRpb25zIiwiZm9ybU5hbWUiLCJnZW5lcmF0b3IiLCJpdCIsImV4cGVjdGVkWWllbGQiLCJleHBlY3QiLCJuZXh0IiwidmFsdWUiLCJ0b0VxdWFsIiwibW9ja1Rhc2siLCJleHBlY3RlZFRha2VZaWVsZCIsImV4cGVjdGVkQ2FuY2VsWWllbGQiLCJtaW5QYXJhbXMiLCJ0aHJvdyJdLCJtYXBwaW5ncyI6Ijs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7a05BWEE7Ozs7O0FBYUFBLFNBQVMsMEJBQVQsRUFBcUMsWUFBTTtBQUFBOztBQUN6QyxNQUFNQyxvQkFBcUIsU0FBckJBLGlCQUFxQjtBQUFBLFdBQU8sRUFBRUMsTUFBTSxnQkFBUixFQUFQO0FBQUEsR0FBM0I7QUFDQSxNQUFNQyxrQkFBbUIsU0FBbkJBLGVBQW1CO0FBQUEsV0FBTyxFQUFFRCxNQUFNLGNBQVIsRUFBUDtBQUFBLEdBQXpCO0FBQ0EsTUFBTUUsVUFBVSxFQUFFQyxLQUFLLGNBQVAsRUFBaEI7QUFDQSxNQUFNQyxVQUFVLEVBQUVDLE9BQU8sYUFBVCxFQUFoQjtBQUNBLE1BQU1DLGNBQWMsU0FBZEEsV0FBYyxDQUFDQyxDQUFEO0FBQUEsV0FBT0EsRUFBRUYsS0FBVDtBQUFBLEdBQXBCO0FBQ0EsTUFBTUcsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDQyxDQUFEO0FBQUEsV0FBT0EsRUFBRU4sR0FBVDtBQUFBLEdBQXRCO0FBQ0EsTUFBTU8sT0FBTyxFQUFFQyxJQUFJLElBQU4sRUFBYjs7QUFFQSxNQUFNQyxhQUFhLFNBQWJBLFVBQWE7QUFBQSxXQUFPVixPQUFQO0FBQUEsR0FBbkI7QUFDQSxNQUFNVyxTQUFTO0FBQ2JILGNBRGE7QUFFYkkscUVBQ1UsVUFEViw2Q0FFWUYsVUFGWixpREFHZ0JiLGlCQUhoQiwrQ0FJY0UsZUFKZCxtREFLa0JLLFdBTGxCLHFEQU1vQkUsYUFOcEIsWUFGYTtBQVViTyxjQUFVO0FBVkcsR0FBZjs7QUFjQWpCLFdBQVMsUUFBVCxFQUFtQixZQUFNO0FBQ3ZCLFFBQU1rQixZQUFZLGtCQUFsQjs7QUFFQUMsT0FBRywwQkFBSCxFQUErQixZQUFNO0FBQ25DLFVBQU1DLGdCQUFnQix1RkFBdEI7QUFDQUMsYUFBT0gsVUFBVUksSUFBVixHQUFpQkMsS0FBeEIsRUFBK0JDLE9BQS9CLENBQXVDSixhQUF2QztBQUNELEtBSEQ7O0FBS0FELE9BQUcseUNBQUgsRUFBOEMsWUFBTTtBQUNsRCxVQUFNTSxXQUFXLDRCQUFqQjtBQUNBO0FBQ0EsVUFBTUMsb0JBQW9CLHFEQUExQjtBQUNBTCxhQUFPSCxVQUFVSSxJQUFWLENBQWVHLFFBQWYsRUFBeUJGLEtBQWhDLEVBQXVDQyxPQUF2QyxDQUErQ0UsaUJBQS9DO0FBQ0E7QUFDQSxVQUFNQyxzQkFBc0IscUJBQU9GLFFBQVAsQ0FBNUI7QUFDQUosYUFBT0gsVUFBVUksSUFBVixHQUFpQkMsS0FBeEIsRUFBK0JDLE9BQS9CLENBQXVDRyxtQkFBdkM7QUFDRCxLQVJEO0FBU0QsR0FqQkQ7O0FBbUJBM0IsV0FBUyx1REFBVCxFQUFrRSxZQUFNO0FBQUE7O0FBQ3RFLFFBQU00QixZQUFZO0FBQ2hCaEIsWUFBTSxFQURVO0FBRWhCSSx5RUFDVSxVQURWLDhDQUVZRixVQUZaLGFBRmdCO0FBTWhCRyxnQkFBVTtBQU5NLEtBQWxCO0FBUUEsUUFBTUMsWUFBWSwwQkFBY1UsU0FBZCxDQUFsQjs7QUFFQVQsT0FBRyw4QkFBSCxFQUFtQyxZQUFNO0FBQ3ZDLFVBQU1DLGdCQUFnQixtQkFBS04sVUFBTCxFQUFpQmMsVUFBVWhCLElBQTNCLENBQXRCO0FBQ0FTLGFBQU9ILFVBQVVJLElBQVYsR0FBaUJDLEtBQXhCLEVBQStCQyxPQUEvQixDQUF1Q0osYUFBdkM7QUFDRCxLQUhEOztBQUtBRCxPQUFHLHlCQUFILEVBQThCLFlBQU07QUFDbEMsVUFBTUMsZ0JBQWdCLDREQUFnQ25CLGlCQUFoQyxFQUFtREcsT0FBbkQsRUFBNEQsVUFBNUQsRUFBd0UsVUFBeEUsQ0FBdEI7QUFDQWlCLGFBQU9ILFVBQVVJLElBQVYsQ0FBZWxCLE9BQWYsRUFBd0JtQixLQUEvQixFQUFzQ0MsT0FBdEMsQ0FBOENKLGFBQTlDO0FBQ0QsS0FIRDtBQUlELEdBcEJEOztBQXNCQXBCLFdBQVMsb0RBQVQsRUFBK0QsWUFBTTtBQUFBOztBQUNuRSxRQUFNNEIsWUFBWTtBQUNoQmhCLFlBQU0sRUFEVTtBQUVoQkkseUVBQ1UsVUFEViw4Q0FFWUYsVUFGWixhQUZnQjtBQU1oQkcsZ0JBQVU7QUFOTSxLQUFsQjtBQVFBLFFBQU1DLFlBQVksMEJBQWNVLFNBQWQsQ0FBbEI7O0FBRUFULE9BQUcsOEJBQUgsRUFBbUMsWUFBTTtBQUN2QyxVQUFNQyxnQkFBZ0IsbUJBQUtOLFVBQUwsRUFBaUJjLFVBQVVoQixJQUEzQixDQUF0QjtBQUNBUyxhQUFPSCxVQUFVSSxJQUFWLEdBQWlCQyxLQUF4QixFQUErQkMsT0FBL0IsQ0FBdUNKLGFBQXZDO0FBQ0QsS0FIRDs7QUFLQUQsT0FBRyxzQkFBSCxFQUEyQixZQUFNO0FBQy9CLFVBQU1DLGdCQUFnQiwyREFBK0JqQixlQUEvQixFQUFnREcsT0FBaEQsRUFBeUQsVUFBekQsRUFBcUUsVUFBckUsQ0FBdEI7QUFDQWUsYUFBT0gsVUFBVVcsS0FBVixDQUFnQnZCLE9BQWhCLEVBQXlCaUIsS0FBaEMsRUFBdUNDLE9BQXZDLENBQStDSixhQUEvQztBQUNELEtBSEQ7QUFJRCxHQXBCRDs7QUFzQkFwQixXQUFTLDZEQUFULEVBQXdFLFlBQU07QUFBQTs7QUFDNUUsUUFBTWlCLFdBQVcsVUFBakI7QUFDQSxRQUFNVyxZQUFZO0FBQ2hCaEIsWUFBTSxFQURVO0FBRWhCSSx5RUFDVSxVQURWLGtFQUdLQyxRQUhMLEVBR2dCSCxVQUhoQixjQUZnQjtBQVFoQkc7QUFSZ0IsS0FBbEI7QUFVQSxRQUFNQyxZQUFZLDBCQUFjVSxTQUFkLENBQWxCOztBQUVBVCxPQUFHLDhCQUFILEVBQW1DLFlBQU07QUFDdkMsVUFBTUMsZ0JBQWdCLG1CQUFLTixVQUFMLEVBQWlCYyxVQUFVaEIsSUFBM0IsQ0FBdEI7QUFDQVMsYUFBT0gsVUFBVUksSUFBVixHQUFpQkMsS0FBeEIsRUFBK0JDLE9BQS9CLENBQXVDSixhQUF2QztBQUNELEtBSEQ7O0FBS0FELE9BQUcsc0JBQUgsRUFBMkIsWUFBTTtBQUMvQixVQUFNQyxnQkFBZ0IsMkRBQStCakIsZUFBL0IsRUFBZ0RHLE9BQWhELEVBQXlELFVBQXpELEVBQXFFVyxRQUFyRSxDQUF0QjtBQUNBSSxhQUFPSCxVQUFVVyxLQUFWLENBQWdCdkIsT0FBaEIsRUFBeUJpQixLQUFoQyxFQUF1Q0MsT0FBdkMsQ0FBK0NKLGFBQS9DO0FBQ0QsS0FIRDtBQUlELEdBdkJEOztBQXlCQXBCLFdBQVMsbUNBQVQsRUFBOEMsWUFBTTtBQUNsRCxRQUFNa0IsWUFBWSwwQkFBY0gsTUFBZCxDQUFsQjs7QUFFQUksT0FBRyw4QkFBSCxFQUFtQyxZQUFNO0FBQ3ZDLFVBQU1DLGdCQUFnQixtQkFBS04sVUFBTCxFQUFpQkYsSUFBakIsQ0FBdEI7QUFDQVMsYUFBT0gsVUFBVUksSUFBVixHQUFpQkMsS0FBeEIsRUFBK0JDLE9BQS9CLENBQXVDSixhQUF2QztBQUNELEtBSEQ7O0FBS0FELE9BQUcsMkJBQUgsRUFBZ0MsWUFBTTtBQUNwQyxVQUFNQyxnQkFBZ0IsNERBQWdDbkIsaUJBQWhDLEVBQW1EUyxjQUFjTixPQUFkLENBQW5ELEVBQTJFLFVBQTNFLEVBQXVGLFVBQXZGLENBQXRCO0FBQ0FpQixhQUFPSCxVQUFVSSxJQUFWLENBQWVsQixPQUFmLEVBQXdCbUIsS0FBL0IsRUFBc0NDLE9BQXRDLENBQThDSixhQUE5QztBQUNELEtBSEQ7QUFJRCxHQVpEOztBQWNBcEIsV0FBUyxnQ0FBVCxFQUEyQyxZQUFNO0FBQy9DLFFBQU1rQixZQUFZLDBCQUFjSCxNQUFkLENBQWxCOztBQUVBSSxPQUFHLDhCQUFILEVBQW1DLFlBQU07QUFDdkMsVUFBTUMsZ0JBQWdCLG1CQUFLTixVQUFMLEVBQWlCRixJQUFqQixDQUF0QjtBQUNBUyxhQUFPSCxVQUFVSSxJQUFWLEdBQWlCQyxLQUF4QixFQUErQkMsT0FBL0IsQ0FBdUNKLGFBQXZDO0FBQ0QsS0FIRDs7QUFLQUQsT0FBRyxzQkFBSCxFQUEyQixZQUFNO0FBQy9CLFVBQU1DLGdCQUFnQiwyREFBK0JqQixlQUEvQixFQUFnREssWUFBWUYsT0FBWixDQUFoRCxFQUFzRSxVQUF0RSxFQUFrRixVQUFsRixDQUF0QjtBQUNBZSxhQUFPSCxVQUFVVyxLQUFWLENBQWdCdkIsT0FBaEIsRUFBeUJpQixLQUFoQyxFQUF1Q0MsT0FBdkMsQ0FBK0NKLGFBQS9DO0FBQ0QsS0FIRDtBQUlELEdBWkQ7QUFhRCxDQTNJRCIsImZpbGUiOiJzYWdhcy50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHF1YW5kbyBvbiA0LzQvMTcuXG4gKi9cbmltcG9ydCB7IExPQ0FUSU9OX0NIQU5HRSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XG5pbXBvcnQgeyB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQgeyBjYWxsLCBjYW5jZWwsIGZvcmssIHRha2UgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgY3JlYXRlTW9ja1Rhc2sgfSBmcm9tICdyZWR1eC1zYWdhL2xpYi91dGlscyc7XG5pbXBvcnQgeyBtYWtlQ2FsbGJhY2sgfSBmcm9tICcuLi91dGlscy9tYWtlQ2FsbGJhY2snO1xuaW1wb3J0IHsgc3VibWl0Rm9ybUZhaWxlZCwgc3VibWl0Rm9ybVN1Y2NlZWQgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IEhBTkRMRV9FUlJPUiwgSEFORExFX1NVQ0NFU1MsIE9OX0VSUk9SLCBPTl9TVUNDRVNTLCBQQUdFLCBTVUJNSVQgfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHsgaGFuZGxlUmVxdWVzdCwgc2FnYSB9IGZyb20gJy4uL3NhZ2FzJztcbmltcG9ydCB7IGRvU3VibWl0IH0gZnJvbSAnLi4vdXRpbHMvc2FnYXMtaGVscGVycyc7XG5cbmRlc2NyaWJlKCd1dGlscy9ob2Mvb25TdWJtaXQvc2FnYXMnLCAoKSA9PiB7XG4gIGNvbnN0IG9uU3VjY2Vzc0NhbGxiYWNrID0gKCgpID0+ICh7IHR5cGU6ICdTVUNDRVNTX0FDVElPTicgfSkpO1xuICBjb25zdCBvbkVycm9yQ2FsbGJhY2sgPSAoKCkgPT4gKHsgdHlwZTogJ0VSUk9SX0FDVElPTicgfSkpO1xuICBjb25zdCBtb2NrUmVzID0geyByZXM6ICdTb21lIHJlc3VsdC4nIH07XG4gIGNvbnN0IG1vY2tFcnIgPSB7IGVycm9yOiAnU29tZSBlcnJvci4nIH07XG4gIGNvbnN0IGhhbmRsZUVycm9yID0gKGUpID0+IGUuZXJyb3I7XG4gIGNvbnN0IGhhbmRsZVN1Y2Nlc3MgPSAocikgPT4gci5yZXM7XG4gIGNvbnN0IGRhdGEgPSB7IGhpOiAnaG8nIH07XG5cbiAgY29uc3QgbW9ja1N1Ym1pdCA9ICgpID0+IChtb2NrUmVzKTtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIGRhdGEsXG4gICAgb3B0aW9uczoge1xuICAgICAgW1BBR0VdOiAndGVzdFBhZ2UnLFxuICAgICAgW1NVQk1JVF06IG1vY2tTdWJtaXQsXG4gICAgICBbT05fU1VDQ0VTU106IG9uU3VjY2Vzc0NhbGxiYWNrLFxuICAgICAgW09OX0VSUk9SXTogb25FcnJvckNhbGxiYWNrLFxuICAgICAgW0hBTkRMRV9FUlJPUl06IGhhbmRsZUVycm9yLFxuICAgICAgW0hBTkRMRV9TVUNDRVNTXTogaGFuZGxlU3VjY2VzcyxcbiAgICB9LFxuICAgIGZvcm1OYW1lOiAndGVzdEZvcm0nLFxuICB9O1xuXG5cbiAgZGVzY3JpYmUoJ3NhZ2EoKScsICgpID0+IHtcbiAgICBjb25zdCBnZW5lcmF0b3IgPSBzYWdhKCk7XG5cbiAgICBpdCgnc2hvdWxkIGZvcmsgZ2V0V2F0Y2hlcigpJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWRZaWVsZCA9IGZvcmsodGFrZUxhdGVzdCwgZG9TdWJtaXQsIGhhbmRsZVJlcXVlc3QpO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci5uZXh0KCkudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbmNlbCBvbiBMT0NBVElPTl9DSEFOR0UgYWN0aW9uJywgKCkgPT4ge1xuICAgICAgY29uc3QgbW9ja1Rhc2sgPSBjcmVhdGVNb2NrVGFzaygpO1xuICAgICAgLy8gdGFrZSBMT0NBVElPTl9DSEFOR0VcbiAgICAgIGNvbnN0IGV4cGVjdGVkVGFrZVlpZWxkID0gdGFrZShMT0NBVElPTl9DSEFOR0UpO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci5uZXh0KG1vY2tUYXNrKS52YWx1ZSkudG9FcXVhbChleHBlY3RlZFRha2VZaWVsZCk7XG4gICAgICAvLyBjYW5jZWxcbiAgICAgIGNvbnN0IGV4cGVjdGVkQ2FuY2VsWWllbGQgPSBjYW5jZWwobW9ja1Rhc2spO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci5uZXh0KCkudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRDYW5jZWxZaWVsZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdoYW5kbGVSZXF1ZXN0KCkgd2l0aCBtaW5pbXVtIHBhcmFtcyAtIHByb21pc2Ugc3VjY2VzcycsICgpID0+IHtcbiAgICBjb25zdCBtaW5QYXJhbXMgPSB7XG4gICAgICBkYXRhOiB7fSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgW1BBR0VdOiAndGVzdFBhZ2UnLFxuICAgICAgICBbU1VCTUlUXTogbW9ja1N1Ym1pdCxcbiAgICAgIH0sXG4gICAgICBmb3JtTmFtZTogJ3Rlc3RGb3JtJyxcbiAgICB9O1xuICAgIGNvbnN0IGdlbmVyYXRvciA9IGhhbmRsZVJlcXVlc3QobWluUGFyYW1zKTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBzdWJtaXQgd2l0aCBkYXRhJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWRZaWVsZCA9IGNhbGwobW9ja1N1Ym1pdCwgbWluUGFyYW1zLmRhdGEpO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci5uZXh0KCkudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBvblN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZFlpZWxkID0gbWFrZUNhbGxiYWNrKHN1Ym1pdEZvcm1TdWNjZWVkLCBvblN1Y2Nlc3NDYWxsYmFjaywgbW9ja1JlcywgJ3Rlc3RQYWdlJywgJ3Rlc3RGb3JtJyk7XG4gICAgICBleHBlY3QoZ2VuZXJhdG9yLm5leHQobW9ja1JlcykudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdoYW5kbGVSZXF1ZXN0KCkgd2l0aCBtaW5pbXVtIHBhcmFtcyAtIHByb21pc2UgZmFpbCcsICgpID0+IHtcbiAgICBjb25zdCBtaW5QYXJhbXMgPSB7XG4gICAgICBkYXRhOiB7fSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgW1BBR0VdOiAndGVzdFBhZ2UnLFxuICAgICAgICBbU1VCTUlUXTogbW9ja1N1Ym1pdCxcbiAgICAgIH0sXG4gICAgICBmb3JtTmFtZTogJ3Rlc3RGb3JtJyxcbiAgICB9O1xuICAgIGNvbnN0IGdlbmVyYXRvciA9IGhhbmRsZVJlcXVlc3QobWluUGFyYW1zKTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBzdWJtaXQgd2l0aCBkYXRhJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWRZaWVsZCA9IGNhbGwobW9ja1N1Ym1pdCwgbWluUGFyYW1zLmRhdGEpO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci5uZXh0KCkudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IG9uRXJyb3InLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZFlpZWxkID0gbWFrZUNhbGxiYWNrKHN1Ym1pdEZvcm1GYWlsZWQsIG9uRXJyb3JDYWxsYmFjaywgbW9ja0VyciwgJ3Rlc3RQYWdlJywgJ3Rlc3RGb3JtJyk7XG4gICAgICBleHBlY3QoZ2VuZXJhdG9yLnRocm93KG1vY2tFcnIpLnZhbHVlKS50b0VxdWFsKGV4cGVjdGVkWWllbGQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaGFuZGxlUmVxdWVzdCgpIHdpdGggc3VibWl0IGFzIG9iamVjdCBwYXJhbXMgLSBwcm9taXNlIGZhaWwnLCAoKSA9PiB7XG4gICAgY29uc3QgZm9ybU5hbWUgPSAndGVzdEZvcm0nO1xuICAgIGNvbnN0IG1pblBhcmFtcyA9IHtcbiAgICAgIGRhdGE6IHt9LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBbUEFHRV06ICd0ZXN0UGFnZScsXG4gICAgICAgIFtTVUJNSVRdOiB7XG4gICAgICAgICAgW2Zvcm1OYW1lXTogbW9ja1N1Ym1pdCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBmb3JtTmFtZSxcbiAgICB9O1xuICAgIGNvbnN0IGdlbmVyYXRvciA9IGhhbmRsZVJlcXVlc3QobWluUGFyYW1zKTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBzdWJtaXQgd2l0aCBkYXRhJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWRZaWVsZCA9IGNhbGwobW9ja1N1Ym1pdCwgbWluUGFyYW1zLmRhdGEpO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci5uZXh0KCkudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IG9uRXJyb3InLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZFlpZWxkID0gbWFrZUNhbGxiYWNrKHN1Ym1pdEZvcm1GYWlsZWQsIG9uRXJyb3JDYWxsYmFjaywgbW9ja0VyciwgJ3Rlc3RQYWdlJywgZm9ybU5hbWUpO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci50aHJvdyhtb2NrRXJyKS52YWx1ZSkudG9FcXVhbChleHBlY3RlZFlpZWxkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2hhbmRsZVJlcXVlc3QoKSAtIHByb21pc2Ugc3VjY2VzcycsICgpID0+IHtcbiAgICBjb25zdCBnZW5lcmF0b3IgPSBoYW5kbGVSZXF1ZXN0KHBhcmFtcyk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgc3VibWl0IHdpdGggZGF0YScsICgpID0+IHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkWWllbGQgPSBjYWxsKG1vY2tTdWJtaXQsIGRhdGEpO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci5uZXh0KCkudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGxiYWNrIG9uU3VjY2VzcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkWWllbGQgPSBtYWtlQ2FsbGJhY2soc3VibWl0Rm9ybVN1Y2NlZWQsIG9uU3VjY2Vzc0NhbGxiYWNrLCBoYW5kbGVTdWNjZXNzKG1vY2tSZXMpLCAndGVzdFBhZ2UnLCAndGVzdEZvcm0nKTtcbiAgICAgIGV4cGVjdChnZW5lcmF0b3IubmV4dChtb2NrUmVzKS52YWx1ZSkudG9FcXVhbChleHBlY3RlZFlpZWxkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2hhbmRsZVJlcXVlc3QoKSAtIHByb21pc2UgZmFpbCcsICgpID0+IHtcbiAgICBjb25zdCBnZW5lcmF0b3IgPSBoYW5kbGVSZXF1ZXN0KHBhcmFtcyk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgc3VibWl0IHdpdGggZGF0YScsICgpID0+IHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkWWllbGQgPSBjYWxsKG1vY2tTdWJtaXQsIGRhdGEpO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci5uZXh0KCkudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IG9uRXJyb3InLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZFlpZWxkID0gbWFrZUNhbGxiYWNrKHN1Ym1pdEZvcm1GYWlsZWQsIG9uRXJyb3JDYWxsYmFjaywgaGFuZGxlRXJyb3IobW9ja0VyciksICd0ZXN0UGFnZScsICd0ZXN0Rm9ybScpO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci50aHJvdyhtb2NrRXJyKS52YWx1ZSkudG9FcXVhbChleHBlY3RlZFlpZWxkKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==