import resaga from './resaga';
import * as myself from './';

export debug from './debug';
export sagas from './sagas';
export CONFIG from './config';
export reducer from './reducer';
export { useValue, Value } from './hooks';
export { setResultHandler, setErrorHandler } from './handler';


// export resaga as default
export default Object.assign(
  resaga,
  myself,
);

