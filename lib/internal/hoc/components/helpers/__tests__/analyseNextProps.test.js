import { fromJS } from 'immutable';
import { RESULT, SERVER_ERROR, STORE, SUBMIT_SUCCESS, PAYLOAD } from '../../../../constants';
import analyseNextProps, { analyseRequest, notify } from '../analyseNextProps';

describe('analyseNextProps', () => {
  describe('notify', () => {
    it('callback undefined', () => {
      expect(notify()).toBe(false);
    });

    it('callback is function', () => {
      const callback = jest.fn();
      notify(callback, 1);
      expect(callback).toBeCalledWith(1);
    });

    it('callback onError', () => {
      const onError = jest.fn();
      notify({ onError }, { error: true });
      expect(onError).toBeCalled();
    });

    it('callback onSuccess', () => {
      const onSuccess = jest.fn();
      notify({ onSuccess }, { isSuccess: true });
      expect(onSuccess).toBeCalled();
    });
  });


  describe('analyseRequest()', () => {
    const request = jest.fn();
    const props = { hi: 'ho' };
    const requestObject = {
      onError: jest.fn(),
      onSuccess: jest.fn(),
    };
    const payload = 'payload';
    const propsWillLoad = { willLoad: true, payload };
    const propsError = { [SERVER_ERROR]: 'error', [PAYLOAD]: payload };
    const propsSuccess = { [SUBMIT_SUCCESS]: true, [RESULT]: 'result', [PAYLOAD]: payload };
    const options = { dispatch: jest.fn() };

    it('analyseRequest is defined', () => {
      expect(analyseRequest).toBeDefined();
    });

    it('request default value', () => {
      const res = analyseRequest(undefined, props, options);
      expect(res).toBe(true);
    });

    it('willLoad true, request.before defined', () => {
      const before = jest.fn();
      const res = analyseRequest({ before }, propsWillLoad, options);
      expect(res).toBe(false);
      expect(before).toBeCalledWith(propsWillLoad.payload);
      expect(options.dispatch).toBeCalledWith(propsWillLoad);
    });

    it('willLoad true, request.before undefined', () => {
      const res = analyseRequest({}, propsWillLoad, options);
      expect(res).toBe(false);
      expect(options.dispatch).toBeCalledWith(propsWillLoad);
    });

    it('request is function', () => {
      const res = analyseRequest(request, props, options);
      expect(res).toBe(false);
      expect(request).toBeCalledWith(props);
    });

    it('request is function, callback defined', () => {
      const callback = jest.fn();
      const newProps = { options: { callback }, ...props };
      const res = analyseRequest(request, newProps, options);
      expect(res).toBe(false);
      expect(request).toBeCalledWith(newProps);
      expect(callback).toBeCalled();
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

    it('request is object, callback defined', () => {
      const callback = jest.fn();
      const res = analyseRequest(requestObject, { options: { callback }, ...propsSuccess }, options);
      expect(res).toBe(true);
      expect(callback).toBeCalled();
    });
  });


  describe('analyseNextProps()', () => {
    const name = 'SomePage';
    const requestName = 'requestName';
    const result = 'result';
    const payload = 'payload';
    const store = fromJS({}).set(requestName, {
      [SUBMIT_SUCCESS]: true,
      [RESULT]: result,
      [PAYLOAD]: payload,
    });
    const storeIsLoading = fromJS({}).set(requestName, { isLoading: true });
    const actions = { [requestName]: jest.fn() };
    const actionsSuccess = { onSuccess: jest.fn() };
    const actionsOtherForm = { otherForm: jest.fn() };
    const configs = { name, requests: { [requestName]: requestName } };
    const acknowledge = jest.fn();


    afterEach(() => jest.clearAllMocks());

    it('analyseNextProps is defined', () => {
      expect(analyseNextProps).toBeDefined();
    });

    it('no configs', () => {
      analyseNextProps({ [name]: store }, actions, { acknowledge });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).not.toBeCalled();
    });

    it('no store', () => {
      analyseNextProps({ someStore: store }, actions, { acknowledge, configs });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).not.toBeCalled();
    });

    it('no actions', () => {
      analyseNextProps({ someStore: store }, undefined, { acknowledge, configs });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).not.toBeCalled();
    });

    it('no form found', () => {
      analyseNextProps({ [STORE]: store }, actionsOtherForm, { acknowledge });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).not.toBeCalled();
    });

    it('store found, ack false', () => {
      analyseNextProps({ [name]: store }, actions, { acknowledge, configs });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).toBeCalled();
    });

    it('store found, isLoading true', () => {
      analyseNextProps({ [name]: storeIsLoading }, actions, { acknowledge, configs });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).not.toBeCalled();
    });

    it('ack true', () => {
      analyseNextProps({ [name]: store }, actionsSuccess, { acknowledge, configs });
      expect(acknowledge).toBeCalled();
      // expect(actions[requestName]).not.toBeCalled();
    });
  });
});
