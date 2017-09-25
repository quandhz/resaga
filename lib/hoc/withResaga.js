import errors from '../utils/errors';
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
  if (config) {
    // TODO: backward compatibility v0.0.x
    const compName = Comp.name || 'Component';
    errors.ResagaWarning(`Wrap components using \`resaga(${compName}, CONFIG)\` is deprecated. Please use \`resaga(CONFIG)(${compName})\` instead.`);
    return resaga(config)(Comp);
  }

  const configs = Comp || {};
  if (!configs.name || isEmpty(configs.submit)) {
    return simpleResaga(configs);
  }

  return resaga(configs);
};

export default withResaga;
