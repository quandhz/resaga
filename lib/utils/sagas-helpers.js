import { DO_SUBMIT } from '../internal/constants';
import { HANDLE_ERROR, HANDLE_SUCCESS, ON_ERROR, ON_SUCCESS, SUBMIT, PAGE } from '../internal/config';

/**
 * action type will be something like `HOC_DO_SUBMIT::containers/Form/Login::loginForm`
 * The part after SEPARATOR (::) is just for debugging purpose, we can ignore that
 * @param action
 */
export const doSubmit = (action) => action && action.type.indexOf(DO_SUBMIT) !== -1;

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
export const analyse = ({
  [PAGE]: name,
  [SUBMIT]: requests,
  [ON_SUCCESS]: onSuccess = [],
  [ON_ERROR]: onError = [],
  [HANDLE_SUCCESS]: postSuccess = (_) => (_),
  [HANDLE_ERROR]: postError = (_) => (_),
}, requestName) => {
  let submitEach = requests;
  let postSuccessEach = postSuccess;
  let postErrorEach = postError;
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
    onSubmitSuccess: onSuccessEach,
    onSubmitError: onErrorEach,
    postProcess: postSuccessEach,
    postProcessError: postErrorEach,
  };
};


export default {
  doSubmit,
  analyse,
};
