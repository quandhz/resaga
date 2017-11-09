import React from 'react';
import PropTypes from 'prop-types';
import resaga from '../../../../build';
import { PAGE as OTHER_PAGE } from '../containers/config';

export class PostContent extends React.PureComponent {
  setVisible = (visibility) => () =>
    this.props.resaga.setValue({ visibility });

  increaseVisible = () =>
    this.props.resaga.setValue({ visibility: (value) => value + 1 }, console.log);

  decreaseVisible = () =>
    this.props.resaga.setValue({ visibility: (value) => value - 1 }, console.log);

  render = () => {
    const { title } = this.props;
    console.log('PostContent render', `${title.slice(0, 10)}...`);

    return (
      <div>
        <b>{title}</b> <br />
        <button onClick={this.setVisible(2)}>Set visible 2</button> <br />
        <button onClick={this.decreaseVisible}>decreaseVisible</button>
        <button onClick={this.increaseVisible}>increaseVisible</button>
      </div>
    );
  };
}

PostContent.propTypes = {
  resaga: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

PostContent.defaultProps = {
};

export default resaga({
  setValue: {
    visibility: [OTHER_PAGE, 'visible'],
  },
  value: {
    title: {
      keyPath: [OTHER_PAGE, 'posts'],
      getter: (posts, props) => posts[props.selected] ? posts[props.selected].title : 'n/a',
    },
  },
})(PostContent);

