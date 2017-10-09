import analyseConfig from '../../../helpers/analyseConfig';

const dispatchTo = (name, requestName, { payload, ...callback }, props) => {
  if (!props) throw SyntaxError('Component Name and Request Name must be defined.');

  const configs = name && analyseConfig.get(name, requestName);

  const { beforeDispatch, Component } = props.internalProps;
  const preProcess = configs.beforeSubmit || ((o) => (o));

  return beforeDispatch(
    name, requestName, preProcess(payload),
    { configs, callback, origin: `${Component.name}` }
  );
};

export default dispatchTo;
