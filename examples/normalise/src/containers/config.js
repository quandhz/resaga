import fetch from 'isomorphic-fetch';
import { normalize, schema } from 'normalizr';

export const postContent = new schema.Entity('postContent', {}, {
  processStrategy: ({ title }) => ({ title }),
});
export const postSchema = [postContent];

export const PAGE = 'AsyncPage';
export const req = { fetch };
export const CONFIG = {
  name: PAGE,
  processResult: {
    fetchReddit: (result) => {
      const originPosts = result.data.children.map((child) => child.data).slice(0, 5);
      const posts = normalize(originPosts, postSchema);
      return {
        posts: posts.entities.postContent,
        postIds: posts.result,
        lastUpdated: new Date(),
        counter: 1,
      };
    },
  },
  requests: {
    fetchReddit: async (reddit) => (await req.fetch(`http://www.reddit.com/r/${reddit}.json`)).json(),
  },
  setValue: {
    selectedReddit: ['selectStore', 'selectedReddit'],
    lastUpdated: ['updateStore', 'lastUpdated'],
    postIds: ['normaliseStore', 'postIds'],
    posts: ['normaliseStore', 'posts'],
    post: (ownProps, { id }) => ['normaliseStore', 'posts', id],
    postTitle: (ownProps, { id }) => ['normaliseStore', 'posts', id, 'title'],
  },
  value: {
    selectedReddit: ['selectStore', 'selectedReddit'],
    lastUpdated: ['updateStore', 'lastUpdated'],
    postIds: ['normaliseStore', 'postIds'],
    posts: ['normaliseStore', 'posts'],
    hi: ['hiStore', 'hi'],
  },
  // manuallySubscribe: true,
  // optimiseComparison: true,
};
