import { fromJS } from 'immutable';
import {
  BEFORE_DISPATCH,
  DO_SUBMIT,
  HOC_CLEAR,
  SUBMIT_ACKED,
  SUBMIT_FAILED,
  SUBMIT_SUCCEED,
  REDUX_SET,
  REDUX_SET_FN,
  VARIABLES,
} from './internal/constants';
import helpers from './internal/helpers';

// The initial state of the App
const initialState = fromJS({
  [VARIABLES]: {},
});

//
// const setValue = (state, { key, value, callback }) =>
//  state.mergeIn([VARIABLES, key], { value, callback });
const setValue = (state, { key, value, callback }) =>
  state.merge({
    [VARIABLES]: state.get(VARIABLES).concat({ [key]: { key, value, callback } }),
  });


const setValueWithFunction = (state, { key, func, callback }) => {
  const current = state.getIn([VARIABLES, key]);
  const currentValue = current && current.value;
  return setValue(state, { key, value: func(currentValue), callback });
};


/**
 * we store different forms in a page separately, distinguish by their `requestName`
 * and each form will have their own error and success status
 * @param state
 * @param action
 * @returns {any}
 */
export function reducers(state = initialState, action) {
  const trimmedType = helpers.reducer.trim(action.type);

  switch (trimmedType) {
    case BEFORE_DISPATCH:
      return state.set(action.requestName, {
        name: action.name,
        requestName: action.requestName,
        payload: action.payload,
        options: action.options,
        willLoad: true,
      });


    case DO_SUBMIT:
      return state.set(action.requestName, {
        isLoading: true,
      });


    case SUBMIT_FAILED:
      return state.set(action.requestName, {
        name: action.name,
        requestName: action.requestName,
        payload: action.payload,
        options: action.options,
        error: action.error,
      });


    case SUBMIT_SUCCEED:
      return state.set(action.requestName, {
        name: action.name,
        requestName: action.requestName,
        payload: action.payload,
        options: action.options,
        result: action.result,
        isSuccess: true,
      });


    case SUBMIT_ACKED:
      return state.delete(action.requestName);


    case HOC_CLEAR:
      return initialState;


    case REDUX_SET:
      return setValue(state, action);


    case REDUX_SET_FN:
      return setValueWithFunction(state, action);


    default:
      return state;
  }
}

const reducer = (name, customs) => helpers.reducer.wrapReducer(reducers, name, customs);

export default reducer;
