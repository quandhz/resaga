/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import React from 'react';
import actions, { beforeSubmitForm, doAcknowledge, doCleanup, submitForm } from '../actions';
import { SET_VARIABLE, SET_VARIABLE_FN } from '../constants';
import helpers from '../helpers';
import selectors from '../selectors';
import ReSaga from './components/Resaga';


const resaga = (originConfigs) => (Component) => {
  const configs = helpers.config.analyseConfigs(originConfigs);


  class Resaga extends React.PureComponent {
    componentWillMount = () => helpers.config.set(configs.name, configs);
    componentWillUnmount = () => helpers.config.delete(configs.name);

    render = () => {
      const {
        otherValues,
        setValue, setValueWithFunc,
        beforeDispatch, dispatch, acknowledge, cleanup,
        ...props
      } = this.props;

      const internalProps = {
        Component, configs, otherValues, setValue, setValueWithFunc, beforeDispatch, dispatch, acknowledge, cleanup,
      };

      return <ReSaga internalProps={internalProps} {...props} />;
    }
  }


  Resaga.propTypes = {
    otherValues: PropTypes.object,
    setValue: PropTypes.func,
    setValueWithFunc: PropTypes.func,
    beforeDispatch: PropTypes.func,
    dispatch: PropTypes.func,
    acknowledge: PropTypes.func,
    cleanup: PropTypes.func,
  };

  Resaga.defaultProps = {
    otherValues: {},
  };


  const mapState = () => helpers.reselect({
    [configs.name]: selectors.selectPage(configs.name),
    otherValues: helpers.subscribeValue(configs),
  });


  const mapDispatch = (dispatch) => ({
    setValue: (...params) => dispatch(actions[SET_VARIABLE](...params)),
    setValueWithFunc: (...params) => dispatch(actions[SET_VARIABLE_FN](...params)),
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
    dispatch: (...params) => dispatch(submitForm(...params)),
    acknowledge: (...params) => dispatch(doAcknowledge(configs.name, ...params)),
    cleanup: (...params) => dispatch(doCleanup(...params)),
  });


  return helpers.connect(mapState, mapDispatch)(Resaga);
};

export default resaga;
