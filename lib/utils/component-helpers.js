import { RESULT, SERVER_ERROR, STORE, SUBMIT_SUCCESS, IS_LOADING, WILL_LOAD, PAYLOAD } from '../constants';
import { PAGE } from '../config';
import cfgs from './configs';

/**
 * @param request can be one of the 2 types below
 * - Type 1: { request: { onSuccess: <function(result)>, onError: <function(error)>, manuallyAcknowledge: <bool> } }
 * - Type 2: { request: <function> }
 * @param props
 * @param formName
 * @param dispatch
 * @returns {boolean}
 */
const analyseRequest = (request, props, formName, dispatch) => {
  const { [SERVER_ERROR]: error, [SUBMIT_SUCCESS]: success, [RESULT]: result, [PAYLOAD]: payload, [WILL_LOAD]: willLoad, [PAGE]: page } = props;
  if (typeof request === 'function') {
    request(props); // pass through props
    return false;
  }
  // if request is beforeDispatch
  if (willLoad) {
    if (request.before) request.before(payload);
    const config = cfgs.get(page);
    // willLoad called, should dispatch
    dispatch(payload, config, formName, page);
    return false;
  }
  // if request is error
  if (error && request.onError) request.onError(error, payload);
  // if request is success
  if (success && request.onSuccess) request.onSuccess(result, payload);
  return !request.manuallyAcknowledge;
};

/**
 * functions to call when receive props from onSubmitHOC
 * @param store this is your `nextProps`
 * @param requests can be either of 2 following structure:
 *  - Option 1: { propName: { onSuccess: <function(result)>, onError: <function(error)> } }
 *  - Option 2: { propName: <function(requestNextProps)> } function will be called either success or error
 * @param acknowledge should be automatically injected by onSubmitHOC
 *   if you want to manually acknowledge, do NOT pass in this parameter
 * @param dispatch should be automatically injected by onSubmitHOC
 */
const analyseNextProps = ({ [STORE]: store }, requests, { acknowledge, dispatch }) => {
  if (store) {
    Object.keys(requests).forEach((formName) => {
      const props = store.get(formName);
      if (!props || props[IS_LOADING]) return false;

      const ack = analyseRequest(requests[formName], props, formName, dispatch);
      // dispatch called, should acknowledge
      if (ack && typeof acknowledge === 'function') acknowledge(formName);
      return true;
    });
  }
};

export default {
  analyseNextProps,
  analyseRequest,
};
