/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import createSagaMiddleware from 'redux-saga';

export default function configureStore(reducer) {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      combineReducers(reducer),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(sagaMiddleware),
    ),
    runSaga: sagaMiddleware.run,
  };
}
