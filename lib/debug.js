
let isDebugging = false;

const on = () => isDebugging;

const start = () => {
  isDebugging = true;
};

const stop = () => {
  isDebugging = false;
};

export default {
  on,
  start,
  stop,
};
