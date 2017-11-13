import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList';
import PostContent from './PostContent';

export class Posts extends PureComponent {
  state = {
    selected: '',
  };

  handleChange = (selected) => () => this.setState({ selected });

  render = () => {
    const { postIds, visible } = this.props;
    const { selected } = this.state;


    return (
      <div>
        <PostList
          postIds={postIds}
          visible={visible}
          selected={selected}
          onChange={this.handleChange}
        />
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
