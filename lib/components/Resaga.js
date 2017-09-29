import PropTypes from 'prop-types';
import React from 'react';
import { BEFORE_SUBMIT, SUBMIT } from '../internal/config';
import { IS_LOADING, WILL_LOAD } from '../internal/constants';
import component from '../utils/component-helpers';

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
   * @param requestName
   */
  dispatch = (payload, requestName) => {
    if (!requestName) throw SyntaxError('Request Name must be defined.');


    const { configs } = this.props.resagaInternalProps;
    if (!configs) throw SyntaxError('`config` must be defined.');
    if (!configs[SUBMIT]) throw SyntaxError('`config.requests` must be defined.');
    if (!configs[SUBMIT][requestName]) throw SyntaxError(`Request '${requestName}' must be defined in config.requests.`);


    const { beforeDispatch } = this.props.resagaInternalProps;
    const preProcess = configs[BEFORE_SUBMIT] || ((o) => (o));
    const postPayload = preProcess(payload);

    // delay 0ms to put this on execution queue to prevent it from getting overridden
    this.dispatchTimeout = setTimeout(() => {
      beforeDispatch(null, requestName, postPayload, { configs });
    }, 0);
  };


  /**
   * resaga.dispatchTo(TAB_CONTENT, FETCH_TAB, { payload: id, onSuccess: this.handleSuccess });
   * @param props
   * @returns {*}
   */
  dispatchTo = (...props) => {
    this.dispatchToTimeout = component.dispatchTo(...props, this.props);
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
