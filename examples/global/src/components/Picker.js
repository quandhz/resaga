import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class Picker extends PureComponent {
  render() {
    const { value, onChange, options } = this.props;

    return (
      <span>
        <h1>{value}</h1>
        <select
          onChange={(e) => onChange(e.target.value)}
          value={value}
        >
          {options.map((option) =>
            <option value={option} key={option}>
              {option}
            </option>)
          }
        </select>
      </span>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
};
