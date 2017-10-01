import resaga, { CONFIG, sagas, reducer } from '../index';

describe('Test Export', () => {
  describe('resaga', () => {
    it('should exists', () => {
      expect(resaga).toBeDefined();
      expect(typeof resaga).toBe('function');
    });
  });


  describe('CONFIG', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
      expect(typeof CONFIG).toBe('object');
    });
  });


  describe('sagas', () => {
    it('should exists', () => {
      expect(sagas).toBeDefined();
      expect(typeof sagas).toBe('object');
    });
  });


  describe('reducer', () => {
    it('should exists', () => {
      expect(reducer).toBeDefined();
      expect(typeof reducer).toBe('function');
    });
  });
});
