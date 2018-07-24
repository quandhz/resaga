import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import App from './containers/App';
import { reducer, sagas } from '../../../build';

const store = configureStore({
  normaliseStore: reducer('normaliseStore'),
});
store.runSaga(sagas[0]);

render(
  <Provider store={store}>
    <App id={12} childId={11} ids={[11, 12, 13]} extras1={[99]} extras2={[100]} updateId={12} updateChecklist={12} />
  </Provider>,
  document.getElementById('root')
);
