import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

export class PostList extends React.PureComponent {
  render = () => {
    const {
      postIds, visible, selected, onChange,
    } = this.props;

    console.log('PostList render');
    const visiblePostIds = postIds.slice(0, visible);

    const list = visiblePostIds.map((id, index) => (<Post
      index={index}
      selected={selected === id}
      onChange={onChange}
      key={id}
      id={id}
    />));

    return <ul>{list}</ul>;
  };
}

PostList.propTypes = {
  postIds: PropTypes.array,
  visible: PropTypes.number,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

PostList.defaultProps = {
  postIds: [],
  visible: 2,
  selected: '',
};

export default PostList;

