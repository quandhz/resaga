'use strict';

var _reactRouterRedux = require('react-router-redux');

var _effects = require('redux-saga/effects');

var _utils = require('redux-saga/lib/utils');

var _makeCallback = require('../utils/makeCallback');

var _actions = require('../actions');

var _config = require('../config');

var _sagas = require('../sagas');

var _sagasHelpers = require('../utils/sagas-helpers');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      var expectedYield = (0, _effects.fork)(_effects.takeEvery, _sagasHelpers.doSubmit, _sagas.handleRequest);
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
      var expectedYield = (0, _makeCallback.makeCallback)(_actions.submitFormSucceed, onSuccessCallback, mockRes, minParams.data, 'testPage', 'testForm');
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
      var expectedYield = (0, _makeCallback.makeCallback)(_actions.submitFormFailed, onErrorCallback, mockErr, minParams.data, 'testPage', 'testForm');
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
      var expectedYield = (0, _makeCallback.makeCallback)(_actions.submitFormFailed, onErrorCallback, mockErr, minParams.data, 'testPage', formName);
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
      var expectedYield = (0, _makeCallback.makeCallback)(_actions.submitFormSucceed, onSuccessCallback, handleSuccess(mockRes), data, 'testPage', 'testForm');
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
      var expectedYield = (0, _makeCallback.makeCallback)(_actions.submitFormFailed, onErrorCallback, handleError(mockErr), data, 'testPage', 'testForm');
      expect(generator.throw(mockErr).value).toEqual(expectedYield);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vc2FnYXMudGVzdC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIm9uU3VjY2Vzc0NhbGxiYWNrIiwidHlwZSIsIm9uRXJyb3JDYWxsYmFjayIsIm1vY2tSZXMiLCJyZXMiLCJtb2NrRXJyIiwiZXJyb3IiLCJoYW5kbGVFcnJvciIsImUiLCJoYW5kbGVTdWNjZXNzIiwiciIsImRhdGEiLCJoaSIsIm1vY2tTdWJtaXQiLCJwYXJhbXMiLCJvcHRpb25zIiwiZm9ybU5hbWUiLCJnZW5lcmF0b3IiLCJpdCIsImV4cGVjdGVkWWllbGQiLCJleHBlY3QiLCJuZXh0IiwidmFsdWUiLCJ0b0VxdWFsIiwibW9ja1Rhc2siLCJleHBlY3RlZFRha2VZaWVsZCIsImV4cGVjdGVkQ2FuY2VsWWllbGQiLCJtaW5QYXJhbXMiLCJ0aHJvdyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBQSxTQUFTLDBCQUFULEVBQXFDLFlBQU07QUFBQTs7QUFDekMsTUFBTUMsb0JBQXFCLFNBQXJCQSxpQkFBcUI7QUFBQSxXQUFPLEVBQUVDLE1BQU0sZ0JBQVIsRUFBUDtBQUFBLEdBQTNCO0FBQ0EsTUFBTUMsa0JBQW1CLFNBQW5CQSxlQUFtQjtBQUFBLFdBQU8sRUFBRUQsTUFBTSxjQUFSLEVBQVA7QUFBQSxHQUF6QjtBQUNBLE1BQU1FLFVBQVUsRUFBRUMsS0FBSyxjQUFQLEVBQWhCO0FBQ0EsTUFBTUMsVUFBVSxFQUFFQyxPQUFPLGFBQVQsRUFBaEI7QUFDQSxNQUFNQyxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsQ0FBRDtBQUFBLFdBQU9BLEVBQUVGLEtBQVQ7QUFBQSxHQUFwQjtBQUNBLE1BQU1HLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ0MsQ0FBRDtBQUFBLFdBQU9BLEVBQUVOLEdBQVQ7QUFBQSxHQUF0QjtBQUNBLE1BQU1PLE9BQU8sRUFBRUMsSUFBSSxJQUFOLEVBQWI7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SSxJQUFWLENBQWVsQixPQUFmLEVBQXdCbUIsS0FBL0IsRUFBc0NDLE9BQXRDLENBQThDSixhQUE5QztBQUNELEtBSEQ7QUFJRCxHQVpEOztBQWNBcEIsV0FBUyxnQ0FBVCxFQUEyQyxZQUFNO0FBQy9DLFFBQU1rQixZQUFZLDBCQUFjSCxNQUFkLENBQWxCOztBQUVBSSxPQUFHLDhCQUFILEVBQW1DLFlBQU07QUFDdkMsVUFBTUMsZ0JBQWdCLG1CQUFLTixVQUFMLEVBQWlCRixJQUFqQixDQUF0QjtBQUNBUyxhQUFPSCxVQUFVSSxJQUFWLEdBQWlCQyxLQUF4QixFQUErQkMsT0FBL0IsQ0FBdUNKLGFBQXZDO0FBQ0QsS0FIRDs7QUFLQUQsT0FBRyxzQkFBSCxFQUEyQixZQUFNO0FBQy9CLFVBQU1DLGdCQUFnQiwyREFBK0JqQixlQUEvQixFQUFnREssWUFBWUYsT0FBWixDQUFoRCxFQUFzRU0sSUFBdEUsRUFBNEUsVUFBNUUsRUFBd0YsVUFBeEYsQ0FBdEI7QUFDQVMsYUFBT0gsVUFBVVcsS0FBVixDQUFnQnZCLE9BQWhCLEVBQXlCaUIsS0FBaEMsRUFBdUNDLE9BQXZDLENBQStDSixhQUEvQztBQUNELEtBSEQ7QUFJRCxHQVpEO0FBYUQsQ0EzSUQiLCJmaWxlIjoic2FnYXMudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExPQ0FUSU9OX0NIQU5HRSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XG5pbXBvcnQgeyBjYWxsLCBjYW5jZWwsIGZvcmssIHRha2UsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgeyBjcmVhdGVNb2NrVGFzayB9IGZyb20gJ3JlZHV4LXNhZ2EvbGliL3V0aWxzJztcbmltcG9ydCB7IG1ha2VDYWxsYmFjayB9IGZyb20gJy4uL3V0aWxzL21ha2VDYWxsYmFjayc7XG5pbXBvcnQgeyBzdWJtaXRGb3JtRmFpbGVkLCBzdWJtaXRGb3JtU3VjY2VlZCB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgSEFORExFX0VSUk9SLCBIQU5ETEVfU1VDQ0VTUywgT05fRVJST1IsIE9OX1NVQ0NFU1MsIFBBR0UsIFNVQk1JVCB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBoYW5kbGVSZXF1ZXN0LCBzYWdhIH0gZnJvbSAnLi4vc2FnYXMnO1xuaW1wb3J0IHsgZG9TdWJtaXQgfSBmcm9tICcuLi91dGlscy9zYWdhcy1oZWxwZXJzJztcblxuZGVzY3JpYmUoJ3V0aWxzL2hvYy9vblN1Ym1pdC9zYWdhcycsICgpID0+IHtcbiAgY29uc3Qgb25TdWNjZXNzQ2FsbGJhY2sgPSAoKCkgPT4gKHsgdHlwZTogJ1NVQ0NFU1NfQUNUSU9OJyB9KSk7XG4gIGNvbnN0IG9uRXJyb3JDYWxsYmFjayA9ICgoKSA9PiAoeyB0eXBlOiAnRVJST1JfQUNUSU9OJyB9KSk7XG4gIGNvbnN0IG1vY2tSZXMgPSB7IHJlczogJ1NvbWUgcmVzdWx0LicgfTtcbiAgY29uc3QgbW9ja0VyciA9IHsgZXJyb3I6ICdTb21lIGVycm9yLicgfTtcbiAgY29uc3QgaGFuZGxlRXJyb3IgPSAoZSkgPT4gZS5lcnJvcjtcbiAgY29uc3QgaGFuZGxlU3VjY2VzcyA9IChyKSA9PiByLnJlcztcbiAgY29uc3QgZGF0YSA9IHsgaGk6ICdobycgfTtcblxuICBjb25zdCBtb2NrU3VibWl0ID0gKCkgPT4gKG1vY2tSZXMpO1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgZGF0YSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBbUEFHRV06ICd0ZXN0UGFnZScsXG4gICAgICBbU1VCTUlUXTogbW9ja1N1Ym1pdCxcbiAgICAgIFtPTl9TVUNDRVNTXTogb25TdWNjZXNzQ2FsbGJhY2ssXG4gICAgICBbT05fRVJST1JdOiBvbkVycm9yQ2FsbGJhY2ssXG4gICAgICBbSEFORExFX0VSUk9SXTogaGFuZGxlRXJyb3IsXG4gICAgICBbSEFORExFX1NVQ0NFU1NdOiBoYW5kbGVTdWNjZXNzLFxuICAgIH0sXG4gICAgZm9ybU5hbWU6ICd0ZXN0Rm9ybScsXG4gIH07XG5cblxuICBkZXNjcmliZSgnc2FnYSgpJywgKCkgPT4ge1xuICAgIGNvbnN0IGdlbmVyYXRvciA9IHNhZ2EoKTtcblxuICAgIGl0KCdzaG91bGQgZm9yayBnZXRXYXRjaGVyKCknLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZFlpZWxkID0gZm9yayh0YWtlRXZlcnksIGRvU3VibWl0LCBoYW5kbGVSZXF1ZXN0KTtcbiAgICAgIGV4cGVjdChnZW5lcmF0b3IubmV4dCgpLnZhbHVlKS50b0VxdWFsKGV4cGVjdGVkWWllbGQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjYW5jZWwgb24gTE9DQVRJT05fQ0hBTkdFIGFjdGlvbicsICgpID0+IHtcbiAgICAgIGNvbnN0IG1vY2tUYXNrID0gY3JlYXRlTW9ja1Rhc2soKTtcbiAgICAgIC8vIHRha2UgTE9DQVRJT05fQ0hBTkdFXG4gICAgICBjb25zdCBleHBlY3RlZFRha2VZaWVsZCA9IHRha2UoTE9DQVRJT05fQ0hBTkdFKTtcbiAgICAgIGV4cGVjdChnZW5lcmF0b3IubmV4dChtb2NrVGFzaykudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRUYWtlWWllbGQpO1xuICAgICAgLy8gY2FuY2VsXG4gICAgICBjb25zdCBleHBlY3RlZENhbmNlbFlpZWxkID0gY2FuY2VsKG1vY2tUYXNrKTtcbiAgICAgIGV4cGVjdChnZW5lcmF0b3IubmV4dCgpLnZhbHVlKS50b0VxdWFsKGV4cGVjdGVkQ2FuY2VsWWllbGQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaGFuZGxlUmVxdWVzdCgpIHdpdGggbWluaW11bSBwYXJhbXMgLSBwcm9taXNlIHN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgY29uc3QgbWluUGFyYW1zID0ge1xuICAgICAgZGF0YToge30sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIFtQQUdFXTogJ3Rlc3RQYWdlJyxcbiAgICAgICAgW1NVQk1JVF06IG1vY2tTdWJtaXQsXG4gICAgICB9LFxuICAgICAgZm9ybU5hbWU6ICd0ZXN0Rm9ybScsXG4gICAgfTtcbiAgICBjb25zdCBnZW5lcmF0b3IgPSBoYW5kbGVSZXF1ZXN0KG1pblBhcmFtcyk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgc3VibWl0IHdpdGggZGF0YScsICgpID0+IHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkWWllbGQgPSBjYWxsKG1vY2tTdWJtaXQsIG1pblBhcmFtcy5kYXRhKTtcbiAgICAgIGV4cGVjdChnZW5lcmF0b3IubmV4dCgpLnZhbHVlKS50b0VxdWFsKGV4cGVjdGVkWWllbGQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gb25TdWNjZXNzJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWRZaWVsZCA9IG1ha2VDYWxsYmFjayhzdWJtaXRGb3JtU3VjY2VlZCwgb25TdWNjZXNzQ2FsbGJhY2ssIG1vY2tSZXMsIG1pblBhcmFtcy5kYXRhLCAndGVzdFBhZ2UnLCAndGVzdEZvcm0nKTtcbiAgICAgIGV4cGVjdChnZW5lcmF0b3IubmV4dChtb2NrUmVzKS52YWx1ZSkudG9FcXVhbChleHBlY3RlZFlpZWxkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2hhbmRsZVJlcXVlc3QoKSB3aXRoIG1pbmltdW0gcGFyYW1zIC0gcHJvbWlzZSBmYWlsJywgKCkgPT4ge1xuICAgIGNvbnN0IG1pblBhcmFtcyA9IHtcbiAgICAgIGRhdGE6IHt9LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBbUEFHRV06ICd0ZXN0UGFnZScsXG4gICAgICAgIFtTVUJNSVRdOiBtb2NrU3VibWl0LFxuICAgICAgfSxcbiAgICAgIGZvcm1OYW1lOiAndGVzdEZvcm0nLFxuICAgIH07XG4gICAgY29uc3QgZ2VuZXJhdG9yID0gaGFuZGxlUmVxdWVzdChtaW5QYXJhbXMpO1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHN1Ym1pdCB3aXRoIGRhdGEnLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZFlpZWxkID0gY2FsbChtb2NrU3VibWl0LCBtaW5QYXJhbXMuZGF0YSk7XG4gICAgICBleHBlY3QoZ2VuZXJhdG9yLm5leHQoKS52YWx1ZSkudG9FcXVhbChleHBlY3RlZFlpZWxkKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgb25FcnJvcicsICgpID0+IHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkWWllbGQgPSBtYWtlQ2FsbGJhY2soc3VibWl0Rm9ybUZhaWxlZCwgb25FcnJvckNhbGxiYWNrLCBtb2NrRXJyLCBtaW5QYXJhbXMuZGF0YSwgJ3Rlc3RQYWdlJywgJ3Rlc3RGb3JtJyk7XG4gICAgICBleHBlY3QoZ2VuZXJhdG9yLnRocm93KG1vY2tFcnIpLnZhbHVlKS50b0VxdWFsKGV4cGVjdGVkWWllbGQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaGFuZGxlUmVxdWVzdCgpIHdpdGggc3VibWl0IGFzIG9iamVjdCBwYXJhbXMgLSBwcm9taXNlIGZhaWwnLCAoKSA9PiB7XG4gICAgY29uc3QgZm9ybU5hbWUgPSAndGVzdEZvcm0nO1xuICAgIGNvbnN0IG1pblBhcmFtcyA9IHtcbiAgICAgIGRhdGE6IHt9LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBbUEFHRV06ICd0ZXN0UGFnZScsXG4gICAgICAgIFtTVUJNSVRdOiB7XG4gICAgICAgICAgW2Zvcm1OYW1lXTogbW9ja1N1Ym1pdCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBmb3JtTmFtZSxcbiAgICB9O1xuICAgIGNvbnN0IGdlbmVyYXRvciA9IGhhbmRsZVJlcXVlc3QobWluUGFyYW1zKTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBzdWJtaXQgd2l0aCBkYXRhJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWRZaWVsZCA9IGNhbGwobW9ja1N1Ym1pdCwgbWluUGFyYW1zLmRhdGEpO1xuICAgICAgZXhwZWN0KGdlbmVyYXRvci5uZXh0KCkudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IG9uRXJyb3InLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZFlpZWxkID0gbWFrZUNhbGxiYWNrKHN1Ym1pdEZvcm1GYWlsZWQsIG9uRXJyb3JDYWxsYmFjaywgbW9ja0VyciwgbWluUGFyYW1zLmRhdGEsICd0ZXN0UGFnZScsIGZvcm1OYW1lKTtcbiAgICAgIGV4cGVjdChnZW5lcmF0b3IudGhyb3cobW9ja0VycikudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdoYW5kbGVSZXF1ZXN0KCkgLSBwcm9taXNlIHN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgY29uc3QgZ2VuZXJhdG9yID0gaGFuZGxlUmVxdWVzdChwYXJhbXMpO1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHN1Ym1pdCB3aXRoIGRhdGEnLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZFlpZWxkID0gY2FsbChtb2NrU3VibWl0LCBkYXRhKTtcbiAgICAgIGV4cGVjdChnZW5lcmF0b3IubmV4dCgpLnZhbHVlKS50b0VxdWFsKGV4cGVjdGVkWWllbGQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsYmFjayBvblN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZFlpZWxkID0gbWFrZUNhbGxiYWNrKHN1Ym1pdEZvcm1TdWNjZWVkLCBvblN1Y2Nlc3NDYWxsYmFjaywgaGFuZGxlU3VjY2Vzcyhtb2NrUmVzKSwgZGF0YSwgJ3Rlc3RQYWdlJywgJ3Rlc3RGb3JtJyk7XG4gICAgICBleHBlY3QoZ2VuZXJhdG9yLm5leHQobW9ja1JlcykudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdoYW5kbGVSZXF1ZXN0KCkgLSBwcm9taXNlIGZhaWwnLCAoKSA9PiB7XG4gICAgY29uc3QgZ2VuZXJhdG9yID0gaGFuZGxlUmVxdWVzdChwYXJhbXMpO1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHN1Ym1pdCB3aXRoIGRhdGEnLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZFlpZWxkID0gY2FsbChtb2NrU3VibWl0LCBkYXRhKTtcbiAgICAgIGV4cGVjdChnZW5lcmF0b3IubmV4dCgpLnZhbHVlKS50b0VxdWFsKGV4cGVjdGVkWWllbGQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBvbkVycm9yJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWRZaWVsZCA9IG1ha2VDYWxsYmFjayhzdWJtaXRGb3JtRmFpbGVkLCBvbkVycm9yQ2FsbGJhY2ssIGhhbmRsZUVycm9yKG1vY2tFcnIpLCBkYXRhLCAndGVzdFBhZ2UnLCAndGVzdEZvcm0nKTtcbiAgICAgIGV4cGVjdChnZW5lcmF0b3IudGhyb3cobW9ja0VycikudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRZaWVsZCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=