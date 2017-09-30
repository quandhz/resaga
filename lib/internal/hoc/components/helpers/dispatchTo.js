import analyseConfig from '../../../helpers/analyseConfig';

const dispatchTo = (name, requestName, { payload, ...callback }, props) => {
  if (!name) throw SyntaxError('Component Name must be defined.');
  if (!requestName) throw SyntaxError('Request Name must be defined.');

  const configs = name && analyseConfig.get(name, requestName);

  const { beforeDispatch, Component } = props.internalProps;
  const preProcess = configs.beforeSubmit || ((o) => (o));

  // delay 1ms to put this on execution queue to prevent it from getting overridden
  return setTimeout(() =>
    beforeDispatch(name, requestName, preProcess(payload),
      { configs, callback, origin: `${Component.name}` }
    )
  );
};

export default dispatchTo;
