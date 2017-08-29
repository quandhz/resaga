export const ResagaError = (error) => {
  console.error(`[resaga] Warning: ${error}`); // eslint-disable-line no-console
};

export const ResagaBreakingError = (error) => {
  // TODO: will throw Error in the next minor release
  // throw new Error(`[resaga] ${error}`);
  console.error(`[resaga] Warning: ${error} This needs to be fixed ASAP! A breaking Error will be thrown in the next minor release.`); // eslint-disable-line no-console
};
