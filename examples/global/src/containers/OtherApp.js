/* eslint-disable jsx-a11y/href-no-hash */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CONFIG } from './otherConfig';
import resaga from '../../../../build';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

export class App extends PureComponent {
  componentDidMount = () => this.handleChange('frontend');

  componentWillReceiveProps = (nextProps) =>
    this.props.resaga.analyse(nextProps,
      { fetchReddit: { before: this.beforeFetch, onSuccess: this.fetchSuccess } }
    );

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
    const selectedReddit = this.props.resaga.getValue('selectedReddit');
    const posts = this.props.resaga.getValue('posts') || [];
    const lastUpdated = this.props.resaga.getValue('lastUpdated');
    const isLoading = this.props.resaga.isLoading('fetchReddit');

    const status = lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.</span>;
    const content = isLoading ? <h2>Loading...</h2> : <Posts posts={posts} />;

    return (
      <div>
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

App.defaultProps = {
  posts: [],
};

export default resaga(App, CONFIG);
