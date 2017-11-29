import analyseConfig from '../../../../helpers/analyseConfig';
import dispatchTo from '../dispatchTo';

describe('dispatchTo()', () => {
  const name = 'SomePage';
  const requestName = 'fetchSomething';
  const payload = { payload: 'hi', callback: 'something' };
  const configs = { name: 'someName', beforeSubmit: jest.fn() };
  const props = {
    internalProps: {
      beforeDispatch: jest.fn(),
      Component: { name },
    },
  };

  // override setTimeout to call immediately
  beforeEach(() => {
    global.setTimeout = jest.fn((cb) => cb());
    analyseConfig.get = jest.fn(() => configs);
  });
  afterEach(() => jest.clearAllMocks());


  it('to be defined', () => {
    expect(dispatchTo).toBeDefined();
    expect(typeof dispatchTo).toBe('function');
  });


  it('should call beforeDispatch', () => {
    dispatchTo(name, requestName, payload, props);
    expect(analyseConfig.get).toBeCalledWith(name, requestName);
    expect(configs.beforeSubmit).toBeCalledWith(payload.payload);
    expect(props.internalProps.beforeDispatch).toBeCalled();
  });


  it('should call beforeDispatch without beforeSubmit', () => {
    delete configs.beforeSubmit;
    dispatchTo(name, requestName, payload, props);
    expect(analyseConfig.get).toBeCalledWith(name, requestName);
    expect(props.internalProps.beforeDispatch).toBeCalled();
  });


  it('should throw Error if no name', () => {
    try {
      dispatchTo(requestName, payload, props);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });


  it('should throw Error if no requestName', () => {
    try {
      dispatchTo(name, payload, props);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });


  it('should throw Error if no payload', () => {
    try {
      dispatchTo(name, requestName, props);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
