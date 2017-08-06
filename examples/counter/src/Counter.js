import React, { PropTypes } from 'react';


const increase = (value) => value + 1;
const decrease = (value) => value - 1;

const increaseIfOdd = (value) => value % 2 ? value + 1 : value;
const decreaseIfEven = (value) => value % 2 === 0 ? value - 1 : value;

const Counter = ({ resaga }) =>
  <p>
    Value {resaga.getValue('counter')}
    <br /><br />
    <button onClick={() => resaga.setValue('counter', 0)}>Init value</button>
    <button onClick={() => resaga.setValue('counter', 100)}>Set Counter to 100</button>
    <br /><br />
    <button onClick={() => resaga.setValue('counter', increase)}>Increase</button>
    <button onClick={() => resaga.setValue('counter', decrease)}>Decrease</button>
    <br /><br />
    <button onClick={() => resaga.setValue('counter', increaseIfOdd)}>Increase if odd</button>
    <button onClick={() => resaga.setValue('counter', decreaseIfEven)}>Decrease if even</button>
  </p>;

Counter.propTypes = {
  resaga: PropTypes.object,
};

export default Counter;
