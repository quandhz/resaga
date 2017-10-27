import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

export class Posts extends PureComponent {
  render = () => {
    const { postIds, visible } = this.props;
    const visiblePostIds = postIds.slice(0, visible);
    console.log('List render', visiblePostIds);
    const list = visiblePostIds.map((id) => <Post key={id} id={id} />);
    return <ul>{list}</ul>;
  };
}

Posts.propTypes = {
  postIds: PropTypes.array,
  visible: PropTypes.number,
};

Posts.defaultProps = {
  postIds: [],
  visible: 2,
};

export default Posts;
