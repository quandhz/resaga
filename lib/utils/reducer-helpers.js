import { SEPARATOR } from '../constants';

/**
 * action type will be something like `HOC_DO_SUBMIT::containers/Form/Login::loginForm`
 * The part after SEPARATOR is just for debugging purpose, we can ignore and trim that
 * @param type
 */
const trim = (type) => (type.indexOf(SEPARATOR) !== -1 ? type.slice(0, type.indexOf(SEPARATOR)) : type);

export default {
  trim,
};
