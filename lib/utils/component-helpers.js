import { RESULT, SERVER_ERROR, SUBMIT_SUCCESS, IS_LOADING, WILL_LOAD, PAYLOAD } from '../constants';
import configs from './configs';

const getKey = (name, request) => `${name}.${request}`;

const notify = (callback, props) => {
  if (!callback) return;

  if (typeof callback === 'function') callback(props);

  const { [SERVER_ERROR]: error, [SUBMIT_SUCCESS]: success, [RESULT]: result, [PAYLOAD]: payload } = props;
  // if request is error
  if (error && callback.onError) callback.onError(error, payload);
  // if request is success
  if (success && callback.onSuccess) callback.onSuccess(result, payload);
};

/**
 * @param request can be one of the 2 types below
 * - Type 1: { request: { onSuccess: <function(result)>, onError: <function(error)>, manuallyAcknowledge: <bool> } }
 * - Type 2: { request: <function> }
 * @param props
 * @param formName
 * @param dispatch
 * @returns {boolean}
 */
const analyseRequest = (request, props, formName, { dispatch, callbacks }) => {
  const { [SERVER_ERROR]: error, [SUBMIT_SUCCESS]: success, [RESULT]: result, [PAYLOAD]: payload, [WILL_LOAD]: willLoad, page: name } = props;
  const key = getKey(name, formName);
  const callback = callbacks[key];

  if (typeof request === 'function') {
    request(props); // pass through props
    notify(callback, props);
    return false;
  }
  // if request is beforeDispatch
  if (willLoad) {
    if (request.before) request.before(payload);
    const CONFIG = configs.get(name);
    // willLoad called, should dispatch
    dispatch(payload, CONFIG, formName, name);
    return false;
  }
  // if request is error
  if (error && request.onError) request.onError(error, payload);
  // if request is success
  if (success && request.onSuccess) request.onSuccess(result, payload);

  notify(callback, props);
  return !request.manuallyAcknowledge;
};

/**
 * functions to call when receive props from onSubmitHOC
 * @param nextProps this is your `nextProps`
 * @param actions can be either of 2 following structure:
 *  - Option 1: { propName: { onSuccess: <function(result)>, onError: <function(error)> } }
 *  - Option 2: { propName: <function(requestNextProps)> } function will be called either success or error
 * @param acknowledge should be automatically injected by onSubmitHOC
 *   if you want to manually acknowledge, do NOT pass in this parameter
 * @param dispatch should be automatically injected by onSubmitHOC
 * @param CONFIG page CONFIG
 */
const analyseNextProps = (nextProps, actions, { acknowledge, dispatch, CONFIG, callbacks }) => {
  const store = nextProps[CONFIG.name];
  if (store) {
    Object.keys(actions).forEach((formName) => {
      const props = store.get(formName);
      if (!props || props[IS_LOADING]) return false;
      let ack = true;
      try {
        ack = analyseRequest(actions[formName], props, formName, { dispatch, callbacks });
      } finally {
        // dispatch called, should acknowledge
        if (ack && typeof acknowledge === 'function') acknowledge(formName);
      }
      return true;
    });
  }
};

export default {
  analyseNextProps,
  analyseRequest,
};
