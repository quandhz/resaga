export const isValidConfig = (CONFIG) => {
  if (!CONFIG.name) return false;
  return true;
};

export default {
  isValidConfig,
};
