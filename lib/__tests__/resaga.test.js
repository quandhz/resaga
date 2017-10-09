import React from 'react';
import hoc from '../internal/hoc';
import resaga from '../resaga';

describe('Tests resaga HOC', () => {
  const Component = <div>Hello</div>;
  const CONFIG = { name: 'hi', requests: { hi: 'ho' } };


  beforeEach(() => {
    const mockFunction = (a = {}) => (b) => ({ a, b });
    hoc.withResaga = jest.fn(mockFunction);
    hoc.withSimplifyResaga = jest.fn(mockFunction);
  });
  afterEach(() => jest.clearAllMocks());


  describe('resaga(CONFIG)', () => {
    it('should return hoc.withResaga(CONFIG)', () => {
      expect(resaga(CONFIG)(Component)).toEqual(hoc.withResaga(CONFIG)(Component));
    });
  });


  describe('resaga()', () => {
    it('should return hoc.withSimplifyResaga()', () => {
      expect(resaga()(Component)).toEqual(hoc.withSimplifyResaga()(Component));
    });
  });


  describe('resaga(Component, CONFIG)', () => {
    it('should return hoc.withResaga(CONFIG)', () => {
      expect(resaga(Component, CONFIG)).toEqual(hoc.withResaga(CONFIG)(Component));
    });
  });


  describe('resaga(Component, { name: ... })', () => {
    it('should return hoc.withSimplifyResaga({ name: ... })', () => {
      expect(resaga(Component, { name: 'test' })).toEqual(hoc.withSimplifyResaga({ name: 'test' })(Component));
    });
  });
});
