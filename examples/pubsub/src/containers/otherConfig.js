import fetch from 'isomorphic-fetch';

export const OTHER_PAGE = 'OtherAsyncPage';
export const req = { fetch };
export const CONFIG = {
  name: OTHER_PAGE,
  processResult: {
    fetchReddit: (result) => ({
      posts: result.data.children.map((child) => child.data).slice(0, 5),
      lastUpdated: new Date(),
    }),
  },
  submit: {
    fetchReddit: async (reddit) => (await req.fetch(`http://www.reddit.com/r/${reddit}.json`)).json(),
  },
};
