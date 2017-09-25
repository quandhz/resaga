import PropTypes from 'prop-types';
import React from 'react';
import { BEFORE_SUBMIT, SUBMIT } from '../internal/config';
import { IS_LOADING, WILL_LOAD } from '../internal/constants';
import component from '../utils/component-helpers';
import configStore from '../utils/configs';

const callbacks = {};

export class ReSaga extends React.PureComponent {
  /**
   * Automatically clear redux store on un-mount.
   * Unless users set manuallyCleanup to true in configs
   */
  componentWillUnmount = () => {
    clearTimeout(this.dispatchTimeout);
    clearTimeout(this.dispatchToTimeout);

    const { cleanup, configs } = this.props.resagaInternalProps;
    return !configs.manuallyCleanup && cleanup(configs.name);
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
   * @param payload
   * @param formName
   */
  dispatch = (payload, formName) => {
    if (!formName) throw SyntaxError('Request Name must be defined.');


    const { configs } = this.props.resagaInternalProps;
    if (!configs) throw SyntaxError('`config` must be defined.');
    if (!configs[SUBMIT]) throw SyntaxError('`config.submit` must be defined.');
    if (!configs[SUBMIT][formName]) throw SyntaxError(`Request '${formName}' must be defined in config.submit.`);


    const { beforeDispatch } = this.props.resagaInternalProps;
    const preProcess = configs[BEFORE_SUBMIT] || ((o) => (o));
    const postPayload = preProcess(payload);

    // delay 1ms to put this on execution queue to prevent it from getting overridden
    this.dispatchTimeout = setTimeout(() => {
      beforeDispatch(null, formName, postPayload, { configs });
    }, 1);
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


    const configs = componentName && configStore.get(componentName);

    // TODO: use invariant
    if (!configs) throw SyntaxError('`config` must be defined.');
    if (!configs[SUBMIT]) throw SyntaxError('`config.submit` must be defined.');
    if (!configs[SUBMIT][requestName]) throw SyntaxError(`Request '${requestName}' must be defined in config.submit.`);

    // TODO: use proper set/get and getKey to get callback
    if (callback) callbacks[`${componentName}.${requestName}`] = callback;

    const { beforeDispatch } = this.props.resagaInternalProps;
    const preProcess = configs[BEFORE_SUBMIT] || ((o) => (o));
    const postPayload = preProcess(payload);

    // delay 1ms to put this on execution queue to prevent it from getting overridden
    this.dispatchToTimeout = setTimeout(() => {
      beforeDispatch(componentName, requestName, postPayload, { configs, callback });
    }, 1);
  };


  /**
   * Utility Function: to be called on `componentWillReceiveProps`
   * Automatically call the assigned function and acknowledge the received prop
   * @param nextProps
   * @param actions
   */
  analyse = (nextProps, actions) => {
    component.analyseNextProps(nextProps, actions, {
      ...this.props.resagaInternalProps,
    });
  };


  isLoading = (key) => {
    const { configs } = this.props.resagaInternalProps;
    const storeName = configs.name;
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
