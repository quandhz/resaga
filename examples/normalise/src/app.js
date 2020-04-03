import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import App from './containers/App';
import { PAGE } from './containers/config';
import { reducer, sagas } from '../../../build';

const config = configureStore({
  [PAGE]: reducer(PAGE),
  selectStore: reducer('selectStore'),
  updateStore: reducer('updateStore'),
  normaliseStore: reducer('normaliseStore'),
});
config.runSaga(sagas[0]);

render(
  <Provider store={config.store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
