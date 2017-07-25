import { fromJS } from 'immutable';
import {
  SERVER_ERROR,
  SUBMIT_SUCCESS,
} from '../constants';
import {
  selectPage,
  selectErrors,
  selectIsSubmitSuccess,
} from '../selectors';

const PAGE = 'mockTestPage';

describe('selectPage', () => {
  const registerSelector = selectPage(PAGE);
  it('should select the register state', () => {
    const registerState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      [PAGE]: registerState,
    });
    expect(registerSelector(mockedState)).toEqual(registerState);
  });
});

describe('selectServerValidationeError', () => {
  const selector = selectErrors(PAGE);
  it('should select the selectServerValidation state', () => {
    const expectedResult = 'error';
    const mockedState = fromJS({
      [PAGE]: {
        [SERVER_ERROR]: expectedResult,
      },
    });
    expect(selector(mockedState)).toEqual(expectedResult);
  });
});

describe('selectIsSubmitSuccess', () => {
  const selector = selectIsSubmitSuccess(PAGE);
  it('should select the selectIsSubmitSuccess state', () => {
    const expectedResult = false;
    const mockedState = fromJS({
      [PAGE]: {
        [SUBMIT_SUCCESS]: expectedResult,
      },
    });
    expect(selector(mockedState)).toEqual(expectedResult);
  });
});
