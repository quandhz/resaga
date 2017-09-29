/**
 * Created by Jay on 6/8/17.
 */
import { PAGE, CONFIG, req } from '../config';

describe('config.js', () => {
  describe('variables', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
      expect(PAGE).toBeDefined();
      expect(req).toBeDefined();
      expect(typeof req.fetch).toBe('function');
    });
  });

  describe('CONFIG', () => {
    it('submit fetchReddit', () => {
      const mockResult = { json: jest.fn() };
      const mockData = 'hi';
      req.fetch = jest.fn(() => mockResult);
      CONFIG.requests.fetchReddit(mockData);
      expect(req.fetch).toBeCalled();
    });
    it('processResult', () => {
      const mockResult = { data: { children: ['hi'] } };
      const result = CONFIG.processResult.fetchReddit(mockResult);
      expect(result).toBeDefined();
      expect(result.posts).toBeDefined();
      expect(result.lastUpdated).toBeDefined();
    });
  });
});
