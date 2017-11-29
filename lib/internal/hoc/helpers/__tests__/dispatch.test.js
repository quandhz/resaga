import analyseConfig from '../../../../helpers/analyseConfig';
import dispatch from '../dispatch';

describe('dispatch()', () => {
  const requestName = 'fetchSomething';
  const payload = { value: 'hi' };
  const internalProps = {
    configs: {
      name: 'someName',
      beforeSubmit: jest.fn(),
    },
    beforeDispatch: jest.fn(),
  };

  // override setTimeout to call immediately
  beforeEach(() => {
    global.setTimeout = jest.fn((cb) => cb());
    analyseConfig.check = jest.fn();
  });
  afterEach(() => jest.clearAllMocks());


  it('to be defined', () => {
    expect(dispatch).toBeDefined();
    expect(typeof dispatch).toBe('function');
  });


  it('should call beforeDispatch', () => {
    dispatch(payload, requestName, internalProps);
    expect(analyseConfig.check).toBeCalledWith(internalProps.configs, requestName);
    expect(internalProps.configs.beforeSubmit).toBeCalledWith(payload);
    expect(internalProps.beforeDispatch).toBeCalled();
  });


  it('should call beforeDispatch without beforeSubmit', () => {
    delete internalProps.configs.beforeSubmit;
    dispatch(payload, requestName, internalProps);
    expect(analyseConfig.check).toBeCalledWith(internalProps.configs, requestName);
    expect(internalProps.beforeDispatch).toBeCalled();
  });


  it('should throw Error if no requestName', () => {
    try {
      dispatch(payload, internalProps);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });


  it('should throw Error if no payload', () => {
    try {
      dispatch(requestName, internalProps);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });


  it('should throw Error if no payload and request name', () => {
    try {
      dispatch(internalProps);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
