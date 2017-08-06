/* eslint-disable jsx-a11y/href-no-hash */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CONFIG } from './config';
import resaga from '../../../../build';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class App extends PureComponent {
  componentDidMount = () => this.handleChange('reactjs');

  componentWillReceiveProps = (nextProps) =>
    this.props.resaga.analyse(nextProps,
      { fetchReddit: { onSuccess: this.fetchSuccess } }
    );

  fetchReddit = (redditChannel) => {
    this.props.resaga.setValue('posts', []);
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
    const selectedReddit = this.props.resaga.getValue('selectedReddit');
    const posts = this.props.resaga.getValue('posts') || [];
    const lastUpdated = this.props.resaga.getValue('lastUpdated');
    return (
      <div>
        <Picker
          value={selectedReddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.</span>}
          {' '}
          <a href="#" onClick={this.handleRefresh}>Refresh</a>
        </p>
        {!posts.length && <h2>Loading...</h2>}
        {posts.length &&
          <div>
            <Posts posts={posts} />
          </div>
        }
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
