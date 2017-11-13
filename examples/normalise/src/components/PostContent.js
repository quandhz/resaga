import React from 'react';
import PropTypes from 'prop-types';
import resaga from '../../../../build';
import { PAGE as OTHER_PAGE } from '../containers/config';

export class PostContent extends React.PureComponent {
  render = () => {
    const { title } = this.props;
    console.log('PostContent render', `${title.slice(0, 10)}...`);

    return <b>{title}</b>;
  };
}

PostContent.propTypes = {
  title: PropTypes.string.isRequired,
};

PostContent.defaultProps = {
};

export default resaga({
  value: {
    title: {
      keyPath: [OTHER_PAGE, 'posts'],
      getter: (posts, props) => posts[props.selected] ? posts[props.selected].title : 'n/a',
    },
  },
})(PostContent);

