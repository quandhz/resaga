
const cleanUp = (internalProps) => {
  const { cleanup, configs } = internalProps;
  return !configs.manuallyCleanup && cleanup(configs.name);
};

export default cleanUp;
