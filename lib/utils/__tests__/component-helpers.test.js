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
    const formName = 'formName';
    const result = 'result';
    const store = fromJS({}).set(formName, {
      [SUBMIT_SUCCESS]: true,
      [RESULT]: result,
      [PAYLOAD]: payload,
    });
    const storeWillLoad = fromJS({}).set(formName, {
      [WILL_LOAD]: true,
      [PAYLOAD]: result,
    });
    const actions = {
      [formName]: jest.fn(),
    };
    const actionsOtherForm = {
      otherForm: jest.fn(),
    };
    const actionsObject = {
      [formName]: { onSuccess: jest.fn() },
    };
    const actionsObjectBefore = {
      [formName]: { before: jest.fn(), onSuccess: jest.fn() },
    };
    const acknowledge = jest.fn();
    const dispatch = jest.fn();

    beforeEach(() => {
      actionsObject[formName].onSuccess.mockClear();
      actionsObjectBefore[formName].before.mockClear();
      actionsObjectBefore[formName].onSuccess.mockClear();
      acknowledge.mockClear();
      dispatch.mockClear();
    });
    it('component.analyseNextProps is defined', () => {
      expect(component.analyseNextProps).toBeDefined();
    });
    it('no store', () => {
      component.analyseNextProps({ someStore: store }, actions, { acknowledge });
      expect(acknowledge).not.toBeCalled();
      expect(actions[formName]).not.toBeCalled();
    });
    it('no form found', () => {
      component.analyseNextProps({ [STORE]: store }, actionsOtherForm, { acknowledge });
      expect(acknowledge).not.toBeCalled();
      expect(actions[formName]).not.toBeCalled();
    });
    it('actions function', () => {
      component.analyseNextProps({ [STORE]: store }, actions, { acknowledge });
      expect(acknowledge).not.toBeCalled();
      expect(actions[formName]).toBeCalledWith(store.get(formName));
    });
    it('actions object', () => {
      component.analyseNextProps({ [STORE]: store }, actionsObject, { acknowledge });
      expect(acknowledge).toBeCalledWith(formName);
      expect(actionsObject[formName].onSuccess).toBeCalledWith(result, payload);
    });
    it('actions willLoad - without before', () => {
      configs.get = jest.fn();
      component.analyseNextProps({ [STORE]: storeWillLoad }, actionsObject, { acknowledge, dispatch });
      expect(acknowledge).not.toBeCalledWith(formName);
      expect(configs.get).toBeCalled();
      expect(dispatch).toBeCalled();
    });
    it('actions willLoad - with before', () => {
      configs.get = jest.fn();
      component.analyseNextProps({ [STORE]: storeWillLoad }, actionsObjectBefore, { acknowledge, dispatch });
      expect(acknowledge).not.toBeCalledWith(formName);
      expect(actionsObjectBefore[formName].before).toBeCalledWith(result);
      expect(configs.get).toBeCalled();
      expect(dispatch).toBeCalled();
    });
  });
});
