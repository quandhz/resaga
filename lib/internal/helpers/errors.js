const warning = (message) => {
  console.warn(`[resaga][deprecated] ${message}`); // eslint-disable-line no-console
};

const error = (message) => {
  console.error(`[resaga] Warning: ${message}`); // eslint-disable-line no-console
};

const breakingError = (message) => {
  // TODO: will throw Error in the next minor release
  // throw new Error(`[resaga] ${error}`);
  error(`${message} This needs to be fixed ASAP! A breaking Error will be thrown in the next minor release.`);
};

export default {
  error,
  warning,
  breakingError,
};
