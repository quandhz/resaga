import PropTypes from 'prop-types';
import React from 'react';
import helpers from '../helpers';
import selectors from '../selectors';
import ReSaga from './components/Resaga';
import { SET_VARIABLE, SET_VARIABLE_FN } from '../constants';
import actions, { beforeSubmitForm, doAcknowledge, doCleanup, submitForm } from '../actions';


const resaga = (originConfigs) => (Component) => {
  const configs = helpers.config.analyseConfigs(originConfigs);

  /**
   * This class is for injecting redux store and dispatch functions only.
   * Component-to-be-wrapped, all props and config are to be processed in <ReSaga />
   * Note: Must be a React Component, thus eslint-disable.
   */
  class Resaga extends React.PureComponent {
    componentWillMount = () => helpers.config.set(configs.name, configs);
    componentWillUnmount = () => helpers.config.delete(configs.name);

    render = () => {
      const { values, setValue, setValueWithFunc, beforeDispatch, dispatch, acknowledge, cleanup, ...props } = this.props;
      const internalProps = { Component, configs, values, setValue, setValueWithFunc, beforeDispatch, dispatch, acknowledge, cleanup };

      return <ReSaga internalProps={internalProps} {...props} />;
    }
  }


  Resaga.propTypes = {
    values: PropTypes.object,
    setValue: PropTypes.func,
    setValueWithFunc: PropTypes.func,
    beforeDispatch: PropTypes.func,
    dispatch: PropTypes.func,
    acknowledge: PropTypes.func,
    cleanup: PropTypes.func,
  };


  const mapState = helpers.reselect({
    [configs.name]: selectors.selectPage(configs.name),
    values: selectors.selectValues(configs.name),
  });
  const mapDispatch = (dispatch) => ({
    setValue: (...params) => dispatch(actions[SET_VARIABLE](configs.name, ...params)),
    setValueWithFunc: (...params) => dispatch(actions[SET_VARIABLE_FN](configs.name, ...params)),
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
    dispatch: (...params) => dispatch(submitForm(...params)),
    acknowledge: (...params) => dispatch(doAcknowledge(configs.name, ...params)),
    cleanup: (...params) => dispatch(doCleanup(...params)),
  });

  return helpers.connect(mapState, mapDispatch)(Resaga);
};

export default resaga;
