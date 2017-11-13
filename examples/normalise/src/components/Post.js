import React from 'react';
import PropTypes from 'prop-types';
import resaga from '../../../../build';
import { PAGE as OTHER_PAGE } from '../containers/config';

// eslint-disable-next-line react/no-redundant-should-component-update
export class Post extends React.PureComponent {
  render = () => {
    const {
      id, title, selected, onChange,
    } = this.props;
    console.log('Item render', id, title);

    return (
      <li>
        <label htmlFor={`radio.${id}`}>
          <input
            type="radio"
            value={id}
            id={`radio.${id}`}
            checked={selected}
            onChange={onChange(id)}
          />
          {title}
        </label>
      </li>
    );
  };
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Post.defaultProps = {
  selected: false,
};

export default resaga({
  value: {
    title: {
      keyPath: [OTHER_PAGE, 'posts'],
      getter: (posts, props) => posts[props.id].title,
    },
  },
})(Post);

