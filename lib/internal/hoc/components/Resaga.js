import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import helpers from './helpers';

export class ReSaga extends PureComponent {
  componentWillMount = () => {
    const { internalProps } = this.props;
    const { cleanup, acknowledge } = internalProps;

    // map functions as props to component
    this.resaga = {
      analyse: this.analyse,
      dispatch: this.dispatch,
      dispatchTo: this.dispatchTo,
      setValue: this.setValue,
      getValue: this.getValue,
      isLoading: this.isLoading,
      cleanup,
      acknowledge,
      value: this.exportValues(false),
    };

    this.values = this.exportValues(true);
  };


  componentWillReceiveProps = (...props) =>
    helpers.componentWillReceiveProps(this.props.internalProps, ...props);


  componentWillUpdate = (nextProps) => {
    const changes = helpers.getValuesChanged(this.values, nextProps);
    if (changes) {
      this.values = { ...this.values, ...changes };
    }
  };


  componentWillUnmount = () =>
    helpers.cleanUp(this.props.internalProps);


  setValue = (...props) =>
    helpers.setValue(this.props.internalProps, ...props);


  getValue = (...props) =>
    helpers.getValue(this.props, ...props);


  dispatch = (...props) =>
    helpers.dispatch(...props, this.props.internalProps);


  dispatchTo = (...props) =>
    helpers.dispatchTo(...props, this.props);


  analyse = (...props) =>
    helpers.analyseNextProps(...props, this.props.internalProps);


  isLoading = (...props) =>
    helpers.isLoading(...props, this.props);


  exportValues = (isRoot, nextProps) =>
    helpers.exportValues((nextProps || this.props), isRoot);

  exportProps = (props) =>
    helpers.exportProps(this.props.internalProps, props);


  render = () => {
    const {
      internalProps: { Component },
      resaga: parentResaga,
      ...props
    } = this.props;
    const { resaga, values } = this;


    return (<Component
      resaga={resaga}
      {...values}
      {...this.exportProps(props)}
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
