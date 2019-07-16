/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import debug from '../../debug';
import debugs from '../../internal/debugs';
import actions, { beforeSubmitForm } from '../actions';
import { SET_VARIABLE, SET_VARIABLE_FN } from '../constants';
import utils from '../helpers';
import helpers from './helpers';

const simplifyResaga = (configs) => (Component) => {
  class SimplifyResaga extends PureComponent {
    componentWillMount = () => {
      const {
        setValue, setValueWithFunc,
        beforeDispatch,
      } = this.props;

      this.internalProps = {
        Component,
        configs,
        beforeDispatch,
        setValue,
        setValueWithFunc,
      };

      // map functions as props to component
      this.resaga = {
        dispatchTo: this.dispatchTo,
        setValue: this.setValue,
      };

      this.values = helpers.exportValues({ props: this.props, configs });
    };

    componentWillReceiveProps = (nextProps) => {
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


    setValue = (...props) =>
      helpers.setValue({
        ownProps: helpers.exportProps(this.props),
        internalProps: this.internalProps,
      }, ...props);

    /**
     * resaga.dispatchTo(TAB_CONTENT, FETCH_TAB, { payload: id, onSuccess: this.handleSuccess });
     * @param props
     * @returns {*}
     */
    dispatchTo = (...props) => helpers.dispatchTo(...props, this.internalProps);


    render = () => {
      const { resaga, values, props } = this;

      return (<Component
        resaga={resaga}
        {...helpers.exportProps(props)}
        {...values}
      />);
    };
  }


  SimplifyResaga.propTypes = {
    // from parent
    resaga: PropTypes.object,

    beforeDispatch: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    setValueWithFunc: PropTypes.func.isRequired,
    id: PropTypes.any,
  };

  SimplifyResaga.defaultProps = {
    resaga: {},
  };


  const mapState = utils.subscribeValue(configs);

  const mapDispatch = (dispatch) => ({
    setValue: (...params) => dispatch(actions[SET_VARIABLE](...params)),
    setValueWithFunc: (...params) => dispatch(actions[SET_VARIABLE_FN](...params)),
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
  });

  SimplifyResaga.displayName = `WithSimplifyResaga(${utils.getDisplayName(Component)})`;

  return utils.connect(mapState, mapDispatch)(SimplifyResaga);
};

export default simplifyResaga;
