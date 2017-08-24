'use strict';

var _immutable = require('immutable');

var _constants = require('../../constants');

var _componentHelpers = require('../component-helpers');

var _componentHelpers2 = _interopRequireDefault(_componentHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('utils/hoc/onSubmit/utils/component-helpers', function () {
  var _propsError, _propsSuccess;

  var request = jest.fn();
  var props = { hi: 'ho' };
  var requestObject = {
    onError: jest.fn(),
    onSuccess: jest.fn()
  };
  var payload = 'payload';
  var propsError = (_propsError = {}, _defineProperty(_propsError, _constants.SERVER_ERROR, 'error'), _defineProperty(_propsError, _constants.PAYLOAD, payload), _propsError);
  var propsSuccess = (_propsSuccess = {}, _defineProperty(_propsSuccess, _constants.SUBMIT_SUCCESS, true), _defineProperty(_propsSuccess, _constants.RESULT, 'result'), _defineProperty(_propsSuccess, _constants.PAYLOAD, payload), _propsSuccess);
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
      expect(requestObject.onError).toBeCalledWith(propsError[_constants.SERVER_ERROR], payload);
      requestObject.onError.mockClear();
      expect(requestObject.onSuccess).not.toBeCalled();
    });
    it('request is object, prop success', function () {
      var res = _componentHelpers2.default.analyseRequest(requestObject, propsSuccess);
      expect(res).toBe(true);
      expect(requestObject.onError).not.toBeCalled();
      expect(requestObject.onSuccess).toBeCalledWith(propsSuccess[_constants.RESULT], payload);
      requestObject.onSuccess.mockClear();
    });
  });

  describe('analyseNextProps()', function () {
    var _fromJS$set;

    var formName = 'formName';
    var result = 'result';
    var store = (0, _immutable.fromJS)({}).set(formName, (_fromJS$set = {}, _defineProperty(_fromJS$set, _constants.SUBMIT_SUCCESS, true), _defineProperty(_fromJS$set, _constants.RESULT, result), _defineProperty(_fromJS$set, _constants.PAYLOAD, payload), _fromJS$set));
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
      expect(actionsObject[formName].onSuccess).toBeCalledWith(result, payload);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9fX3Rlc3RzX18vY29tcG9uZW50LWhlbHBlcnMudGVzdC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsInJlcXVlc3QiLCJqZXN0IiwiZm4iLCJwcm9wcyIsImhpIiwicmVxdWVzdE9iamVjdCIsIm9uRXJyb3IiLCJvblN1Y2Nlc3MiLCJwYXlsb2FkIiwicHJvcHNFcnJvciIsInByb3BzU3VjY2VzcyIsIml0IiwiZXhwZWN0IiwidG9CZURlZmluZWQiLCJhbmFseXNlUmVxdWVzdCIsInJlcyIsInRvQmUiLCJ0b0JlQ2FsbGVkV2l0aCIsIm1vY2tDbGVhciIsIm5vdCIsInRvQmVDYWxsZWQiLCJmb3JtTmFtZSIsInJlc3VsdCIsInN0b3JlIiwic2V0IiwiYWN0aW9ucyIsImFjdGlvbnNPdGhlckZvcm0iLCJvdGhlckZvcm0iLCJhY3Rpb25zT2JqZWN0IiwiYWNrbm93bGVkZ2UiLCJhbmFseXNlTmV4dFByb3BzIiwic29tZVN0b3JlIiwiZ2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBQSxTQUFTLDRDQUFULEVBQXVELFlBQU07QUFBQTs7QUFDM0QsTUFBTUMsVUFBVUMsS0FBS0MsRUFBTCxFQUFoQjtBQUNBLE1BQU1DLFFBQVEsRUFBRUMsSUFBSSxJQUFOLEVBQWQ7QUFDQSxNQUFNQyxnQkFBZ0I7QUFDcEJDLGFBQVNMLEtBQUtDLEVBQUwsRUFEVztBQUVwQkssZUFBV04sS0FBS0MsRUFBTDtBQUZTLEdBQXRCO0FBSUEsTUFBTU0sVUFBVSxTQUFoQjtBQUNBLE1BQU1DLHNGQUErQixPQUEvQixvREFBbURELE9BQW5ELGVBQU47QUFDQSxNQUFNRSw4RkFBbUMsSUFBbkMscURBQW1ELFFBQW5ELHNEQUF3RUYsT0FBeEUsaUJBQU47QUFDQUcsS0FBRyxzQkFBSCxFQUEyQixZQUFNO0FBQy9CQyx1Q0FBa0JDLFdBQWxCO0FBQ0QsR0FGRDs7QUFJQWQsV0FBUyxrQkFBVCxFQUE2QixZQUFNO0FB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QUFPaUIsV0FBUCxFQUFvQlYsR0FBcEIsQ0FBd0JDLFVBQXhCO0FBQ0FSLGFBQU9hLFFBQVFKLFFBQVIsQ0FBUCxFQUEwQkosY0FBMUIsQ0FBeUNNLE1BQU1TLEdBQU4sQ0FBVVgsUUFBVixDQUF6QztBQUNELEtBSkQ7QUFLQVYsT0FBRyxnQkFBSCxFQUFxQixZQUFNO0FBQ3pCLGlDQUFVbUIsZ0JBQVYsdUNBQXNDUCxLQUF0QyxHQUErQ0ssYUFBL0MsRUFBOERDLFdBQTlEO0FBQ0FqQixhQUFPaUIsV0FBUCxFQUFvQlosY0FBcEIsQ0FBbUNJLFFBQW5DO0FBQ0FULGFBQU9nQixjQUFjUCxRQUFkLEVBQXdCZCxTQUEvQixFQUEwQ1UsY0FBMUMsQ0FBeURLLE1BQXpELEVBQWlFZCxPQUFqRTtBQUNELEtBSkQ7QUFLRCxHQTFDRDtBQTJDRCxDQWxGRCIsImZpbGUiOiJjb21wb25lbnQtaGVscGVycy50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IFJFU1VMVCwgU0VSVkVSX0VSUk9SLCBTVE9SRSwgU1VCTUlUX1NVQ0NFU1MsIFBBWUxPQUQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xuaW1wb3J0IGNvbXBvbmVudCBmcm9tICcuLi9jb21wb25lbnQtaGVscGVycyc7XG5cbmRlc2NyaWJlKCd1dGlscy9ob2Mvb25TdWJtaXQvdXRpbHMvY29tcG9uZW50LWhlbHBlcnMnLCAoKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBqZXN0LmZuKCk7XG4gIGNvbnN0IHByb3BzID0geyBoaTogJ2hvJyB9O1xuICBjb25zdCByZXF1ZXN0T2JqZWN0ID0ge1xuICAgIG9uRXJyb3I6IGplc3QuZm4oKSxcbiAgICBvblN1Y2Nlc3M6IGplc3QuZm4oKSxcbiAgfTtcbiAgY29uc3QgcGF5bG9hZCA9ICdwYXlsb2FkJztcbiAgY29uc3QgcHJvcHNFcnJvciA9IHsgW1NFUlZFUl9FUlJPUl06ICdlcnJvcicsIFtQQVlMT0FEXTogcGF5bG9hZCB9O1xuICBjb25zdCBwcm9wc1N1Y2Nlc3MgPSB7IFtTVUJNSVRfU1VDQ0VTU106IHRydWUsIFtSRVNVTFRdOiAncmVzdWx0JywgW1BBWUxPQURdOiBwYXlsb2FkIH07XG4gIGl0KCdjb21wb25lbnQgaXMgZGVmaW5lZCcsICgpID0+IHtcbiAgICBleHBlY3QoY29tcG9uZW50KS50b0JlRGVmaW5lZCgpO1xuICB9KTtcblxuICBkZXNjcmliZSgnYW5hbHlzZVJlcXVlc3QoKScsICgpID0+IHtcbiAgICBpdCgnY29tcG9uZW50LmFuYWx5c2VSZXF1ZXN0IGlzIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoY29tcG9uZW50LmFuYWx5c2VSZXF1ZXN0KS50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuICAgIGl0KCdyZXF1ZXN0IGlzIGZ1bmN0aW9uJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gY29tcG9uZW50LmFuYWx5c2VSZXF1ZXN0KHJlcXVlc3QsIHByb3BzKTtcbiAgICAgIGV4cGVjdChyZXMpLnRvQmUoZmFsc2UpO1xuICAgICAgZXhwZWN0KHJlcXVlc3QpLnRvQmVDYWxsZWRXaXRoKHByb3BzKTtcbiAgICB9KTtcbiAgICBpdCgncmVxdWVzdCBpcyBvYmplY3QsIHByb3AgZXJyb3InLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBjb21wb25lbnQuYW5hbHlzZVJlcXVlc3QocmVxdWVzdE9iamVjdCwgcHJvcHNFcnJvcik7XG4gICAgICBleHBlY3QocmVzKS50b0JlKHRydWUpO1xuICAgICAgZXhwZWN0KHJlcXVlc3RPYmplY3Qub25FcnJvcikudG9CZUNhbGxlZFdpdGgocHJvcHNFcnJvcltTRVJWRVJfRVJST1JdLCBwYXlsb2FkKTtcbiAgICAgIHJlcXVlc3RPYmplY3Qub25FcnJvci5tb2NrQ2xlYXIoKTtcbiAgICAgIGV4cGVjdChyZXF1ZXN0T2JqZWN0Lm9uU3VjY2Vzcykubm90LnRvQmVDYWxsZWQoKTtcbiAgICB9KTtcbiAgICBpdCgncmVxdWVzdCBpcyBvYmplY3QsIHByb3Agc3VjY2VzcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IGNvbXBvbmVudC5hbmFseXNlUmVxdWVzdChyZXF1ZXN0T2JqZWN0LCBwcm9wc1N1Y2Nlc3MpO1xuICAgICAgZXhwZWN0KHJlcykudG9CZSh0cnVlKTtcbiAgICAgIGV4cGVjdChyZXF1ZXN0T2JqZWN0Lm9uRXJyb3IpLm5vdC50b0JlQ2FsbGVkKCk7XG4gICAgICBleHBlY3QocmVxdWVzdE9iamVjdC5vblN1Y2Nlc3MpLnRvQmVDYWxsZWRXaXRoKHByb3BzU3VjY2Vzc1tSRVNVTFRdLCBwYXlsb2FkKTtcbiAgICAgIHJlcXVlc3RPYmplY3Qub25TdWNjZXNzLm1vY2tDbGVhcigpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnYW5hbHlzZU5leHRQcm9wcygpJywgKCkgPT4ge1xuICAgIGNvbnN0IGZvcm1OYW1lID0gJ2Zvcm1OYW1lJztcbiAgICBjb25zdCByZXN1bHQgPSAncmVzdWx0JztcbiAgICBjb25zdCBzdG9yZSA9IGZyb21KUyh7fSkuc2V0KGZvcm1OYW1lLCB7XG4gICAgICBbU1VCTUlUX1NVQ0NFU1NdOiB0cnVlLFxuICAgICAgW1JFU1VMVF06IHJlc3VsdCxcbiAgICAgIFtQQVlMT0FEXTogcGF5bG9hZCxcbiAgICB9KTtcbiAgICBjb25zdCBhY3Rpb25zID0ge1xuICAgICAgW2Zvcm1OYW1lXTogamVzdC5mbigpLFxuICAgIH07XG4gICAgY29uc3QgYWN0aW9uc090aGVyRm9ybSA9IHtcbiAgICAgIG90aGVyRm9ybTogamVzdC5mbigpLFxuICAgIH07XG4gICAgY29uc3QgYWN0aW9uc09iamVjdCA9IHtcbiAgICAgIFtmb3JtTmFtZV06IHsgb25TdWNjZXNzOiBqZXN0LmZuKCkgfSxcbiAgICB9O1xuICAgIGNvbnN0IGFja25vd2xlZGdlID0gamVzdC5mbigpO1xuXG4gICAgaXQoJ2NvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzIGlzIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMpLnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG4gICAgaXQoJ25vIHN0b3JlJywgKCkgPT4ge1xuICAgICAgY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMoeyBzb21lU3RvcmU6IHN0b3JlIH0sIGFjdGlvbnMsIGFja25vd2xlZGdlKTtcbiAgICAgIGV4cGVjdChhY2tub3dsZWRnZSkubm90LnRvQmVDYWxsZWQoKTtcbiAgICAgIGV4cGVjdChhY3Rpb25zW2Zvcm1OYW1lXSkubm90LnRvQmVDYWxsZWQoKTtcbiAgICB9KTtcbiAgICBpdCgnbm8gZm9ybSBmb3VuZCcsICgpID0+IHtcbiAgICAgIGNvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzKHsgW1NUT1JFXTogc3RvcmUgfSwgYWN0aW9uc090aGVyRm9ybSwgYWNrbm93bGVkZ2UpO1xuICAgICAgZXhwZWN0KGFja25vd2xlZGdlKS5ub3QudG9CZUNhbGxlZCgpO1xuICAgICAgZXhwZWN0KGFjdGlvbnNbZm9ybU5hbWVdKS5ub3QudG9CZUNhbGxlZCgpO1xuICAgIH0pO1xuICAgIGl0KCdhY3Rpb25zIGZ1bmN0aW9uJywgKCkgPT4ge1xuICAgICAgY29tcG9uZW50LmFuYWx5c2VOZXh0UHJvcHMoeyBbU1RPUkVdOiBzdG9yZSB9LCBhY3Rpb25zLCBhY2tub3dsZWRnZSk7XG4gICAgICBleHBlY3QoYWNrbm93bGVkZ2UpLm5vdC50b0JlQ2FsbGVkKCk7XG4gICAgICBleHBlY3QoYWN0aW9uc1tmb3JtTmFtZV0pLnRvQmVDYWxsZWRXaXRoKHN0b3JlLmdldChmb3JtTmFtZSkpO1xuICAgIH0pO1xuICAgIGl0KCdhY3Rpb25zIG9iamVjdCcsICgpID0+IHtcbiAgICAgIGNvbXBvbmVudC5hbmFseXNlTmV4dFByb3BzKHsgW1NUT1JFXTogc3RvcmUgfSwgYWN0aW9uc09iamVjdCwgYWNrbm93bGVkZ2UpO1xuICAgICAgZXhwZWN0KGFja25vd2xlZGdlKS50b0JlQ2FsbGVkV2l0aChmb3JtTmFtZSk7XG4gICAgICBleHBlY3QoYWN0aW9uc09iamVjdFtmb3JtTmFtZV0ub25TdWNjZXNzKS50b0JlQ2FsbGVkV2l0aChyZXN1bHQsIHBheWxvYWQpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19