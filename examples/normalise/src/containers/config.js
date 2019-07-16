import fetch from 'isomorphic-fetch';
import { normalize, schema } from 'normalizr';

export const postContent = new schema.Entity('postContent', {}, {
  processStrategy: ({ title }) => ({ title }),
});
export const postSchema = [postContent];

export const BLOCK_THREAD = (sleepDuration) => {
  const now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
};

export const CONTENT_TITLE_SELECTOR = {
  // cacheKey: 'content_title',
  keyPath: [
    ['normaliseStore', 'nodes', 1, 'content'],
    ['normaliseStore', 'nodes', 2, 'content'],
  ],
  props: () => null,
  getter: (content) => {
    console.log('  > Slowly calculating content_title.....', content);
    // BLOCK_THREAD(1000);
    console.log('  > Computing finish');
    return `Node Content: ${content}`;
  },
};

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
    nodes: ['normaliseStore', 'nodes'],
    content: ['normaliseStore', 'nodes', 1, 'content'],
  },
  value: {
    selectedReddit: {
      keyPath: ['selectStore', 'selectedReddit'],
    },
    lastUpdated: {
      keyPath: ['updateStore', 'lastUpdated'],
    },
    postIds: ['normaliseStore', 'postIds'],
    posts: {
      keyPath: ['normaliseStore', 'posts'],
    },
    nodeIds: ['normaliseStore', 'nodes', 1, 'checklists'],
    hi: ['hiStore', 'hi'],


    node1: CONTENT_TITLE_SELECTOR,
  },

  isLoading: {
    loading: [PAGE, 'fetchReddit'],
  },

  // manuallySubscribe: true,
  // optimiseComparison: true,
};
