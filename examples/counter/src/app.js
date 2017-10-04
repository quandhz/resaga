import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import Counter from './Counter';
import resaga, { reducer } from '../../../build';

const PAGE = 'CounterPage';
const store = configureStore({ [PAGE]: reducer(PAGE) });
const WrappedCounter = resaga(Counter, { name: PAGE });

render(
  <Provider store={store}><WrappedCounter /></Provider>,
  document.getElementById('root')
);
