import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector as reselect } from 'reselect';
import { beforeSubmitForm } from '../internal/actions';
import SimpleResaga from '../components/SimpleResaga';

export const simpleResaga = () => (Component) => {
  // eslint-disable-next-line react/prefer-stateless-function
  class PP extends React.PureComponent {
    render = () => {
      const { beforeDispatch, ...props } = this.props;
      const resagaInternalProps = { Component, beforeDispatch };

      return <SimpleResaga resagaInternalProps={resagaInternalProps} {...props} />;
    }
  }


  PP.propTypes = {
    beforeDispatch: PropTypes.func,
  };

  const mapDispatch = (dispatch) => ({
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
  });

  return connect(reselect({}), mapDispatch)(PP);
};
