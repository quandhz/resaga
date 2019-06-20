import React from 'react';
import { useValue } from '../../../build';

export const increaseOne = (value) => value + 1;
export const decreaseOne = (value) => value - 1;
export const increaseIfOdd = (value) => value % 2 ? value + 1 : value;
export const decreaseIfEven = (value) => value % 2 === 0 ? value - 1 : value;

export const Watcher = () => {
  const counter = useValue({
    keyPath: ['CounterPage', 'counter'],
    getter: (c) => c + 10,
  });

  console.log('counter', counter);

  return (
    <div>
      counter {counter}
    </div>
  );
};

export default Watcher;
