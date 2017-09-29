export const PAGE = 'name';
export const SUBMIT = 'requests';

export const BEFORE_SUBMIT = 'beforeSubmit';
export const ON_SUCCESS = 'onSubmitSuccess';
export const ON_ERROR = 'onSubmitError';

export const HANDLE_SUCCESS = 'processResult';
export const HANDLE_ERROR = 'processError';

/**
 * Setting in CONFIG, manually cleaning up redux store - default: false
 * If set to true, onSubmitHOC will not cleanup the page's redux store on componentWillUnmount
 * I hope that you know exactly what you're doing.
 */
export const MANUALLY_CLEANUP = 'manuallyCleanup';

export default {
  PAGE,
  SUBMIT,
  ON_ERROR,
  ON_SUCCESS,
  HANDLE_ERROR,
  BEFORE_SUBMIT,
  HANDLE_SUCCESS,
  MANUALLY_CLEANUP,
};
