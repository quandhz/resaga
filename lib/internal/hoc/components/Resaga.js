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


  render() {
    const {
      internalProps,
      resaga: resagaFromComponent,
      ...props
    } = this.props;
    const { Component, cleanup } = internalProps;

    // map functions as props to component
    const resaga = {
      ...resagaFromComponent,
      analyse: this.analyse,
      dispatch: this.dispatch,
      dispatchTo: this.dispatchTo,
      acknowledge: this.acknowledge,
      setValue: this.setValue,
      getValue: this.getValue,
      isLoading: this.isLoading,
      cleanup,
    };

    return <Component resaga={resaga} {...props} />;
  }
}


ReSaga.propTypes = {
  internalProps: PropTypes.object,
  resaga: PropTypes.object,
};

export default ReSaga;
