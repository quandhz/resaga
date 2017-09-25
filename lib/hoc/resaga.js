import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector as reselect } from 'reselect';
import actions, { beforeSubmitForm, doAcknowledge, doCleanup, submitForm } from '../internal/actions';
import { GET_VARIABLES, SET_VARIABLE, SET_VARIABLE_FN } from '../internal/constants';
import ReSaga from '../components/Resaga';
import selectors, { selectPage } from '../internal/selectors';
import errors from '../utils/errors';
import configStore from '../utils/configs';


export const resaga = (configs) => (Component) => {
  if (configs.page && !configs.name) {
    // TODO: backward compatibility v0.0.x
    errors.ResagaWarning('`CONFIG.page` is renamed to `CONFIG.name`. Please adapt your code immediately. `CONFIG.page` will not be supported in next minor release.');
    // eslint-disable-next-line no-param-reassign
    configs.name = configs.page;
  }

  /**
   * This class is for injecting redux store and dispatch functions only.
   * Component-to-be-wrapped, all props and configStore are to be processed in <ReSaga />
   * Note: Must be a React Component, thus eslint-disable.
   */
  class PP extends React.PureComponent {
    componentWillMount = () => configStore.set(configs.name, configs);

    componentWillUnmount = () => configStore.delete(configs.name);

    render = () => {
      const { values, setValue, setValueWithFunc, beforeDispatch, dispatch, acknowledge, cleanup, ...props } = this.props;
      const resagaInternalProps = { Component, configs, values, setValue, setValueWithFunc, beforeDispatch, dispatch, acknowledge, cleanup };

      return <ReSaga resagaInternalProps={resagaInternalProps} {...props} />;
    }
  }


  PP.propTypes = {
    values: PropTypes.object,
    setValue: PropTypes.func,
    setValueWithFunc: PropTypes.func,
    beforeDispatch: PropTypes.func,
    dispatch: PropTypes.func,
    acknowledge: PropTypes.func,
    cleanup: PropTypes.func,
  };


  const mapState = reselect({
    [configs.name]: selectPage(configs.name),
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

  return connect(mapState, mapDispatch)(PP);
};
