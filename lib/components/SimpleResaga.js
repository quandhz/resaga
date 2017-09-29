import PropTypes from 'prop-types';
import React from 'react';
import component from '../utils/component-helpers';

export class SimpleResaga extends React.PureComponent {
  /**
   * Automatically clear redux store on un-mount.
   * Unless users set manuallyCleanup to true in configs
   */
  componentWillUnmount = () => {
    clearTimeout(this.dispatchToTimeout);
  };

  /**
   * resaga.dispatchTo(TAB_CONTENT, FETCH_TAB, { payload: id, onSuccess: this.handleSuccess });
   * @param props
   * @returns {*}
   */
  dispatchTo = (...props) => {
    this.dispatchToTimeout = component.dispatchTo(...props, this.props);
  };


  render() {
    const {
      resagaInternalProps,
      ...props
    } = this.props;
    const { Component } = resagaInternalProps;

    // map functions as props to component
    const resaga = {
      dispatchTo: this.dispatchTo,
    };

    return <Component resaga={resaga} {...props} />;
  }
}


SimpleResaga.propTypes = {
  resagaInternalProps: PropTypes.object,
};

export default SimpleResaga;
