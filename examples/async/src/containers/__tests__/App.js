import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

describe('App', () => {
  const resaga = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    acknowledge: jest.fn(),
    cleanup: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(),
  };
  const rendered = shallow(<App resaga={resaga} />);

  describe('<App />', () => {
    it('should render without exploding', () => {
      expect(rendered).toBeDefined();
    });
    it('should render with lastUpdated', () => {
      resaga.getValue = jest.fn(((key) => key === 'lastUpdated' ? new Date() : null));
      shallow(<App resaga={resaga} />);
    });
    it('should render with posts', () => {
      resaga.getValue = jest.fn(((key) => key === 'posts' ? ['hi'] : null));
      shallow(<App resaga={resaga} />);
    });
  });

  describe('componentDidMount()', () => {
    it('should call handleChange', () => {
      const page = rendered.instance();
      const spy = jest.spyOn(page, 'handleChange');
      page.componentDidMount();
      expect(spy).toBeCalled();
      spy.mockRestore();
    });
  });

  describe('componentWillReceiveProps()', () => {
    afterAll(() => resaga.analyse.mockClear());
    it('should call resaga.analyse', () => {
      const page = rendered.instance();
      page.componentWillReceiveProps();
      expect(resaga.analyse).toBeCalled();
    });
  });

  describe('fetchReddit()', () => {
    beforeEach(() => {
      resaga.setValue.mockClear();
      resaga.getValue.mockClear();
      resaga.dispatch.mockClear();
    });
    it('should call resaga', () => {
      const page = rendered.instance();
      page.fetchReddit();
      expect(resaga.setValue).toBeCalled();
      expect(resaga.getValue).toBeCalled();
      expect(resaga.dispatch).toBeCalled();
    });
  });

  describe('fetchSuccess()', () => {
    beforeEach(() => {
      resaga.setValue.mockClear();
    });
    it('should call resaga.setValue', () => {
      const page = rendered.instance();
      const mock = { post: 'hi', lastUpdated: 'ho' };
      page.fetchSuccess(mock);
      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('handleChange()', () => {
    beforeEach(() => {
      resaga.setValue.mockClear();
    });
    it('should call resaga.setValue and fetchReddit', () => {
      const page = rendered.instance();
      const mock = 'hi';
      page.fetchReddit = jest.fn();
      page.handleChange(mock);
      expect(resaga.setValue).toBeCalled();
      expect(page.fetchReddit).toBeCalledWith(mock);
    });
  });

  describe('handleRefresh()', () => {
    it('should call fetchReddit', () => {
      const page = rendered.instance();
      page.fetchReddit = jest.fn();
      page.handleRefresh();
      expect(page.fetchReddit).toBeCalled();
    });
  });
});
