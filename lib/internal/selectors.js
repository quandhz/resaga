import { VARIABLES } from './constants';


const selectPage = (page) => (state) => {
  const store = state.get(page);
  if (!store) return undefined;

  return store.delete(VARIABLES);
};

export default {
  selectPage,
};

export const SELECTOR_HELPERS = {
  selectPage,
};
