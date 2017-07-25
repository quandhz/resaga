'use strict';

var _immutable = require('immutable');

var _constants = require('../../constants');

var _componentHelpers = require('../component-helpers');

var _componentHelpers2 = _interopRequireDefault(_componentHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('utils/hoc/onSubmit/utils/component-helpers', function () {
  var _propsSuccess;

  var request = jest.fn();
  var props = { hi: 'ho' };
  var requestObject = {
    onError: jest.fn(),
    onSuccess: jest.fn()
  };
  var propsError = _defineProperty({}, _constants.SERVER_ERROR, 'error');
  var propsSuccess = (_propsSuccess = {}, _defineProperty(_propsSuccess, _constants.SUBMIT_SUCCESS, true), _defineProperty(_propsSuccess, _constants.RESULT, 'result'), _propsSuccess);
  it('component is defined', function () {
    expect(_componentHelpers2.default).toBeDefined();
  });

  describe('analyseRequest()', function () {
    it('component.analyseRequest is defined', function () {
      expect(_componentHelpers2.default.analyseRequest).toBeDefined();
    });
    it('request is function', function () {
      var res = _componentHelpers2.default.analyseRequest(request, props);
      expect(res).toBe(false);
      expect(request).toBeCalledWith(props);
    });
    it('request is object, prop error', function () {
      var res = _componentHelpers2.default.analyseRequest(requestObject, propsError);
      expect(res).toBe(true);
      expect(requestObject.onError).toBeCalledWith(propsError[_constants.SERVER_ERROR]);
      requestObject.onError.mockClear();
      expect(requestObject.onSuccess).not.toBeCalled();
    });
    it('request is object, prop success', function () {
      var res = _componentHelpers2.default.analyseRequest(requestObject, propsSuccess);
      expect(res).toBe(true);
      expect(requestObject.onError).not.toBeCalled();
      expect(requestObject.onSuccess).toBeCalledWith(propsSuccess[_constants.RESULT]);
      requestObject.onSuccess.mockClear();
    });
  });

  describe('analyseNextProps()', function () {
    var _fromJS$set;

    var formName = 'formName';
    var result = 'result';
    var store = (0, _immutable.fromJS)({}).set(formName, (_fromJS$set = {}, _defineProperty(_fromJS$set, _constants.SUBMIT_SUCCESS, true), _defineProperty(_fromJS$set, _constants.RESULT, result), _fromJS$set));
    var actions = _defineProperty({}, formName, jest.fn());
    var actionsOtherForm = {
      otherForm: jest.fn()
    };
    var actionsObject = _defineProperty({}, formName, { onSuccess: jest.fn() });
    var acknowledge = jest.fn();

    it('component.analyseNextProps is defined', function () {
      expect(_componentHelpers2.default.analyseNextProps).toBeDefined();
    });
    it('no store', function () {
      _componentHelpers2.default.analyseNextProps({ someStore: store }, actions, acknowledge);
      expect(acknowledge).not.toBeCalled();
      expect(actions[formName]).not.toBeCalled();
    });
    it('no form found', function () {
      _componentHelpers2.default.analyseNextProps(_defineProperty({}, _constants.STORE, store), actionsOtherForm, acknowledge);
      expect(acknowledge).not.toBeCalled();
      expect(actions[formName]).not.toBeCalled();
    });
    it('actions function', function () {
      _componentHelpers2.default.analyseNextProps(_defineProperty({}, _constants.STORE, store), actions, acknowledge);
      expect(acknowledge).not.toBeCalled();
      expect(actions[formName]).toBeCalledWith(store.get(formName));
    });
    it('actions object', function () {
      _componentHelpers2.default.analyseNextProps(_defineProperty({}, _constants.STORE, store), actionsObject, acknowledge);
      expect(acknowledge).toBeCalledWith(formName);
      expect(actionsObject[formName].onSuccess).toBeCalledWith(result);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9fX3Rlc3RzX18vY29tcG9uZW50LWhlbHBlcnMudGVzdC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsInJlcXVlc3QiLCJqZXN0IiwiZm4iLCJwcm9wcyIsImhpIiwicmVxdWVzdE9iamVjdCIsIm9uRXJyb3IiLCJvblN1Y2Nlc3MiLCJwcm9wc0Vycm9yIiwicHJvcHNTdWNjZXNzIiwiaXQiLCJleHBlY3QiLCJ0b0JlRGVmaW5lZCIsImFuYWx5c2VSZXF1ZXN0IiwicmVzIiwidG9CZSIsInRvQmVDYWxsZWRXaXRoIiwibW9ja0NsZWFyIiwibm90IiwidG9CZUNhbGxlZCIsImZvcm1OYW1lIiwicmVzdWx0Iiwic3RvcmUiLCJzZXQiLCJhY3Rpb25zIiwiYWN0aW9uc090aGVyRm9ybSIsIm90aGVyRm9ybSIsImFjdGlvbnNPYmplY3QiLCJhY2tub3dsZWRnZSIsImFuYWx5c2VOZXh0UHJvcHMiLCJzb21lU3RvcmUiLCJnZXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUFBLFNBQVMsNENBQVQsRUFBdUQsWUFBTTtBQUFBOztBQUMzRCxNQUFNQyxVQUFVQyxLQUFLQyxFQUFMLEVBQWhCO0FBQ0EsTUFBTUMsUUFBUSxFQUFFQyxJQUFJLElBQU4sRUFBZDtBQUNBLE1BQU1DLGdCQUFnQjtBQUNwQkMsYUFBU0wsS0FBS0MsRUFBTCxFQURXO0FBRXBCSyxlQUFXTixLQUFLQyxFQUFMO0FBRlMsR0FBdEI7QUFJQSxNQUFNTSwwREFBK0IsT0FBL0IsQ0FBTjtBQUNBLE1BQU1DLDhGQUFtQyxJQUFuQyxxREFBbUQsUUFBbkQsaUJBQU47QUFDQUMsS0FBRyxzQkFBSCxFQUEyQixZQUFNO0FBQy9CQyx1Q0FBa0JDLFdBQWxCO0FBQ0QsR0FGRDs7QUFJQWIsV0FBUyxrQkFBVCxFQUE2QixZQUFNO0FBQ2pDVyxPQUFHLHFDQUFILEVBQTBDLFlBQU07QUFDOUNDLGFBQU8sMkJBQVVFLGNBQWpCLEVBQWlDRCxX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VVgsUUFBVixDQUF6QztBQUNELEtBSkQ7QUFLQVYsT0FBRyxnQkFBSCxFQUFxQixZQUFNO0FBQ3pCLGlDQUFVbUIsZ0JBQVYsdUNBQXNDUCxLQUF0QyxHQUErQ0ssYUFBL0MsRUFBOERDLFdBQTlEO0FBQ0FqQixhQUFPaUIsV0FBUCxFQUFvQlosY0FBcEIsQ0FBbUNJLFFBQW5DO0FBQ0FULGFBQU9nQixjQUFjUCxRQUFkLEVBQXdCYixTQUEvQixFQUEwQ1MsY0FBMUMsQ0FBeURLLE1BQXpEO0FBQ0QsS0FKRDtBQUtELEdBekNEO0FBMENELENBaEZEIiwiZmlsZSI6ImNvbXBvbmVudC1oZWxwZXJzLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgUkVTVUxULCBTRVJWRVJfRVJST1IsIFNUT1JFLCBTVUJNSVRfU1VDQ0VTUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgY29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudC1oZWxwZXJzJztcblxuZGVzY3JpYmUoJ3V0aWxzL2hvYy9vblN1Ym1pdC91dGlscy9jb21wb25lbnQtaGVscGVycycsICgpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IGplc3QuZm4oKTtcbiAgY29uc3QgcHJvcHMgPSB7IGhpOiAnaG8nIH07XG4gIGNvbnN0IHJlcXVlc3RPYmplY3QgPSB7XG4gICAgb25FcnJvcjogamVzdC5mbigpLFxuICAgIG9uU3VjY2VzczogamVzdC5mbigpLFxuICB9O1xuICBjb25zdCBwcm9wc0Vycm9yID0geyBbU0VSVkVSX0VSUk9SXTogJ2Vycm9yJyB9O1xuICBjb25zdCBwcm9wc1N1Y2Nlc3MgPSB7IFtTVUJNSVRfU1VDQ0VTU106IHRydWUsIFtSRVNVTFRdOiAncmVzdWx0JyB9O1xuICBpdCgnY29tcG9uZW50IGlzIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGNvbXBvbmVudCkudG9CZURlZmluZWQoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2FuYWx5c2VSZXF1ZXN0KCknLCAoKSA9PiB7XG4gICAgaXQoJ2NvbXBvbmVudC5hbmFseXNlUmVxdWVzdCBpcyBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KGNvbXBvbmVudC5hbmFseXNlUmVxdWVzdCkudG9CZURlZmluZWQoKTtcbiAgICB9KTtcbiAgICBpdCgncmVxdWVzdCBpcyBmdW5jdGlvbicsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IGNvbXBvbmVudC5hbmFseXNlUmVxdWVzdChyZXF1ZXN0LCBwcm9wcyk7XG4gICAgICBleHBlY3QocmVzKS50b0JlKGZhbHNlKTtcbiAgICAgIGV4cGVjdChyZXF1ZXN0KS50b0JlQ2FsbGVkV2l0aChwcm9wcyk7XG4gICAgfSk7XG4gICAgaXQoJ3JlcXVlc3QgaXMgb2JqZWN0LCBwcm9wIGVycm9yJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gY29tcG9uZW50LmFuYWx5c2VSZXF1ZXN0KHJlcXVlc3RPYmplY3QsIHByb3BzRXJyb3IpO1xuICAgICAgZXhwZWN0KHJlcykudG9CZSh0cnVlKTtcbiAgICAgIGV4cGVjdChyZXF1ZXN0T2JqZWN0Lm9uRXJyb3IpLnRvQmVDYWxsZWRXaXRoKHByb3BzRXJyb3JbU0VSVkVSX0VSUk9SXSk7XG4gICAgICByZXF1ZXN0T2JqZWN0Lm9uRXJyb3IubW9ja0NsZWFyKCk7XG4gICAgICBleHBlY3QocmVxdWVzdE9iamVjdC5vblN1Y2Nlc3MpLm5vdC50b0JlQ2FsbGVkKCk7XG4gICAgfSk7XG4gICAgaXQoJ3JlcXVlc3QgaXMgb2JqZWN0LCBwcm9wIHN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBjb21wb25lbnQuYW5hbHlzZVJlcXVlc3QocmVxdWVzdE9iamVjdCwgcHJvcHNTdWNjZXNzKTtcbiAgICAgIGV4cGVjdChyZXMpLnRvQmUodHJ1ZSk7XG4gICAgICBleHBlY3QocmVxdWVzdE9iamVjdC5vbkVycm9yKS5ub3QudG9CZUNhbGxlZCgpO1xuICAgICAgZXhwZWN0KHJlcXVlc3RPYmplY3Qub25TdWNjZXNzKS50b0JlQ2FsbGVkV2l0aChwcm9wc1N1Y2Nlc3NbUkVTVUxUXSk7XG4gICAgICByZXF1ZXN0T2JqZWN0Lm9uU3VjY2Vzcy5tb2NrQ2xlYXIoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2FuYWx5c2VOZXh0UHJvcHMoKScsICgpID0+IHtcbiAgICBjb25zdCBmb3JtTmFtZSA9ICdmb3JtTmFtZSc7XG4gICAgY29uc3QgcmVzdWx0ID0gJ3Jlc3VsdCc7XG4gICAgY29uc3Qgc3RvcmUgPSBmcm9tSlMoe30pLnNldChmb3JtTmFtZSwge1xuICAgICAgW1NVQk1JVF9TVUNDRVNTXTogdHJ1ZSxcbiAgICAgIFtSRVNVTFRdOiByZXN1bHQsXG4gICAgfSk7XG4gICAgY29uc3QgYWN0aW9ucyA9IHtcbiAgICAgIFtmb3JtTmFtZV06IGplc3QuZm4oKSxcbiAgICB9O1xuICAgIGNvbnN0IGFjdGlvbnNPdGhlckZvcm0gPSB7XG4gICAgICBvdGhlckZvcm06IGplc3QuZm4oKSxcbiAgICB9O1xuICAgIGNvbnN0IGFjdGlvbnNPYmplY3QgPSB7XG4gICAgICBbZm9ybU5hbWVdOiB7IG9uU3VjY2VzczogamVzdC5mbigpIH0sXG4gICAgfTtcbiAgICBjb25zdCBhY2tub3dsZWRnZSA9IGplc3QuZm4oKTtcblxuICAgIGl0KCdjb21wb25lbnQuYW5hbHlzZU5leHRQcm9wcyBpcyBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KGNvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzKS50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuICAgIGl0KCdubyBzdG9yZScsICgpID0+IHtcbiAgICAgIGNvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzKHsgc29tZVN0b3JlOiBzdG9yZSB9LCBhY3Rpb25zLCBhY2tub3dsZWRnZSk7XG4gICAgICBleHBlY3QoYWNrbm93bGVkZ2UpLm5vdC50b0JlQ2FsbGVkKCk7XG4gICAgICBleHBlY3QoYWN0aW9uc1tmb3JtTmFtZV0pLm5vdC50b0JlQ2FsbGVkKCk7XG4gICAgfSk7XG4gICAgaXQoJ25vIGZvcm0gZm91bmQnLCAoKSA9PiB7XG4gICAgICBjb21wb25lbnQuYW5hbHlzZU5leHRQcm9wcyh7IFtTVE9SRV06IHN0b3JlIH0sIGFjdGlvbnNPdGhlckZvcm0sIGFja25vd2xlZGdlKTtcbiAgICAgIGV4cGVjdChhY2tub3dsZWRnZSkubm90LnRvQmVDYWxsZWQoKTtcbiAgICAgIGV4cGVjdChhY3Rpb25zW2Zvcm1OYW1lXSkubm90LnRvQmVDYWxsZWQoKTtcbiAgICB9KTtcbiAgICBpdCgnYWN0aW9ucyBmdW5jdGlvbicsICgpID0+IHtcbiAgICAgIGNvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzKHsgW1NUT1JFXTogc3RvcmUgfSwgYWN0aW9ucywgYWNrbm93bGVkZ2UpO1xuICAgICAgZXhwZWN0KGFja25vd2xlZGdlKS5ub3QudG9CZUNhbGxlZCgpO1xuICAgICAgZXhwZWN0KGFjdGlvbnNbZm9ybU5hbWVdKS50b0JlQ2FsbGVkV2l0aChzdG9yZS5nZXQoZm9ybU5hbWUpKTtcbiAgICB9KTtcbiAgICBpdCgnYWN0aW9ucyBvYmplY3QnLCAoKSA9PiB7XG4gICAgICBjb21wb25lbnQuYW5hbHlzZU5leHRQcm9wcyh7IFtTVE9SRV06IHN0b3JlIH0sIGFjdGlvbnNPYmplY3QsIGFja25vd2xlZGdlKTtcbiAgICAgIGV4cGVjdChhY2tub3dsZWRnZSkudG9CZUNhbGxlZFdpdGgoZm9ybU5hbWUpO1xuICAgICAgZXhwZWN0KGFjdGlvbnNPYmplY3RbZm9ybU5hbWVdLm9uU3VjY2VzcykudG9CZUNhbGxlZFdpdGgocmVzdWx0KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==