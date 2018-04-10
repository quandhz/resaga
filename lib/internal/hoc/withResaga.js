/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import React from 'react';
import actions, { beforeSubmitForm, doAcknowledge, doCleanup, submitForm } from '../actions';
import { SET_VARIABLE, SET_VARIABLE_FN } from '../constants';
import debugs from '../../internal/debugs';
import debug from '../../debug';
import utils from '../helpers';
import helpers from './helpers';
import selectors from '../selectors';


const resaga = (originConfigs) => (Component) => {
  const configs = utils.config.analyseConfigs(originConfigs);


  class Resaga extends React.PureComponent {
    componentWillMount = () => {
      utils.config.set(configs.name, configs);
      const {
        setValue, setValueWithFunc,
        beforeDispatch, dispatch, acknowledge, cleanup,
      } = this.props;

      this.internalProps = {
        Component, configs, setValue, setValueWithFunc, beforeDispatch, dispatch, acknowledge, cleanup,
      };

      // map functions as props to component
      this.resagaAPIs = {
        analyse: this.analyse,
        dispatch: this.dispatch,
        dispatchTo: this.dispatchTo,
        setValue: this.setValue,
        getValue: this.getValue,
        isLoading: this.isLoading,
        cleanup,
        acknowledge,
      };

      this.values = helpers.exportValues({ props: this.props, configs });
    };

    componentWillReceiveProps = (nextProps) => {
      this.checkCallbacks = helpers.componentWillReceiveProps(this.props, nextProps);

      if (debug.on()) {
        const name = `${this.internalProps.Component.name}${this.props.id ? `[${this.props.id}]` : ''}`;
        debugs.componentWillReceiveProps(name, this.props, nextProps);
      }
    };


    componentWillUpdate = (nextProps) => {
      const changes = helpers.getValuesChanged(this.values, nextProps, this.internalProps);
      if (changes) {
        this.values = { ...this.values, ...changes };
      }
    };


    componentWillUnmount = () => {
      utils.config.delete(configs.name);
      helpers.cleanUp(this.internalProps);
      clearTimeout(this.checkCallbacks);
    };


    setValue = (...props) =>
      helpers.setValue(this.internalProps, ...props);


    getValue = (...props) =>
      helpers.getValue(this.props, ...props);


    dispatch = (...props) =>
      helpers.dispatch(...props, this.internalProps);


    dispatchTo = (...props) =>
      helpers.dispatchTo(...props, this.internalProps);


    analyse = (nextProps = {}, action = {}) =>
      helpers.analyseNextProps(nextProps, action, this.internalProps);


    isLoading = (...props) =>
      helpers.isLoading(this.internalProps, this.props, ...props);


    render = () => {
      const { resagaAPIs, values, props } = this;

      return (<Component
        resaga={resagaAPIs}
        {...helpers.exportProps(props)}
        {...values}
      />);
    };
  }


  Resaga.propTypes = {
    resaga: PropTypes.object, // from parent

    setValue: PropTypes.func,
    setValueWithFunc: PropTypes.func,
    beforeDispatch: PropTypes.func,
    dispatch: PropTypes.func,
    acknowledge: PropTypes.func,
    cleanup: PropTypes.func,
    id: PropTypes.any,
  };

  Resaga.defaultProps = {
  };


  const mapState = (state, props) => {
    const subscribe = utils.subscribeValue(configs)(state, props);
    return ({
      [configs.name]: selectors.selectPage(configs.name)(state, props),
      ...subscribe,
    });
  };


  const mapDispatch = (dispatch) => ({
    setValue: (...params) => dispatch(actions[SET_VARIABLE](...params)),
    setValueWithFunc: (...params) => dispatch(actions[SET_VARIABLE_FN](...params)),
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
    dispatch: (...params) => dispatch(submitForm(...params)),
    acknowledge: (...params) => dispatch(doAcknowledge(configs.name, ...params)),
    cleanup: (...params) => dispatch(doCleanup(...params)),
  });


  return utils.connect(mapState, mapDispatch)(Resaga);
};

export default resaga;
