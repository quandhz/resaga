import { fromJS } from 'immutable';
import { RESULT, SERVER_ERROR, STORE, SUBMIT_SUCCESS, PAYLOAD } from '../../../../constants';
import analyseNextProps, { analyseRequest } from '../analyseNextProps';

describe('resaga/utils/helper-helpers', () => {
  const request = jest.fn();
  const props = { hi: 'ho' };
  const requestObject = {
    onError: jest.fn(),
    onSuccess: jest.fn(),
  };
  const payload = 'payload';
  const propsError = { [SERVER_ERROR]: 'error', [PAYLOAD]: payload };
  const propsSuccess = { [SUBMIT_SUCCESS]: true, [RESULT]: 'result', [PAYLOAD]: payload };
  const options = { dispatch: jest.fn() };

  it('analyseNextProps is defined', () => {
    expect(analyseNextProps).toBeDefined();
  });


  describe('analyseRequest()', () => {
    it('analyseRequest is defined', () => {
      expect(analyseRequest).toBeDefined();
    });
    it('request is function', () => {
      const res = analyseRequest(request, props, options);
      expect(res).toBe(false);
      expect(request).toBeCalledWith(props);
    });
    it('request is object, prop error', () => {
      const res = analyseRequest(requestObject, propsError, options);
      expect(res).toBe(true);
      expect(requestObject.onError).toBeCalledWith(propsError[SERVER_ERROR], payload);
      requestObject.onError.mockClear();
      expect(requestObject.onSuccess).not.toBeCalled();
    });
    it('request is object, prop success', () => {
      const res = analyseRequest(requestObject, propsSuccess, options);
      expect(res).toBe(true);
      expect(requestObject.onError).not.toBeCalled();
      expect(requestObject.onSuccess).toBeCalledWith(propsSuccess[RESULT], payload);
      requestObject.onSuccess.mockClear();
    });
  });

  describe('analyseNextProps()', () => {
    const requestName = 'requestName';
    const result = 'result';
    const store = fromJS({}).set(requestName, {
      [SUBMIT_SUCCESS]: true,
      [RESULT]: result,
      [PAYLOAD]: payload,
    });
    const actions = {
      [requestName]: jest.fn(),
    };
    const actionsOtherForm = {
      otherForm: jest.fn(),
    };
    const actionsObject = {
      [requestName]: { onSuccess: jest.fn() },
    };
    const actionsObjectBefore = {
      [requestName]: { before: jest.fn(), onSuccess: jest.fn() },
    };
    const acknowledge = jest.fn();
    const dispatch = jest.fn();

    beforeEach(() => {
      actionsObject[requestName].onSuccess.mockClear();
      actionsObjectBefore[requestName].before.mockClear();
      actionsObjectBefore[requestName].onSuccess.mockClear();
      acknowledge.mockClear();
      dispatch.mockClear();
    });
    it('analyseNextProps is defined', () => {
      expect(analyseNextProps).toBeDefined();
    });
    it('no store', () => {
      analyseNextProps({ someStore: store }, actions, { acknowledge });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).not.toBeCalled();
    });
    it('no form found', () => {
      analyseNextProps({ [STORE]: store }, actionsOtherForm, { acknowledge });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).not.toBeCalled();
    });
  });
});
