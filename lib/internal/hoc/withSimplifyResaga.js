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

      this.values = this.exportValues(true);
    };

    componentWillReceiveProps = (nextProps) => {
      helpers.componentWillReceiveProps(this.internalProps, this.props, nextProps);

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
      helpers.setValue(this.internalProps, ...props);


    /**
     * resaga.dispatchTo(TAB_CONTENT, FETCH_TAB, { payload: id, onSuccess: this.handleSuccess });
     * @param props
     * @returns {*}
     */
    dispatchTo = (...props) => helpers.dispatchTo(...props, this.internalProps);


    exportValues = (isRoot, nextProps) =>
      helpers.exportValues({
        props: (nextProps || this.props),
        internalProps: this.internalProps,
      }, isRoot);


    exportProps = (props) =>
      helpers.exportProps(this.internalProps, props);


    render = () => {
      const {
        resaga: parentResaga,
        ...props
      } = this.props;
      const { resaga, values } = this;


      const ownProps = this.exportProps(props);

      return (<Component
        resaga={resaga}
        {...values}
        {...ownProps}
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


  const mapState = () => (state, props) => {
    const subscribe = utils.subscribeValue(configs)(state, props);
    return {
      ...subscribe,
    };
  };

  const mapDispatch = (dispatch) => ({
    setValue: (...params) => dispatch(actions[SET_VARIABLE](...params)),
    setValueWithFunc: (...params) => dispatch(actions[SET_VARIABLE_FN](...params)),
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
  });

  return utils.connect(mapState, mapDispatch)(SimplifyResaga);
};

export default simplifyResaga;
