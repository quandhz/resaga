
let isDebugging = false;
let generateCacheKey = true;
let isLoggingCache = false;

const on = () => isDebugging;
const useCache = () => generateCacheKey;
const logCache = () => isLoggingCache;

const start = () => {
  isDebugging = true;
};

const stop = () => {
  isDebugging = false;
};

const generateCache = (cache = true) => {
  generateCacheKey = cache;
};
const useOwnCacheKey = () => {
  generateCacheKey = false;
};
const showCacheLog = (cache = true) => {
  isLoggingCache = cache;
};

export default {
  on,
  useCache,
  start,
  stop,
  logCache,
  generateCache,
  useOwnCacheKey,
  showCacheLog,
};
