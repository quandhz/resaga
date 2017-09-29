import { fromJS } from 'immutable';
import { RESULT, SERVER_ERROR, STORE, SUBMIT_SUCCESS, PAYLOAD, WILL_LOAD } from '../../internal/constants';
import component from '../component-helpers';
import configs from '../configs';

describe('resaga/utils/component-helpers', () => {
  const request = jest.fn();
  const props = { hi: 'ho' };
  const requestObject = {
    onError: jest.fn(),
    onSuccess: jest.fn(),
  };
  const payload = 'payload';
  const propsError = { [SERVER_ERROR]: 'error', [PAYLOAD]: payload };
  const propsSuccess = { [SUBMIT_SUCCESS]: true, [RESULT]: 'result', [PAYLOAD]: payload };
  it('component is defined', () => {
    expect(component).toBeDefined();
  });

  describe('analyseRequest()', () => {
    it('component.analyseRequest is defined', () => {
      expect(component.analyseRequest).toBeDefined();
    });
    it('request is function', () => {
      const res = component.analyseRequest(request, props);
      expect(res).toBe(false);
      expect(request).toBeCalledWith(props);
    });
    it('request is object, prop error', () => {
      const res = component.analyseRequest(requestObject, propsError);
      expect(res).toBe(true);
      expect(requestObject.onError).toBeCalledWith(propsError[SERVER_ERROR], payload);
      requestObject.onError.mockClear();
      expect(requestObject.onSuccess).not.toBeCalled();
    });
    it('request is object, prop success', () => {
      const res = component.analyseRequest(requestObject, propsSuccess);
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
    const storeWillLoad = fromJS({}).set(requestName, {
      [WILL_LOAD]: true,
      [PAYLOAD]: result,
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
    it('component.analyseNextProps is defined', () => {
      expect(component.analyseNextProps).toBeDefined();
    });
    it('no store', () => {
      component.analyseNextProps({ someStore: store }, actions, { acknowledge });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).not.toBeCalled();
    });
    it('no form found', () => {
      component.analyseNextProps({ [STORE]: store }, actionsOtherForm, { acknowledge });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).not.toBeCalled();
    });
    it('actions function', () => {
      component.analyseNextProps({ [STORE]: store }, actions, { acknowledge });
      expect(acknowledge).not.toBeCalled();
      expect(actions[requestName]).toBeCalledWith(store.get(requestName));
    });
    it('actions object', () => {
      component.analyseNextProps({ [STORE]: store }, actionsObject, { acknowledge });
      expect(acknowledge).toBeCalledWith(requestName);
      expect(actionsObject[requestName].onSuccess).toBeCalledWith(result, payload);
    });
    it('actions willLoad - without before', () => {
      configs.get = jest.fn();
      component.analyseNextProps({ [STORE]: storeWillLoad }, actionsObject, { acknowledge, dispatch });
      expect(acknowledge).not.toBeCalledWith(requestName);
      expect(configs.get).toBeCalled();
      expect(dispatch).toBeCalled();
    });
    it('actions willLoad - with before', () => {
      configs.get = jest.fn();
      component.analyseNextProps({ [STORE]: storeWillLoad }, actionsObjectBefore, { acknowledge, dispatch });
      expect(acknowledge).not.toBeCalledWith(requestName);
      expect(actionsObjectBefore[requestName].before).toBeCalledWith(result);
      expect(configs.get).toBeCalled();
      expect(dispatch).toBeCalled();
    });
  });
});
