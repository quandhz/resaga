import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../../helpers';

export class ReSaga extends React.PureComponent {
  /**
   * Automatically clear redux store on un-mount.
   * Unless users set manuallyCleanup to true in configs
   */
  componentWillUnmount = () => {
    clearTimeout(this.dispatchTimeout);
    clearTimeout(this.dispatchToTimeout);

    const { cleanup, configs } = this.props.internalProps;
    return !configs.manuallyCleanup && cleanup(configs.name);
  };


  setValue = (key, valueOrFunction) => {
    const { setValue, setValueWithFunc } = this.props.internalProps;

    if (typeof valueOrFunction === 'function') {
      return setValueWithFunc(key, valueOrFunction);
    }

    return setValue(key, valueOrFunction);
  };


  getValue = (key) => {
    const { values } = this.props.internalProps;
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


    const { configs } = this.props.internalProps;
    if (!configs) throw SyntaxError('`config` must be defined.');
    if (!configs.requests) throw SyntaxError('`config.requests` must be defined.');
    if (!configs.requests[requestName]) throw SyntaxError(`Request '${requestName}' must be defined in config.requests.`);


    const { beforeDispatch } = this.props.internalProps;
    const preProcess = configs.beforeSubmit || ((o) => (o));
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
    this.dispatchToTimeout = helpers.dispatchTo(...props, this.props);
  };


  /**
   * Utility Function: to be called on `componentWillReceiveProps`
   * Automatically call the assigned function and acknowledge the received prop
   * @param nextProps
   * @param actions
   */
  analyse = (nextProps, actions) => {
    helpers.analyseNextProps(nextProps, actions, {
      ...this.props.internalProps,
    });
  };


  isLoading = (key) => {
    const { configs } = this.props.internalProps;
    const storeName = configs.name;
    const store = this.props[storeName];
    if (!store || typeof store.get !== 'function') return false;
    const form = store.get(key);
    return !!(form && (form.isLoading || form.willLoad));
  };


  render() {
    const {
      internalProps,
      resaga: resagaFromComponent,
      ...props
    } = this.props;
    const { Component, cleanup } = internalProps;

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
  internalProps: PropTypes.object,
  resaga: PropTypes.object,
};

export default ReSaga;
