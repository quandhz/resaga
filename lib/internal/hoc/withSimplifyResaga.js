import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import helpers from '../helpers';
import { beforeSubmitForm } from '../actions';
import SimpleResaga from './components/SimpleResaga';

const simplifyResaga = (configs) => (Component) => {
  class SimplifyResaga extends PureComponent {
    render = () => {
      const { otherValues, beforeDispatch, ...props } = this.props;
      const internalProps = {
        Component, otherValues, beforeDispatch,
      };

      return <SimpleResaga internalProps={internalProps} {...props} />;
    };
  }


  SimplifyResaga.propTypes = {
    otherValues: PropTypes.object,
    beforeDispatch: PropTypes.func.isRequired,
  };

  SimplifyResaga.defaultProps = {
    otherValues: {},
  };

  const mapState = () => helpers.reselect({
    otherValues: helpers.subscribeValue(configs),
  });

  const mapDispatch = (dispatch) => ({
    beforeDispatch: (...params) => dispatch(beforeSubmitForm(...params)),
  });

  return helpers.connect(mapState, mapDispatch)(SimplifyResaga);
};

export default simplifyResaga;
