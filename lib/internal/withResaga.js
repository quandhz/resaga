import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector as reselect } from 'reselect';
import actions, { doAcknowledge, beforeSubmitForm, doCleanup, submitForm } from '../actions';
import { GET_VARIABLES, SET_VARIABLE, SET_VARIABLE_FN } from '../constants';
import ReSaga from '../resaga';
import selectors, { selectPage } from '../selectors';
import configs from '../utils/configs';
import { isValidConfig } from './utils/config-validation';

export const withResaga = (Component, CONFIG) => {
  if (!isValidConfig(CONFIG)) throw new Error('CONFIG is invalid');


  /**
   * This class is for injecting redux store and dispatch functions only.
   * Component-to-be-wrapped, all props and configs are to be processed in <ReSaga />
   * Note: Must be a React Component, thus eslint-disable.
   */
  class PP extends React.PureComponent {
    componentWillMount = () => configs.set(CONFIG.name, CONFIG);


    componentWillUnmount = () => configs.delete(CONFIG.name);


    render = () => {
      const {
        values,
        setValue,
        setValueWithFunc,
        beforeDispatch,
        dispatch,
        acknowledge,
        cleanup,
        ...props
      } = this.props;


      const resagaInternalProps = { Component, CONFIG, values, setValue, setValueWithFunc, beforeDispatch, dispatch, acknowledge, cleanup };

      return <ReSaga resagaInternalProps={resagaInternalProps} {...props} />;
    }
  }


  PP.propTypes = {
    values: PropTypes.object,
    setValue: PropTypes.func,
    setValueWithFunc: PropTypes.func,
    beforeDispatch: PropTypes.func,
    dispatch: PropTypes.func,
    acknowledge: PropTypes.func,
    cleanup: PropTypes.func,
  };


  const mapState = reselect({
    [CONFIG.name]: selectPage(CONFIG.name),
    values: selectors[GET_VARIABLES](CONFIG.name),
  });


  const mapDispatch = (dispatch) => ({
    setValue: (...params) => dispatch(actions[SET_VARIABLE](CONFIG.name, ...params)),
    setValueWithFunc: (...params) => dispatch(actions[SET_VARIABLE_FN](CONFIG.name, ...params)),
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
    dispatch: (...params) => dispatch(submitForm(...params)),
    acknowledge: (...params) => dispatch(doAcknowledge(...params)),
    cleanup: (...params) => dispatch(doCleanup(...params)),
  });

  return connect(mapState, mapDispatch)(PP);
};

export default withResaga;
