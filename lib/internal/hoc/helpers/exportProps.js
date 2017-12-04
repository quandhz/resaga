
const exportProps = (props = {}) => {
  const {
    resaga, acknowledge, beforeDispatch, cleanup, dispatch, setValue, setValueWithFunc,
    ...rest
  } = props;

  return rest;
};

export default exportProps;
