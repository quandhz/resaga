import { DO_SUBMIT } from '../constants';
import { HANDLE_ERROR, HANDLE_SUCCESS, ON_ERROR, ON_SUCCESS, SUBMIT } from '../config';

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
 * @param formName
 * @returns {{request: *, submit: *, onSuccess: Array, onError: Array, postProcess: (function(*): *), postProcessError: (function(*): *)}}
 */
export const analyse = ({
  name: request,
  [SUBMIT]: submit,
  [ON_SUCCESS]: onSuccess = [],
  [ON_ERROR]: onError = [],
  [HANDLE_SUCCESS]: postSuccess = (_) => (_),
  [HANDLE_ERROR]: postError = (_) => (_),
}, formName) => {
  let submitEach = submit;
  let postSuccessEach = postSuccess;
  let postErrorEach = postError;
  let onSuccessEach = onSuccess;
  let onErrorEach = onError;

  if (typeof submitEach === 'object') submitEach = submitEach[formName];
  if (typeof postSuccessEach === 'object') postSuccessEach = postSuccessEach[formName];
  if (typeof postErrorEach === 'object') postErrorEach = postErrorEach[formName];
  if (!Array.isArray(onSuccessEach)) onSuccessEach = onSuccessEach[formName];
  if (!Array.isArray(onErrorEach)) onErrorEach = onErrorEach[formName];

  return {
    request,
    submit: submitEach,
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
