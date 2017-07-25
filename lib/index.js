import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector as reselect } from 'reselect';
import { acknowledge, cleanup, submitForm } from './actions';
import config, { PAGE } from './config';
import constants, { STORE } from './constants';
import ReSaga from './resaga';
import { selectPage } from './selectors';

export const reSagaHOC = (Component, configs) => {
  /**
   * This class is for injecting redux store and dispatch functions only.
   * Component-to-be-wrapped, all props and configs are to be processed in <ReSaga />
   * Note: Must be a React Component, thus eslint-disable.
   */
  class PP extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render = () => <ReSaga Component={Component} configs={configs} {...this.props} />;
  }

  const mapState = reselect({
    [STORE]: selectPage(configs[PAGE]),
  });

  const mapDispatch = (dispatch) => ({
    dispatchProp: (...params) => dispatch(submitForm(...params)),
    acknowledgeProp: (...params) => dispatch(acknowledge(...params)),
    cleanupProp: (...params) => dispatch(cleanup(...params)),
  });

  return connect(mapState, mapDispatch)(PP);
};
reSagaHOC.config = config;
reSagaHOC.constants = constants;

export default reSagaHOC;
