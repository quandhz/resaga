/**
 * Created by quando on 3/3/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { acknowledge, cleanup, submitForm } from './actions';
import { PAGE } from './config';
import { STORE } from './constants';
// eslint-disable-next-line no-unused-vars
import ReSaga from './resaga';
import { selectPage } from './selectors';

const reSagaHOC = (Component, configs) => {
  /**
   * This class is for injecting redux store and dispatch functions only.
   * Component-to-be-wrapped, all props and configs are to be processed in <ReSaga />
   * Note: Must be a React Component, thus eslint-disable.
   */
  class PP extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render = () => <ReSaga Component={Component} configs={configs} {...this.props} />;
  }

  const mapStateToProps = createStructuredSelector({
    [STORE]: selectPage(configs[PAGE]),
  });

  const mapDispatchToProps = (dispatch) => ({
    dispatchProp: (...params) => dispatch(submitForm(...params)),
    acknowledgeProp: (...params) => dispatch(acknowledge(...params)),
    cleanupProp: (...params) => dispatch(cleanup(...params)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(PP);
};

export default reSagaHOC;
