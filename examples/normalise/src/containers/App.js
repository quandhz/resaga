/* eslint-disable jsx-a11y/href-no-hash,jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CONFIG } from './config';
import resaga from '../../../../build';
import Picker from '../components/Picker';
import Posts from '../components/Posts';


const editPost = (index = 0) => (posts) => {
  const keys = Object.keys(posts);
  if (!keys || !keys.length) return posts;

  const key = keys[index];
  const first = posts[key];
  return {
    ...posts,
    [key]: { title: `${first.title} (1)` },
  };
};


export class App extends PureComponent {
  componentDidMount = () => {
    this.fetchReddit('reactjs');
    this.handleVisible(2)();
  };

  componentWillReceiveProps = (nextProps) =>
    this.props.resaga.analyse(
      nextProps,
      { fetchReddit: { onSuccess: this.fetchSuccess } }
    );

  fetchReddit = (selectedReddit) => {
    console.log('Start fetching...');
    if (selectedReddit) {
      this.props.resaga.setValue({ selectedReddit });
    }
    const selected = selectedReddit || this.props.selectedReddit;
    this.props.resaga.dispatch(selected, 'fetchReddit');
  };

  fetchSuccess = (values) => {
    console.log('Fetch done');
    this.props.resaga.setValue(values);
  };

  handleRefresh = () => this.fetchReddit();

  handleEdit = (index) => () => {
    this.props.resaga.setValue({
      posts: editPost(index),
    });
  };

  handleVisible = (isShowingMore) => () => {
    this.props.resaga.setValue({
      visible: (value = 5) => {
        const newValue = isShowingMore ? value + 1 : value - 1;
        if (newValue > 5) return 5;
        if (newValue < 0) return 0;
        return newValue;
      },
    });
  };

  render() {
    const {
      selectedReddit = 'reactjs', lastUpdated, visible, postIds,
    } = this.props;

    const status = lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.</span>;

    return (
      <div>
        <Picker
          value={selectedReddit}
          onChange={this.fetchReddit}
          options={['reactjs', 'frontend']}
        />
        <p>
          {status} <a href="#" onClick={this.handleRefresh}>Refresh</a>
        </p>
        <p>
          <a href="#" onClick={this.handleEdit(0)}>Edit Content 1</a> <br />
          <a href="#" onClick={this.handleEdit(1)}>Edit Content 2</a>
        </p>
        <p>
          Visible: {visible} <br />
          {visible > 0 && <a href="#" onClick={this.handleVisible()}>Show fewer</a>}
          &nbsp;
          {visible < 5 && <a href="#" onClick={this.handleVisible(true)}>Show more</a>}
        </p>
        <hr />
        <Posts visible={visible} postIds={postIds} />
      </div>
    );
  }
}

App.propTypes = {
  resaga: PropTypes.object.isRequired,
  selectedReddit: PropTypes.string,
  postIds: PropTypes.array,
  lastUpdated: PropTypes.object,
  visible: PropTypes.number,
};

App.defaultProps = {
  selectedReddit: 'reactjs',
  lastUpdated: null,
  postIds: [],
  visible: 2,
};

export default resaga(App, CONFIG);
