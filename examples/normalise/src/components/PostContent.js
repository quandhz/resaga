import React from 'react';
import PropTypes from 'prop-types';
import resaga from '../../../../build';
import { PAGE as OTHER_PAGE } from '../containers/config';


const editPost = (selected) => (posts) => {
  const first = posts[selected];
  return {
    ...posts,
    [selected]: { title: `${first.title} (1)` },
  };
};


export class PostContent extends React.PureComponent {
  setVisible = (visibility) => () =>
    this.props.resaga.setValue({ visibility });

  increaseVisible = () =>
    this.props.resaga.setValue({ visibility: (value) => value + 1 }, console.log);

  decreaseVisible = () =>
    this.props.resaga.setValue({ visibility: (value) => value - 1 }, console.log);

  increaseCounter = () =>
    this.props.resaga.setValue({ counter: (value) => value + 1 }, console.log);

  decreaseCounter = () =>
    this.props.resaga.setValue({ counter: (value) => value - 1 }, console.log);

  handleEdit = (index) => () => {
    this.props.resaga.setValue({
      posts: editPost(index),
    });
  };

  render = () => {
    const { title, selected, counter } = this.props;
    console.log('PostContent render', `${title.slice(0, 10)}...`);

    return (
      <div>
        <b>{title}</b> <br />
        <a href="#" onClick={this.handleEdit(selected)}>Edit Content</a> <br />
        <button onClick={this.setVisible(2)}>Set visible 2</button> <br />
        <button onClick={this.decreaseVisible}>decreaseVisible</button>
        <button onClick={this.increaseVisible}>increaseVisible</button>
        <hr />
        Current counter: {counter}<br />
        <button onClick={this.decreaseCounter}>decreaseCounter</button>
        <button onClick={this.increaseCounter}>increaseCounter</button>
      </div>
    );
  };
}

PostContent.propTypes = {
  resaga: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  counter: PropTypes.number,
};

PostContent.defaultProps = {
  counter: 1,
};

export default resaga({
  setValue: {
    visibility: [OTHER_PAGE, 'visible'],
    posts: [OTHER_PAGE, 'posts'],
    counter: [OTHER_PAGE, 'counter'],
  },
  value: {
    title: {
      keyPath: [OTHER_PAGE, 'posts'],
      getter: (posts, props) => posts[props.selected] ? posts[props.selected].title : 'n/a',
    },
    counter: [OTHER_PAGE, 'counter'],
  },
})(PostContent);

