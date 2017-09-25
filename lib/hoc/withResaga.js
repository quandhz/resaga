import { resaga } from '../hoc/resaga';
import { simpleResaga } from '../hoc/simpleResaga';


const isEmpty = (object) => typeof object === 'object' && !Object.keys(object).length;

/**
 * v0.0.x: resaga(Component, CONFIG);
 * v0.1.x: resaga(CONFIG)(Component);
 * @param Comp
 * @param config
 */
export const withResaga = (Comp, config) => {
  // Backward compatibility for v0.0.x
  if (config) {
    return resaga(config)(Comp);
  }

  const configs = Comp || {};
  if (!configs.name || isEmpty(configs.submit)) {
    return simpleResaga(configs);
  }

  return resaga(configs);
};

export default withResaga;
