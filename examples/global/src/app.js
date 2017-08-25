import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import App from './containers/App';
import OtherApp from './containers/OtherApp';
import { PAGE } from './containers/config';
import { OTHER_PAGE } from './containers/otherConfig';
import { reducer, saga } from '../../../build';

const store = configureStore({
  [PAGE]: reducer(PAGE),
  [OTHER_PAGE]: reducer(OTHER_PAGE),
});
store.runSaga(saga);

render(
  <Provider store={store}>
    <div>
      <App />
      <App />
      <hr />
      <OtherApp />
    </div>
  </Provider>,
  document.getElementById('root')
);
