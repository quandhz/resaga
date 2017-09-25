import PropTypes from 'prop-types';
import React from 'react';
import { BEFORE_SUBMIT, SUBMIT } from '../internal/config';
import configStore from '../utils/configs';

export class SimpleResaga extends React.PureComponent {
  /**
   * Automatically clear redux store on un-mount.
   * Unless users set manuallyCleanup to true in configs
   */
  componentWillUnmount = () => {
    clearTimeout(this.dispatchToTimeout);
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
    if (!configs) throw SyntaxError('`configs` must be defined.');
    if (!configs[SUBMIT]) throw SyntaxError('`configs.submit` must be defined.');
    if (!configs[SUBMIT][requestName]) throw SyntaxError(`Request '${requestName}' must be defined in configs.submit.`);


    const { beforeDispatch } = this.props.resagaInternalProps;
    const preProcess = configs[BEFORE_SUBMIT] || ((o) => (o));
    const postPayload = preProcess(payload);

    // delay 1ms to put this on execution queue to prevent it from getting overridden
    this.dispatchToTimeout = setTimeout(() => {
      beforeDispatch(componentName, requestName, postPayload, { configs, callback });
    }, 1);
  };


  render() {
    const {
      resagaInternalProps,
      ...props
    } = this.props;
    const { Component } = resagaInternalProps;

    // map functions as props to component
    const resaga = {
      dispatchTo: this.dispatchTo,
    };

    return <Component resaga={resaga} {...props} />;
  }
}


SimpleResaga.propTypes = {
  resagaInternalProps: PropTypes.object,
};

export default SimpleResaga;
