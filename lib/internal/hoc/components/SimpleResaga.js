import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import helpers from './helpers';

export class SimpleResaga extends PureComponent {
  /**
   * resaga.dispatchTo(TAB_CONTENT, FETCH_TAB, { payload: id, onSuccess: this.handleSuccess });
   * @param props
   * @returns {*}
   */
  dispatchTo = (...props) => helpers.dispatchTo(...props, this.props);


  exportValues = (isRoot) =>
    helpers.exportValues(this.props.internalProps, isRoot);


  render = () => {
    const {
      internalProps,
      resaga: parentResaga,
      ...props
    } = this.props;
    const { Component } = internalProps;

    // map functions as props to component
    const resaga = {
      parentResaga,
      dispatchTo: this.dispatchTo,
      value: this.exportValues(false),
    };

    return (<Component
      resaga={resaga}
      {...this.exportValues(true)}
      {...props}
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
