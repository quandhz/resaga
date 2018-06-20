import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const increaseOne = (value) => value + 1;
export const decreaseOne = (value) => value - 1;
export const increaseIfOdd = (value) => value % 2 ? value + 1 : value;
export const decreaseIfEven = (value) => value % 2 === 0 ? value - 1 : value;

export class Counter extends PureComponent {
  componentDidMount = () => this.props.resaga.setValue({
    counter: 0,
    hello: 'Jon',
  });


  increase = () => this.props.resaga.setValue({
    counter: increaseOne,
    hello: 'increase',
  });

  decrease = () => this.props.resaga.setValue({
    counter: decreaseOne,
    hello: 'decrease',
  });

  render = () => {
    const { counter: value, hello, resaga } = this.props;
    return (
      <p>
        Value {value} - action {hello}<br />
        <br /><br />
        <button id="init" onClick={() => resaga.setValue('counter', 0)}>
            Reset value to 0
        </button>
        <button id="set100" onClick={() => resaga.setValue('counter', 100)}>
            Set Counter to 100
        </button>
        <br /><br />
        <button id="increase" onClick={this.increase}>
            Increase
        </button>
        <button id="decrease" onClick={this.decrease}>
            Decrease
        </button>
        <br /><br />
        <button id="increaseIfOdd" onClick={() => resaga.setValue('counter', increaseIfOdd)}>
            Increase if odd
        </button>
        <button id="decreaseIfEven" onClick={() => resaga.setValue('counter', decreaseIfEven)}>
            Decrease if even
        </button>
        <br /><br />
        <button
          id="setObjectValue"
          onClick={() => resaga.setValue({ counter: 50 })}
        >
            Set by object (with value = 50)
        </button>
        <button
          id="setObjectFunc"
          onClick={() => resaga.setValue({ counter: (x) => x * 2 })}
        >
            Set by object (with function x2)
        </button>
      </p>
    );
  }
}

Counter.propTypes = {
  resaga: PropTypes.object.isRequired,
  counter: PropTypes.number,
};

Counter.defaultProps = {
  counter: 0,
};

export default Counter;
