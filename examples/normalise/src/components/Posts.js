import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList';
import PostContent from './PostContent';
import resaga from '../../../../build';
import { CONTENT_TITLE_SELECTOR } from '../containers/config';

export class Posts extends PureComponent {
  state = {
    selected: '',
  };

  handleChange = (selected) => () => this.setState({ selected });

  render = () => {
    const {
      postIds, postTitles, visible,
      node1,
    } = this.props;
    const { selected } = this.state;

    return (
      <div>
        <PostList
          postIds={postIds}
          checkitems={postTitles}
          visible={visible}
          selected={selected}
          onChange={this.handleChange}
        />
        <hr />
        Selected Article:
        {selected && <PostContent selected={selected} />}
        <h2>Posts {node1}</h2>
      </div>
    );
  };
}

Posts.propTypes = {
  postTitles: PropTypes.array,
  postIds: PropTypes.array,
  nodeIds: PropTypes.array,
  visible: PropTypes.number,
};

Posts.defaultProps = {
  postTitles: [],
  postIds: [],
  nodeIds: [],
  visible: 2,
};

const CONFIG = {
  value: {
    postTitles: {
      keyPath: ({ nodeIds = [] }) => nodeIds.map((id) => ['normaliseStore', 'nodes', id, 'checklists']),
      props: [],
      getter: (...results) => results.reduce((accumulate = [], checkitems) => checkitems ? [...accumulate, ...checkitems] : accumulate, []),
    },
    lastUpdated: {
      keyPath: ['updateStore', 'lastUpdated'],
    },


    node1: 'content_title',
  },
};

export default resaga(CONFIG)(Posts);
