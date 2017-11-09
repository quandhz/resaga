import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import helpers from './helpers';

export class SimpleResaga extends PureComponent {
  componentWillMount = () => {
    // map functions as props to component
    this.resaga = {
      dispatchTo: this.dispatchTo,
      setValue: this.setValue,
      value: this.exportValues(false),
    };

    this.values = this.exportValues(true);
  };


  componentWillUpdate = (nextProps) => {
    const changes = helpers.getValuesChanged(this.values, nextProps);
    if (changes) {
      this.values = { ...this.values, ...changes };
    }
  };


  setValue = (...props) =>
    helpers.setValue(this.props.internalProps, ...props);


  /**
   * resaga.dispatchTo(TAB_CONTENT, FETCH_TAB, { payload: id, onSuccess: this.handleSuccess });
   * @param props
   * @returns {*}
   */
  dispatchTo = (...props) => helpers.dispatchTo(...props, this.props);


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


SimpleResaga.propTypes = {
  internalProps: PropTypes.object.isRequired,
  resaga: PropTypes.object,
};

SimpleResaga.defaultProps = {
  resaga: {},
};

export default SimpleResaga;
