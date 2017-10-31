import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import helpers from './helpers';

export class ReSaga extends PureComponent {
  componentWillReceiveProps = (...props) =>
    helpers.componentWillReceiveProps(this.props.internalProps, ...props);


  componentWillUnmount = () =>
    helpers.cleanUp(this.props.internalProps);


  setValue = (...props) =>
    helpers.setValue(this.props.internalProps, ...props);


  getValue = (...props) =>
    helpers.getValue(this.props.internalProps, ...props);


  dispatch = (...props) =>
    helpers.dispatch(...props, this.props.internalProps);


  dispatchTo = (...props) =>
    helpers.dispatchTo(...props, this.props);


  analyse = (...props) =>
    helpers.analyseNextProps(...props, this.props.internalProps);


  isLoading = (...props) =>
    helpers.isLoading(...props, this.props);


  exportValues = (isRoot) =>
    helpers.exportValues(this.props.internalProps, isRoot);


  render = () => {
    const {
      internalProps,
      resaga: parentResaga,
      ...props
    } = this.props;
    const { Component, cleanup, acknowledge } = internalProps;

    // map functions as props to component
    const resaga = {
      parentResaga,
      analyse: this.analyse,
      dispatch: this.dispatch,
      dispatchTo: this.dispatchTo,
      setValue: this.setValue,
      getValue: this.getValue,
      isLoading: this.isLoading,
      value: this.exportValues(false),
      cleanup,
      acknowledge,
    };

    return (<Component
      resaga={resaga}
      {...this.exportValues(true)}
      {...props}
    />);
  };
}


ReSaga.propTypes = {
  internalProps: PropTypes.object.isRequired,
  resaga: PropTypes.object,
};

ReSaga.defaultProps = {
  resaga: {},
};

export default ReSaga;
