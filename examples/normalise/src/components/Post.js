import React from 'react';
import PropTypes from 'prop-types';
import resaga from '../../../../build';
import { PAGE as OTHER_PAGE } from '../containers/config';

export class Post extends React.PureComponent {
  render = () => {
    const {
      id, title, selected, onChange,
      counter, index,
    } = this.props;
    console.log('Item render', id, `${title.slice(0, 10)}...`);

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
          [{counter + index}] {title}
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
  counter: PropTypes.number,
  index: PropTypes.number,
};

Post.defaultProps = {
  selected: false,
  counter: 1,
  index: 1,
};

export default resaga({
  value: {
    title: {
      keyPath: ['normaliseStore', 'posts'],
      getter: (posts, props) => posts[props.id].title,
    },
    counter: [OTHER_PAGE, 'counter'],
  },
})(Post);

