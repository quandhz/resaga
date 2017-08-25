import { fromJS } from 'immutable';
import {
  BEFORE_DISPATCH,
  DO_SUBMIT,
  HOC_CLEAR,
  RESULT,
  SERVER_ERROR,
  SUBMIT_ACKED,
  SUBMIT_FAILED,
  SUBMIT_SUCCEED,
  SUBMIT_SUCCESS,
  REDUX_SET,
  REDUX_SET_FN,
  VARIABLES,
  IS_LOADING,
  WILL_LOAD,
  PAYLOAD,
} from './constants';
import utils from './utils/reducer-helpers';

// The initial state of the App
const initialState = fromJS({
  [VARIABLES]: {},
});

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
    case BEFORE_DISPATCH:
      return state.set(action.formName, {
        [PAYLOAD]: action.payload || true,
        [WILL_LOAD]: true,
        formName: action.formName,
        page: action.page,
      });
    case DO_SUBMIT:
      return state.set(action.formName, {
        [IS_LOADING]: true,
      });
    case SUBMIT_FAILED:
      return state.set(action.formName, {
        [SERVER_ERROR]: action.error,
        [PAYLOAD]: action.payload,
      });
    case SUBMIT_SUCCEED:
      return state.set(action.formName, {
        [SUBMIT_SUCCESS]: true,
        [RESULT]: action.result,
        [PAYLOAD]: action.payload,
      });
    case SUBMIT_ACKED:
      return state.delete(action.formName);
    case HOC_CLEAR:
      return initialState;
    case REDUX_SET:
      return state.merge({
        [VARIABLES]: state.get(VARIABLES).concat({ [action.key]: action.value }),
      });
    case REDUX_SET_FN:
      return state.merge({
        [VARIABLES]: state.get(VARIABLES).concat({
          [action.key]: action.func(state.get(VARIABLES).get(action.key)),
        }),
      });
    default:
      return state;
  }
}

export default reducer;
