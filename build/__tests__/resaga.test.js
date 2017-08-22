'use strict';

var _enzyme = require('enzyme');

var _immutable = require('immutable');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

var _resaga = require('../resaga');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('utils/hoc/onSubmit/resaga', function () {
  var key = 'FORM_KEY';
  var MockComponent = function MockComponent() {
    return _react2.default.createElement(
      'div',
      null,
      'Hello'
    );
  };
  var store = (0, _immutable.fromJS)(_defineProperty({}, key, {})).set(key, _defineProperty({}, _constants.IS_LOADING, true));
  var rendered = (0, _enzyme.shallow)(_react2.default.createElement(_resaga.ReSaga, { store: store, Component: MockComponent }));
  describe('<ReSaga />', function () {
    it('should render without exploding', function () {
      expect(rendered).toBeDefined();
    });
  });
  describe('isLoading()', function () {
    it('should render without exploding', function () {
      var page = rendered.instance();
      var result = page.isLoading(key);
      expect(result).toBe(true);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9fX3Rlc3RzX18vcmVzYWdhLnRlc3QuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJrZXkiLCJNb2NrQ29tcG9uZW50Iiwic3RvcmUiLCJzZXQiLCJyZW5kZXJlZCIsIml0IiwiZXhwZWN0IiwidG9CZURlZmluZWQiLCJwYWdlIiwiaW5zdGFuY2UiLCJyZXN1bHQiLCJpc0xvYWRpbmciLCJ0b0JlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBQSxTQUFTLDJCQUFULEVBQXNDLFlBQU07QUFDMUMsTUFBTUMsTUFBTSxVQUFaO0FBQ0EsTUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLFdBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFOO0FBQUEsR0FBdEI7QUFDQSxNQUFNQyxRQUFRLDJDQUNYRixHQURXLEVBQ0wsRUFESyxHQUVYRyxHQUZXLENBRVBILEdBRk8sNkNBRWMsSUFGZCxFQUFkO0FBR0EsTUFBTUksV0FBVyxxQkFBUSxnREFBUSxPQUFPRixLQUFmLEVBQXNCLFdBQVdELGFBQWpDLEdBQVIsQ0FBakI7QUFDQUYsV0FBUyxZQUFULEVBQXVCLFlBQU07QUFDM0JNLE9BQUcsaUNBQUgsRUFBc0MsWUFBTTtBQUMxQ0MsYUFBT0YsUUFBUCxFQUFpQkcsV0FBakI7QUFDRCxLQUZEO0FBR0QsR0FKRDtBQUtBUixXQUFTLGFBQVQsRUFBd0IsWUFBTTtBQUM1Qk0sT0FBRyxpQ0FBSCxFQUFzQyxZQUFNO0FBQzFDLFVBQU1HLE9BQU9KLFNBQVNLLFFBQVQsRUFBYjtBQUNBLFVBQU1DLFNBQVNGLEtBQUtHLFNBQUwsQ0FBZVgsR0FBZixDQUFmO0FBQ0FNLGFBQU9JLE1BQVAsRUFBZUUsSUFBZixDQUFvQixJQUFwQjtBQUNELEtBSkQ7QUFLRCxHQU5EO0FBT0QsQ0FuQkQiLCJmaWxlIjoicmVzYWdhLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaGFsbG93IH0gZnJvbSAnZW56eW1lJztcbmltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgSVNfTE9BRElORyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZVNhZ2EgfSBmcm9tICcuLi9yZXNhZ2EnO1xuXG5kZXNjcmliZSgndXRpbHMvaG9jL29uU3VibWl0L3Jlc2FnYScsICgpID0+IHtcbiAgY29uc3Qga2V5ID0gJ0ZPUk1fS0VZJztcbiAgY29uc3QgTW9ja0NvbXBvbmVudCA9ICgpID0+IDxkaXY+SGVsbG88L2Rpdj47XG4gIGNvbnN0IHN0b3JlID0gZnJvbUpTKHtcbiAgICBba2V5XToge30sXG4gIH0pLnNldChrZXksIHsgW0lTX0xPQURJTkddOiB0cnVlIH0pO1xuICBjb25zdCByZW5kZXJlZCA9IHNoYWxsb3coPFJlU2FnYSBzdG9yZT17c3RvcmV9IENvbXBvbmVudD17TW9ja0NvbXBvbmVudH0gLz4pO1xuICBkZXNjcmliZSgnPFJlU2FnYSAvPicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJlbmRlciB3aXRob3V0IGV4cGxvZGluZycsICgpID0+IHtcbiAgICAgIGV4cGVjdChyZW5kZXJlZCkudG9CZURlZmluZWQoKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdpc0xvYWRpbmcoKScsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJlbmRlciB3aXRob3V0IGV4cGxvZGluZycsICgpID0+IHtcbiAgICAgIGNvbnN0IHBhZ2UgPSByZW5kZXJlZC5pbnN0YW5jZSgpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gcGFnZS5pc0xvYWRpbmcoa2V5KTtcbiAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbiJdfQ==