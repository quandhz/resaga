import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import App from './containers/App';
import OtherApp from './containers/OtherApp';
import SimpleApp from './containers/SimpleApp';
import { PAGE } from './containers/config';
import { OTHER_PAGE } from './containers/otherConfig';
import { reducer, sagas } from '../../../build';

const config = configureStore({
  [PAGE]: reducer(PAGE),
  [OTHER_PAGE]: reducer(OTHER_PAGE),
});
config.runSaga(sagas[0]);

render(
  <Provider store={config.store}>
    <div>
      <h1>Component 1: Normal resaga component</h1>
      <h3>Reducer store registered as AsyncPage</h3>
      <App />
      <hr /><hr />


      <h1>Component 2: Simple, no reducer</h1>
      <h3>No reducer store registered</h3>
      <SimpleApp />
      <hr /><hr />


      <h1>Component 3: Normal resaga component</h1>
      <h3>Reducer store registered as OtherAsyncPage</h3>
      <OtherApp />
    </div>
  </Provider>,
  document.getElementById('root')
);
