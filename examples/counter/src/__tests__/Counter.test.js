import React from 'react';
import { shallow } from 'enzyme';
import Counter, { increase, increaseIfOdd, decrease, decreaseIfEven } from '../Counter';

describe('Counter', () => {
  const key = 'counter';
  describe('<Counter />', () => {
    const resaga = {
      setValue: jest.fn(),
      getValue: jest.fn(),
    };
    const rendered = shallow(<Counter resaga={resaga} />);

    afterEach(() => {
      resaga.setValue.mockClear();
      resaga.getValue.mockClear();
    });

    it('should render without exploding', () => {
      expect(rendered).toBeDefined();
    });
    it('should have resaga prop', () => {
      const component = rendered.instance();
      const props = component.props;
      expect(props).toBeDefined();
      expect(props.resaga).toBe(resaga);
    });

    describe('componentDidMount()', () => {
      it('should work correctly', () => {
        const component = rendered.instance();
        component.componentDidMount();
        expect(resaga.setValue).toBeCalledWith(key, 0);
      });
    });

    it('#init', () => {
      const btn = rendered.find('#init');
      expect(btn.length).toBe(1);
      btn.simulate('click');
      expect(resaga.setValue).toBeCalledWith(key, 0);
    });
    it('#set100', () => {
      const btn = rendered.find('#set100');
      expect(btn.length).toBe(1);
      btn.simulate('click');
      expect(resaga.setValue).toBeCalledWith(key, 100);
    });
    it('#increase', () => {
      const btn = rendered.find('#increase');
      expect(btn.length).toBe(1);
      btn.simulate('click');
      expect(resaga.setValue).toBeCalledWith(key, increase);
    });
    it('#decrease', () => {
      const btn = rendered.find('#decrease');
      expect(btn.length).toBe(1);
      btn.simulate('click');
      expect(resaga.setValue).toBeCalledWith(key, decrease);
    });
    it('#increaseIfOdd', () => {
      const btn = rendered.find('#increaseIfOdd');
      expect(btn.length).toBe(1);
      btn.simulate('click');
      expect(resaga.setValue).toBeCalledWith(key, increaseIfOdd);
    });
    it('#decreaseIfEven', () => {
      const btn = rendered.find('#decreaseIfEven');
      expect(btn.length).toBe(1);
      btn.simulate('click');
      expect(resaga.setValue).toBeCalledWith(key, decreaseIfEven);
    });
  });

  describe('increase', () => {
    it('should work correctly', () => {
      expect(increase(1)).toBe(2);
    });
  });

  describe('increaseIfOdd', () => {
    it('should work correctly - odd', () => {
      expect(increaseIfOdd(1)).toBe(2);
    });
    it('should work correctly - even', () => {
      expect(increaseIfOdd(2)).toBe(2);
    });
  });

  describe('decrease', () => {
    it('should work correctly', () => {
      expect(decrease(1)).toBe(0);
    });
  });

  describe('decreaseIfEven', () => {
    it('should work correctly - odd', () => {
      expect(decreaseIfEven(1)).toBe(1);
    });
    it('should work correctly - even', () => {
      expect(decreaseIfEven(2)).toBe(1);
    });
  });
});
