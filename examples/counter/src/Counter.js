import React, { PropTypes } from 'react';

const Counter = ({ resaga }) =>
  <p>
    Clicked: {resaga.getValue('counter') || 0} times
    {' '}
    <button onClick={() => resaga.setValue('counter', (value) => value + 1)}>+</button>
    {' '}
    <button onClick={() => resaga.setValue('counter', (value) => value - 1)}>-</button>
  </p>;

Counter.propTypes = {
  resaga: PropTypes.object,
};

export default Counter;
