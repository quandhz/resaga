/* eslint-disable jsx-a11y/href-no-hash */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CONFIG } from './config';
import resaga from '../../../../build';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

export class App extends PureComponent {
  state = {
    result: false,
  };

  componentDidMount = () => this.handleChange('reactjs');

  componentWillReceiveProps = (nextProps) =>
    this.props.resaga.analyse(nextProps,
      { fetchReddit: { before: this.beforeFetch, onSuccess: this.fetchSuccess } }
    );

  setOtherReddit = (payload) => {
    this.setState({ result: false });
    this.props.resaga.dispatchTo('OtherAsyncPage', 'fetchReddit', {
      payload,
      onSuccess: this.fetchOtherRedditSuccess,
    });
  };

  fetchOtherRedditSuccess = (result) => {
    this.setState({ result: result.lastUpdated });
  };

  beforeFetch = (payload) => {
    this.props.resaga.setValue('posts', []);
    this.props.resaga.setValue('selectedReddit', payload);
  };

  fetchReddit = (redditChannel) => {
    const currentChannel = this.props.resaga.getValue('selectedReddit');
    this.props.resaga.dispatch(redditChannel || currentChannel, 'fetchReddit');
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
        <a href="#" onClick={() => this.setOtherReddit('frontend')}>Component 3: Set to frontend</a>
        <br />{result && `Last updated: ${result}`}
        <hr />
        <Picker
          value={selectedReddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {status} <a href="#" onClick={this.handleRefresh}>Refresh</a>
        </p>
        {content}
      </div>
    );
  }
}

App.propTypes = {
  resaga: PropTypes.object,
  dispatch: PropTypes.func,
};

export default resaga(CONFIG)(App);
