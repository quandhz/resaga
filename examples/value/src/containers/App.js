/* eslint-disable jsx-a11y/href-no-hash */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CONFIG } from './config';
import resaga from '../../../../build';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

export class App extends PureComponent {
  componentDidMount = () => this.handleChange('reactjs');

  componentWillReceiveProps = (nextProps) =>
    this.props.resaga.analyse(
      nextProps,
      { fetchReddit: { onSuccess: this.fetchSuccess } }
    );

  fetchReddit = (redditChannel) => {
    this.props.resaga.setValue('posts', []);
    const currentChannel = this.props.resaga.value.selectedReddit;
    this.props.resaga.dispatch(redditChannel || currentChannel, 'fetchReddit');
  };

  fetchSuccess = ({ posts, lastUpdated }) => {
    this.props.resaga.setValue('posts', posts);
    this.props.resaga.setValue('lastUpdated', lastUpdated);
  };

  handleChange = (redditChannel) => {
    this.props.resaga.setValue('selectedReddit', redditChannel);
    this.props.resaga.setValue('complicated', { object: { deep: { nested: redditChannel } } });
    this.fetchReddit(redditChannel);
  };
  handleRefresh = () => this.fetchReddit();

  render() {
    const { selectedReddit = 'reactjs', posts, lastUpdated } = this.props.resaga.value;
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
  resaga: PropTypes.object.isRequired,
};

App.defaultProps = {
};

export default resaga(App, CONFIG);
