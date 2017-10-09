import hoc from './internal/hoc';
import helpers from './internal/helpers';


/**
 * resaga HOC: 2 ways to wrap
 * - resaga(Component, CONFIG);
 * - resaga(CONFIG)(Component);
 *
 * Simplify resaga:
 * - resaga()(Component)
 *
 * @param ComponentOrConfig
 * @param config
 */
const resaga = (ComponentOrConfig = {}, config) => {
  if (config) return resaga(config)(ComponentOrConfig);

  if (helpers.isSimplify(ComponentOrConfig)) return hoc.withSimplifyResaga(ComponentOrConfig);

  return hoc.withResaga(ComponentOrConfig);
};

export default resaga;
