import fetch from 'isomorphic-fetch';

export const PAGE = 'AsyncPage';
export const req = { fetch };
export const CONFIG = {
  name: PAGE,
  processResult: {
    fetchReddit: (result) => ({
      posts: result.data.children.map((child) => child.data),
      lastUpdated: new Date(),
    }),
  },
  requests: {
    fetchReddit: async (reddit) => (await req.fetch(`http://www.reddit.com/r/${reddit}.json`)).json(),
  },
};
