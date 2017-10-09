import { SEPARATOR } from '../constants';

/**
 * action type will be something like `HOC_DO_SUBMIT::containers/Form/Login::loginForm`
 * The part after SEPARATOR is just for debugging purpose, we can ignore and trim that
 * @param type
 */
const trim = (type) => (type.indexOf(SEPARATOR) !== -1 ? type.slice(0, type.indexOf(SEPARATOR)) : type);


/**
 * based from http://redux.js.org/docs/recipes/reducers/ReusingReducerLogic.html
 * @param reducerFunction
 * @param reducerName
 * @param customs
 * @returns {function(*=, *=)}
 */
const wrapReducer = (reducerFunction, reducerName, customs = {}) =>
  (state, action) => {
    const { name, type } = action;
    const isInitializationCall = state === undefined;
    if (customs[type]) {
      return customs[type](state);
    }
    if (name !== reducerName && !isInitializationCall) return state;

    return reducerFunction(state, action);
  };

export default {
  trim,
  wrapReducer,
};
