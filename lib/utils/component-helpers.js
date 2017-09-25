import { RESULT, SERVER_ERROR, SUBMIT_SUCCESS, IS_LOADING, WILL_LOAD, PAYLOAD, PAGE } from '../internal/constants';

const notify = (callback, props) => {
  if (!callback) return false;


  if (typeof callback === 'function') {
    callback(props);
    return true;
  }

  const { [SERVER_ERROR]: error, [SUBMIT_SUCCESS]: success, [RESULT]: result, [PAYLOAD]: payload } = props;

  // if request is error
  if (error && callback.onError) callback.onError(error, payload);


  // if request is success
  if (success && callback.onSuccess) callback.onSuccess(result, payload);

  return true;
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
const analyseRequest = (request, props, formName, { dispatch }) => {
  const { [SERVER_ERROR]: error, [SUBMIT_SUCCESS]: success, [RESULT]: result, [PAYLOAD]: payload, [WILL_LOAD]: willLoad, [PAGE]: name, options } = props;


  // if request is beforeDispatch
  if (willLoad) {
    if (request.before) request.before(payload);

    // willLoad called, should dispatch
    dispatch(name, formName, payload, options);
    return false;
  }


  const callback = options && options.callback;
  if (typeof request === 'function') {
    request(props); // pass through props

    // TODO: use proper set/get
    if (callback) notify(callback, props);
    return false;
  }

  // if request is error
  if (error && request.onError) request.onError(error, payload);

  // if request is success
  if (success && request.onSuccess) request.onSuccess(result, payload);


  // TODO: use proper set/get
  if (callback) notify(callback, props);


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
 * @param configStore page CONFIG
 */
const analyseNextProps = (nextProps, actions, { acknowledge, dispatch, configs }) => {
  const store = nextProps[configs.name];

  if (store) {
    Object.keys(actions).forEach((formName) => {
      const props = store.get(formName);
      if (!props || props[IS_LOADING]) return false;

      let ack = true;
      try {
        ack = analyseRequest(actions[formName], props, formName, { dispatch });
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
