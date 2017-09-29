const isEmpty = (object) => typeof object === 'object' && !Object.keys(object).length;
const isSimplify = (configs) => !configs.name || isEmpty(configs.requests);

export default isSimplify;
