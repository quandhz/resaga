import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import Counter from './Counter';
import Watcher from './Watcher';
import CounterWatcher from './CounterWatcher';
import resaga, { reducer } from '../../../build';

const PAGE = 'CounterPage';
const store = configureStore({ [PAGE]: reducer(PAGE) });

const WrappedCounter = resaga({
  value: {
    counter: ['CounterPage', 'counter'],
  },
  setValue: {
    counter: ['CounterPage', 'counter'],
  },
})(Counter);

render(
  <Provider store={store}>
    <div>
      <WrappedCounter />
      <Watcher />
      <CounterWatcher />
    </div>
  </Provider>,
  document.getElementById('root')
);
