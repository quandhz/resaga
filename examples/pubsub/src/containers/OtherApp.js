import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CONFIG } from './otherConfig';
import resaga from '../../../../build';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

export class OtherApp extends PureComponent {
  state = {
    result: false,
  };

  componentDidMount = () => this.handleChange('frontend');

  componentWillReceiveProps = (nextProps) =>
    this.props.resaga.analyse(
      nextProps,
      { fetchReddit: { before: this.beforeFetch, onSuccess: this.fetchSuccess } }
    );

  setOtherReddit = (payload) => {
    this.setState({ result: false });
    this.props.resaga.dispatchTo('AsyncPage', 'fetchReddit', {
      payload,
      onSuccess: this.fetchOtherRedditSuccess,
    });
  };

  fetchOtherRedditSuccess = (result) => {
    this.setState({ result: result.lastUpdated });
  };

  fetchReddit = (redditChannel) => {
    const currentChannel = this.props.resaga.getValue('selectedReddit');
    this.props.resaga.dispatch(redditChannel || currentChannel, 'fetchReddit');
  };

  beforeFetch = (payload) => {
    this.props.resaga.setValue('posts', []);
    this.props.resaga.setValue('selectedReddit', payload);
  };

  fetchSuccess = ({ posts, lastUpdated }) => {
    this.props.resaga.setValue('posts', posts);
    this.props.resaga.setValue('lastUpdated', lastUpdated);
  };


  handleChange = (redditChannel) => {
    this.props.resaga.setValue('selectedReddit', redditChannel);
    this.fetchReddit(redditChannel);
  };
  handleRefresh = () => this.fetchReddit();

  render() {
    const { result } = this.state;

    const selectedReddit = this.props.resaga.getValue('selectedReddit');
    const posts = this.props.resaga.getValue('posts') || [];
    const lastUpdated = this.props.resaga.getValue('lastUpdated');
    const isLoading = this.props.resaga.isLoading('fetchReddit');

    const status = lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.</span>;
    const content = isLoading ? <h2>Loading...</h2> : <Posts posts={posts} />;

    return (
      <div style={{ margin: 20, padding: 8, border: '1px solid #999' }}>
        <button onClick={() => this.setOtherReddit('frontend')}>Component 1: Set to frontend</button><br />
        <button onClick={() => this.setOtherReddit('reactjs')}>Component 1: Set to reactjs</button>
        <br />{result && `Last updated: ${result}`}
        <hr />
        <Picker
          value={selectedReddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {status} <button onClick={this.handleRefresh}>Refresh</button>
        </p>
        {content}
      </div>
    );
  }
}

OtherApp.propTypes = {
  resaga: PropTypes.object.isRequired,
};

OtherApp.defaultProps = {
};

export default resaga(OtherApp, CONFIG);
