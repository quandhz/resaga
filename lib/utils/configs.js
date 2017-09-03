import errors from './errors';

const resagaConfigs = {};
const setConfig = (page, cfg) => {
  if (resagaConfigs[page]) errors.ResagaBreakingError(`Component '${page}' has been mounted multiple times which is anti-pattern. It's possibly due to dynamically generating by a loop. Consider moving state up to parent.`);
  resagaConfigs[page] = cfg;
  return true;
};
const getConfig = (page) => {
  if (!page) return errors.ResagaError(`The configuration of '${page}' not found. Check whether some component has been unmounted before the request finished, or it has never been mounted in the first place.`);
  const pageConfig = resagaConfigs[page];
  if (!pageConfig) errors.ResagaError(`Component '${page}' not found. Check whether the component has been unmounted before the request finished, or it has never been mounted in the first place.`);

  return pageConfig;
};
const deleteConfig = (page) => delete resagaConfigs[page];

export default {
  set: setConfig,
  get: getConfig,
  delete: deleteConfig,
};
