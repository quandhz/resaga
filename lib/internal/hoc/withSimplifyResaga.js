import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import helpers from '../helpers';
import actions, { beforeSubmitForm } from '../actions';
import { SET_VARIABLE, SET_VARIABLE_FN } from '../constants';
import SimpleResaga from './components/SimpleResaga';

const simplifyResaga = (configs) => (Component) => {
  class SimplifyResaga extends PureComponent {
    render = () => {
      const {
        setValue, setValueWithFunc,
        otherValues, beforeDispatch,
        ...props
      } = this.props;

      const internalProps = {
        Component,
        configs,
        otherValues,
        beforeDispatch,
        setValue,
        setValueWithFunc,
      };

      return <SimpleResaga internalProps={internalProps} {...props} />;
    };
  }


  SimplifyResaga.propTypes = {
    otherValues: PropTypes.object,
    beforeDispatch: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    setValueWithFunc: PropTypes.func.isRequired,
  };

  SimplifyResaga.defaultProps = {
    otherValues: {},
  };

  const mapState = () => helpers.reselect({
    otherValues: helpers.subscribeValue(configs),
  });

  const mapDispatch = (dispatch) => ({
    setValue: (...params) => dispatch(actions[SET_VARIABLE](...params)),
    setValueWithFunc: (...params) => dispatch(actions[SET_VARIABLE_FN](...params)),
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
  });

  return helpers.connect(mapState, mapDispatch)(SimplifyResaga);
};

export default simplifyResaga;
