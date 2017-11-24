import { DO_SUBMIT } from '../constants';
import errors from './errors';

const resagaConfigs = {};

const isResagaStore = (page) => !!resagaConfigs[page];

const setConfig = (page, cfg) => {
  if (resagaConfigs[page]) errors.breakingError(`Component '${page}' has been mounted multiple times which is anti-pattern. It's possibly due to dynamically generating by a loop. Consider moving state up to parent.`);
  resagaConfigs[page] = cfg;
  return true;
};


const checkConfig = (configs, name, requestName) => {
  if (!configs) throw SyntaxError(`Component '${name}' not found. Check whether the component has been unmounted before the request finished, or it has never been mounted in the first place.`);
  if (!configs.requests) throw SyntaxError('`configs.requests` must be defined.');
  if (requestName && !configs.requests[requestName]) throw SyntaxError(`Request '${requestName}' must be defined in configs.requests.`);

  return configs;
};

const getConfig = (name, requestName) => {
  if (!name) return errors.error(`The configuration of '${name}' not found. Check whether some component has been unmounted before the request finished, or it has never been mounted in the first place.`);

  return checkConfig(resagaConfigs[name], name, requestName);
};


const deleteConfig = (page) => delete resagaConfigs[page];


/**
 * action type will be something like `HOC_DO_SUBMIT::containers/Form/Login::loginForm`
 * The part after SEPARATOR (::) is just for debugging purpose, we can ignore that
 * @param action
 */
const doSubmit = (action) => action && action.type.indexOf(DO_SUBMIT) !== -1;


/**
 * @param request: name of the store, need to be unique *required
 * @param requests: how to submit the data *required
 * @param onSuccess: if you want to dispatch some additional actions on success
 * @param onError: if you want to dispatch some additional actions on error
 * @param processResult: result might need to be formatted before sending to user
 * @param processError: error might need to be formatted before sending to user
 * @param requestName
 * @returns {{request: *, submit: *, onSuccess: Array, onError: Array, postProcess: (function(*): *), postProcessError: (function(*): *)}}
 */
const analyse = ({
  name,
  requests,
  onSuccess = [],
  onError = [],
  processResult = (_) => (_),
  processError = (_) => (_),
}, requestName) => {
  let submitEach = requests;
  let postSuccessEach = processResult;
  let postErrorEach = processError;
  let onSuccessEach = onSuccess;
  let onErrorEach = onError;

  if (typeof submitEach === 'object') submitEach = submitEach[requestName];
  if (typeof postSuccessEach === 'object') postSuccessEach = postSuccessEach[requestName];
  if (typeof postErrorEach === 'object') postErrorEach = postErrorEach[requestName];

  if (!Array.isArray(onSuccessEach)) onSuccessEach = onSuccessEach[requestName];

  if (!Array.isArray(onErrorEach)) onErrorEach = onErrorEach[requestName];

  return {
    name,
    requests: submitEach,
    onSuccess: onSuccessEach,
    onError: onErrorEach,
    postProcess: postSuccessEach || ((_) => (_)),
    postProcessError: postErrorEach || ((_) => (_)),
  };
};


const analyseConfigs = (originConfigs) => {
  const configs = originConfigs;

  if (configs.page && !configs.name) {
    // TODO: backward compatibility v0.0.x
    errors.warning('`CONFIG.page` is renamed to `CONFIG.name`. Please adapt your code. `CONFIG.page` will not be supported in the next minor release.');
    configs.name = configs.page;
    delete configs.page;
  }

  if (configs.submit && !configs.requests) {
    // TODO: backward compatibility v0.0.x
    errors.warning('`CONFIG.submit` is renamed to `CONFIG.requests`. Please adapt your code. `CONFIG.submit` will not be supported in the next minor release.');
    configs.requests = configs.submit;
    delete configs.submit;
  }

  return configs;
};


export default {
  doSubmit,
  analyse,
  analyseConfigs,
  set: setConfig,
  get: getConfig,
  check: checkConfig,
  delete: deleteConfig,
  isResagaStore,
};
