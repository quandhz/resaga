import dotProp from 'dot-prop-immutable';
import { get } from 'lodash';
import { fromJS } from 'immutable';
import {
  BEFORE_DISPATCH,
  DO_SUBMIT,
  HOC_CLEAR,
  REDUX_SET,
  REDUX_SET_FN,
  SUBMIT_ACKED,
  SUBMIT_FAILED,
  SUBMIT_SUCCEED,
  VARIABLES,
} from './internal/constants';
import helpers from './internal/helpers';

// The initial state of the App
const initialState = fromJS({});

export const updateValue = (state, keyPath, value) => {
  try {
    const [key, ...rest] = keyPath;
    const newValue = {};

    if (rest.length) {
      const values = state.get(key, {});
      newValue[key] = dotProp.set(values, rest, value);
    } else {
      newValue[key] = value;
    }

    return state.concat(newValue);
  } catch (error) {
    return state; // if something goes wrong, does nothing
  }
};

const getValueSelector = (state, keyPath) => {
  const [name] = keyPath;

  return REDUCER_HELPERS.getValue(state.get(name), keyPath);
};

const getValue = (state, keyPath) => {
  const [name, key, ...rest] = keyPath;
  let currentValue;

  // immutable
  if (helpers.config.isResagaStore(name)) {
    currentValue = state.getIn([VARIABLES, key]);
  } else {
    currentValue = state.get(key);
  }

  // non-immutable
  if (rest.length && typeof currentValue === 'object') {
    currentValue = get(currentValue, rest);
  }

  return currentValue;
};

const getValues = (state, keyPath) => {
  const currentValue = getValue(state, keyPath);

  return [currentValue];
};

const setValue = (pageStore, { keyPath, value }) => {
  const [name, ...rest] = keyPath;

  // could be pageStore, could be under VARIABLES
  let valueStore = pageStore;

  if (helpers.config.isResagaStore(name)) {
    valueStore = pageStore.get(VARIABLES, initialState);
  }

  // upsert value from rest path
  const newValue = updateValue(valueStore, rest, value);

  // set updated value to store.VARIABLES
  if (helpers.config.isResagaStore(name)) {
    return pageStore.merge({
      [VARIABLES]: newValue,
    });
  }

  // set updated value directly to store
  return pageStore.merge(newValue);
};


const setValueWithFunction = (state, { keyPath, func }) => {
  const currentValues = getValues(state, keyPath);

  return setValue(state, { keyPath, value: func(...currentValues) });
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

export const REDUCER_HELPERS = {
  getValue,
  getValueSelector,
};
