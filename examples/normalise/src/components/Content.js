import React from 'react';
import PropTypes from 'prop-types';
import resaga from '../../../../build';

export class Content extends React.PureComponent {
  render = () => {
    const { content } = this.props;

    return (
      <h3>{content}</h3>
    );
  };
}

Content.propTypes = {
  content: PropTypes.string,
};

Content.defaultProps = {
  content: '',
};

export default resaga({
  value: {
    content: {
      keyPath: ({ id }) => ['normaliseStore', 'nodes', id, 'content'],
      getter: (content) => `x ${content}`,
    },
  },
})(Content);

