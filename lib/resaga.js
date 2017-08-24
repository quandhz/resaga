import PropTypes from 'prop-types';
import React from 'react';
import { BEFORE_SUBMIT, SUBMIT, MANUALLY_CLEANUP } from './config';
import { GET_VARIABLES, SET_VARIABLE, SET_VARIABLE_FN, STORE, IS_LOADING } from './constants';
import component from './utils/component-helpers';
import { getConfig } from './index';

export class ReSaga extends React.PureComponent {
  /**
   * Automatically clear redux store on un-mount.
   * Unless users set manuallyCleanup to true in CONFIG
   */
  componentWillUnmount = () => !this.props.configs[MANUALLY_CLEANUP] && this.props.cleanupProp(this.props.configs.page);

  setValue = (key, valueOrFunc) => {
    if (typeof valueOrFunc === 'function') {
      return this.props[SET_VARIABLE_FN](key, valueOrFunc);
    }
    return this.props[SET_VARIABLE](key, valueOrFunc);
  };
  getValue = (key) => this.props[GET_VARIABLES] ? this.props[GET_VARIABLES].get(key) : null;

  /**
   * Submit form with data. 2 ways to call this function:
   * - Case 1. dispatchSaga(orgUserData, CREATE_ORG_USER);
   * - Case 2. dispatchSaga(FETCH_TEMPLATES);
   * @param data
   * @param formName
   * @param pageName
   */
  dispatchSaga = (data, formName, pageName) => {
    const configs = (pageName && getConfig(pageName)) || this.props.configs;
    console.log('configs', configs);

    if (!configs) throw SyntaxError('`config` must be defined.');
    if (!configs[SUBMIT]) throw SyntaxError('`config.submit` must be defined.');
    if (!formName || !configs[SUBMIT][formName]) throw SyntaxError(`Request '${formName}' must be defined in config.submit.`);

    const preProcess = configs[BEFORE_SUBMIT] || ((o) => (o));

    // case 1: both parameters passed in
    if (formName) return this.props.dispatchProp(preProcess(data), configs, formName, pageName);

    // case 2: one parameter passed in
    return this.props.dispatchProp({}, configs, data, pageName);
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

  isLoading = (key) => {
    const store = this.props[STORE];
    if (!store || typeof this.props[STORE].get !== 'function') return false;
    const form = this.props[STORE].get(key);
    return !!(form && form[IS_LOADING]);
  };

  render() {
    const {
      Component,
      [SET_VARIABLE]: setVariable, [GET_VARIABLES]: variables, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

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
  [GET_VARIABLES]: PropTypes.object,
  [SET_VARIABLE]: PropTypes.func,
  [SET_VARIABLE_FN]: PropTypes.func,
};

export default ReSaga;
