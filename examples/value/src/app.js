import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import App from './containers/App';
import AnotherApp from './containers/AnotherApp';
import SimplifyApp from './containers/SimplifyApp';
import { PAGE } from './containers/config';
import { PAGE as ANOTHER_PAGE } from './containers/anotherConfig';
import { reducer, sagas } from '../../../build';

const store = configureStore({
  [PAGE]: reducer(PAGE),
  [ANOTHER_PAGE]: reducer(ANOTHER_PAGE),
});
store.runSaga(sagas[0]);

render(
  <Provider store={store}>
    <div>
      <App />
      <hr />
      <AnotherApp />
      <hr />
      <SimplifyApp />
    </div>
  </Provider>,
  document.getElementById('root')
);
