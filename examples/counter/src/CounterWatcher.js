import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Value } from '../../../build';

export const increaseOne = (value) => value + 1;
export const decreaseOne = (value) => value - 1;
export const increaseIfOdd = (value) => value % 2 ? value + 1 : value;
export const decreaseIfEven = (value) => value % 2 === 0 ? value - 1 : value;

const selector = {
  keyPath: ['CounterPage', 'counter'],
  getter: (c) => c + 10,
};

const NODE_STORE_SELECTORS = {
  content: selector,
};

export class CounterWatcher extends PureComponent {
  render = () => {
    return (
      <p>
        Value <Value selector={selector} />
        <br />
        renderProp <Value selector={selector}>{(value) => <div>current value is {value}</div>}</Value>
      </p>
    );
  }
}

CounterWatcher.propTypes = {
  resaga: PropTypes.object.isRequired,
  counter: PropTypes.number,
};

CounterWatcher.defaultProps = {
  counter: 0,
};

export default CounterWatcher;
