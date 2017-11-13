import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import PostContent from './PostContent';

export class Posts extends PureComponent {
  state = {
    selected: '',
  };

  handleChange = (selected) => () => this.setState({ selected });

  render = () => {
    const { postIds, visible } = this.props;
    const { selected } = this.state;
    const visiblePostIds = postIds.slice(0, visible);

    const list = visiblePostIds.map((id) => (<Post
      selected={selected === id}
      onChange={this.handleChange}
      key={id}
      id={id}
    />));
    return (
      <div>
        <ul>{list}</ul>
        <hr />
        Selected Article:
        {selected && <PostContent selected={selected} />}
      </div>
    );
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
