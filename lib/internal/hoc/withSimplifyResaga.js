/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import React from 'react';
import helpers from '../helpers';
import { beforeSubmitForm } from '../actions';
import SimpleResaga from './components/SimpleResaga';

const simplifyResaga = () => (Component) => {
  const SimplifyResaga = ({ beforeDispatch, ...props }) => {
    const internalProps = { Component, beforeDispatch };

    return <SimpleResaga internalProps={internalProps} {...props} />;
  };


  SimplifyResaga.propTypes = {
    beforeDispatch: PropTypes.func,
  };

  const mapState = helpers.reselect({});
  const mapDispatch = (dispatch) => ({
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
  });

  return helpers.connect(mapState, mapDispatch)(SimplifyResaga);
};

export default simplifyResaga;
