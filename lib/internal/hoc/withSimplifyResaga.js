import PropTypes from 'prop-types';
import React from 'react';
import helpers from '../helpers';
import { beforeSubmitForm } from '../actions';
import SimpleResaga from './components/SimpleResaga';

const simplifyResaga = (configs) => (Component) => {
  const SimplifyResaga = ({
    otherValues, beforeDispatch, ...props
  }) => {
    const internalProps = {
      Component, otherValues, beforeDispatch,
    };

    return <SimpleResaga internalProps={internalProps} {...props} />;
  };


  SimplifyResaga.propTypes = {
    otherValues: PropTypes.object.isRequired,
    beforeDispatch: PropTypes.func.isRequired,
  };

  const mapState = helpers.reselect({
    otherValues: helpers.subscribeValue(configs),
  });

  const mapDispatch = (dispatch) => ({
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
  });

  return helpers.connect(mapState, mapDispatch)(SimplifyResaga);
};

export default simplifyResaga;
