import analyseConfig from './analyseConfig';

const dispatchTo = (componentName, requestName, { payload, ...callback }, props) => {
  if (!componentName) throw SyntaxError('Component Name must be defined.');
  if (!requestName) throw SyntaxError('Request Name must be defined.');


  const configs = componentName && analyseConfig.get(componentName);

  // TODO: use invariant
  if (!configs) throw SyntaxError('`configs` must be defined.');
  if (!configs.requests) throw SyntaxError('`configs.requests` must be defined.');
  if (!configs.requests[requestName]) throw SyntaxError(`Request '${requestName}' must be defined in configs.requests.`);


  const { beforeDispatch, Component } = props.internalProps;
  const preProcess = configs.beforeSubmit || ((o) => (o));
  const postPayload = preProcess(payload);

  // delay 1ms to put this on execution queue to prevent it from getting overridden
  return setTimeout(() => {
    beforeDispatch(componentName, requestName, postPayload, { configs, callback, origin: `${Component.name}` });
  }, 0);
};

export default dispatchTo;
