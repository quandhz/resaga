import { BEFORE_SUBMIT } from '../internal/config';
import configStore from '../utils/configs';

const notify = (callback, props) => {
  if (!callback) return false;


  if (typeof callback === 'function') {
    callback(props);
    return true;
  }

  const { error, success, result, payload } = props;

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
 * @param requestName
 * @param dispatch
 * @returns {boolean}
 */
const analyseRequest = (request = {}, props, { dispatch }) => {
  const {
    options, payload, willLoad,
    success, result,
    error,
  } = props;


  // if request is beforeDispatch
  if (willLoad) {
    if (request.before) request.before(payload);

    // willLoad called, should dispatch
    dispatch(props);
    return false;
  }


  const callback = options && options.callback;
  if (typeof request === 'function') {
    request(props); // pass through props

    // TODO: use proper set/get
    if (callback) notify(callback, props);
    return false;
  }

  // if request failed
  if (error && request.onError) request.onError(error, payload);

  // if request success
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
const analyseNextProps = (nextProps, actions = {}, { acknowledge, dispatch, configs = {} }) => {
  if (!configs.requests) return false;


  const store = nextProps[configs.name];

  if (store) {
    Object.keys(configs.requests).forEach((request) => {
      const props = store.get(request) || {};
      if (props.isLoading) return false;


      let ack = true;
      try {
        ack = analyseRequest(actions[request], props, { dispatch });
      } finally {
        // dispatch called, should acknowledge
        if (ack && typeof acknowledge === 'function') acknowledge(request);
      }


      return true;
    });
  }


  return false;
};


const dispatchTo = (componentName, requestName, { payload, ...callback }, props) => {
  if (!componentName) throw SyntaxError('Component Name must be defined.');
  if (!requestName) throw SyntaxError('Request Name must be defined.');


  const configs = componentName && configStore.get(componentName);

  // TODO: use invariant
  if (!configs) throw SyntaxError('`configs` must be defined.');
  if (!configs.requests) throw SyntaxError('`configs.requests` must be defined.');
  if (!configs.requests[requestName]) throw SyntaxError(`Request '${requestName}' must be defined in configs.requests.`);


  const { beforeDispatch, Component } = props.resagaInternalProps;
  const preProcess = configs[BEFORE_SUBMIT] || ((o) => (o));
  const postPayload = preProcess(payload);

  // delay 1ms to put this on execution queue to prevent it from getting overridden
  return setTimeout(() => {
    beforeDispatch(componentName, requestName, postPayload, { configs, callback, origin: `${Component.name}` });
  }, 0);
};


export default {
  analyseNextProps,
  analyseRequest,
  dispatchTo,
};
