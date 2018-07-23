import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import resaga from '../../../../build';
import { CONTENT_TITLE_SELECTOR } from '../containers/config';

export class PostList extends React.PureComponent {
  render = () => {
    const {
      postIds, visible, selected, onChange, remaining, node1,
    } = this.props;

    const visiblePostIds = postIds.slice(0, visible);

    const list = visiblePostIds.map((id, index) => (<Post
      index={index}
      selected={selected === id}
      onChange={onChange}
      key={id}
      id={id}
    />));

    return (
      <div>
        <h3>Remaining: {remaining}</h3>
        <h2>PostList {node1}</h2>
        <ul>{list}</ul>
      </div>
    );
  };
}

PostList.propTypes = {
  postIds: PropTypes.array,
  visible: PropTypes.number,
  remaining: PropTypes.number,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

PostList.defaultProps = {
  postIds: [],
  remaining: 0,
  visible: 2,
  selected: '',
};

const CONFIG = {
  value: {
    remaining: {
      cacheKey: ({ checkitems }) => checkitems.toString(),
      keyPath: ({ checkitems = [] }) => checkitems.map((id) => ['normaliseStore', 'nodes', id, 'status']),
      getter: (...results) => {
        const itemIds = results.length > 1 ? results.slice(0, -1) : results;

        return itemIds.reduce((accumulate = 0, status) => status !== 'completed' ? accumulate + 1 : accumulate, 0);
      },
    },
    lastUpdated: {
      keyPath: ['updateStore', 'lastUpdated'],
    },


    node1: 'content_title',
  },
};

export default resaga(CONFIG)(PostList);

