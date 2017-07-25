import { fromJS } from 'immutable';
import utils from './utils/reducer-helpers';
import {
  DO_SUBMIT,
  RESULT,
  SERVER_ERROR,
  SUBMIT_ACKED,
  HOC_CLEAR,
  SUBMIT_FAILED,
  SUBMIT_SUCCEED,
  SUBMIT_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({});

/**
 * we store different forms in a page separately, distinguish by their `formName`
 * and each form will have their own error and success status
 * @param state
 * @param action
 * @returns {any}
 */
function reducer(state = initialState, action) {
  const trimmedType = utils.trim(action.type);

  switch (trimmedType) {
    case DO_SUBMIT:
      return state.set(action.formName, {
        [SERVER_ERROR]: '',
        [SUBMIT_SUCCESS]: false,
      });
    case SUBMIT_FAILED:
      return state.set(action.formName, {
        [SERVER_ERROR]: action.error,
        [SUBMIT_SUCCESS]: false,
      });
    case SUBMIT_SUCCEED:
      return state.set(action.formName, {
        [SERVER_ERROR]: '',
        [SUBMIT_SUCCESS]: true,
        [RESULT]: action.result,
      });
    case SUBMIT_ACKED:
      return state.delete(action.formName);
    case HOC_CLEAR:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
