import fetch from 'isomorphic-fetch';
import { PAGE as OTHER_PAGE } from './config';

export const PAGE = 'AnotherAsyncPage';
export const FETCH_REDDIT = 'fetchReddit';
export const req = { fetch };
export const CONFIG = {
  name: PAGE,
  processResult: {
    fetchReddit: (result) => ({
      posts: result.data.children.map((child) => child.data).slice(0, 2),
      lastUpdated: new Date(),
    }),
  },
  requests: {
    fetchReddit: async (reddit) => (await req.fetch(`http://www.reddit.com/r/${reddit}.json`)).json(),
  },
  value: {
    otherComplicated: [OTHER_PAGE, 'complicated'],
    otherLastUpdated: [OTHER_PAGE, 'lastUpdated'],
  },
};
