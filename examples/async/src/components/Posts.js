import React from 'react';
import PropTypes from 'prop-types';

const Posts = ({ posts }) => {
  const list = posts.map((post, i) => <li key={i}>{post.title}</li>);
  return <ul>{list}</ul>;
};

Posts.propTypes = {
  posts: PropTypes.array,
};

Posts.defaultProps = {
  posts: [],
};

export default Posts;
