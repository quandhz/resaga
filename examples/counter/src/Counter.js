import React from 'react';
import PropTypes from 'prop-types';

export const increase = (value) => value + 1;
export const decrease = (value) => value - 1;
export const increaseIfOdd = (value) => value % 2 ? value + 1 : value;
export const decreaseIfEven = (value) => value % 2 === 0 ? value - 1 : value;

const Counter = ({ resaga }) =>
  <p>
    Value {resaga.getValue('counter')}
    <br /><br />
    <button id="init" onClick={() => resaga.setValue('counter', 0)}>Init value</button>
    <button id="set100" onClick={() => resaga.setValue('counter', 100)}>Set Counter to 100</button>
    <br /><br />
    <button id="increase" onClick={() => resaga.setValue('counter', increase)}>Increase</button>
    <button id="decrease" onClick={() => resaga.setValue('counter', decrease)}>Decrease</button>
    <br /><br />
    <button id="increaseIfOdd" onClick={() => resaga.setValue('counter', increaseIfOdd)}>Increase if odd</button>
    <button id="decreaseIfEven" onClick={() => resaga.setValue('counter', decreaseIfEven)}>Decrease if even</button>
  </p>;

Counter.propTypes = {
  resaga: PropTypes.object,
};

export default Counter;
