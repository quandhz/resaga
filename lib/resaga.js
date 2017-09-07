import PropTypes from 'prop-types';
import React from 'react';
import { BEFORE_SUBMIT, SUBMIT } from './config';
import { IS_LOADING, WILL_LOAD } from './constants';
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
   * - Case 1. dispatch(orgUserData, CREATE_ORG_USER);
   * - Case 2. dispatch(FETCH_TEMPLATES);
   * @param data
   * @param formName
   */
  dispatch = (data, formName) => {
    if (!formName) throw SyntaxError('Request Name must be defined.');


    const { CONFIG } = this.props.resagaInternalProps;
    if (!CONFIG) throw SyntaxError('`config` must be defined.');
    if (!CONFIG[SUBMIT]) throw SyntaxError('`config.submit` must be defined.');
    if (!CONFIG[SUBMIT][formName]) throw SyntaxError(`Request '${formName}' must be defined in config.submit.`);


    const { beforeDispatch } = this.props.resagaInternalProps;
    const preProcess = CONFIG[BEFORE_SUBMIT] || ((o) => (o));

    return beforeDispatch(preProcess(data), CONFIG, formName);
  };


  /**
   * resaga.dispatchTo(TAB_CONTENT, FETCH_TAB, { payload: id, onSuccess: this.handleSuccess });
   * @param componentName
   * @param requestName
   * @param options
   * @returns {*}
   */
  dispatchTo = (componentName, requestName, { payload, ...callback }) => {
    if (!componentName) throw SyntaxError('Component Name must be defined.');
    if (!requestName) throw SyntaxError('Request Name must be defined.');


    const CONFIG = componentName && configs.get(componentName);

    // TODO: use invariant
    if (!CONFIG) throw SyntaxError('`config` must be defined.');
    if (!CONFIG[SUBMIT]) throw SyntaxError('`config.submit` must be defined.');
    if (!CONFIG[SUBMIT][requestName]) throw SyntaxError(`Request '${requestName}' must be defined in config.submit.`);

    // TODO: use proper set/get and getKey to get callback
    if (callback) callbacks[`${componentName}.${requestName}`] = callback;

    const { beforeDispatch } = this.props.resagaInternalProps;
    const preProcess = CONFIG[BEFORE_SUBMIT] || ((o) => (o));

    return beforeDispatch(preProcess(payload), CONFIG, requestName, componentName);
  };


  /**
   * Utility Function: to be called on `componentWillReceiveProps`
   * Automatically call the assigned function and acknowledge the received prop
   * @param nextProps
   * @param actions
   */
  analyse = (nextProps, actions) => {
    const { dispatch, CONFIG } = this.props.resagaInternalProps;
    component.analyseNextProps(nextProps, actions, {
      acknowledge: this.acknowledge,
      dispatch,
      CONFIG,
      callbacks,
    });
  };


  /**
   * Acknowledge by cleaning up data of a request in redux store
   * @param formName
   */
  acknowledge = (formName) => {
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
      resaga: resagaFromComponent,
      ...props
    } = this.props;
    const { Component, cleanup } = resagaInternalProps;

    // map functions as props to component
    const resaga = {
      ...resagaFromComponent,
      analyse: this.analyse,
      dispatch: this.dispatch,
      dispatchTo: this.dispatchTo,
      acknowledge: this.acknowledge,
      setValue: this.setValue,
      getValue: this.getValue,
      isLoading: this.isLoading,
      cleanup,
    };

    return <Component resaga={resaga} {...props} />;
  }
}


ReSaga.propTypes = {
  resagaInternalProps: PropTypes.object,
  resaga: PropTypes.object,
};

export default ReSaga;
