'use strict';

var _effects = require('redux-saga/effects');

var _makeCallback = require('../makeCallback');

describe('Smoke Tests', function () {
  it('should exists', function () {
    expect(_makeCallback.makeCallback);
  });
});

describe('makeCallback()', function () {
  it('should not crash with empty param', function () {
    var callbacks = (0, _makeCallback.makeCallback)();
    expect(callbacks.length).toBe(0);
  });
  it('should contain default callback', function () {
    var data = { type: 'USER_FETCH_SUCCEEDED' };
    var defaultCallback = function defaultCallback() {
      return data;
    };
    var callbacks = (0, _makeCallback.makeCallback)(defaultCallback);
    expect(callbacks[0]).toEqual((0, _effects.put)(data));
  });
  it('should contain all callbacks', function () {
    var data = { type: 'USER_FETCH_SUCCEEDED' };
    var data2 = { type: 'USER_FETCH_SUCCEEDED_2' };
    var defaultCallback = function defaultCallback() {
      return data;
    };
    var callback2 = function callback2() {
      return data2;
    };
    var callback3 = function callback3() {
      return data2;
    };
    var callbacks = (0, _makeCallback.makeCallback)(defaultCallback, [callback2, callback3]);
    expect(callbacks[0]).toEqual((0, _effects.put)(data));
    expect(callbacks[1]).toEqual((0, _effects.put)(data2));
    expect(callbacks[2]).toEqual((0, _effects.put)(data2));
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlscy9fX3Rlc3RzX18vbWFrZUNhbGxiYWNrLnRlc3QuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJpdCIsImV4cGVjdCIsImNhbGxiYWNrcyIsImxlbmd0aCIsInRvQmUiLCJkYXRhIiwidHlwZSIsImRlZmF1bHRDYWxsYmFjayIsInRvRXF1YWwiLCJkYXRhMiIsImNhbGxiYWNrMiIsImNhbGxiYWNrMyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFFQUEsU0FBUyxhQUFULEVBQXdCLFlBQU07QUFDNUJDLEtBQUcsZUFBSCxFQUFvQixZQUFNO0FBQ3hCQztBQUNELEdBRkQ7QUFHRCxDQUpEOztBQU1BRixTQUFTLGdCQUFULEVBQTJCLFlBQU07QUFDL0JDLEtBQUcsbUNBQUgsRUFBd0MsWUFBTTtBQUM1QyxRQUFNRSxZQUFZLGlDQUFsQjtBQUNBRCxXQUFPQyxVQUFVQyxNQUFqQixFQUF5QkMsSUFBekIsQ0FBOEIsQ0FBOUI7QUFDRCxHQUhEO0FBSUFKLEtBQUcsaUNBQUgsRUFBc0MsWUFBTTtBQUMxQyxRQUFNSyxPQUFPLEVBQUVDLE1BQU0sc0JBQVIsRUFBYjtBQUNBLFFBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0I7QUFBQSxhQUFNRixJQUFOO0FBQUEsS0FBeEI7QUFDQSxRQUFNSCxZQUFZLGdDQUFhSyxlQUFiLENBQWxCO0FBQ0FOLFdBQU9DLFVBQVUsQ0FBVixDQUFQLEVBQXFCTSxPQUFyQixDQUE2QixrQkFBSUgsSUFBSixDQUE3QjtBQUNELEdBTEQ7QUFNQUwsS0FBRyw4QkFBSCxFQUFtQyxZQUFNO0FBQ3ZDLFFBQU1LLE9BQU8sRUFBRUMsTUFBTSxzQkFBUixFQUFiO0FBQ0EsUUFBTUcsUUFBUSxFQUFFSCxNQUFNLHdCQUFSLEVBQWQ7QUFDQSxRQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCO0FBQUEsYUFBTUYsSUFBTjtBQUFBLEtBQXhCO0FBQ0EsUUFBTUssWUFBWSxTQUFaQSxTQUFZO0FBQUEsYUFBTUQsS0FBTjtBQUFBLEtBQWxCO0FBQ0EsUUFBTUUsWUFBWSxTQUFaQSxTQUFZO0FBQUEsYUFBTUYsS0FBTjtBQUFBLEtBQWxCO0FBQ0EsUUFBTVAsWUFBWSxnQ0FBYUssZUFBYixFQUE4QixDQUFDRyxTQUFELEVBQVlDLFNBQVosQ0FBOUIsQ0FBbEI7QUFDQVYsV0FBT0MsVUFBVSxDQUFWLENBQVAsRUFBcUJNLE9BQXJCLENBQTZCLGtCQUFJSCxJQUFKLENBQTdCO0FBQ0FKLFdBQU9DLFVBQVUsQ0FBVixDQUFQLEVBQXFCTSxPQUFyQixDQUE2QixrQkFBSUMsS0FBSixDQUE3QjtBQUNBUixXQUFPQyxVQUFVLENBQVYsQ0FBUCxFQUFxQk0sT0FBckIsQ0FBNkIsa0JBQUlDLEtBQUosQ0FBN0I7QUFDRCxHQVZEO0FBV0QsQ0F0QkQiLCJmaWxlIjoibWFrZUNhbGxiYWNrLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwdXQgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgbWFrZUNhbGxiYWNrIH0gZnJvbSAnLi4vbWFrZUNhbGxiYWNrJztcblxuZGVzY3JpYmUoJ1Ntb2tlIFRlc3RzJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIGV4aXN0cycsICgpID0+IHtcbiAgICBleHBlY3QobWFrZUNhbGxiYWNrKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ21ha2VDYWxsYmFjaygpJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIG5vdCBjcmFzaCB3aXRoIGVtcHR5IHBhcmFtJywgKCkgPT4ge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IG1ha2VDYWxsYmFjaygpO1xuICAgIGV4cGVjdChjYWxsYmFja3MubGVuZ3RoKS50b0JlKDApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBjb250YWluIGRlZmF1bHQgY2FsbGJhY2snLCAoKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHsgdHlwZTogJ1VTRVJfRkVUQ0hfU1VDQ0VFREVEJyB9O1xuICAgIGNvbnN0IGRlZmF1bHRDYWxsYmFjayA9ICgpID0+IGRhdGE7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gbWFrZUNhbGxiYWNrKGRlZmF1bHRDYWxsYmFjayk7XG4gICAgZXhwZWN0KGNhbGxiYWNrc1swXSkudG9FcXVhbChwdXQoZGF0YSkpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBjb250YWluIGFsbCBjYWxsYmFja3MnLCAoKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHsgdHlwZTogJ1VTRVJfRkVUQ0hfU1VDQ0VFREVEJyB9O1xuICAgIGNvbnN0IGRhdGEyID0geyB0eXBlOiAnVVNFUl9GRVRDSF9TVUNDRUVERURfMicgfTtcbiAgICBjb25zdCBkZWZhdWx0Q2FsbGJhY2sgPSAoKSA9PiBkYXRhO1xuICAgIGNvbnN0IGNhbGxiYWNrMiA9ICgpID0+IGRhdGEyO1xuICAgIGNvbnN0IGNhbGxiYWNrMyA9ICgpID0+IGRhdGEyO1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IG1ha2VDYWxsYmFjayhkZWZhdWx0Q2FsbGJhY2ssIFtjYWxsYmFjazIsIGNhbGxiYWNrM10pO1xuICAgIGV4cGVjdChjYWxsYmFja3NbMF0pLnRvRXF1YWwocHV0KGRhdGEpKTtcbiAgICBleHBlY3QoY2FsbGJhY2tzWzFdKS50b0VxdWFsKHB1dChkYXRhMikpO1xuICAgIGV4cGVjdChjYWxsYmFja3NbMl0pLnRvRXF1YWwocHV0KGRhdGEyKSk7XG4gIH0pO1xufSk7XG4iXX0=