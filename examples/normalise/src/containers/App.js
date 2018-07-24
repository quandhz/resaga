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
const COMPLETED = 'completed';
const OUTSTANDING = 'outstanding';

const nodeStore = {
  nodes: {
    1: {
      content: 'Lost in Japan',
      checklists: [11, 12, 13],
    },

    11: { checklists: [111, 112] },
    12: { checklists: [121, 122, 123] },
    13: { checklists: [131, 132, 133, 134] },

    111: { status: COMPLETED },
    112: { status: OUTSTANDING },
    121: { status: COMPLETED },
    122: { status: OUTSTANDING },
    123: { status: COMPLETED },
    131: { status: OUTSTANDING },
    132: { status: COMPLETED },
    133: { status: OUTSTANDING },
    134: { status: OUTSTANDING },
  },
};


export class App extends PureComponent {
  state = {
  };

  componentDidMount = () => {
    this.fetchReddit('reactjs');
    this.props.resaga.setValue(nodeStore);
  };

  componentWillReceiveProps = (nextProps) => {
    this.props.resaga.analyse(
      nextProps,
      { fetchReddit: { onSuccess: this.fetchSuccess } }
    );
  };

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

  handleRefresh = () => {
    // this.fetchReddit();
    this.props.resaga.setValue({
      lastUpdated: new Date(),
    });
  };

  handleEdit = () => () => {
    this.props.resaga.setValue({
      content: (content) => `${content} *`,
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
      selectedReddit = 'reactjs', lastUpdated, visible, postIds, nodeIds, node1, loading,
    } = this.props;

    const posts = this.props.resaga.getValue('postIds');

    const status = lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.</span>;

    return (
      <div>
        <Picker
          value={selectedReddit}
          onChange={this.fetchReddit}
          options={['reactjs', 'frontend']}
        />
        <p>
          Loading {loading ? 'true' : 'false'}
        </p>
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
        <Posts visible={visible} postIds={postIds} nodeIds={nodeIds} lastUpdated={lastUpdated} />
        <h2>App {node1}</h2>
      </div>
    );
  }
}

App.propTypes = {
  resaga: PropTypes.object.isRequired,
  selectedReddit: PropTypes.string,
  posts: PropTypes.array,
  postIds: PropTypes.array,
  nodeIds: PropTypes.array,
  lastUpdated: PropTypes.object,
  visible: PropTypes.number,
  loading: PropTypes.bool,
};

App.defaultProps = {
  selectedReddit: 'reactjs',
  lastUpdated: new Date(),
  postIds: [],
  nodeIds: [],
  posts: [],
  visible: 3,
  loading: false,
};

export default resaga(App, CONFIG);
