import analyseConfig from '../../../helpers/analyseConfig';

const dispatch = (payload, requestName, internalProps) => {
  if (!internalProps) throw SyntaxError('Payload and Request Name must be defined.');

  const { configs, beforeDispatch } = internalProps;
  analyseConfig.check(configs, requestName);

  const preProcess = configs.beforeSubmit || ((o) => (o));

  // delay 0ms to put this on execution queue to prevent it from getting overridden
  return setTimeout(() =>
    beforeDispatch(null, requestName, preProcess(payload),
      { configs }
    )
  );
};

export default dispatch;
