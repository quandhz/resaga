import { put } from 'redux-saga/effects';

/**
 * this function return an array of dispatch actions,
 * which is combined by a defaultCallback and additionCallbacks
 * every single action will be called with all params given by the caller
 * @param defaultCallback
 * @param additionCallbacks
 * @param params
 * @returns {Array}
 */
export function makeCallback(defaultCallback = null, additionCallbacks = [], ...params) {
  let callbacks = [];
  if (defaultCallback) {
    callbacks = callbacks.concat(put(defaultCallback(...params)));
  }
  for (let i = 0; i < additionCallbacks.length; i += 1) {
    callbacks = callbacks.concat(put(additionCallbacks[i](...params)));
  }
  return callbacks;
}
