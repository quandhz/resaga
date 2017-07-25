/**
 * Created by quando on 14/7/17.
 */

import { fromJS } from 'immutable';
import { RESULT, SERVER_ERROR, STORE, SUBMIT_SUCCESS } from '../../constants';
import component from '../component-helpers';

describe('utils/hoc/onSubmit/utils/component-helpers', () => {
  const request = jest.fn();
  const props = { hi: 'ho' };
  const requestObject = {
    onError: jest.fn(),
    onSuccess: jest.fn(),
  };
  const propsError = { [SERVER_ERROR]: 'error' };
  const propsSuccess = { [SUBMIT_SUCCESS]: true, [RESULT]: 'result' };
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
      expect(requestObject.onError).toBeCalledWith(propsError[SERVER_ERROR]);
      requestObject.onError.mockClear();
      expect(requestObject.onSuccess).not.toBeCalled();
    });
    it('request is object, prop success', () => {
      const res = component.analyseRequest(requestObject, propsSuccess);
      expect(res).toBe(true);
      expect(requestObject.onError).not.toBeCalled();
      expect(requestObject.onSuccess).toBeCalledWith(propsSuccess[RESULT]);
      requestObject.onSuccess.mockClear();
    });
  });

  describe('analyseNextProps()', () => {
    const formName = 'formName';
    const result = 'result';
    const store = fromJS({}).set(formName, {
      [SUBMIT_SUCCESS]: true,
      [RESULT]: result,
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
    const acknowledge = jest.fn();

    it('component.analyseNextProps is defined', () => {
      expect(component.analyseNextProps).toBeDefined();
    });
    it('no store', () => {
      component.analyseNextProps({ someStore: store }, actions, acknowledge);
      expect(acknowledge).not.toBeCalled();
      expect(actions[formName]).not.toBeCalled();
    });
    it('no form found', () => {
      component.analyseNextProps({ [STORE]: store }, actionsOtherForm, acknowledge);
      expect(acknowledge).not.toBeCalled();
      expect(actions[formName]).not.toBeCalled();
    });
    it('actions function', () => {
      component.analyseNextProps({ [STORE]: store }, actions, acknowledge);
      expect(acknowledge).not.toBeCalled();
      expect(actions[formName]).toBeCalledWith(store.get(formName));
    });
    it('actions object', () => {
      component.analyseNextProps({ [STORE]: store }, actionsObject, acknowledge);
      expect(acknowledge).toBeCalledWith(formName);
      expect(actionsObject[formName].onSuccess).toBeCalledWith(result);
    });
  });
});
