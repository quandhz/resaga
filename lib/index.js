import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector as reselect } from 'reselect';
import actions, { acknowledge, cleanup, submitForm } from './actions';
import config, { PAGE } from './config';
import constants, { STORE, GET_VARIABLES, SET_VARIABLE, SET_VARIABLE_FN } from './constants';
import reducers from './reducer';
import reducerHelpers from './utils/reducer-helpers';
import sagasArray, { saga as sagaObject } from './sagas';
import ReSaga from './resaga';
import selectors, { selectPage } from './selectors';

export const reSagaHOC = (Component, configs) => {
  /**
   * This class is for injecting redux store and dispatch functions only.
   * Component-to-be-wrapped, all props and configs are to be processed in <ReSaga />
   * Note: Must be a React Component, thus eslint-disable.
   */
  class PP extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render = () => <ReSaga Component={Component} configs={configs} {...this.props} />
  }

  const mapState = reselect({
    [STORE]: selectPage(configs[PAGE]),
    [GET_VARIABLES]: selectors[GET_VARIABLES](configs[PAGE]),
  });

  const mapDispatch = (dispatch) => ({
    [SET_VARIABLE]: (...params) => dispatch(actions[SET_VARIABLE](configs[PAGE], ...params)),
    [SET_VARIABLE_FN]: (...params) => dispatch(actions[SET_VARIABLE_FN](configs[PAGE], ...params)),
    dispatchProp: (...params) => dispatch(submitForm(...params)),
    acknowledgeProp: (...params) => dispatch(acknowledge(...params)),
    cleanupProp: (...params) => dispatch(cleanup(...params)),
  });

  return connect(mapState, mapDispatch)(PP);
};
export const CONFIG = config;
export const CONSTANTS = constants;
export const wrapReducer = reducerHelpers.wrapReducer;
export const originReducer = reducers;
export const sagas = sagasArray;
export const saga = sagaObject;
export const reducer = (page, customs) => reducerHelpers.wrapReducer(reducers, page, customs);
reSagaHOC.reducer = reducer;
export default reSagaHOC;
