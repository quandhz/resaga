/* eslint-disable jsx-a11y/href-no-hash */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from '../../../../build';

export class SimpleApp extends PureComponent {
  state = {
    result: false,
  };

  handleClick = () => {
    this.setState({ result: false });
    this.props.resaga.dispatchTo('OtherAsyncPage', 'fetchReddit', {
      payload: 'reactjs',
      onSuccess: this.fetchSuccess,
    });
  };

  fetchSuccess = (result) => {
    this.setState({ result: result.lastUpdated });
  };

  render() {
    const { result } = this.state;
    return (
      <div style={{ margin: 20, padding: 8, border: '1px solid #999' }}>
        <a href="#" onClick={this.handleClick}>Component 3: Set to reactjs</a>
        <br />{result && `Last updated: ${result}`}
      </div>
    );
  }
}

SimpleApp.propTypes = {
  resaga: PropTypes.object,
};

export default resaga()(SimpleApp);
