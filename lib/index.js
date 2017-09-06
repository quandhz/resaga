import config from './config';
import constants from './constants';
import reducers from './reducer';
import reducerHelpers from './utils/reducer-helpers';
import sagasArray, { saga as sagaObject } from './sagas';
import { withResaga } from './internal/withResaga';

export const CONFIG = config;
export const CONSTANTS = constants;
export const wrapReducer = reducerHelpers.wrapReducer;
export const originReducer = reducers;
export const sagas = sagasArray;
export const saga = sagaObject;
export const reducer = (page, customs) => reducerHelpers.wrapReducer(reducers, page, customs);
export default withResaga;
