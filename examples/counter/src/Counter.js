/* eslint-disable no-unused-vars */
import React, { PureComponent, PropTypes } from 'react';
import { PAGE } from './main';
import resaga from '../../../build';

export class Counter extends PureComponent {
  componentWillMount = () => this.props.resaga.setValue('counter', 0);
  handleIncrement = () => this.props.resaga.setValue('counter', (value) => value + 1);
  handleDecrement = () => this.props.resaga.setValue('counter', (value) => value - 1);

  render = () =>
    <div>
      <h1>Clicked: {this.props.resaga.getValue('counter') || 0} times</h1>
      <button onClick={this.handleIncrement}>+</button>
      <button onClick={this.handleDecrement}>-</button>
    </div>;
}

Counter.propTypes = {
  resaga: PropTypes.object,
};

export default resaga(Counter, { page: 'CounterPage' });
