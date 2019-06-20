import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { REDUCER_HELPERS } from './reducer';

const getSelector = (selector) => (state) => {
  return REDUCER_HELPERS.getValueSelector(state, selector.keyPath);
};

export const useValue = (selector, deps) => {
  const value = useSelector(getSelector(selector), deps);

  // memoizedValue
  // const memoizedValue = useMemo(() => selector.getter(value, ...deps), deps);

  return value;
};

export const Value = ({ selector, deps, children }) => {
  const value = useSelector(getSelector(selector), deps);

  return typeof children === 'function' ? children(value) : value || null;
};

export const useSetValue = (keyPath, deps) => useCallback((newValue) => newValue, deps);

export const useDispatchTo = () => {
};
