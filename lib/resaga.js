import PropTypes from 'prop-types';
import React from 'react';
import { BEFORE_SUBMIT, SUBMIT } from './config';
import { GET_VARIABLES, SET_VARIABLE, SET_VARIABLE_FN, IS_LOADING, WILL_LOAD } from './constants';
import component from './utils/component-helpers';
import configs from './utils/configs';

const callbacks = {};

export class ReSaga extends React.PureComponent {
  /**
   * Automatically clear redux store on un-mount.
   * Unless users set manuallyCleanup to true in CONFIG
   */
  componentWillUnmount = () => {
    const { cleanup, CONFIG } = this.props.resagaInternalProps;
    return !CONFIG.manuallyCleanup && cleanup(CONFIG.name);
  };

  setValue = (key, valueOrFunc) => {
    const { setValue, setValueWithFunc } = this.props.resagaInternalProps;
    if (typeof valueOrFunc === 'function') {
      return setValueWithFunc(key, valueOrFunc);
    }
    return setValue(key, valueOrFunc);
  };
  getValue = (key) => {
    const { values } = this.props.resagaInternalProps;
    return values ? values.get(key) : null;
  };

  /**
   * Submit form with data. 2 ways to call this function:
   * - Case 1. dispatchSaga(orgUserData, CREATE_ORG_USER);
   * - Case 2. dispatchSaga(FETCH_TEMPLATES);
   * @param data
   * @param formName
   * @param pageName
   */
  dispatchSaga = (data, formName, pageName, callback) => {
    if (!formName) throw SyntaxError('Request Name must be defined.');

    const manualConfig = pageName && configs.get(pageName);
    const { CONFIG = manualConfig, beforeDispatch } = this.props.resagaInternalProps;
    if (!CONFIG) throw SyntaxError('`config` must be defined.');
    if (!CONFIG[SUBMIT]) throw SyntaxError('`config.submit` must be defined.');
    if (!formName || !CONFIG[SUBMIT][formName]) throw SyntaxError(`Request '${formName}' must be defined in config.submit.`);

    const preProcess = CONFIG[BEFORE_SUBMIT] || ((o) => (o));
    const params = [preProcess(data), CONFIG, formName, pageName];

    const key = `${pageName}.${formName}`;
    if (callback) callbacks[key] = callback;
    console.log('dispatchSaga callbacks', callbacks);
    return beforeDispatch(...params);
  };

  /**
   * Utility Function: to be called on `componentWillReceiveProps`
   * Automatically call the assigned function and acknowledge the received prop
   * @param nextProps
   * @param actions
   */
  analyseProps = (nextProps, actions) => {
    const { dispatch, CONFIG } = this.props.resagaInternalProps;
    component.analyseNextProps(nextProps, actions, {
      acknowledge: this.acknowledgeStore,
      dispatch,
      CONFIG,
      callbacks,
    });
  };

  /**
   * Acknowledge by cleaning up data of a request in redux store
   * @param formName
   */
  acknowledgeStore = (formName) => {
    const { acknowledge, CONFIG } = this.props.resagaInternalProps;
    acknowledge(CONFIG.name, formName);
  };

  isLoading = (key) => {
    const { CONFIG } = this.props.resagaInternalProps;
    const storeName = CONFIG.name;
    const store = this.props[storeName];
    if (!store || typeof store.get !== 'function') return false;
    const form = store.get(key);
    return !!(form && (form[IS_LOADING] || form[WILL_LOAD]));
  };

  render() {
    const {
      resagaInternalProps,
      ...props
    } = this.props;
    const { Component } = resagaInternalProps;

    // map functions as props to component
    const resaga = {
      analyse: this.analyseProps,
      dispatch: this.dispatchSaga,
      acknowledge: this.acknowledgeStore,
      cleanup: this.props.cleanupProp,
      setValue: this.setValue,
      getValue: this.getValue,
      isLoading: this.isLoading,
    };

    return <Component resaga={resaga} {...props} />;
  }
}

ReSaga.propTypes = {
  resagaInternalProps: PropTypes.object,
  Component: PropTypes.any,
  beforeDispatchProp: PropTypes.func,
  dispatchProp: PropTypes.func,
  acknowledgeProp: PropTypes.func,
  cleanupProp: PropTypes.func,
  CONFIG: PropTypes.object,
  [GET_VARIABLES]: PropTypes.object,
  [SET_VARIABLE]: PropTypes.func,
  [SET_VARIABLE_FN]: PropTypes.func,
};

export default ReSaga;
