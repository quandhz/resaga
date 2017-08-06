import fetch from 'isomorphic-fetch';

export const PAGE = 'AsyncPage';

export const CONFIG = {
  page: PAGE,
  processResult: {
    fetchReddit: (result) => ({
      posts: result.data.children.map((child) => child.data),
      lastUpdated: new Date(),
    }),
  },
  submit: {
    fetchReddit: async (reddit) => (await fetch(`http://www.reddit.com/r/${reddit}.json`)).json(),
  },
};
