/* eslint-disable no-unused-vars*/
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import Counter from './Counter';
import { reducer } from '../../../build';

const PAGE = 'CounterPage';
const store = configureStore({ [PAGE]: reducer(PAGE) });

render(
  <Provider store={store}><Counter /></Provider>,
  document.getElementById('root')
);
