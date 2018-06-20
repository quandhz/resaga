import React from 'react';
import PropTypes from 'prop-types';
import resaga from '../../../../build';
import { PAGE as OTHER_PAGE } from '../containers/config';


export class PostContent extends React.PureComponent {
  setVisible = (visibility) => () =>
    this.props.resaga.setValue({ visibility });

  increaseVisible = () =>
    // this.props.resaga.setValue({ hi: 1 }, console.log);
    this.props.resaga.setValue({ visibility: (value) => value + 1 }, console.log);

  decreaseVisible = () =>
    this.props.resaga.setValue({ visibility: (value) => value - 1 }, console.log);

  increaseCounter = () =>
    this.props.resaga.setValue({ counter: (value) => value + 1 }, console.log);

  decreaseCounter = () =>
    this.props.resaga.setValue({ counter: (value) => value - 1 }, console.log);

  handleEdit = (id) => () => {
    console.log('handleEdit', id);
    this.props.resaga.setValue({
      postTitle: (title) => `${title} (1)`,
    }, { id });
  };

  render = () => {
    const {
      title, selected, counter, titleHi,
    } = this.props;
    console.log('PostContent render', `${title.slice(0, 10)}...`);
    console.log('titleHi', titleHi);
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
  title: PropTypes.string,
  selected: PropTypes.string.isRequired,
  counter: PropTypes.number,
};

PostContent.defaultProps = {
  counter: 1,
  title: '',
};

export default resaga({
  setValue: {
    visibility: [OTHER_PAGE, 'visible'],
    posts: ['normaliseStore', 'posts'],
    hi: ['normaliseStore', 'hi'],
    counter: [OTHER_PAGE, 'counter'],
    postTitle: (ownProps, { id }) => ['normaliseStore', 'posts', id, 'title'],
  },
  value: {
    hi: [
      ['normaliseStore', 'hi'],
    ],
    title: ({ selected }) => ['normaliseStore', 'posts', selected, 'title'],
    counter: {
      keyPath: [OTHER_PAGE, 'counter'],
      getter: (counter) => ({ counter, isCounterOdd: counter % 2 === 1 }),
      spreadObject: true,
    },
    titleHi: {
      getter: ({ title, hi }) => `${title}_${hi}`,
    },
  },
})(PostContent);

