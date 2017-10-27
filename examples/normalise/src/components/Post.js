import React from 'react';
import PropTypes from 'prop-types';
import resaga from '../../../../build';
import { PAGE as OTHER_PAGE } from '../containers/config';

const Post = ({ id, title }) => {
  console.log('Item render', id, title);
  return <li>{title}</li>;
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default resaga({
  value: {
    title: {
      keyPath: [OTHER_PAGE, 'posts'],
      getter: (posts, props) => posts[props.id].title,
    },
  },
})(Post);

