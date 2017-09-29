import { DO_SUBMIT } from '../constants';
import errors from './errors';

const resagaConfigs = {};


const setConfig = (page, cfg) => {
  if (resagaConfigs[page]) errors.breakingError(`Component '${page}' has been mounted multiple times which is anti-pattern. It's possibly due to dynamically generating by a loop. Consider moving state up to parent.`);
  resagaConfigs[page] = cfg;
  return true;
};


const getConfig = (page) => {
  if (!page) return errors.error(`The configuration of '${page}' not found. Check whether some component has been unmounted before the request finished, or it has never been mounted in the first place.`);
  const pageConfig = resagaConfigs[page];
  if (!pageConfig) errors.error(`Component '${page}' not found. Check whether the component has been unmounted before the request finished, or it has never been mounted in the first place.`);

  return pageConfig;
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
 * @param submit: how to submit the data *required
 * @param onSuccess: if you want to dispatch some additional actions on success
 * @param onError: if you want to dispatch some additional actions on error
 * @param postProcess: result might need to be formatted before sending to user
 * @param postError: error might need to be formatted before sending to user
 * @param requestName
 * @returns {{request: *, submit: *, onSuccess: Array, onError: Array, postProcess: (function(*): *), postProcessError: (function(*): *)}}
 */
const analyse = ({
  name,
  requests,
  onSubmitSuccess = [],
  onSubmitError = [],
  processResult = (_) => (_),
  processError = (_) => (_),
}, requestName) => {
  let submitEach = requests;
  let postSuccessEach = processResult;
  let postErrorEach = processError;
  let onSuccessEach = onSubmitSuccess;
  let onErrorEach = onSubmitError;

  if (typeof submitEach === 'object') submitEach = submitEach[requestName];
  if (typeof postSuccessEach === 'object') postSuccessEach = postSuccessEach[requestName];
  if (typeof postErrorEach === 'object') postErrorEach = postErrorEach[requestName];
  if (!Array.isArray(onSuccessEach)) onSuccessEach = onSuccessEach[requestName];
  if (!Array.isArray(onErrorEach)) onErrorEach = onErrorEach[requestName];

  return {
    name,
    requests: submitEach,
    onSubmitSuccess: onSuccessEach,
    onSubmitError: onErrorEach,
    postProcess: postSuccessEach,
    postProcessError: postErrorEach,
  };
};


export default {
  doSubmit,
  analyse,
  set: setConfig,
  get: getConfig,
  delete: deleteConfig,
};
