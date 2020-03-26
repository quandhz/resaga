/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import createSagaMiddleware from 'redux-saga';

export default function configureStore(reducer, initialState) {
  let composeEnhancers = compose;
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    combineReducers(reducer),
    initialState,
    composeEnhancers(...enhancers),
  );
  store.runSaga = sagaMiddleware.run;
  return {
    runSaga: sagaMiddleware.run,
    store,
  };
}
