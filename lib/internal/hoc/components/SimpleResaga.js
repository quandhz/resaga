import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../../helpers';

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
    this.dispatchToTimeout = helpers.dispatchTo(...props, this.props);
  };


  render() {
    const {
      internalProps,
      ...props
    } = this.props;
    const { Component } = internalProps;

    // map functions as props to component
    const resaga = {
      dispatchTo: this.dispatchTo,
    };

    return <Component resaga={resaga} {...props} />;
  }
}


SimpleResaga.propTypes = {
  internalProps: PropTypes.object,
};

export default SimpleResaga;
