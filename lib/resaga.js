import PropTypes from 'prop-types';
import React from 'react';
import { BEFORE_SUBMIT, MANUALLY_CLEANUP } from './config';
import component from './utils/component-helpers';

class ReSaga extends React.PureComponent {
  /**
   * Automatically clear redux store on un-mount.
   * Unless users set manuallyCleanup to true in CONFIG
   */
  componentWillUnmount = () => !this.props.configs[MANUALLY_CLEANUP] && this.props.cleanupProp(this.props.configs.page);

  /**
   * Submit form with data. 2 ways to call this function:
   * - Case 1. dispatchSaga(orgUserData, CREATE_ORG_USER);
   * - Case 2. dispatchSaga(FETCH_TEMPLATES);
   * @param data
   * @param formName
   */
  dispatchSaga = (data, formName) => {
    const preProcess = this.props.configs[BEFORE_SUBMIT] || ((o) => (o));

    // case 1: both parameters passed in
    if (formName) return this.props.dispatchProp(preProcess(data), this.props.configs, formName);

    // case 2: one parameter passed in
    return this.props.dispatchProp({}, this.props.configs, data);
  };

  /**
   * Utility Function: to be called on `componentWillReceiveProps`
   * Automatically call the assigned function and acknowledge the received prop
   * @param nextProps
   * @param actions
   */
  analyseProps = (nextProps, actions) => component.analyseNextProps(nextProps, actions, this.acknowledgeStore);

  /**
   * Acknowledge by cleaning up data of a request in redux store
   * @param formName
   */
  acknowledgeStore = (formName) => this.props.acknowledgeProp(this.props.configs.page, formName);

  render() {
  // eslint-disable-next-line no-unused-vars
    const { Component, ...props } = this.props;

    // map functions as props to component
    const resaga = {
      analyse: this.analyseProps,
      dispatch: this.dispatchSaga,
      acknowledge: this.acknowledgeStore,
      cleanup: this.props.cleanupProp,
    };

    return (
      <Component
        {...props}
        onSubmit={this.dispatchSaga} // keep it for backward compatibility
        resaga={resaga}
      />
    );
  }
}

ReSaga.propTypes = {
  Component: PropTypes.any,
  dispatchProp: PropTypes.func,
  acknowledgeProp: PropTypes.func,
  cleanupProp: PropTypes.func,
  configs: PropTypes.object,
};

export default ReSaga;
