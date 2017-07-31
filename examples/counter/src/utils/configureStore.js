/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux-immutable';
import sagaMonitor from './sagaMonitor';

export default function configureStore(reducer) {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  return {
    ...createStore(
      combineReducers(reducer),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
    runSaga: sagaMiddleware.run,
  };
}
