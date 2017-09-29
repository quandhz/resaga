import { fromJS } from 'immutable';
import { RESULT, SERVER_ERROR, SUBMIT_FAILED, SUBMIT_SUCCEED, SUBMIT_SUCCESS } from '../constants';
import reducer from '../../reducer';

const stateNeither = () => fromJS({ thisState: 'is neither success nor fail' });
const stateSuccess = (requestName) => reducer(fromJS(), { requestName, type: SUBMIT_SUCCEED });
const stateError = (requestName) => reducer(fromJS(), { requestName, type: SUBMIT_FAILED });

const propsNeither = () => ({ [SERVER_ERROR]: '', [SUBMIT_SUCCESS]: false });
const propsSuccess = (result) => ({ [SERVER_ERROR]: '', [SUBMIT_SUCCESS]: true, [RESULT]: result });
const propsError = (error) => ({ [SERVER_ERROR]: error, [SUBMIT_SUCCESS]: false });

export default {
  generate: {
    stateNeither,
    stateSuccess,
    stateError,
    propsNeither,
    propsSuccess,
    propsError,
  },
};
