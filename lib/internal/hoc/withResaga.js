import PropTypes from 'prop-types';
import React from 'react';
import helpers from '../helpers';
import selectors from '../selectors';
import ReSaga from './components/Resaga';
import { GET_VARIABLES, SET_VARIABLE, SET_VARIABLE_FN } from '../constants';
import actions, { beforeSubmitForm, doAcknowledge, doCleanup, submitForm } from '../actions';

const analyseConfigs = (originConfigs) => {
  const configs = originConfigs;

  if (configs.page && !configs.name) {
    // TODO: backward compatibility v0.0.x
    helpers.errors.warning('`CONFIG.page` is renamed to `CONFIG.name`. Please adapt your code. `CONFIG.page` will not be supported in the next minor release.');
    configs.name = configs.page;
    delete configs.page;
  }

  if (configs.submit && !configs.requests) {
    // TODO: backward compatibility v0.0.x
    helpers.errors.warning('`CONFIG.submit` is renamed to `CONFIG.requests`. Please adapt your code. `CONFIG.submit` will not be supported in the next minor release.');
    configs.requests = configs.submit;
    delete configs.submit;
  }

  return configs;
};

const resaga = (originConfigs) => (Component) => {
  const configs = analyseConfigs(originConfigs);

  /**
   * This class is for injecting redux store and dispatch functions only.
   * Component-to-be-wrapped, all props and analyseConfig are to be processed in <ReSaga />
   * Note: Must be a React Component, thus eslint-disable.
   */
  class Resaga extends React.PureComponent {
    componentWillMount = () => helpers.analyseConfig.set(configs.name, configs);
    componentWillUnmount = () => helpers.analyseConfig.delete(configs.name);

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
    values: selectors[GET_VARIABLES](configs.name),
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
