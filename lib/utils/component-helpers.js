/**
 * Created by quando on 13/7/17.
 */
import { RESULT, SERVER_ERROR, STORE, SUBMIT_SUCCESS } from '../constants';

/**
 * @param request can be one of the 2 types below
 * - Type 1: { request: { onSuccess: <function(result)>, onError: <function(error)>, manuallyAcknowledge: <bool> } }
 * - Type 2: { request: <function> }
 * @param props
 * @returns {boolean}
 */
const analyseRequest = (request, props) => {
  const { [SERVER_ERROR]: error, [SUBMIT_SUCCESS]: success, [RESULT]: result } = props;
  if (typeof request === 'function') {
    request(props); // pass through props
    return false; // if you want to handle everything yourself, I assume you also want to manually handle the acknowledge process
  }
  // or calling functions
  if (error && request.onError) request.onError(error);
  if (success && request.onSuccess) request.onSuccess(result);
  return !request.manuallyAcknowledge;
};

/**
 * functions to call when receive props from onSubmitHOC
 * @param store this is your `nextProps`
 * @param actions can be either of 2 following structure:
 *  - Option 1: { propName: { onSuccess: <function(result)>, onError: <function(error)> } }
 *  - Option 2: { propName: <function(requestNextProps)> } function will be called either success or error
 * @param acknowledge should be automatically injected by onSubmitHOC
 *   if you want to manually acknowledge, do NOT pass in this parameter
 */
const analyseNextProps = ({ [STORE]: store }, actions, acknowledge) => {
  if (store) {
    Object.keys(actions).forEach((requestName) => {
      const request = actions[requestName];
      const requestNextProps = store.get(requestName);
      if (requestNextProps) {
        const shouldAck = analyseRequest(request, requestNextProps);
        if (shouldAck && typeof acknowledge === 'function') {
          acknowledge(requestName);
        }
      }
    });
  }
};

export default {
  analyseNextProps,
  analyseRequest,
};
