/* eslint-disable jsx-a11y/href-no-hash */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CONFIG } from './simplifyConfig';
import resaga from '../../../../build';

export class SimplifyApp extends PureComponent {
  render() {
    const {
      otherComplicated, otherLastUpdated,
      anotherComplicated, anotherLastUpdated,
    } = this.props.resaga.value;
    console.log('this.props.resaga', this.props.resaga);
    const complicated = otherComplicated && otherComplicated.object.deep.nested;
    const another = anotherComplicated && anotherComplicated.object.deep.nested;
    return (
      <div>
        <h3>Simplify Resaga Component</h3>
        <h4>App 1</h4>
        - selected value: {complicated} <br />
        - lastUpdated: {new Date(otherLastUpdated).toLocaleTimeString()} <br />

        <h4>App 2</h4>
        - selected value: {another} <br />
        - lastUpdated: {new Date(anotherLastUpdated).toLocaleTimeString()} <br />

      </div>
    );
  }
}

SimplifyApp.propTypes = {
  resaga: PropTypes.object.isRequired,
};

SimplifyApp.defaultProps = {
};

export default resaga(CONFIG)(SimplifyApp);
